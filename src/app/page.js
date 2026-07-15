import FeaturedRecipe from "@/components/FeaturedRecipe";
import HeroBanner from "@/components/HeroBanner";
import HowToStart from "@/components/HowToStart";
import PopularRecipe from "@/components/PopularRecipe";
import PremiumMembership from "@/components/PremiumMembership";
import { getFeaturedRecipes } from "@/lib/action/featured";
import { getPopularRecipes } from "@/lib/api/popular";
import { getUserSession } from "@/lib/core/session";
import { Clock } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
// import { getFeaturedRecipes } from "@/lib/action/recipe"; // Ensure you create a function to fetch where isFeatured == true

export default async function Home() {
  // Fetch featured recipes from server
  // const featuredRecipes = await getFeaturedRecipes();
  const featuredRecipes = await getFeaturedRecipes(); 
  const popularRecipes = await getPopularRecipes();
  const user = await getUserSession();
  const isPremium = user?.plan === "premium";
  console.log("User Plan is ", user);
  return (
    <div>
      {/* Hero Banner Section */}
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <HeroBanner />
      </div>

      {/* Featured Recipes Section */}
      <FeaturedRecipe featuredRecipes={featuredRecipes} />

      {/* Popular Recipe Section */}
      <PopularRecipe popularRecipes={popularRecipes} />

      {/* How to Start */}
      <HowToStart/>

      {/* PremiumMembership */}
      <PremiumMembership isPremium={isPremium}/>

    </div>
  );
}