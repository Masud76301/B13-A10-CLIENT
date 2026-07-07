import { serverFetch } from "../core/server"

export const isPurchasedRecipe = async (recipeId, userId) => {
    return serverFetch(`/api/purchased/${recipeId}?userId=${userId}`);
}