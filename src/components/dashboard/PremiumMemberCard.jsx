"use client"
import { Button, Card } from '@heroui/react';
import { useState } from 'react';

import { FiCheck, FiStar } from 'react-icons/fi';
import { LuCrown } from 'react-icons/lu';

const PremiumMemberCard = ({ isPremium }) => {
    const [loading, setLoading] = useState(false);

    const premiumFeatures = [
        "Unlimited recipe publishing",
        "Premium profile badge",
        "Priority search ranking",
        "Exclusive curated content",
        "Cancel any time"
    ];

    return (
        <div>
            {/* Conditional Premium Section */}
            <div className="mt-8">
                {!isPremium ? (
                    /* GET PREMIUM ACCESS CARD */
                    <Card className="p-6 bg-content1 border border-divider shadow-sm max-w-3xl  relative overflow-hidden">
                        {/* Decorative background glow */}
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                        <LuCrown className="text-amber-500" /> Upgrade to RecipeRoom Premium
                                    </h2>
                                    <p className="text-sm text-default-500">
                                        Unlock the ultimate culinary creator experience.
                                    </p>
                                </div>

                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6.5">
                                    {premiumFeatures.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm text-default-600 dark:text-default-400">
                                            <span className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-500 flex-shrink-0">
                                                <FiCheck size={14} />
                                            </span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col items-center justify-center bg-default-50 p-4 rounded-2xl border border-divider min-w-45">
                                <span className="text-2xl font-bold text-foreground">$4.99<span className="text-xs text-default-400 font-normal">/mo</span></span>
                                <form action={'/api/checkout_sessions'} method="POST">
                                    <input type="hidden" name="mode" value="subscription" />
                                    <input type="hidden" name="priceId" value="price_1Tp8OvHBbD1KRUOkwcg3sjqv" />
                                    <Button
                                        type="submit"
                                        className="mt-3 w-full bg-linear-to-r from-amber-500 to-orange-500 text-white font-medium shadow-md shadow-amber-500/20"
                                        radius="lg"
                                        isLoading={loading}
                                        onClick={() => setLoading(true)}
                                    >
                                        Get Premium Access
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </Card>
                ) : (
                    /* PREMIUM MEMBER STATUS CARD */
                    <Card className="p-6 bg-content1 border border-amber-500/20 shadow-md max-w-2xl relative overflow-hidden group">
                        {/* Elegant background linear layer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent pointer-events-none" />

                        <div className="flex items-center gap-4 relative z-10">
                            <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-inner">
                                <FiStar size={24} className="animate-spin-slow text-amber-500" />
                            </div>
                            <div className="space-y-0.5">
                                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                                    RecipeRoom Premium Member
                                </h2>
                                <p className="text-sm text-default-500">
                                    Thank you for supporting our community! Your account features are fully upgraded.
                                </p>
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default PremiumMemberCard;