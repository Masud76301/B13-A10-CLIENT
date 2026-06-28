"use client"
import PremiumMemberCard from '@/components/dashboard/PremiumMemberCard';
import UserStats from '@/components/dashboard/UserStats';
import { useSession } from '@/lib/auth-client';
import { Button, Card, Chip } from '@heroui/react';
import React, { useState } from 'react';
import { FiCheck, FiStar } from 'react-icons/fi';
import { LuCrown } from 'react-icons/lu';

const UserHomePage = () => {
    const { data: session, isPending } = useSession();
    const isPremium = session?.user?.plan === "premium";


    if (isPending) {
        return (
            <div className="flex h-64 items-center justify-center text-muted">
                Loading dashboard overview...
            </div>
        );
    }


    return (
        <div className="flex-1 p-6 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                    Welcome Back! {session?.user?.name}
                    {isPremium && (
                        <Chip
                            variant="flat"
                            color="warning"
                            size="sm"
                            startContent={<LuCrown className="text-amber-500 animate-pulse" />}
                            className="border border-amber-500/30"
                        >
                            PRO
                        </Chip>
                    )}
                </h1>
            </div>

            {/* Dashboard Stats */}
            <UserStats />
            <PremiumMemberCard isPremium={isPremium}/>

            
        </div>
    );
};

export default UserHomePage;