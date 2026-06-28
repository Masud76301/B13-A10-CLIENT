"use client";

import { Table, Button } from "@heroui/react";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Heart, TrashBin } from "@gravity-ui/icons";
import Image from "next/image";

export default function RecipeTable({ recipes}) {
  return (
    <Table aria-label="Recipe Management Table">
      <Table.ScrollContainer>
        <Table.Content className="min-w-[800px]">
          <Table.Header>
            <Table.Column isRowHeader>Recipe</Table.Column>
            <Table.Column>Category</Table.Column>
            <Table.Column>Difficulty</Table.Column>
            <Table.Column>Like</Table.Column>
            <Table.Column align="end">Actions</Table.Column>
          </Table.Header>

          <Table.Body emptyContent={"No recipes found."}>
            {recipes.map((recipe) => {
              // Standardizes key formats for MongoDB entries
              const recipeId = recipe._id?.$oid || recipe._id;

              return (
                <Table.Row key={recipeId}>
                  {/* RECIPE COLUMN WITH NEXT.JS IMAGE */}
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded-xl bg-default-100 border border-divider">
                        <Image
                          src={recipe.imageUrl || "https://i.ibb.co/dw9bhtqt/sandwich.jpg"}
                          alt={recipe.recipeName || "Recipe Image"}
                          fill
                          className="object-cover"
                          sizes="48px"
                          unoptimized // Use this if handling direct ImgBB remote links without configuring next.config domains
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
                    <span className="text-sm text-foreground">
                      {recipe.category || "Unassigned"}
                    </span>
                  </Table.Cell>

                  {/* DIFFICULTY LEVEL DISPLAY */}
                  <Table.Cell>
                    <span className="text-sm text-foreground font-medium">
                      {recipe.difficultyLevel || "Medium"}
                    </span>
                  </Table.Cell>

                  {/* LIKE STATUS COLUMN (USING GRAVITY ICON) */}
                  <Table.Cell>
                    <div className="flex items-center gap-1.5 text-default-400 hover:text-danger cursor-pointer transition-colors w-fit">
                      <Heart className="size-4" />
                      <span className="text-xs font-medium">Like</span>
                    </div>
                  </Table.Cell>

                  {/* ACTION TRIGGER BUTTONS */}
                  <Table.Cell>
                    <div className="flex items-center justify-start gap-1">
                      {/* VIEW BUTTON */}
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        aria-label="View Recipe"
                        className="text-default-500 hover:text-yellow-500"
                      >
                        <FiEye/>
                      </Button>

                      {/* EDIT BUTTON */}
                       <Button isIconOnly size="sm" variant="light"  className="text-default-500 hover:text-blue-600">
                         <FiEdit2 />
                      </Button>

                      {/* DELETE BUTTON */}
                       <Button isIconOnly size="sm" variant="light" className="text-default-500 hover:text-red-600">
                         <TrashBin />
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
  );
}