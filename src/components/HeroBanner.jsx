"use client";

import Image from "next/image";
import { Button } from "@heroui/react";
import { FiPlay, FiSearch } from "react-icons/fi";

export default function HeroBanner() {
  return (
    <section className="w-full min-h-[600px] bg-background text-foreground grid grid-cols-1 lg:grid-cols-2 border-b border-divider transition-colors duration-200">
      
      {/* LEFT SIDE: Typography & Actions */}
      <div className="flex flex-col justify-center px-6 py-12 md:px-16 lg:px-24 max-w-2xl">
        {/* Trending Tag */}
        <div className="inline-flex items-center gap-2 bg-default-100 border border-default-200 text-default-700 px-3 py-1.5 rounded-full text-xs font-medium w-fit mb-6">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
          10,000+ recipes shared this month
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-foreground">
          Cook, share & <br />
          discover <span className="text-success font-extrabold dark:text-emerald-400">amazing recipes</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-default-600 dark:text-default-400 leading-relaxed mb-8">
          A home for food lovers to publish their best dishes, explore global cuisine, 
          and connect with a community that lives to cook.
        </p>

        {/* CTA Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          <Button 
            size="lg" 
            className="bg-foreground text-background font-medium px-8 h-12 shadow-sm transition-transform active:scale-95"
            startContent={<FiPlay className="text-lg" />}
          >
            Start cooking
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-default-300 text-foreground font-medium px-8 h-12 hover:bg-emerald-400"
            startContent={<FiSearch className="text-lg" />}
          >
            Explore recipes
          </Button>
        </div>

        {/* Platform Metrics Row */}
        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-divider">
          <div>
            <p className="text-2xl md:text-3xl font-bold text-foreground">48K+</p>
            <p className="text-xs uppercase tracking-wider text-default-400 font-semibold mt-1">Recipes</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-foreground">12K</p>
            <p className="text-xs uppercase tracking-wider text-default-400 font-semibold mt-1">Chefs</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-foreground">190+</p>
            <p className="text-xs uppercase tracking-wider text-default-400 font-semibold mt-1">Cuisines</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Interactive Image & UI Overlay Showcase */}
      <div className="relative bg-[#E5E2DB] dark:bg-zinc-800 flex items-center justify-center p-8 lg:p-16 overflow-hidden min-h-[450px] lg:min-h-full transition-colors duration-200">
        
        {/* Floating Capsule 1: Top Right Trending */}
        <div className="absolute top-6 right-6 bg-background/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-default-200/50 flex items-center gap-3 z-10 transition-transform hover:scale-105 duration-300">
          <div className="w-8 h-8 rounded-lg bg-success-50 dark:bg-success-900/30 flex items-center justify-center text-success">
            📈
          </div>
          <div>
            <p className="text-[10px] text-default-400 font-medium">Trending today</p>
            <p className="text-xs font-bold text-foreground">Pasta & risotto</p>
          </div>
        </div>

        {/* Floating Capsule 2: Top Left Live Counter */}
        <div className="absolute top-16 left-6 bg-background/90 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border border-default-200/50 flex items-center gap-3 z-10 transition-transform hover:scale-105 duration-300">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warning opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-warning"></span>
          </span>
          <div>
            <p className="text-[10px] text-default-400 font-medium">Cooking right now</p>
            <p className="text-xs font-bold text-foreground">1,284 cooks</p>
          </div>
        </div>

        {/* Main Banner Image Container */}
        <div className="relative w-full max-w-[460px] aspect-square rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-success-900/10">
          <Image
            src="/banner.jpeg" 
            alt="RecipeRoom Featured Dish"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Floating Card 3: Bottom Recipe Preview Card */}
        <div className="absolute bottom-6 left-6 right-6 max-w-[420px] mx-auto bg-background/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-default-200 z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="bg-success-50 dark:bg-success-900/30 text-success dark:text-success-400 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
              Italian
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-foreground">
              <span className="text-amber-400">★</span> 4.9 <span className="text-default-400 font-normal">(312 reviews)</span>
            </div>
          </div>
          
          <h3 className="text-base font-bold text-foreground mb-1">
            Creamy mushroom & parmesan risotto
          </h3>
          <p className="text-xs text-default-400 mb-4">
            by Maria Russo • Published 2 days ago
          </p>

          <div className="flex items-center justify-between border-t border-default-100 pt-3 text-xs text-default-600 dark:text-default-400">
            <div className="flex gap-4">
              <span>⏱️ 35 min</span>
              <span>🔥 420 kcal</span>
              <span>👥 4 servings</span>
            </div>
            <span className="text-[11px] bg-default-100 text-default-600 dark:text-default-400 px-2 py-0.5 rounded font-medium">
              +248 saved
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}