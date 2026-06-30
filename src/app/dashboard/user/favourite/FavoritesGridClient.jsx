"use client";

import React, { useState } from 'react';
import FavoriteRecipeCard from './FavoriteRecipeCard';

import { useRouter } from 'next/navigation'; // 1. Import useRouter
import { removeFavoriteRecipe } from '@/lib/action/favorite';

export default function FavoritesGridClient({ initialFavorites, currentUserId }) {
  const [favorites, setFavorites] = useState(initialFavorites);
  const router = useRouter(); // 2. Initialize router

  const handleRemoveFavorite = async (cardData) => {
    try {
      const remRecipeData = {
        userId: currentUserId,
        recipeId: cardData.recipeId
      };

      const response = await removeFavoriteRecipe(remRecipeData);

      if (response?.deletedCount > 0 || response?.acknowledged) {
        // 3. Remove from local screen list state
        setFavorites((prevList) =>
          prevList.filter((fav) => {
            const favRecipeId = fav.recipe?._id?.$oid || fav.recipe?._id || fav._id?.$oid || fav._id;
            return favRecipeId !== cardData.recipeId;
          })
        );

        // 4. 👇 Tell Next.js to update server data counters instantly without a full page reload!
        router.refresh();
      }
    } catch (error) {
      console.error("Error removing item:", error);
      throw error; 
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {favorites.map((favorite) => {
        const safeKey = favorite._id?.$oid || favorite._id;
        return (
          <FavoriteRecipeCard
            key={safeKey}
            favorite={favorite}
            onRemove={handleRemoveFavorite}
          />
        );
      })}
    </div>
  );
}