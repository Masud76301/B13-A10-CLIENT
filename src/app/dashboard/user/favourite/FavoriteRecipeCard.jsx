"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, Button, Chip } from "@heroui/react";
import { FiClock, FiHeart, FiUser, FiExternalLink, FiTrash2 } from "react-icons/fi";
import { MdOutlineFastfood } from "react-icons/md";

export default function FavoriteRecipeCard({ favorite, onRemove }) {
  // Gracefully handle if the incoming data contains a nested recipe object
  const recipe = favorite?.recipe || favorite || {};

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
  } = recipe;

  // Extract text ID safely
  const recipeId = _id?.$oid || _id;

  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemoveClick = async (e) => {
    e.preventDefault();
    if (!onRemove) return;
    
    setIsRemoving(true);
    try {
      // Calls your parent delete handler (e.g., deleting from database)
      await onRemove(favorite._id || recipeId);
    } catch (error) {
      console.error("Failed to remove favorite recipe:", error);
    } finally {
      setIsRemoving(false);
    }
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
    <Card className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-divider bg-content1 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-zinc-900/40">
      <div>
        {/* IMAGE HERO ELEMENT CONTAINER */}
        <div className="relative aspect-video w-full overflow-hidden bg-default-100">
          <Image
            src={imageUrl || "/placeholder-dish.png"}
            alt={recipeName || "Recipe Image"}
            fill
            unoptimized
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
                <FiHeart className="size-3.5 text-red-500 fill-red-500" />
                <span>{likeCount} likes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ACTION SECTION - SIDE BY SIDE BUTTONS */}
      <div className="flex gap-2 p-4 pt-0">
        <Link href={`/recipes/${recipeId}`} className="flex-1">
          <Button
            className="w-full font-semibold bg-default-100 text-white hover:bg-emerald-600 hover:text-white transition-all rounded-xl h-10 shadow-xs"
            endContent={<FiExternalLink className="size-3.5" />}
          >
            View Details
          </Button>
        </Link>
        
        <Button
          isIconOnly
          color="danger"
          variant="flat"
          aria-label="Remove from favorites"
          className="rounded-xl h-10 w-12 min-w-12 text-danger hover:bg-danger hover:text-white transition-all"
          isLoading={isRemoving}
          onClick={handleRemoveClick}
        >
          {!isRemoving && <FiTrash2 className="size-4" />}
        </Button>
      </div>
    </Card>
  );
}