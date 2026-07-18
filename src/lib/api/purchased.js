// import { serverFetch } from "../core/server"

import { serverFetch } from "../core/serverFetch";

export const isPurchasedRecipe = async (recipeId, userId) => {
    return serverFetch(`/api/purchased/${recipeId}?userId=${userId}`);
}

export const getPurchasedRecipes = async (userId) => {
    return serverFetch(`/api/purchased?userId=${userId}`);
}