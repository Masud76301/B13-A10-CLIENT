import { getRecipeById } from '@/lib/api/recipe';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiClock, FiUser, FiHeart, FiGlobe, FiLayers, FiArrowLeft } from 'react-icons/fi';
import RecipeActions from '@/components/recipes/RecipeActions'; // Adjust path based on your folders
import { isLikedRecipe } from '@/lib/api/likes';
import { getUserSession } from '@/lib/core/session';
import { isPurchasedRecipe } from '@/lib/api/purchased';

const RecipeDetailsPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUserSession();
    const recipe = await getRecipeById(id);
    const recipeId = recipe?._id;
    const userId =user?.id;
    const liked = await isLikedRecipe(recipeId, userId);
    const purchased = await isPurchasedRecipe(recipeId,userId);

    

    if (!recipe) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center bg-background text-foreground">
                <h2 className="text-xl font-semibold">Recipe not found</h2>
                <Link href="/recipes" className="mt-4 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline">
                    <FiArrowLeft /> Back to Gallery
                </Link>
            </div>
        );
    }

    // Dynamic color styling for the difficulty badge level
    const getDifficultyColor = (level) => {
        switch (level?.toLowerCase()) {
            case 'easy':
                return 'bg-success/10 text-success border-success/20';
            case 'medium':
                return 'bg-warning/10 text-warning border-warning/20';
            case 'hard':
                return 'bg-danger/10 text-danger border-danger/20';
            default:
                return 'bg-default-100 text-default-600 border-default-200';
        }
    };

    // Split ingredients by comma into an array for beautiful bullet layout representation
    const ingredientsList = recipe.ingredients
        ? recipe.ingredients.split(',').map((item) => item.trim())
        : [];

    return (
        <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                
                {/* Back Button */}
                <Link 
                    href="/recipes" 
                    className="inline-flex items-center gap-2 mb-6 text-sm text-default-500 hover:text-foreground transition-colors"
                >
                    <FiArrowLeft className="size-4" /> Back to Recipes
                </Link>

                {/* Grid Split Layout using items-start to allow the sticky column track to exist */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start relative">
                    
                    {/* Left Column: Main Recipe Content Card */}
                    <div className="lg:col-span-2 bg-content1 border border-divider rounded-3xl overflow-hidden shadow-sm">
                        
                        {/* Hero Image Section */}
                        <div className="relative w-full h-[300px] sm:h-[450px] bg-default-100">
                            <Image
                                src={recipe.imageUrl || '/placeholder-recipe.png'}
                                alt={recipe.recipeName}
                                fill
                                priority
                                unoptimized // Required to fetch instant custom external ImgBB endpoints seamlessly
                                className="object-cover"
                            />
                            
                            {/* Floating Like Badge */}
                            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-background/80 backdrop-blur-md border border-divider px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
                                <FiHeart className="text-danger fill-danger size-4" />
                                <span>{recipe.likeCount || 0}</span>
                            </div>
                        </div>

                        {/* Meta & Details Section */}
                        <div className="p-6 sm:p-8">
                            
                            {/* Title Only Matrix */}
                            <div className="mb-6 border-b border-divider pb-6">
                                <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
                                    {recipe.recipeName}
                                </h1>
                            </div>

                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 mb-8 bg-default-50 border border-divider rounded-2xl text-sm">
                                <div className="flex items-center gap-2.5">
                                    <FiClock className="text-emerald-500 size-5 shrink-0" />
                                    <div>
                                        <p className="text-default-400 text-xs">Prep Time</p>
                                        <p className="font-semibold">{recipe.prepTime || 'N/A'} mins</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2.5">
                                    <FiGlobe className="text-blue-500 size-5 shrink-0" />
                                    <div>
                                        <p className="text-default-400 text-xs">Cuisine</p>
                                        <p className="font-semibold capitalize">{recipe.cuisineType || 'General'}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2.5">
                                    <FiLayers className="text-purple-500 size-5 shrink-0" />
                                    <div>
                                        <p className="text-default-400 text-xs">Category</p>
                                        <p className="font-semibold capitalize">{recipe.category || 'Street Food'}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-start sm:justify-end">
                                    <div className={`flex items-center justify-center border text-xs px-2.5 py-1 rounded-full font-medium ${getDifficultyColor(recipe.difficultyLevel)}`}>
                                        {recipe.difficultyLevel || 'Easy'}
                                    </div>
                                </div>
                            </div>

                            {/* Layout Split: Ingredients & Instructions */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                
                                {/* Left: Ingredients */}
                                <div className="md:col-span-1">
                                    <h2 className="text-lg font-bold border-b border-divider pb-2 mb-4">
                                        Ingredients
                                    </h2>
                                    {ingredientsList.length > 0 ? (
                                        <ul className="space-y-2.5 text-sm text-default-600 dark:text-default-400">
                                            {ingredientsList.map((ingredient, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <span className="mt-1.5 size-1.5 rounded-full bg-emerald-500 shrink-0" />
                                                    <span>{ingredient}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-default-400 italic">No ingredients specified.</p>
                                    )}
                                </div>

                                {/* Right: Instructions */}
                                <div className="md:col-span-2">
                                    <h2 className="text-lg font-bold border-b border-divider pb-2 mb-4">
                                        Instructions
                                    </h2>
                                    <p className="text-sm leading-relaxed text-default-600 dark:text-default-400 whitespace-pre-line">
                                        {recipe.instructions || "No custom steps provided yet."}
                                    </p>
                                </div>

                            </div>

                            {/* Footer Author Meta */}
                            <div className="mt-8 pt-6 border-t border-divider flex items-center justify-between text-xs text-default-400">
                                <div className="flex items-center gap-2">
                                    <FiUser className="size-4 text-default-500" />
                                    <span>Published by <span className="font-medium text-default-600 dark:text-default-300">{recipe.authorName || 'Anonymous'}</span></span>
                                </div>
                                {recipe.createAt?.$date && (
                                    <span>{new Date(recipe.createAt.$date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                )}
                            </div>

                        </div>
                    </div>

                    {/* Right Column: Sidebar Track Container */}
                    <div className="lg:col-span-1 h-full w-full">
                        {/* Sticky Inner Wrapper:
                          Centers the component elements perfectly inside the viewport (`top-[50%] -translate-y-1/2`)
                          and follows the screen as the user scrolls.
                        */}
                        <div className="lg:sticky lg:top-[50%] lg:-translate-y-1/2 w-full flex flex-col gap-6">
                            <RecipeActions 
                                recipeId={recipeId} 
                                price="$0.99"
                                initialLiked={liked.liked}
                                isPurchasedRecipe={purchased.purchase}
                            />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default RecipeDetailsPage;