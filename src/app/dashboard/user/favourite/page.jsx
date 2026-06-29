import { getFavoriteRecipe } from '@/lib/api/favourite';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import FavoriteRecipeCard from './FavoriteRecipeCard';

const FavoriteRecipePage = async () => {
    const user = await getUserSession();
    console.log("user id is :", user?.id);
    const favorites = await getFavoriteRecipe(user?.id);
    console.log("my", favorites);
    return (
        <div className='max-w-6xl mx-auto my-10'>
            <h1> This Favorite Recipe Page and total favorite recipe are : {favorites.length}</h1>
            <div className='grid grid-cols-3 gap-4 mt-2'>
                {
                    favorites.map(favorite => <FavoriteRecipeCard key={favorite._id} favorite={favorite} ></FavoriteRecipeCard>)
                }
            </div>

        </div>
    );
};

export default FavoriteRecipePage; <h1> This Favorite Recipe Page</h1>