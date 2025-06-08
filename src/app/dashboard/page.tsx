"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import TileSection from "@/components/TileSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#4f6df5]"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const quickActionTiles = [
    {
      title: "Add New Recipe",
      description: "Create and store a new family recipe",
      link: "/recipes/new",
      linkText: "Create Recipe",
      icon: "📖"
    },
    {
      title: "Plan This Week",
      description: "Plan your meals for the upcoming week",
      link: "/meal-plans/new",
      linkText: "Start Planning",
      icon: "📅"
    },
    {
      title: "Shopping List",
      description: "Create or view your shopping lists",
      link: "/shopping-lists",
      linkText: "View Lists",
      icon: "🛒"
    },
    {
      title: "Pantry Stock",
      description: "Check and update your pantry inventory",
      link: "/pantry",
      linkText: "View Pantry",
      icon: "🏠"
    }
  ];

  const recipesTiles = [
    {
      title: "My Recipes",
      description: "View and manage your recipe collection",
      link: "/recipes",
      linkText: "Browse Recipes",
      icon: "🍳"
    },
    {
      title: "Recipe Categories",
      description: "Organize recipes by category",
      link: "/recipes?view=categories",
      linkText: "View Categories",
      icon: "📑"
    },
    {
      title: "Favorite Recipes",
      description: "Quick access to your favorite recipes",
      link: "/recipes?view=favorites",
      linkText: "View Favorites",
      icon: "⭐"
    },
    {
      title: "Recent Recipes",
      description: "Recently viewed and added recipes",
      link: "/recipes?view=recent",
      linkText: "View Recent",
      icon: "🕒"
    }
  ];

  const planningTiles = [
    {
      title: "Weekly Plan",
      description: "View and edit your weekly meal plan",
      link: "/meal-plans",
      linkText: "View Plan",
      icon: "📆"
    },
    {
      title: "Shopping Lists",
      description: "Manage your shopping lists",
      link: "/shopping-lists",
      linkText: "View Lists",
      icon: "📝"
    },
    {
      title: "Pantry",
      description: "Check your ingredient inventory",
      link: "/pantry",
      linkText: "View Pantry",
      icon: "🏠"
    },
    {
      title: "Plan Generator",
      description: "Generate a meal plan automatically",
      link: "/meal-plans/generate",
      linkText: "Generate Plan",
      icon: "✨"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header activePage="dashboard" />

      <main className="flex-grow container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user.user_metadata?.full_name || "Chef"}!
          </h1>
          <p className="text-gray-600">
            Here's an overview of your meal planning and recipes.
          </p>
        </div>

        <TileSection 
          title="Quick Actions" 
          tiles={quickActionTiles} 
        />

        <TileSection 
          title="Your Recipes" 
          tiles={recipesTiles} 
        />

        <TileSection 
          title="Meal Planning" 
          tiles={planningTiles} 
        />
      </main>

      <Footer />
    </div>
  );
}
