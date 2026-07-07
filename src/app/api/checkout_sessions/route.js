import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getUserSession } from "@/lib/core/session";

export async function POST(req) {
    try {
        const formData = await req.formData();

        const mode = formData.get("mode");
        const priceId = formData.get("priceId");
        const recipeId = formData.get("recipeId");

        const headersList = await headers();
        const origin = headersList.get("origin");

        const user = await getUserSession();

        const session = await stripe.checkout.sessions.create({
            customer_email: user?.email,

            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],

            metadata: {
                priceId,
                recipeId,
                userId: user?.id || "",
                userEmail: user?.email || "user@mail.com",
                mode,
            },

            mode,

            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/pricing`,
        });

        return NextResponse.redirect(session.url, 303);

    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        );
    }
}