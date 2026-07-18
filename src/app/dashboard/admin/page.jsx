import AdminStats from '@/components/dashboard/AdminStats';

import { getAllRecipes } from '@/lib/api/recipe';
import { getRecipeReports } from '@/lib/api/reports';
import { getAllUsers } from '@/lib/api/users';
import { getUserSession } from '@/lib/core/session';
import { Chip } from '@heroui/react';
import React from 'react';
import { LuCrown } from 'react-icons/lu';

const AdminDashboardPage =async () => {
    const user = await getUserSession();
    const allUser = await getAllUsers();
    const allRecipes = await getAllRecipes(); 
    const reports = await getRecipeReports();
    const premiumMembers = allUser.filter(user=>user.plan ==="premium").length;
    return (
        <div className="flex-1 p-6 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                    Welcome Back! {user?.name}
                </h1>
            </div>

            {/* Dashboard Stats */}
            <AdminStats user={allUser} recipes={allRecipes} premiumMembers={premiumMembers} reports={reports} />
           


        </div>
    );
};

export default AdminDashboardPage;