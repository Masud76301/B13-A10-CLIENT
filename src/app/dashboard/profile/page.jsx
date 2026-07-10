'use client';

import UpdateModal from '@/components/dashboard/UpdateModal';
import { authClient } from '@/lib/auth-client';
import { Avatar, AvatarFallback, AvatarImage, Card, CardBody, Spinner } from '@heroui/react';
import React from 'react';

const ProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    // Graceful loading state to prevent layout flashes
    if (isPending) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                <Spinner color="primary" label="Loading profile..." size="lg" />
            </div>
        );
    }

    // Fallback if no user session is found
    if (!user) {
        return (
            <div className="flex h-[70vh] items-center justify-center text-center">
                <p className="text-gray-500 dark:text-zinc-400">Please sign in to view your profile details.</p>
            </div>
        );
    }

    // Get the first letter of the user's name for the avatar fallback securely
    const avatarFallbackText = user?.name ? user.name.charAt(0).toUpperCase() : "U";

    return (
        <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-8">
            <Card className="w-full max-w-md overflow-hidden border border-gray-100 bg-white shadow-md dark:border-zinc-800 dark:bg-zinc-900">

                {/* Decorative Top Banner Styling */}
                <div className="h-28 w-full bg-gradient-to-r from-orange-400 to-amber-500 dark:from-orange-600 dark:to-amber-700" />

                <div className="relative flex flex-col items-center px-6 pb-8 pt-0">

                    {/* Positioned Avatar Component */}
                    <div className="-mt-14 mb-4">
                        <Avatar className="h-28 w-28 text-2xl border-4 border-white bg-amber-100 font-bold text-amber-700 shadow-sm dark:border-zinc-900 dark:bg-zinc-800 dark:text-zinc-200">
                            <AvatarImage src={user?.image} referrerPolicy='no-referrer' />
                            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>

                    {/* User Identity Details */}
                    <div className="text-center w-full space-y-1 mb-6">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-zinc-100">
                            {user?.name}
                        </h1>
                        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 break-all">
                            {user?.email}
                        </p>
                    </div>

                    {/* Interactive Operational Boundary */}
                    <div className="w-full border-t border-gray-100 pt-5 dark:border-zinc-800/60 flex justify-center">
                        <UpdateModal />
                    </div>

                </div>
            </Card>
        </div>
    );
};

export default ProfilePage;