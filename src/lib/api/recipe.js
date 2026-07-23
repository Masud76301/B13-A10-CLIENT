// import { serverFetch } from "../core/server";

import { publicServerFetch, serverFetch } from "../core/serverFetch"


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getUserRecipes = async (userId)=>{
    return serverFetch(`/api/recipes?userId=${userId}`)
   
}

export const getAllRecipes = async (page, category) => {
    // 1. If there is a category, explicitly add "&category="
    if (category) {
        return publicServerFetch(`/api/recipes?page=${page}&category=${category}`);
    } 
    
    // 2. If category is empty, don't add the "&" symbol at all
    return publicServerFetch(`/api/recipes?page=${page}`);
};


export const getRecipeById = async (recipeId) =>{
    return serverFetch(`/api/recipes/${recipeId}`);

}