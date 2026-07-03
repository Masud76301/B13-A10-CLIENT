import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'


// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers() 
    })

    if(!session){

        return NextResponse.redirect(new URL('/auth/signin', request.url))
    }

}

export const config = {
    matcher: ['/dashboard/user','/dashboard/user/add-recipe','/dashboard/user/my-recipe','/dashboard/user/purchased-recipe','/dashboard/user/favourite'],
}