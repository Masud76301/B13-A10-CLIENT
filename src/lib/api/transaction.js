// import { serverFetch } from "../core/server"

import { serverFetch } from "../core/serverFetch";

export const getTransactions = async () => {
    return serverFetch('/api/transaction');
}