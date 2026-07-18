import { serverFetch } from "../core/serverFetch";

export const getRecipeReports = async() =>{
    return serverFetch('/api/report');
}
