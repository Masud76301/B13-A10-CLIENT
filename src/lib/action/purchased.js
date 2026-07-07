import { serverMutation } from "../core/server";

export const purchasedRecipe = async(purchasedData) =>{
     return serverMutation('/api/purchased',purchasedData);
}