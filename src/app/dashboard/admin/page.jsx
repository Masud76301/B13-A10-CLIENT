import AdminStats from '@/components/dashboard/AdminStats';
import { getUserSession } from '@/lib/core/session';
import { Chip } from '@heroui/react';
import React from 'react';
import { LuCrown } from 'react-icons/lu';

const AdminDashboardPage =async () => {
    const user = await getUserSession();
    return (
        <div className="flex-1 p-6 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                    Welcome Back! {user?.name}
                </h1>
            </div>

            {/* Dashboard Stats */}
            <AdminStats />
           


        </div>
    );
};

export default AdminDashboardPage;