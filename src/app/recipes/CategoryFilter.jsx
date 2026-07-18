'use client';

import { Button } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';

// Sample categories - replace or extend these with your actual database categories
const CATEGORIES = [
    { label: 'All Recipes', value: '' },
    { label: 'Breakfast', value: 'Breakfast' },
    { label: 'Lunch', value: 'Lunch' },
    { label: 'Dinner', value: 'Dinner' },
    { label: 'Desserts', value: 'Desserts' },
    { label: 'Snacks', value: 'Snacks' },
];

export default function CategoryFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get('category') || '';

    const handleCategoryClick = (value) => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (value) {
            params.set('category', value);
        } else {
            params.delete('category');
        }
        // Reset to page 1 whenever a filter changes
        params.set('page', '1'); 

        router.push(`/recipes?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-divider/50">
            {CATEGORIES.map((category) => {
                const isActive = currentCategory === category.value;
                return (
                    <Button 
                        key={category.value}
                        variant='outline'
                        onClick={() => handleCategoryClick(category.value)}
                        className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-100 shadow-sm border
                            ${isActive 
                                ? 'bg-emerald-500 text-white border-emerald-500 scale-105' 
                                : 'bg-content1 text-default-600 border-divider hover:bg-content2 hover:text-default-800'
                            }`}
                    >
                        {category.label}
                    </Button>
                );
            })}
        </div>
    );
}