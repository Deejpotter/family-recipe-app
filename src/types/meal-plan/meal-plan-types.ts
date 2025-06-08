/**
 * Meal Plan Types
 * Updated: 08/06/2025
 * Author: Deej Potter
 * Description: Defines types and interfaces for meal planning functionality
 */

import { MongoDocument } from "../mongodb/mongo-types";

/**
 * Single meal in a day's plan
 */
export interface Meal {
	recipeId: string;
	mealType: "breakfast" | "lunch" | "dinner" | "snack";
	servings: number;
	notes?: string;
	preparedBy?: string;
}

/**
 * A day's worth of meals
 */
export interface MealDay {
	date: Date;
	meals: Meal[];
	notes?: string;
}

/**
 * Full meal plan
 */
export interface MealPlan extends MongoDocument {
	title: string;
	description?: string;
	startDate: Date;
	endDate: Date;
	days: MealDay[];
	createdBy: string;
	sharedWith?: string[]; // Array of userIds
	isPublic: boolean;
	tags?: string[];
	preferences?: {
		excludedIngredients?: string[];
		dietaryRestrictions?: string[];
		preferredCuisines?: string[];
	};
}

/**
 * Generated shopping list from meal plan
 */
export interface ShoppingList extends MongoDocument {
	title: string;
	mealPlanId: string;
	dateRange: {
		start: Date;
		end: Date;
	};
	items: {
		name: string;
		quantity: number;
		unit: string;
		category: string;
		checked: boolean;
		recipe?: string; // Recipe name for reference
		recipeId?: string;
	}[];
	createdBy: string;
	sharedWith?: string[];
	notes?: string;
}
