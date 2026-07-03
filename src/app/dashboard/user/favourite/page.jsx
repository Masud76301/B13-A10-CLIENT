import { getFavoriteRecipe } from '@/lib/api/favourite';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import FavoritesGridClient from './FavoritesGridClient'; // We place the client logic here

export default async function FavoriteRecipePage() {
  const user = await getUserSession();
  const favorites = await getFavoriteRecipe(user?.id) || [];



  return (
    <div className="max-w-6xl mx-auto px-4 my-12">
      {/* Professional Heading and Subheading */}
      <div className="border-b border-divider pb-6 mb-8">
        <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
          Your Saved Favorites
        </h1>
        <p className="mt-2 text-sm text-default-500 sm:text-base">
          You have curated <span className="font-semibold text-emerald-500">{favorites.length}</span> special {favorites.length === 1 ? 'recipe' : 'recipes'} in your collection.
        </p>
      </div>

      {/* Empty State vs Card Grid */}
      {favorites.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-divider rounded-2xl bg-default-50 dark:bg-zinc-900/20">
          <p className="text-default-400 font-medium">No recipes saved to your favorites yet.</p>
        </div>
      ) : (
        /* Passing initial server data down to client component */
        <FavoritesGridClient initialFavorites={favorites} currentUserId={user?.id} />
      )}
    </div>
  );
}