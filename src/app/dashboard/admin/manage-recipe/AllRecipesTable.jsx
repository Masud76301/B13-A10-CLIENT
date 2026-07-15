"use client";

import { Table, Button } from "@heroui/react";
import { FiEye } from "react-icons/fi";
import { Heart, TrashBin, Star } from "@gravity-ui/icons"; // Added Star icon
import Image from "next/image";
import Link from "next/link";
import { deleteRecipe, toggleFeaturedRecipe } from "@/lib/action/recipe"; // Imported toggle action
import { useRouter } from "next/navigation";
import EditRecipeModal from "../../user/my-recipe/EditRecipeModal";
import { featuredRecipes } from "@/lib/action/featured";


export default function AllRecipesTable({ recipes, userId }) {
  const router = useRouter();
 

  const handleDeleteRecipe = async (recipeId, currentUserId) => {
    const res = await deleteRecipe(recipeId, currentUserId);
    if (res?.deletedCount > 0 || res?.acknowledged) {
      router.refresh();
    }
  };

  // Handler for toggling featured state
  const handleToggleFeature = async (recipeId) => {
    const res = await featuredRecipes(recipeId)
    console.log(res);
    // const res = await toggleFeaturedRecipe(recipeId, currentStatus);
    if (res?.insertedId || res?.deletedCount) {
      router.refresh(); // Sync state with server component
    }
  };

  return (
    <div className="w-full my-4">
      <Table aria-label="Manage All Recipes Table">
        <Table.ScrollContainer>
          <Table.Content className="min-w-[800px]">
            <Table.Header>
              <Table.Column isRowHeader>Recipe</Table.Column>
              <Table.Column>Category</Table.Column>
              <Table.Column>Difficulty</Table.Column>
              <Table.Column>Likes</Table.Column>
              <Table.Column align="end">Actions</Table.Column>
            </Table.Header>

            <Table.Body emptyContent={"No recipes found."}>
              {recipes.map((recipe) => {
                const recipeId = recipe._id?.$oid || recipe._id;
                const isFeatured = recipe.isFeatured || false;

                return (
                  <Table.Row key={recipeId}>
                    {/* RECIPE CARD AND CUISINE INFO */}
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded-xl bg-default-100 border border-divider">
                          <Image
                            src={recipe.imageUrl || "https://i.ibb.co/dw9bhtqt/sandwich.jpg"}
                            alt={recipe.recipeName || "Recipe Image"}
                            fill
                            className="object-cover"
                            sizes="48px"
                            unoptimized
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm leading-tight">
                            {recipe.recipeName}
                          </p>
                          <p className="text-xs text-default-500 mt-0.5">
                            {recipe.cuisineType || "General"}
                          </p>
                        </div>
                      </div>
                    </Table.Cell>

                    {/* CATEGORY DISPLAY */}
                    <Table.Cell>
                      <span className="text-sm text-default-600">
                        {recipe.category || "Unassigned"}
                      </span>
                    </Table.Cell>

                    {/* DIFFICULTY SELECTION LEVEL */}
                    <Table.Cell>
                      <span className="text-sm text-default-700 font-medium capitalize">
                        {recipe.difficultyLevel || "Medium"}
                      </span>
                    </Table.Cell>

                    {/* LIKES COUNTER */}
                    <Table.Cell>
                      <div className="flex items-center gap-1.5 text-default-400">
                        <Heart className="size-4" />
                        <span className="text-xs font-medium">{recipe.likeCount ?? 0}</span>
                      </div>
                    </Table.Cell>

                    {/* INTERACTION ACTIONS AREA */}
                    <Table.Cell>
                      <div className="flex items-center justify-start gap-1">
                        {/* FEATURE RECIPE ACTION */}
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          aria-label="Feature Recipe"
                          className={isFeatured ? "text-amber-500" : "text-default-500 hover:text-amber-500"}
                          onClick={() => handleToggleFeature(recipeId)}
                        >
                          <Star className="size-4" fill={isFeatured ? "currentColor" : "none"} />
                        </Button>

                        {/* VIEW ACTION */}
                        <Link href={`/recipes/${recipeId}`}>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            aria-label="View Recipe"
                            className="text-default-500 hover:text-blue-500"
                          >
                            <FiEye className="size-4" />
                          </Button>
                        </Link>

                        {/* EDIT COMPONENT INJECTION */}
                        <EditRecipeModal recipe={recipe} />

                        {/* DELETE ACTION */}
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          aria-label="Delete Recipe"
                          className="text-default-500 hover:text-red-600"
                          onClick={() => handleDeleteRecipe(recipeId, userId)}
                        >
                          <TrashBin className="size-4" />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}