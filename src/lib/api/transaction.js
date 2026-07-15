import { serverFetch } from "../core/server"

export const getTransactions = async () => {
    return serverFetch('/api/transaction');
}