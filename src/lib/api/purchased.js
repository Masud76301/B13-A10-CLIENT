import { serverFetch } from "../core/server"

export const isPurchasedRecipe = async (recipeId, userId) => {
    return serverFetch(`/api/purchased/${recipeId}?userId=${userId}`);
}

export const getPurchasedRecipes = async (userId) => {
    return serverFetch(`/api/purchased?userId=${userId}`);
}