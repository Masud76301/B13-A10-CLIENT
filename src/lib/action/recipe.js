"use client"

import { serverMutation } from "../core/server"

export const createRecipe = async (newRecipeData)=>{
    return serverMutation('/api/recipes',newRecipeData)
}

export const favoritesRecipe = async(favRecipeData) => {
    return serverMutation('/api/favorite',favRecipeData)
}