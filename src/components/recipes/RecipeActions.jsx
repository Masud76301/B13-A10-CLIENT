"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { FiHeart, FiBookmark, FiAlertTriangle, FiShoppingBag, FiCreditCard } from "react-icons/fi";

export default function RecipeActions({ recipeId, price = "$4.99" }) {
    const { data: session } = useSession();
    const router = useRouter();

    const [isLiked, setIsLiked] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);

    const handleAuthenticatedAction = (actionCallback) => {
        if (!session?.user) {
            router.push("/auth/signin");
            return;
        }
        actionCallback();
    };

    return (
        <div className="w-full flex flex-col gap-6">
            
            {/* CARD 1: Premium Payment / Access Card */}
            <div className="bg-content1 border border-divider rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-default-500 uppercase tracking-wider">Premium Access</h3>
                        <p className="text-xs text-default-400 mt-0.5">Unlock full ingredient ratios & video guide</p>
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-black text-foreground tracking-tight">{price}</span>
                    </div>
                </div>

                <Button
                    color="emerald"
                    variant="solid"
                    radius="xl"
                    size="lg"
                    className="w-full font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-500/10 transition-all flex items-center justify-center gap-2"
                    startContent={<FiShoppingBag className="size-5 shrink-0" />}
                    onPress={() => handleAuthenticatedAction(() => alert(`Checkout for ${recipeId}`))}
                >
                    Purchase Recipe
                </Button>
                
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-default-400">
                    <FiCreditCard className="size-3" />
                    <span>Secure one-time payment. Lifetime access.</span>
                </div>
            </div>

            {/* CARD 2: Social Curation & Engagement Card */}
            <div className="bg-content1 border border-divider rounded-3xl p-4 shadow-sm flex flex-col gap-2.5">
                
                {/* Like Row Button */}
                <Button
                    variant="light"
                    radius="xl"
                    size="md"
                    className={`w-full justify-start font-medium px-4 transition-all ${
                        isLiked 
                            ? 'text-danger bg-danger/5 hover:bg-danger/10 font-semibold' 
                            : 'text-default-700 hover:bg-default-100'
                    }`}
                    
                    onPress={() => handleAuthenticatedAction(() => setIsLiked(!isLiked))}
                >
                    <FiHeart className={`size-4 shrink-0 ${isLiked ? 'fill-danger text-danger' : ''}`} />
                    {isLiked ? "Added to Liked Recipes" : "Like this Recipe"}
                </Button>

                {/* Favorite Row Button */}
                <Button
                    variant="light"
                    radius="xl"
                    size="md"
                    className={`w-full justify-start font-medium px-4 transition-all ${
                        isFavorited 
                            ? 'text-warning bg-warning/5 hover:bg-warning/10 font-semibold' 
                            : 'text-default-700 hover:bg-default-100'
                    }`}
                    
                    onPress={() => handleAuthenticatedAction(() => setIsFavorited(!isFavorited))}
                >
                    <FiBookmark className={`size-4 shrink-0 ${isFavorited ? 'fill-warning text-warning' : ''}`} />
                    {isFavorited ? "Saved to Bookmarks" : "Save to Favorites"}
                </Button>

                <div className="border-t border-divider my-1" />

                {/* Report Row Button */}
                <Button
                    variant="light"
                    color="danger"
                    radius="xl"
                    size="sm"
                    className="w-full justify-start font-medium px-4 text-default-400 hover:text-danger hover:bg-danger/5 transition-colors"
                    onPress={() => handleAuthenticatedAction(() => alert("Report modal opened"))}
                >
                    <FiAlertTriangle className="size-4 shrink-0" />
                    Report Issues with Recipe
                </Button>
            </div>

        </div>
    );
}