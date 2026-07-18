import { serverMutation } from "../core/server"
import { serverFetch } from "../core/serverFetch";

export const featuredRecipes= async(recipeId) =>{
    return serverMutation('/api/featured',{recipeId});
}

export const getFeaturedRecipes = async() => {
    return serverFetch('/api/featured')
}