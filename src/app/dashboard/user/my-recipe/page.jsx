
import { getUserRecipes } from '@/lib/api/recipe';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import RecipeTable from './RecipeTable';

const MyRecipePage = async () => {
    const user = await getUserSession();
    const userId = user?.id;
    const recipes = await getUserRecipes(userId);
    return (
        <div className='max-w-6xl mx-auto my-10'>
            <div className='space-y-2 mb-10'>
                <h1 className="text-3xl font-bold"> My Recipe</h1>
                <p>{recipes.length} recipe published</p>
            </div>
            <RecipeTable recipes={recipes} userId={userId}></RecipeTable>
        </div>
    );
};

export default MyRecipePage;