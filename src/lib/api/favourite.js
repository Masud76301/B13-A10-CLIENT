import { serverFetch } from "../core/serverFetch";


export const getFavoriteRecipe = async (userId)=>{
  
    return serverFetch(`/api/favorite?userId=${userId}`);
  
}