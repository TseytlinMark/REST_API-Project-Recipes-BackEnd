const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";
require("dotenv").config();
const apikeys_recipes = process.env.APIKEYS_SPOON;



/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info 
 */


async function handlegetRecipeDetails(recipe_id,nutritional=false) {
    return await axios.get(`${api_domain}/${recipe_id}/information`, {
        headers: {
            "x-api-key":apikeys_recipes
        },
        params: {
            includeNutrition: nutritional,
        }
    });
}

// this func is sending a http request to the domain and return 3 random recipes
async function handleGetRandomRecipes(number_of_recipes) {
    return await axios.get(`${api_domain}/random`, {
        headers: {
            "x-api-key":apikeys_recipes

        },
        params: {
            "number":number_of_recipes
        }
    });
}

async function handlegetArrayOfRecipes(recipesIds) {
    return await axios.get(`${api_domain}/informationBulk`, {
        headers: {
            "x-api-key":apikeys_recipes

        },
        params: {
            "ids":recipesIds
        }
    });
}

async function getRandomRecipes(number_of_recipes) {
    let recipe_info = await handleGetRandomRecipes(number_of_recipes);
    let recipes = recipe_info.data.recipes
    

    return recipes
}

async function getRecipeDetails(recipe_id,nutritional=false) {
    let recipe_info = await handlegetRecipeDetails(recipe_id,nutritional);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_info.data;

    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        
    }
}

async function getArrayOfRecipes(recipesIds) {
    let recipe_info = await handlegetArrayOfRecipes(recipesIds);
    return recipe_info.data;
    

   
}

/**
 * @description Do not USE
 */
async function addnewrecipe(name,Time,Likes,isVegan,isVeget,isGfree,portions,image,instructions,intolerances,cuisine) {

    let recipe_info = await DButils.execQuery(
        `INSERT INTO recipes VALUES ('${name}', '${Time}', '${Likes}',
        '${isVegan}', '${isVeget}', '${isGfree}' '${portions}', '${isVeget}', '${isGfree}')`
      );
    return recipe_info.data;
}

exports.getRecipeDetails = getRecipeDetails;
exports.getArrayOfRecipes = getArrayOfRecipes;
exports.getRandomRecipes = getRandomRecipes;

exports.addnewrecipe = addnewrecipe;
