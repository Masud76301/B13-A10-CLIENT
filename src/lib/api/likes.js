import { serverFetch } from "../core/server";

export const isLikedRecipe = async(recipeId,userId) =>{
    return serverFetch(`/api/recipes/${recipeId}/like?userId=${userId}`);
}