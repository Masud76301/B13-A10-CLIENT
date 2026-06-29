"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, Button, Chip } from "@heroui/react";
import { FiClock, FiHeart, FiUser, FiExternalLink } from "react-icons/fi";
import { MdOutlineFastfood } from "react-icons/md";

export default function RecipeCard({ recipe }) {
  // Gracefully destructure metrics from passed MongoDB structure
  const {
    _id,
    recipeName,
    imageUrl,
    category,
    difficultyLevel,
    cuisineType,
    prepTime,
    authorName,
    likeCount = 0,
  } = recipe || {};

  // Extract text ID safely regardless of direct string or nested Mongo $oid formats
  const recipeId = _id?.$oid || _id;

  // Local interactive visual state for clicking favorite/like
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likeCount);

  const handleLikeToggle = (e) => {
    e.preventDefault(); // Prevent bubbling if wrapping with an outer link
    if (isLiked) {
      setCurrentLikes((prev) => prev - 1);
    } else {
      setCurrentLikes((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  // Determine difficulty level badge color schemes
  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case "easy":
        return "success";
      case "medium":
        return "warning";
      case "hard":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <Card
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-divider bg-content1 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-zinc-900/40"
    >
      <div>
        {/* IMAGE HERO ELEMENT CONTAINER */}
        <div className="relative aspect-video w-full overflow-hidden bg-default-100">
          <Image
            src={imageUrl || "/placeholder-dish.png"}
            alt={recipeName || "Recipe Image"}
            fill
            unoptimized // Highly recommended for ImgBB external image strings
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-80" />

          {/* ABSOLUTE CHIP PILLS */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {category && (
              <Chip size="sm" variant="flat" className="bg-black/40 backdrop-blur-md text-white font-medium">
                {category}
              </Chip>
            )}
            {difficultyLevel && (
              <Chip size="sm" color={getDifficultyColor(difficultyLevel)} variant="solid" className="font-semibold shadow-xs">
                {difficultyLevel}
              </Chip>
            )}
          </div>

          {/* FLOATING ACTION INTERACTIVE LIKE SELECTION */}
          <button
            type="button"
            onClick={handleLikeToggle}
            className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-transform active:scale-90 hover:bg-black/60"
          >
            <FiHeart className={`size-4 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`} />
          </button>

          {/* LOWER PROFILE OVERLAY TEXT FOR CUISINE */}
          {cuisineType && (
            <div className="absolute bottom-2.5 left-3 flex items-center gap-1 text-xs font-medium text-zinc-200">
              <MdOutlineFastfood className="text-emerald-400" />
              <span>{cuisineType} Cuisine</span>
            </div>
          )}
        </div>

        {/* COMPONENT BODY */}
        <div className="p-4">
          <h3 className="line-clamp-1 text-lg font-bold text-foreground transition-colors group-hover:text-emerald-500">
            {recipeName}
          </h3>

          {/* META METRICS DIVIDER LINES */}
          <div className="mt-3 flex items-center justify-between border-b border-divider pb-3 text-xs text-default-500">
            <div className="flex items-center gap-1.5">
              <FiUser className="size-3.5 text-emerald-500" />
              <span className="max-w-[120px] truncate font-medium">{authorName || "Chef Guest"}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <FiClock className="size-3.5 text-amber-500" />
                <span>{prepTime || "--"} mins</span>
              </div>
              <div className="flex items-center gap-1">
                <FiHeart className="size-3.5 text-red-500 fill-red-500/20" />
                <span>{currentLikes} likes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VIEW DETAILS ACTION SECTION */}
      <div className="p-4 pt-0">
        <Link href={`/recipes/${recipeId}`}>
          <Button
            className="w-full font-semibold bg-default-100 text-white hover:bg-emerald-600 hover:text-white transition-all rounded-xl h-10 shadow-xs"
            endContent={<FiExternalLink className="size-3.5 group-hover:translate-x-0.5 transition-transform" />}
          >
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
}