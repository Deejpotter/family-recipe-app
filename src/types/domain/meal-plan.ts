/**
 * Meal Plan Types
 * Updated: 08/06/2025
 * Author: Deej Potter
 * Description: Core domain types for meal planning functionality
 */

import { BaseRecipe } from "./recipe";

/**
 * Base interface for a single meal
 */
export interface BaseMeal {
	mealType: "breakfast" | "lunch" | "dinner" | "snack";
	recipeId?: string;
	servings: number;
	notes?: string;
	preparedBy?: string;
}

/**
 * Base interface for a day's worth of meals
 */
export interface BaseMealDay {
	date: Date;
	meals: BaseMeal[];
	notes?: string;
}

/**
 * Base interface for preferences in meal planning
 */
export interface BaseMealPlanPreferences {
	excludedIngredients?: string[];
	dietaryRestrictions?: string[];
	preferredCuisines?: string[];
}

/**
 * Base interface for a full meal plan
 */
export interface BaseMealPlan {
	title: string;
	description?: string;
	startDate: Date;
	endDate: Date;
	days: BaseMealDay[];
	createdBy: string;
	sharedWith?: string[]; // Array of userIds
	isPublic: boolean;
	tags?: string[];
	preferences?: BaseMealPlanPreferences;
}
