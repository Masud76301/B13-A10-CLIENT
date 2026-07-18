// import { serverFetch } from "../core/server"

import { serverFetch } from "../core/serverFetch";

export const getAllUsers= async () => {
    return serverFetch('/api/users');
}

export const getUserById = async (userId) =>{
    return serverFetch(`/api/users/${userId}`);

}