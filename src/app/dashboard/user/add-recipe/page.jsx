import React from 'react';
import AddRecipe from './AddRecipe';
import Link from 'next/link';
import { getUserSession } from '@/lib/core/session';
import { getUserRecipes } from '@/lib/api/recipe';
import {  FiLock, FiArrowRight } from 'react-icons/fi';
import { BiCrown } from 'react-icons/bi';

const AddRecipePage = async () => {
    const user = await getUserSession();
    const recipes = await getUserRecipes(user?.id);
    
    
    const plan = {
        free: { maxiRecipePublishedPerMonth: 2 },
        premium: { maxiRecipePublishedPerMonth: "unlimited" }
    };

  
    const userPlan = user?.plan || 'free';
    const limit = plan[userPlan];

   

    // Dynamic checks matching your core business logic
    const currentCount = recipes?.length || 0;
    const maxLimit = limit.maxiRecipePublishedPerMonth;
    const hasAccess = maxLimit === "unlimited" || currentCount < maxLimit;

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
            {hasAccess ? (
                <div>
                    <AddRecipe user={user} recipes={recipes} />
                </div>
            ) : (
                /* Premium Limit Reached Visual State Card */
                <div className="max-w-md mx-auto mt-12 bg-content1 border border-default-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6 text-center">
                        {/* Elegant Ring Header Icons */}
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-danger/10 text-danger mb-4 relative">
                            <FiLock className="text-xl" />
                            <span className="absolute -top-1 -right-1 bg-warning text-warning-foreground rounded-full p-1 shadow-sm">
                                <BiCrown className="text-xs" />
                            </span>
                        </div>

                        <h2 className="text-xl font-bold text-foreground tracking-tight">
                            Recipe Limit Reached
                        </h2>
                        
                        <p className="mt-3 text-sm text-default-500 leading-relaxed">
                            You have currently published <span className="font-semibold text-foreground">{currentCount}</span> out of your <span className="font-semibold text-foreground">{maxLimit}</span> free recipes allowed for this month. 
                        </p>

                        {/* Progress visualizer block */}
                        <div className="mt-5 bg-default-100 rounded-xl p-4 border border-default-200/60">
                            <div className="flex justify-between text-xs font-medium mb-1.5 text-default-600">
                                <span>Monthly Slots Used</span>
                                <span>{currentCount} / {maxLimit} Slots</span>
                            </div>
                            <div className="w-full bg-default-200 h-2 rounded-full overflow-hidden">
                                <div className="bg-danger h-full rounded-full w-full transition-all duration-500" />
                            </div>
                        </div>

                        <p className="mt-5 text-xs text-default-400">
                            Upgrade to a premium account today to unlock infinite cooking limits, unlimited image hosting, and exclusive kitchen tools.
                        </p>
                    </div>

                    {/* Premium Upgrade Stripe CTA Footer Button */}
                    <div className="px-6 py-4 bg-default-50 border-t border-default-100 flex flex-col gap-2">
                        <Link 
                            href="/dashboard/user"
                            className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm py-2.5 px-4 rounded-xl shadow-sm transition-colors"
                        >
                            <BiCrown className="text-base" />
                            Unlock Unlimited Recipes
                            <FiArrowRight className="text-sm ml-0.5" />
                        </Link>
                        
                        <Link 
                            href="/dashboard/user"
                            className="w-full inline-flex items-center justify-center text-xs font-medium text-default-500 hover:text-default-800 transition-colors py-1.5"
                        >
                            Return to Dashboard
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddRecipePage;