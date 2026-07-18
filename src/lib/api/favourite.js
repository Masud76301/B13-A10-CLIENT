import { serverFetch } from "../core/serverFetch";

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const getFavoriteRecipe = async (userId)=>{
    // const res = await fetch(`${baseUrl}/api/favorite?userId=${userId}`);
    return serverFetch(`/api/favorite?userId=${userId}`);
    // return res.json();
}