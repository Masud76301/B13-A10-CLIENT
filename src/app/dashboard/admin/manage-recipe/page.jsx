import { getAllRecipes } from '@/lib/api/recipe';
import React from 'react';
import AllRecipesTable from './AllRecipesTable';
import { getUserSession } from '@/lib/core/session';

const ManageRecipePage = async () => {
  const recipes = await getAllRecipes();
  const user = await getUserSession();

  return (
    <div className="min-h-screen bg-default-50/50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-divider pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Recipe Management
            </h1>
            <p className="text-sm text-default-500 mt-1">
              View, edit, or remove your catalog is culinary entries from one central dashboard.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="mt-3 sm:mt-0 flex items-center gap-2 bg-content1 border border-divider px-4 py-2 rounded-xl shadow-sm w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success-500"></span>
            </span>
            <span className="text-xs font-medium text-default-600">
              Total Recipes: <strong className="text-foreground font-semibold">{recipes.length}</strong>
            </span>
          </div>
        </div>

        {/* Data Table Container */}
        <div>
          <AllRecipesTable recipes={recipes} userId={user?.id} />
        </div>

      </div>
    </div>
  );
};

export default ManageRecipePage;