import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    //(1) Loading a recipe
    await model.loadRecipe(id);

    //(2) Rendering a recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError(`❌❌ ${err} ❌❌`);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //1) Get Search Query
    const query = searchView.getQuery();
    if (!query) return;

    //2) Load Search Results
    await model.loadSearchResults(query);

    //3)Render Search results
    resultsView.render(model.getSearchResultsPage(1));
  } catch (err) {
    console.log(err);
  }
};
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init(); // Call the init function to start the app
