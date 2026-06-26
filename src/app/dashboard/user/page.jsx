"use client"
import UserStats from '@/components/dashboard/UserStats';
import { useSession } from '@/lib/auth-client';
import React from 'react';

const UserHomePage = () => {
    const { data: session, isPending } = useSession();

    if (isPending) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex-1 p-6" >
            <h1 className="mb-10 text-3xl font-bold">
                Welcome Back! {session?.user?.name}
            </h1>

            <UserStats/>
        </div>
    );
};

export default UserHomePage;