import { serverFetch } from "../core/server"

export const getPopularRecipes = async () => {
    return serverFetch("/api/popular/recipe");
}