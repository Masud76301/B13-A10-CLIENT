import { getUserById } from '@/lib/api/users';
import React from 'react';
import Image from 'next/image';

const UsersDetailsPage = async ({ params }) => {
    const { id } = await params;
    const userInfo = await getUserById(id);

    // Fallback if user data is missing
    if (!userInfo) {
        return (
            <div className="flex h-[50vh] items-center justify-center text-lg font-medium text-gray-500">
                User not found
            </div>
        );
    }

    // Safely format the ISO date string into a beautiful format (e.g., "Jun 24, 2026")
    const joinDate = userInfo.createdAt
        ? new Date(userInfo.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
          })
        : "N/A";

    return (
        <div className="mx-auto max-w-4xl p-6">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Profile Details</h1>
                <p className="text-sm text-gray-500">Manage and view overview details for this member.</p>
            </div>

            {/* Profile Overview Card */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                
                {/* Left Side: Avatar & Core Badges */}
                <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-zinc-900 md:col-span-1">
                    <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-gray-50 bg-gray-100 shadow-inner dark:border-zinc-800">
                        <Image
                            src={userInfo.image || "https://cdn3d.iconscout.com/3d/premium/thumb/admin-3d-icon-png-download-8772657.png"}
                            alt={userInfo.name || "User Avatar"}
                            fill
                            className="object-cover"
                        />
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-800 dark:text-zinc-100 text-center">
                        {userInfo.name}
                    </h2>
                    <p className="mb-4 text-xs text-gray-400 break-all text-center">{userInfo.email}</p>

                    {/* System Roles / Plan Badges */}
                    <div className="flex w-full flex-col gap-2 pt-2 border-t border-gray-100 dark:border-zinc-800">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Role</span>
                            <span className={`capitalize px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                userInfo.role === 'admin' 
                                    ? 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400' 
                                    : 'bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400'
                            }`}>
                                {userInfo.role}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Plan</span>
                            <span className={`capitalize px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                userInfo.plan === 'premium' 
                                    ? 'bg-amber-50 text-amber-600 border border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50' 
                                    : 'bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-zinc-400'
                            }`}>
                                {userInfo.plan}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Detailed Metadata & Static Metrics */}
                <div className="flex flex-col gap-6 md:col-span-2">
                    
                    {/* Information Grid */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-zinc-900">
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Account Information</h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <span className="text-xs text-gray-400">User ID</span>
                                <p className="font-mono text-sm text-gray-700 dark:text-zinc-300 select-all">{userInfo._id}</p>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400">Email Verification</span>
                                <p className="text-sm font-medium">
                                    {userInfo.emailVerified ? (
                                        <span className="text-green-600 dark:text-green-400">● Verified</span>
                                    ) : (
                                        <span className="text-gray-400">○ Unverified</span>
                                    )}
                                </p>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400">Joined Date</span>
                                <p className="text-sm font-medium text-gray-700 dark:text-zinc-300">{joinDate}</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Counter Section */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-zinc-900">
                            <span className="text-xs font-medium text-gray-400">Total Recipes Added</span>
                            {/* Static placeholder value as requested */}
                            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">14</p>
                        </div>
                        
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-zinc-900">
                            <span className="text-xs font-medium text-gray-400">Recipes Purchased</span>
                            {/* Static placeholder value as requested */}
                            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">5</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UsersDetailsPage;