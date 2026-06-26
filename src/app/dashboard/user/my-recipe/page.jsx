
import { getUserRecipes } from '@/lib/api/recipe';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const MyRecipePage = async () => {
    const user= await getUserSession();
    const userId = user?.id;
    const recipes = await getUserRecipes(userId);
    return (
        <div>
            <h1>Total Recipe is : {recipes.length}</h1>
        </div>
    );
};

export default MyRecipePage;