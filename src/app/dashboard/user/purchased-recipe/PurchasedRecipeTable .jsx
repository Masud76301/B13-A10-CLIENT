"use client";

import { Table, Button } from "@heroui/react";
import { FiEye } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

export default function PurchasedRecipeTable({ recipes }) {
  return (
    <Table aria-label="Purchased Recipes History Table">
      <Table.ScrollContainer>
        <Table.Content className="min-w-[800px]">
          <Table.Header>
            <Table.Column isRowHeader>Recipe</Table.Column>
            <Table.Column>Author Name</Table.Column>
            <Table.Column>Amount Paid</Table.Column>
            <Table.Column>Action</Table.Column>
          </Table.Header>

          <Table.Body emptyContent={"You haven't purchased any premium recipes yet."}>
            {recipes.map((recipe) => {
              // Standardizes key formats for MongoDB entries safely
              const recipeId = recipe._id?.$oid || recipe._id;

              return (
                <Table.Row key={recipeId}>
                  {/* RECIPE COLUMN (IMAGE + NAME) */}
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

                  {/* AUTHOR NAME COLUMN */}
                  <Table.Cell>
                    <span className="text-sm font-medium text-foreground">
                      {recipe.authorName || "Unknown Chef"}
                    </span>
                  </Table.Cell>

                  {/* AMOUNT PAID COLUMN (STATIC VALUE $0.99) */}
                  <Table.Cell>
                    <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/30">
                      $0.99
                    </span>
                  </Table.Cell>

                  {/* ACTION COLUMN (VIEW BUTTON ONLY) */}
                  <Table.Cell>
                    <div className="flex items-center  pr-2">
                      <Link href={`/recipes/${recipeId}`}>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          aria-label="View Recipe Details"
                          className="text-default-500 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all"
                        >
                          <FiEye className="size-4" />
                        </Button>
                      </Link>
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