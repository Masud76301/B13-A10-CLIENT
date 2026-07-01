"use client";

import React, { useState, useTransition } from "react";
import { Button, toast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { FiHeart, FiBookmark, FiAlertTriangle, FiShoppingBag, FiCreditCard } from "react-icons/fi";
import { favoritesRecipe } from "@/lib/action/recipe";
import { likeRecipe, unlikeRecipe } from "@/lib/action/likes";
import { CgHello } from "react-icons/cg";

export default function RecipeActions({ recipeId, price = "$0.99" }) {
    const { data: session } = useSession();
    const router = useRouter();
    
    // useTransition prevents conflicting router state updates
    const [isPending, startTransition] = useTransition();

    const [isLiked, setIsLiked] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAuthenticatedAction = (actionCallback) => {
        if (!session?.user) {
            startTransition(() => {
                router.push("/auth/signin");
            });
            return;
        }
        actionCallback();
    };

    const handleSaveToFavorites = async () => {
        setIsSubmitting(true);
        try {
            const payload = {
                recipeId: recipeId,
                userEmail: session?.user?.email, 
                userId: session?.user?.id,
                actionType: "favorite",     
            };

            const res = await favoritesRecipe(payload);

            if (res?.insertedId) {
                toast.success("Saved to Favorites Successfully");
                setIsFavorited(true);
                
                // Safely navigate inside a transition block to avoid InvalidStateError
                startTransition(() => {
                    router.push("/dashboard/user/favourite");
                });
            } else {
                toast("Failed to save. Please try again.");
            }
        } catch (error) {
            console.error("Error saving favorite:", error);
            toast("An error occurred while saving to favorites.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLikes = async () => {
        try {
            const userId = session?.user?.id;
            let res;

            if (isLiked) {
                // res = await unlikeRecipe(recipeId, userId);
                res = await likeRecipe(recipeId, userId);
            } else {
                res = await likeRecipe(recipeId, userId);
            }

           
            if (res?.acknowledged || res?.modifiedCount > 0) {
                setIsLiked(!isLiked);
                toast.success(isLiked ? "Like removed!" : "Recipe liked!");
                
                // Safely update server components without clashing with state changes
                startTransition(() => {
                    router.refresh();
                });
            } else {
                toast(res?.message || "Please try again.");
            }
        } catch (error) {
            console.error("Error handling like state:", error);
            toast("An error occurred modifying your like state.");
        }
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
                    isLoading={isPending}
                    className="w-full font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-500/10 transition-all flex items-center justify-center gap-2"
                    startContent={!isPending && <FiShoppingBag className="size-5 shrink-0" />}
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
                <Button
                    variant="light"
                    radius="xl"
                    size="md"
                    className={`w-full justify-start font-medium px-4 transition-all ${
                        isLiked 
                            ? 'text-danger bg-danger/5 hover:bg-danger/10 font-semibold' 
                            : 'text-default-700 hover:bg-default-100'
                    }`}
                    onPress={() => handleAuthenticatedAction(handleLikes)}
                >
                    <FiHeart className={`size-4 shrink-0 ${isLiked ? 'fill-danger text-danger' : ''}`} />
                    {isLiked ? "Added to Liked Recipes" : "Like this Recipe"}
                </Button>

                <Button
                    variant="light"
                    radius="xl"
                    size="md"
                    isLoading={isSubmitting}
                    className={`w-full justify-start font-medium px-4 transition-all ${
                        isFavorited 
                            ? 'text-warning bg-warning/5 hover:bg-warning/10 font-semibold' 
                            : 'text-default-700 hover:bg-default-100'
                    }`}
                    onPress={() => handleAuthenticatedAction(handleSaveToFavorites)}
                >
                    <FiBookmark className={`size-4 shrink-0 ${isFavorited ? 'fill-warning text-warning' : ''}`} />
                    {isFavorited ? "Saved to Bookmarks" : "Save to Favorites"}
                </Button>

                <div className="border-t border-divider my-1" />

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