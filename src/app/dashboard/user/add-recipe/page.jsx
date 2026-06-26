import React from 'react';
import AddRecipe from './AddRecipe';
import { getUserSession } from '@/lib/core/session';

const AddRecipePage = async () => {
     const user = await getUserSession();
    return (
        <div>
            <AddRecipe user={user}></AddRecipe>
        </div>
    );
};

export default AddRecipePage;