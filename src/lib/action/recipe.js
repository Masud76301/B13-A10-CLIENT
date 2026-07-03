"use client"

import { serverMutation } from "../core/server"

export const createRecipe = async (newRecipeData)=>{
    return serverMutation('/api/recipes',newRecipeData)
}



export const deleteRecipe = async(recipeId,userId) => {
    return serverMutation(`/api/recipes/${recipeId}`,{userId},"DELETE")
}

export const editRecipe = async(recipeId,updatedRecipeData)=>{
    return serverMutation(`/api/recipes/${recipeId}`,updatedRecipeData,"PATCH")
}