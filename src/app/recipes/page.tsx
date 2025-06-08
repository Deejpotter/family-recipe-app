"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/recipes/RecipeCard";
import { Recipe } from "@/types/mongodb/recipe-types"; // Updated import

export default function RecipesPage() {
	const [recipes, setRecipes] = useState<Recipe[]>([
		{
			_id: "1",
			createdAt: new Date(),
			updatedAt: new Date(),
			title: "Spaghetti Bolognese",
			description: "A classic Italian pasta dish with a meaty sauce.",
			prepTime: 15,
			cookTime: 45,
			servings: 4,
			tags: ["italian", "pasta", "dinner"],
			image: "https://placehold.co/600x400/4f6df5/ffffff?text=Spaghetti",
			difficulty: "medium",
			cuisine: "Italian",
			isPublic: true,
			ingredients: [],
			instructions: [],
			createdBy: "",
		},
		{			_id: "2",
			createdAt: new Date(),
			updatedAt: new Date(),
			title: "Chicken Curry",
			description: "A flavorful curry dish with tender chicken pieces.",
			prepTime: 20,
			cookTime: 30,
			servings: 4,
			tags: ["indian", "spicy", "dinner"],
			image: "https://placehold.co/600x400/f97316/ffffff?text=Curry",
			difficulty: "medium",
			cuisine: "Indian",
			isPublic: true,
			ingredients: [],
			instructions: [],
			createdBy: "",
		},
		{			_id: "3",
			createdAt: new Date(),
			updatedAt: new Date(),
			title: "Chocolate Chip Cookies",
			description: "Classic homemade cookies with chocolate chips.",
			prepTime: 15,
			cookTime: 10,
			servings: 24,
			tags: ["dessert", "baking", "snack"],
			image: "https://placehold.co/600x400/4f6df5/ffffff?text=Cookies",
			difficulty: "easy",
			cuisine: "American",
			isPublic: true,
			ingredients: [],
			instructions: [],
			createdBy: "",
		},
	]);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [sortBy, setSortBy] = useState("");
	// TODO: Replace with actual API calls
	const handleFavoriteToggle = useCallback(async (recipeId: string) => {
		setRecipes((prevRecipes) =>
			prevRecipes.map((recipe) =>
				recipe._id === recipeId
					? {
							...recipe,
							favorites: recipe.favorites?.length ? [] : ["current-user-id"],
					  }
					: recipe
			)
		);
	}, []);

	const filteredRecipes = recipes
		.filter(
			(recipe) =>
				recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
				recipe.tags.some((tag) =>
					tag.toLowerCase().includes(searchQuery.toLowerCase())
				)
		)
		.filter(
			(recipe) =>
				!selectedCategory ||
				recipe.tags.includes(selectedCategory.toLowerCase())
		)
		.sort((a, b) => {
			switch (sortBy) {
				case "name":
					return a.title.localeCompare(b.title);
				case "newest":
					// TODO: Replace with actual date comparison once we have createdAt
					return 0;
				case "prep-time":
					return a.prepTime - b.prepTime;
				default:
					return 0;
			}
		});

	return (
		<div className="flex flex-col min-h-screen">
			<Header activePage="recipes" />

			<main className="flex-grow container mx-auto p-6">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold">My Recipes</h1>
					<Link
						href="/recipes/new"
						className="bg-[#4f6df5] hover:bg-[#3a57d8] text-white font-medium py-2 px-4 rounded shadow transition-colors"
					>
						Add New Recipe
					</Link>
				</div>

				{/* Filter and search section */}
				<div className="bg-gray-50 p-4 rounded-lg mb-8">
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-grow">
							<input
								type="text"
								placeholder="Search recipes..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded"
							/>
						</div>
						<div className="flex gap-2">
							<select
								value={selectedCategory}
								onChange={(e) => setSelectedCategory(e.target.value)}
								className="px-4 py-2 border border-gray-300 rounded"
							>
								<option value="">All Categories</option>
								<option value="breakfast">Breakfast</option>
								<option value="lunch">Lunch</option>
								<option value="dinner">Dinner</option>
								<option value="dessert">Dessert</option>
								<option value="snack">Snack</option>
							</select>
							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
								className="px-4 py-2 border border-gray-300 rounded"
							>
								<option value="">Sort By</option>
								<option value="name">Name</option>
								<option value="newest">Newest</option>
								<option value="prep-time">Prep Time</option>
							</select>
						</div>
					</div>
				</div>

				{/* Recipe grid */}
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">					{filteredRecipes.map((recipe) => (
						<RecipeCard
							key={recipe._id.toString()}
							recipe={recipe}
							onFavoriteToggle={handleFavoriteToggle}
						/>
					))}
				</div>
			</main>

			<Footer />
		</div>
	);
}
