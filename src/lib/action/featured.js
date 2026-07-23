import { serverMutation } from "../core/server"
import { publicServerFetch, serverFetch } from "../core/serverFetch";

export const featuredRecipes= async(recipeId) =>{
    return serverMutation('/api/featured',{recipeId});
}

export const getFeaturedRecipes = async() => {
    return publicServerFetch('/api/featured')
}