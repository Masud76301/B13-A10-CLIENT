"use client";

import React, { useState } from "react";
import { FiCheck, FiStar, FiZap } from "react-icons/fi";
import { Button } from "@heroui/react";
import { CrownDiamond } from "@gravity-ui/icons";

export default function PremiumMembership({ isPremium }) {
  const [isAnnual, setIsAnnual] = useState(false);
  const [loading, setLoading] = useState(false);


  // Define dynamic plans with their associated pricing IDs
  const allPlans = [
    {
      name: "Free Member",
      priceMonthly: 0,
      priceAnnual: 0,
      priceIdMonthly: "",
      priceIdAnnual: "",
      description: "Perfect for getting started and exploring community recipes.",
      icon: <FiZap className="w-5 h-5 text-slate-500 dark:text-zinc-400" />,
      features: [
        "Browse thousands of public recipes",
        "Unlimited Favorite Recipe Save",
        "Basic standard recipe search",
        "Community rating & reviews",
      ],
      // If user is already premium, Free is no longer their "Current Plan"
      buttonText: isPremium ? "Basic Plan" : "Current Plan",
      variant: "bordered",
      isPopular: false,
      isFree: true,
    },
    {
      name: "Premium Chef",
      priceMonthly: 4.99,
      priceAnnual: 3.99,
      // Replace with your actual live Stripe price IDs from your environment config
      priceIdMonthly: "price_1Tp8OvHBbD1KRUOkwcg3sjqv", 
      priceIdAnnual: "price_1Tp8OvHBbD1KRUOkwcg3sjqy", // Replace with your actual annual price ID if available
      description: "Unlock full culinary tools, ad-free viewing, and expert tools.",
      icon: <CrownDiamond className="w-5 h-5 text-amber-500" />,
      features: [
        "Publish unlimited recipes — no cap",
        "Premium badge on your profile and recipes",
        "Priority visibility in browse and search",
        "Access to exclusive chef-curated content",
      ],
      buttonText: isPremium ? "Premium Active" : "Upgrade to Premium",
      variant: isPremium ? "bordered" : "solid",
      color: isPremium ? "default" : "primary",
      isPopular: true,
      isFree: false,
    },
  ];

  // Filter out the Free card completely if the user is already a premium subscriber
  const plans = isPremium ? allPlans.filter(plan => !plan.isFree) : allPlans;

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto bg-slate-50/50 dark:bg-zinc-950/40 border border-slate-100 dark:border-zinc-900 rounded-3xl my-12 transition-colors duration-300">
      {/* Header Block */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-semibold rounded-full mb-3 uppercase tracking-wider">
          <FiStar className="fill-current w-3.5 h-3.5" /> Pricing Options
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
          {isPremium ? "Your Premium Membership" : "Choose Your Culinary Journey"}
        </h2>
        <p className="mt-3 text-sm md:text-base text-slate-500 dark:text-zinc-400">
          {isPremium 
            ? "Thank you for being a Premium Chef! Explore your unlocked capabilities, tools, and premium content below." 
            : "Unlock maximum capabilities to share, review, and organize recipes efficiently with our flexible subscription structures."
          }
        </p>

        {/* Toggle Switch - Only show if not Premium, or keep for billing frequency display */}
        {!isPremium && (
          <div className="inline-flex items-center gap-3 mt-8 bg-white dark:bg-zinc-900 p-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                !isAnnual
                  ? "bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-sm"
                  : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                isAnnual
                  ? "bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-sm"
                  : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
              }`}
            >
              Yearly
              <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-md font-bold">
                Save 20%
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Plans Container Grid */}
      <div 
        className={`grid gap-8 items-stretch mx-auto ${
          isPremium 
            ? "grid-cols-1 max-w-md" // Center and restrict size when only Premium card is active
            : "grid-cols-1 md:grid-cols-2 max-w-4xl"
        }`}
      >
        {plans.map((plan, idx) => {
          const activePrice = isAnnual ? plan.priceAnnual : plan.priceMonthly;
          const activePriceId = isAnnual ? plan.priceIdAnnual : plan.priceIdMonthly;

          return (
            <div
              key={idx}
              className={`relative flex flex-col justify-between p-8 bg-white dark:bg-zinc-900 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                isPremium
                  ? "border-amber-500 dark:border-amber-500/80 shadow-2xl shadow-amber-500/[0.05] ring-2 ring-amber-500/10"
                  : plan.isPopular
                  ? "border-amber-500/60 dark:border-amber-500/40 shadow-xl shadow-amber-500/[0.02]"
                  : "border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-md"
              }`}
            >
              {/* Premium Active Status Badge / Most Popular Badge */}
              {isPremium ? (
                <div className="absolute -top-3 right-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <FiCheck className="w-3 h-3 stroke-[3]" /> Active Plan
                </div>
              ) : (
                plan.isPopular && (
                  <div className="absolute -top-3 right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    Most Popular
                  </div>
                )
              )}

              {/* Top Details */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
                    {plan.name}
                  </h3>
                  <div className="p-2 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-100 dark:border-amber-900/30">
                    {plan.icon}
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-zinc-400 min-h-[32px] mb-6">
                  {plan.description}
                </p>

                {/* Price Label (Hidden for Premium active, or simplified) */}
                {!isPremium && (
                  <div className="flex items-baseline gap-1 mb-6 border-b border-slate-100 dark:border-zinc-800/60 pb-6">
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
                      ${activePrice}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-zinc-500">
                      / month
                    </span>
                    {isAnnual && plan.priceAnnual > 0 && (
                      <span className="text-[10px] ml-2 text-slate-400 dark:text-zinc-500 line-through">
                        ${plan.priceMonthly}
                      </span>
                    )}
                  </div>
                )}

                {/* Features List Layout */}
                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start gap-3 text-xs md:text-sm text-slate-600 dark:text-zinc-300"
                    >
                      <span className="mt-0.5 p-0.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-md shrink-0">
                        <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Functional Integration Block */}
              {!plan.isFree ? (
                /* Premium Subscription Action Form Trigger */
                <form action="/api/checkout_sessions" method="POST" className="w-full">
                  <input type="hidden" name="mode" value="subscription" />
                  <input type="hidden" name="priceId" value={activePriceId} />
                  
                  <Button
                    type={isPremium ? "button" : "submit"}
                    variant={plan.variant}
                    color={plan.color || "default"}
                    size="lg"
                    fullWidth
                    disabled={isPremium}
                    isLoading={loading && !isPremium}
                    onClick={() => {
                      if (!isPremium) setLoading(true);
                    }}
                    className={`font-semibold text-xs transition-transform transform active:scale-[0.98] w-full ${
                      isPremium
                        ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 dark:border-emerald-500/20 cursor-not-allowed bg-emerald-50/50 dark:bg-emerald-950/10"
                        : plan.isPopular
                        ? "bg-gradient-to-r from-slate-900 to-slate-800 text-white dark:from-zinc-100 dark:to-zinc-200 dark:text-zinc-950 hover:opacity-90 shadow-md"
                        : ""
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </form>
              ) : (
                /* Free Tier Non-submitting Standard Card Button */
                <Button
                  variant={plan.variant}
                  color={plan.color || "default"}
                  size="lg"
                  fullWidth
                  disabled={!isPremium}
                  className={`font-semibold text-xs transition-transform transform active:scale-[0.98] ${
                    !isPremium
                      ? "border-slate-300 text-slate-700 dark:border-zinc-700 dark:text-zinc-300 pointer-events-none opacity-80"
                      : "border-slate-200 dark:border-zinc-800 text-slate-400 dark:text-zinc-500"
                  }`}
                >
                  {plan.buttonText}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}