/**
 * Food Tracking Utilities
 * Updated: 08/06/2025
 * Author: Deej Potter
 * Description: Utilities for tracking food freshness and expiration
 */

import { StoredFood, Recipe, Ingredient } from "../types/mongodb/recipe-types";

export interface FoodFreshness {
	daysUntilExpiration: number;
	status: "fresh" | "use-soon" | "expired";
	recommendedUses: string[];
}

export function calculateFreshness(food: StoredFood): FoodFreshness {
	const today = new Date();
	const daysUntilExpiration = Math.ceil(
		(food.expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
	);

	let status: FoodFreshness["status"];
	let recommendedUses: string[] = [];

	if (daysUntilExpiration <= 0) {
		status = "expired";
	} else if (daysUntilExpiration <= 2) {
		status = "use-soon";
		recommendedUses = generateQuickUseRecipes(food);
	} else {
		status = "fresh";
	}

	return {
		daysUntilExpiration,
		status,
		recommendedUses,
	};
}

export function generateQuickUseRecipes(food: StoredFood): string[] {
	// Add quick recipe suggestions based on food category
	switch (food.category?.toLowerCase() || "other") {
		case "produce":
			return ["Add to stir-fry", "Make smoothie", "Add to soup"];
		case "dairy":
			return ["Make cheese sauce", "Add to casserole", "Make creamy pasta"];
		case "meat":
			return ["Make sandwich filling", "Add to fried rice", "Make quick curry"];
		default:
			return ["Add to next meal"];
	}
}

export function suggestStretchedMeals(recipe: Recipe): string[] {
	const suggestions: string[] = [];

	// Base suggestions on recipe type
	const tags = recipe.tags.map((t) => t.toLowerCase());

	if (tags.includes("pasta")) {
		suggestions.push("Add more vegetables and stretch the sauce");
		suggestions.push("Turn into a baked pasta dish with added cheese");
	}

	if (tags.includes("meat")) {
		suggestions.push("Add beans or lentils to stretch the protein");
		suggestions.push("Turn into sandwiches or wraps");
	}

	if (tags.includes("soup") || tags.includes("stew")) {
		suggestions.push("Add more broth and vegetables");
		suggestions.push("Serve over rice or noodles");
	}

	// Add generic suggestions if none specific
	if (suggestions.length === 0) {
		suggestions.push("Serve with a side salad to make it a bigger meal");
		suggestions.push("Add rice or pasta as a side dish");
	}

	return suggestions;
}

export function calculateIngredientEfficiency(
	ingredients: Ingredient[],
	plannedUses: number
): number {
	let efficiency = 0;
	let totalIngredients = ingredients.length;

	ingredients.forEach((ingredient) => {
		// Calculate how much of the ingredient will be used
		const usageRatio = Math.min(
			1,
			plannedUses /
				(ingredient.quantity * (ingredient.unit === "whole" ? 1 : 0.8))
		); // 80% usage target for divisible items
		efficiency += usageRatio;
	});

	// Return percentage (0-100)
	return Math.round((efficiency / totalIngredients) * 100);
}
