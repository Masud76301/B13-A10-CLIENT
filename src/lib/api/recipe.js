// import { serverFetch } from "../core/server";

import { serverFetch } from "../core/serverFetch"


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getUserRecipes = async (userId)=>{
    return serverFetch(`/api/recipes?userId=${userId}`)
   
}

export const getAllRecipes = async (page)=>{
    return serverFetch(`/api/recipes?page=${page}`)
}


export const getRecipeById = async (recipeId) =>{
    return serverFetch(`/api/recipes/${recipeId}`);

}