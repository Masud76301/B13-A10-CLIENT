import { serverMutation } from "../core/server"

export const removeFavoriteRecipe = async (remRecipeData) =>{
    return serverMutation('/api/favorite',remRecipeData,"DELETE")
} 