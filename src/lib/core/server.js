'use server'
// import { authClient } from "../auth-client";
import { getTokenServer } from "./token";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL


// export const serverFetch = async (path)=>{
//     const {data:token} = await authClient.token();
    
//     const res = await fetch (`${baseUrl}${path}`,{
//         headers: {
//             'Content-Type': 'application/json',
//             authorization: `Bearer ${token?.token}`

//         },
//     });
    
//     return res.json();
// }





export const serverMutation = async ( path, data, method ="POST") => {
    // const {data:token} = await authClient.token();
    const token = await getTokenServer();
    const res = await fetch(`${baseUrl}${path}`,{
        method:method,
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`

        },
        body: JSON.stringify(data),
    });

    return res.json();

}