"use client";

import { toast } from "@heroui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";

export default function AddRecipe() {
  const router = useRouter();
  
  // State management for the recipe form inputs
  const [formData, setFormData] = useState({
    recipeName: "",
    imageUrl: "",
    category: "Breakfast",
    difficultyLevel: "Easy",
    cuisineType: "Italian",
    prepTime: "",
    ingredients: "",
    instructions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      status: "active",
      isPubliclyVisible: true,
    };
 
    console.log(payload);
    // Add your submit logic / API routes here
  };

  return (
    <div className="min-h-screen text-default-600 flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-3xl bg-content1 border border-divider rounded-xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="p-6 border-b border-divider flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-foreground">Add a new recipe</h1>
            <p className="text-sm text-default-500 mt-1">Fill out the details below to publish your recipe.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">

          {/* SECTION 1: Recipe Info */}
          <section className="space-y-4">
            <h2 className="text-md font-semibold text-emerald-500 dark:text-emerald-400 tracking-wide uppercase text-xs">1. Recipe Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-default-500 mb-1">Recipe Name</label>
                <input
                  type="text"
                  name="recipeName"
                  required
                  placeholder="e.g. Chocolate Lava Cake"
                  value={formData.recipeName}
                  onChange={handleChange}
                  className="w-full bg-default-100 border border-divider rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-default-400 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-default-500 mb-1">Recipe Image URL (ImgBB)</label>
                <input
                  type="url"
                  name="imageUrl"
                  required
                  placeholder="https://i.ibb.co/.../dish.jpg"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full bg-default-100 border border-divider rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-default-400 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-default-500 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-default-100 border border-divider rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-emerald-500 transition"
                >
                  <option value="Breakfast" className="bg-content1 text-foreground">Breakfast</option>
                  <option value="Lunch" className="bg-content1 text-foreground">Lunch</option>
                  <option value="Dinner" className="bg-content1 text-foreground">Dinner</option>
                  <option value="Dessert" className="bg-content1 text-foreground">Dessert</option>
                  <option value="Snacks" className="bg-content1 text-foreground">Snacks</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-default-500 mb-1">Difficulty Level</label>
                <select
                  name="difficultyLevel"
                  value={formData.difficultyLevel}
                  onChange={handleChange}
                  className="w-full bg-default-100 border border-divider rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-emerald-500 transition"
                >
                  <option value="Easy" className="bg-content1 text-foreground">Easy</option>
                  <option value="Medium" className="bg-content1 text-foreground">Medium</option>
                  <option value="Hard" className="bg-content1 text-foreground">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-default-500 mb-1">Cuisine Type</label>
                <input
                  type="text"
                  name="cuisineType"
                  required
                  placeholder="e.g. Italian, Mexican, Bengali"
                  value={formData.cuisineType}
                  onChange={handleChange}
                  className="w-full bg-default-100 border border-divider rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-default-400 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-default-500 mb-1">Preparation Time (in minutes)</label>
              <input
                type="number"
                name="prepTime"
                required
                placeholder="e.g. 30"
                value={formData.prepTime}
                onChange={handleChange}
                className="w-full md:w-1/3 bg-default-100 border border-divider rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-default-400 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </section>

          <hr className="border-divider" />

          {/* SECTION 2: Recipe Details */}
          <section className="space-y-4">
            <h2 className="text-md font-semibold text-emerald-500 dark:text-emerald-400 tracking-wide uppercase text-xs">2. Recipe Details & Steps</h2>

            <div>
              <label className="block text-xs font-medium text-default-500 mb-1">Ingredients</label>
              <textarea
                name="ingredients"
                rows={4}
                required
                placeholder="List your ingredients here (e.g. 2 cups flour, 1 tsp vanilla...)"
                value={formData.ingredients}
                onChange={handleChange}
                className="w-full bg-default-100 border border-divider rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-default-400 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-default-500 mb-1">Instructions</label>
              <textarea
                name="instructions"
                rows={5}
                required
                placeholder="Step-by-step cooking rules..."
                value={formData.instructions}
                onChange={handleChange}
                className="w-full bg-default-100 border border-divider rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-default-400 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </section>

          <hr className="border-divider" />

          {/* SECTION 3: Auto-filled Community Badge */}
          <div className="bg-default-50 border border-divider rounded-lg p-4 flex justify-between items-center text-xs">
            <div>
              <span className="text-default-500 font-medium block">Posting Space:</span>
              <span className="text-foreground text-sm font-semibold">RecipeRoom Community</span>
            </div>
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded font-medium">
              Verified & Approved Creator
            </span>
          </div>

          {/* Footer Action Buttons */}
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-default-500 hover:bg-default-200 border border-transparent rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-background bg-foreground hover:opacity-90 rounded-lg transition shadow-md"
            >
              Publish Recipe
            </button>
          </div>

        </form> 
        
      </div>
    </div>
  );
}