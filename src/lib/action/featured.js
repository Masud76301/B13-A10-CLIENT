import { serverFetch, serverMutation } from "../core/server"

export const featuredRecipes= async(recipeId) =>{
    return serverMutation('/api/featured',{recipeId});
}

export const getFeaturedRecipes = async() => {
    return serverFetch('/api/featured')
}