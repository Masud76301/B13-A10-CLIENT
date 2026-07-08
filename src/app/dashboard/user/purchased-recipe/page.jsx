import React from 'react';
import { getPurchasedRecipes } from '@/lib/api/purchased';
import { getUserSession } from '@/lib/core/session';
import PurchasedRecipeTable from './PurchasedRecipeTable ';


const PurchasedRecipePage = async () => {
    const user = await getUserSession();
    
    // Fallback cleanly to empty array if response data is missing or shaped as a raw object
    const rawData = await getPurchasedRecipes(user?.id);
    const recipes = Array.isArray(rawData) ? rawData : [];
  
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
            {/* Header section  */}
            <div className="flex items-center justify-between border-b border-divider pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">My Digital Cookbook</h1>
                    <p className="text-sm text-default-500 mt-1">Access all your premium unlocked cooking items</p>
                </div>
                <div className="bg-default-100 border border-divider px-4 py-2 rounded-xl text-center">
                    <span className="text-xs text-default-500 block uppercase tracking-wider font-semibold">Total Purchased</span>
                    <span className="text-xl font-bold text-foreground">{recipes.length}</span>
                </div>
            </div>

            {/* Render streamlined purchased component data */}
            <div className="bg-content1 rounded-2xl border border-divider overflow-hidden shadow-sm">
                <PurchasedRecipeTable recipes={recipes} />
            </div>
        </div>
    );
};

export default PurchasedRecipePage;