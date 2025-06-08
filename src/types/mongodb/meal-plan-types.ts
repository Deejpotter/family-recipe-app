/**
 * MongoDB Meal Plan Types
 * Updated: 08/06/2025
 * Author: Deej Potter
 * Description: MongoDB-specific type definitions for meal planning functionality
 */

import { MongoDocument } from "./mongo-types";
import {
	BaseMeal,
	BaseMealDay,
	BaseMealPlan,
	BaseMealPlanPreferences,
} from "../domain/meal-plan";

/**
 * MongoDB-specific meal interface
 */
export interface Meal extends BaseMeal, MongoDocument {}

/**
 * MongoDB-specific meal day interface
 */
export interface MealDay extends BaseMealDay, MongoDocument {}

/**
 * MongoDB-specific meal plan interface
 */
export interface MealPlan extends BaseMealPlan, MongoDocument {}

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
