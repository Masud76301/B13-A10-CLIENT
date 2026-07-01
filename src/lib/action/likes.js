import { serverMutation } from "../core/server";

export const likeRecipe = async (recipeId, userId) => {
    return serverMutation(`/api/recipes/${recipeId}/like`, { userId }, "PATCH");
};

export const unlikeRecipe = async (recipeId, userId) => {
    return serverMutation(`/api/recipes/${recipeId}/like`, { userId }, "DELETE");
};