import React from 'react';
import { FiUserPlus, FiPlusCircle, FiAward } from 'react-icons/fi';

export default function GettingStarted() {
  const steps = [
    {
      id: 1,
      title: "Create Your Account",
      description: "Sign up in seconds to join our vibrant community of food lovers and expert chefs.",
      icon: <FiUserPlus className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      badgeColor: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    },
    {
      id: 2,
      title: "Add Your First Recipe",
      description: "Share your secret culinary creations, add ingredients, and upload stunning food imagery.",
      icon: <FiPlusCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      badgeColor: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    },
    {
      id: 3,
      title: "Get Likes & Rewards",
      description: "Climb the popular recipe leaderboard, earn likes from foodies, and track your achievements.",
      icon: <FiAward className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      badgeColor: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-100 dark:bg-zinc-950/50 dark:border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Layout */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-emerald-600 font-semibold text-sm tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full dark:bg-emerald-950/50 dark:text-emerald-400">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight dark:text-zinc-50">
            Getting Started is Simple
          </h2>
          <p className="text-slate-500 mt-2 text-base md:text-lg dark:text-zinc-400">
            Follow these easy steps to launch your culinary journey on RecipeRoom and share your flavor with the world.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm relative group hover:shadow-md transition-all duration-300 hover:-translate-y-1 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:shadow-zinc-950/30"
            >
              {/* Connector lines between cards on desktop */}
              {index < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] bg-slate-200 z-10 pointer-events-none dark:bg-zinc-800" />
              )}
              
              {/* Icon & Large Number Indicator */}
              <div className="flex items-center justify-between mb-5">
                <div className={`p-3 rounded-xl ${step.badgeColor} transition-transform duration-300 group-hover:scale-110`}>
                  {step.icon}
                </div>
                <span className="text-4xl font-black text-slate-100 selection:bg-transparent select-none dark:text-zinc-800/60">
                  0{step.id}
                </span>
              </div>

              {/* Title & Description Description Blocks */}
              <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 dark:text-zinc-200 dark:group-hover:text-emerald-400 transition-colors duration-200">
                {step.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed dark:text-zinc-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}