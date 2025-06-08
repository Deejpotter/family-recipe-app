/**
 * RecipeCard
 * Updated: 08/06/2025
 * Author: Deej Potter
 * Description: A reusable card component for displaying recipe previews
 */

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Recipe } from "@/types/mongodb/recipe-types";
import { Types } from "mongoose";

interface RecipeCardProps {
	recipe: Recipe;
	onFavoriteToggle?: (recipeId: string) => Promise<void>;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
	recipe,
	onFavoriteToggle,
}) => {
	const { totalTime = recipe.prepTime + recipe.cookTime } = recipe;

	return (
		<div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
			<div className="h-48 overflow-hidden relative">
				{recipe.image ? (
					<Image
						src={recipe.image}
						alt={recipe.title}
						fill
						className="object-cover"
					/>
				) : (
					<div className="w-full h-full bg-gray-200 flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-12 w-12 text-gray-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
					</div>
				)}
			</div>

			<div className="p-6">
				<div className="flex justify-between items-start">
					<h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
					{onFavoriteToggle && (
						<button
							onClick={() => onFavoriteToggle(recipe._id.toString())}
							className="text-gray-400 hover:text-red-500 transition-colors"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill={recipe.favorites?.length ? "currentColor" : "none"}
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								/>
							</svg>
						</button>
					)}
				</div>

				<p className="text-gray-600 mb-4">{recipe.description}</p>

				<div className="flex gap-4 text-sm text-gray-500 mb-4">
					<div className="flex items-center gap-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>{totalTime} min</span>
					</div>
					<div className="flex items-center gap-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
							/>
						</svg>
						<span>{recipe.servings}</span>
					</div>
					{recipe.rating && (
						<div className="flex items-center gap-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4 text-yellow-400"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
							<span>{recipe.rating.toFixed(1)}</span>
						</div>
					)}
				</div>

				{recipe.tags && recipe.tags.length > 0 && (
					<div className="flex flex-wrap gap-2 mb-4">
						{recipe.tags.map((tag) => (
							<span
								key={tag}
								className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
							>
								{tag}
							</span>
						))}
					</div>
				)}

				<Link
					href={`/recipes/${recipe._id.toString()}`}
					className="block text-center bg-[#f97316] hover:bg-[#ea580c] text-white font-medium py-2 px-4 rounded shadow transition-colors"
				>
					View Recipe
				</Link>
			</div>
		</div>
	);
};

export default RecipeCard;
