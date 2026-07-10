import { serverFetch } from "../core/server";

export const isLikedRecipe = async(recipeId,userId) =>{
    return serverFetch(`/api/recipes/${recipeId}/like?userId=${userId}`);
}

export const likeReceived = async(userId)=>{
    return serverFetch(`/api/like-count?userId=${userId}`)
}