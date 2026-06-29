import { serverFetch } from "../core/server";


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const getUserRecipes = async (userId)=>{
    const res = await fetch(`${baseUrl}/api/recipes?userId=${userId}`);
    return res.json();
}

export const getAllRecipes = async ()=>{
    return serverFetch('/api/recipes')
}


export const getRecipeById = async (recipeId) =>{
    return serverFetch(`/api/recipes/${recipeId}`);

}