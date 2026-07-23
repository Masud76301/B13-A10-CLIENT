// import { serverFetch } from "../core/server"

import { publicServerFetch, serverFetch } from "../core/serverFetch";

export const getPopularRecipes = async () => {
    return publicServerFetch("/api/popular/recipe");
}