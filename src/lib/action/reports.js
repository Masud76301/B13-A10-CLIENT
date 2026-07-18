import { serverMutation } from "../core/server"
import { serverFetch } from "../core/serverFetch";

export const reportRecipe = async(reportData) => {
    return serverMutation('/api/report',reportData);
}

// export const getRecipeReports = async() =>{
//     return serverFetch('/api/report');
// }



export const dismissReport = async(reportId) =>{
    return serverMutation('/api/report',{reportId},"DELETE");
}