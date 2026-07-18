"use server"
import { getTokenServer } from "./token";


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;



export const serverFetch = async (path)=>{
   const token = await getTokenServer();
    
    const res = await fetch (`${baseUrl}${path}`,{
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`

        },
    });
    
    return res.json();
}

