import { getFavoriteRecipe } from '@/lib/api/favourite';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const FavoriteRecipePage = async() => {
    const user = await getUserSession();
    console.log("user id is :" ,user?.id);
    const favorites = await getFavoriteRecipe(user?.id);
    console.log("my",favorites);
    return (
        <div>
            <h1> This Favorite Recipe Page and total favorite recipe are : {favorites.length}</h1>
            {
                favorites.map(favorite=><h1 key={favorite._id}>{favorite.
recipeName}</h1>)
            }
        </div>
    );
};

export default FavoriteRecipePage;<h1> This Favorite Recipe Page</h1>