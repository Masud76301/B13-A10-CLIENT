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



export async function toggleFeaturedRecipe(recipeId, currentStatus) {
  try {
    // Replace this with your actual database update logic (Mongoose/MongoDB)
    // Example:
    // await db.recipes.updateOne({ _id: recipeId }, { $set: { isFeatured: !currentStatus } });
    
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle feature status:", error);
    return { success: false, error: error.message };
  }
}