"use client";

import React, { useState, useTransition } from "react";
import { Button, toast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { FiHeart, FiBookmark, FiAlertTriangle, FiShoppingBag, FiCreditCard } from "react-icons/fi";
import { likeRecipe } from "@/lib/action/likes";
import { favoritesRecipe } from "@/lib/action/favorite";
import ReportIssueModal from "@/components/recipes/ReportIssueModal";
import { purchasedRecipe } from "@/lib/action/purchased";


export default function RecipeActions({ recipeId,isPurchasedRecipe, initialLiked, price = "$0.99" }) {
    const { data: session } = useSession();
    const router = useRouter();
    // useTransition prevents conflicting router state updates
    const [isPending, startTransition] = useTransition();

    const [isLiked, setIsLiked] = useState(initialLiked);
    const [isFavorited, setIsFavorited] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isPurchased = isPurchasedRecipe;

   

    const handleAuthenticatedAction = (actionCallback) => {
        if (!session?.user) {
            startTransition(() => {
                router.push("/auth/signin");
            });
            return;
        }
        actionCallback();
    };

    const handlePurchase = async () => {
        toast.success("Purchasing Ongoing...");
    }

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
                toast.warning(res.msg);
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
            const res = await likeRecipe(recipeId, userId);


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
                <form action={'/api/checkout_sessions'} method="POST">
                    <input type="hidden" name="mode" value="payment" />
                    <input type="hidden" name="priceId" value="price_1TprWcHBbD1KRUOk6oMYQwpR" />
                    <input type="hidden" name="recipeId" value={recipeId}/>
                    <Button
                        type="submit"
                        color="emerald"
                        variant="solid"
                        radius="xl"
                        size="lg"
                        isLoading={isPending}
                        isDisabled={isPurchased}
                        className={`w-full font-bold shadow-md shadow-emerald-500/10 transition-all flex items-center justify-center gap-2 ${isPurchased
                            ? 'text-black bg-yellow-500  font-semibold'
                            : 'text-white bg-emerald-600 '
                            }`}

                        onPress={() => handleAuthenticatedAction(handlePurchase)}
                    >
                        {isPurchased?"Purchased":"Purchase Recipe"}
                    </Button>

                </form>


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
                    className={`w-full justify-start font-medium px-4 transition-all ${isLiked
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
                    className={`w-full justify-start font-medium px-4 transition-all ${isFavorited
                        ? 'text-warning bg-warning/5 hover:bg-warning/10 font-semibold'
                        : 'text-default-700 hover:bg-default-100'
                        }`}
                    onPress={() => handleAuthenticatedAction(handleSaveToFavorites)}
                >
                    <FiBookmark className={`size-4 shrink-0 ${isFavorited ? 'fill-warning text-warning' : ''}`} />
                    {isFavorited ? "Saved to Bookmarks" : "Save to Favorites"}
                </Button>

                <div className="border-t border-divider my-1" />

                {/* Integration point for Report feature wrapper */}
                <ReportIssueModal recipeId={recipeId} userMail={session?.user?.email}>
                    <Button
                        variant="light"
                        color="danger"
                        radius="xl"
                        size="sm"
                        className="w-full justify-start font-medium px-4 text-default-400 hover:text-danger hover:bg-danger/5 transition-colors"
                        onPress={() => handleAuthenticatedAction(() => { })}
                    >
                        <FiAlertTriangle className="size-4 shrink-0" />
                        Report Issues with Recipe
                    </Button>
                </ReportIssueModal>
            </div>
        </div>
    );
}