import RecipeCard from '@/components/recipes/RecipeCard';

import { getAllRecipes } from '@/lib/api/recipe';
import { Pagination } from '@heroui/react';
import Link from 'next/link';
import React from 'react';
import CategoryFilter from './CategoryFilter';

const RecipePage = async ({ searchParams }) => {
    const params = await searchParams;
    const pageParam = params.page || '1';
    const categoryParam = params.category || '';

    // Pass both page and category to your API layer
    const recipesData = await getAllRecipes(pageParam, categoryParam);

    const recipes = recipesData.data;
    const page = recipesData.page;
    const totalPages = recipesData.totalPage;
    
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    // Helper function to maintain search parameters across pagination links
    const createPageUrl = (pageNumber) => {
        const query = new URLSearchParams();
        
        if (categoryParam) query.set('category', categoryParam);
        query.set('page', pageNumber.toString());
        return `/recipes?${query.toString()}`;
    };

    return (
        <div className="container mx-auto px-4 py-12 md:py-16 text-foreground">
            {/* Header Section */}
            <div className="max-w-2xl mb-8 border-l-4 border-emerald-500 pl-4 md:pl-6">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                    The Culinary Gallery
                </h1>
                <p className="text-base md:text-lg text-default-500 leading-relaxed">
                    Explore a collection of handpicked recipes curated by food enthusiasts.
                    From traditional masterpieces to fast kitchen magic, discover your next culinary inspiration.
                </p>
            </div>

            {/* Stylized Filters */}
            <CategoryFilter />

            {/* Empty State Fallback */}
            {recipes?.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-divider rounded-2xl bg-content1/50">
                    <p className="text-default-500 text-lg">No recipes found in this category.</p>
                </div>
            ) : (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                        {recipes.map((recipe) => (
                            <RecipeCard key={recipe._id} recipe={recipe} />
                        ))}
                    </div>
                    <div>
                        <Pagination size="sm" className='mt-8 flex justify-end'>
                            <Pagination.Content>
                                <Pagination.Item>
                                    <Pagination.Previous isDisabled={page === 1}>
                                        <Link className='flex' href={createPageUrl(page - 1)}>
                                            <Pagination.PreviousIcon />
                                            Prev
                                        </Link>
                                    </Pagination.Previous>
                                </Pagination.Item>
                                {pages.map((p) => (
                                    <Pagination.Item key={p}>
                                        <Link href={createPageUrl(p)}>
                                            <Pagination.Link 
                                                className={`${p === page ? "bg-emerald-500 text-white" : ""}`} 
                                                isActive={p === page}
                                            >
                                                {p}
                                            </Pagination.Link>
                                        </Link>
                                    </Pagination.Item>
                                ))}
                                <Pagination.Item>
                                    <Pagination.Next isDisabled={page === totalPages}>
                                        <Link className='flex' href={createPageUrl(page + 1)}>
                                            Next
                                            <Pagination.NextIcon />
                                        </Link>
                                    </Pagination.Next>
                                </Pagination.Item>
                            </Pagination.Content>
                        </Pagination>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipePage;