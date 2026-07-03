import { serverMutation } from "../core/server"

export const reportRecipe = async(reportData) => {
    return serverMutation('/api/report',reportData);
}