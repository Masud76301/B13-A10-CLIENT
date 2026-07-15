import { Clock, Star } from '@gravity-ui/icons';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const FeaturedRecipe = ({featuredRecipes}) => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Header Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-2xl flex items-center gap-2">
                    <Star className="p-2 bg-amber-500/10 text-amber-500 rounded-xl sm:w-10 sm:h-10" />
                    Featured Recipes
                </h2>
                <p className="mt-2 text-sm text-default-500 pl-1">
                    Handpicked culinary creations chosen just for you.
                </p>
            </div>

            {featuredRecipes.length === 0 ? (
                <p className="text-default-500">No featured recipes at the moment.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {featuredRecipes.map((recipe) => {
                        const recipeId = recipe._id?.$oid || recipe._id;
                        return (
                            <Link href={`/recipes/${recipeId}`} key={recipeId} className="group block border border-divider rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 transition hover:shadow-md">
                                <div className="relative h-48 w-full bg-default-100">
                                    <Image
                                        src={recipe.imageUrl || "https://i.ibb.co/dw9bhtqt/sandwich.jpg"}
                                        alt={recipe.recipeName}
                                        fill
                                        className="object-cover group-hover:scale-105 transition duration-300"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between">
                                        <span className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-2 py-1  rounded-full font-medium">
                                            {recipe.category || "General"}
                                        </span>
                                        <span className="text-xs text-green-600 bg-green-50 dark:bg-amber-950/30 px-2 py-1  rounded-full font-medium">
                                            {recipe.category || "General"}
                                        </span>
                                        <span className="text-xs text-blue-600 bg-blue-100 flex gap-2 dark:bg-amber-950/30 px-2 py-1  rounded-full font-medium">
                                            <Clock size='sm' />  {recipe.prepTime || "20"}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-lg mt-2 text-foreground">{recipe.recipeName}</h3>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default FeaturedRecipe;