import RecipeCard from '@/components/recipes/RecipeCard';
import { getAllRecipes } from '@/lib/api/recipe';
import React from 'react';

const RecipePage = async () => {
    const recipes = await getAllRecipes();

    return (
        <div className="container mx-auto px-4 py-12 md:py-16 text-foreground">
            {/* Header Section */}
            <div className="max-w-2xl mb-12 border-l-4 border-emerald-500 pl-4 md:pl-6">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                    The Culinary Gallery
                </h1>
                <p className="text-base md:text-lg text-default-500 leading-relaxed">
                    Explore a collection of handpicked recipes curated by food enthusiasts. 
                    From traditional masterpieces to fast kitchen magic, discover your next culinary inspiration.
                </p>
            </div>
           
            {/* Empty State Fallback */}
            {recipes?.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-divider rounded-2xl bg-content1/50">
                    <p className="text-default-500 text-lg">No recipes found in the room yet.</p>
                </div>
            ) : (
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe._id} recipe={recipe} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecipePage;