// import { serverFetch } from "../core/server"

import { serverFetch } from "../core/serverFetch";

export const getPopularRecipes = async () => {
    return serverFetch("/api/popular/recipe");
}