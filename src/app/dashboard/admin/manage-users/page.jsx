import { getAllUsers } from '@/lib/api/users';
import React from 'react';
import UsersTable from './UsersTable';


const ManageUserPage = async () => {
    const allUsers = await getAllUsers();
    
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-foreground">Manage Users</h1>
                <span className="text-sm font-medium bg-default-100 text-default-700 px-3 py-1.5 rounded-full border border-divider">
                    Total Users: {allUsers.length}
                </span>
            </div>
            
            {/* Render the client table component */}
            <UsersTable users={allUsers} />
        </div>
    );
};

export default ManageUserPage;