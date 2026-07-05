
import PremiumMemberCard from '@/components/dashboard/PremiumMemberCard';
import UserStats from '@/components/dashboard/UserStats';
import { getUserRecipes } from '@/lib/api/recipe';
import { getUserSession } from '@/lib/core/session';
import {  Chip } from '@heroui/react';
import { LuCrown } from 'react-icons/lu';

const UserHomePage = async () => {

    const user = await getUserSession();
    const isPremium = user?.plan === "premium";
    const recipes = await getUserRecipes(user?.id);

    return (
        <div className="flex-1 p-6 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                    Welcome Back! {user?.name}
                    {isPremium && (
                        <Chip
                            variant="flat"
                            color="warning"
                            size="sm"
                            className="border border-amber-500/30"
                        >
                            <LuCrown className="text-amber-500 animate-pulse" />
                            PRO
                        </Chip>
                    )}
                </h1>
            </div>

            {/* Dashboard Stats */}
            <UserStats recipes={recipes} />
            <PremiumMemberCard isPremium={isPremium}/>

            
        </div>
    );
};

export default UserHomePage;