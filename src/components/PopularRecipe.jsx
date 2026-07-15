import React from 'react';
import { Card } from "@heroui/react";
import { FiHeart, FiUser, FiAward } from "react-icons/fi";
import Link from 'next/link';

const PopularRecipe = ({ popularRecipes }) => {
    // Limit safely to top 5 items in case the dataset contains more
    const topFiveRecipes = popularRecipes?.slice(0, 5) || [];

    // Helper function to return beautiful styling badges based on ranking positions
    const getRankStyles = (index) => {
        switch (index) {
            case 0: // 1st Place
                return {
                    bg: "bg-amber-500/10 dark:bg-amber-500/20",
                    text: "text-amber-500",
                    label: "01"
                };
            case 1: // 2nd Place
                return {
                    bg: "bg-zinc-400/10 dark:bg-zinc-400/20",
                    text: "text-zinc-500 dark:text-zinc-300",
                    label: "02"
                };
            case 2: // 3rd Place
                return {
                    bg: "bg-amber-700/10 dark:bg-amber-700/20",
                    text: "text-amber-700 dark:text-amber-600",
                    label: "03"
                };
            default: // 4th and 5th Place
                return {
                    bg: "bg-default-100",
                    text: "text-default-500",
                    label: `0${index + 1}`
                };
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            {/* Section Header heading */}
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl">
                    <FiAward className="size-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-foreground tracking-tight">
                        Popular Recipes
                    </h2>
                    <p className="text-xs text-default-400">
                        Most liked culinary masterpieces by our community
                    </p>
                </div>
            </div>

            {/* Grid layout optimized for 5 items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {topFiveRecipes.map((recipe, index) => {
                    const { _id, recipeName, authorName, likeCount = 0 } = recipe || {};
                    const recipeId = _id?.$oid || _id;
                    const rank = getRankStyles(index);

                    return (
                        <Link href={`/recipes/${recipeId}`} key={recipeId || index} className="block group">
                            <Card 
                                className="w-full h-full border border-divider bg-content1 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-zinc-900/40"
                            >
                                <div className="p-5 flex flex-col justify-between h-full gap-4">
                                    {/* Recipe Title Info */}
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            {/* Dynamic Leaderboard Rank Badge */}
                                            <span className={`text-4xl font-black px-2.5 py-1 rounded-lg ${rank.bg} ${rank.text}`}>
                                                 {rank.label}
                                            </span>
                                            
                                            <div className="flex items-center gap-1 text-xs text-default-500 font-semibold">
                                                <FiHeart className="size-3.5 text-red-500 fill-red-500" />
                                                <span>{likeCount}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-base font-bold text-foreground line-clamp-2 group-hover:text-emerald-500 transition-colors tracking-tight leading-snug">
                                            {recipeName || "Untitled Recipe"}
                                        </h3>
                                    </div>

                                    {/* Footer Details */}
                                    <div className="flex items-center gap-1.5 border-t border-divider pt-3 text-xs text-default-400">
                                        <FiUser className="size-3.5 text-default-400" />
                                        <span className="truncate font-medium">
                                            {authorName || "Chef Guest"}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    );
                })}
            </div>

            {/* Empty State Fallback if no popular data array is passed */}
            {topFiveRecipes.length === 0 && (
                <div className="text-center py-12 border border-dashed border-divider rounded-2xl text-default-400 text-sm">
                    No popular recipes available at the moment.
                </div>
            )}
        </div>
    );
};

export default PopularRecipe;