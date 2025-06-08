/**
 * Recipe Types
 * Updated: 08/06/2025
 * Author: Deej Potter
 * Description: Defines types and interfaces for recipes and related entities
 */

import { MongoDocument } from "../mongodb/mongo-types";

/**
 * Recipe ingredient interface
 */
export interface Ingredient {
	name: string;
	quantity: number;
	unit: string;
	notes?: string;
	substitutes?: string[];
	isOptional?: boolean;
}

/**
 * Recipe nutrition information
 */
export interface NutritionInfo {
	calories: number;
	protein: number;
	carbohydrates: number;
	fat: number;
	servingSize: string;
}

/**
 * Recipe instruction step
 */
export interface InstructionStep {
	stepNumber: number;
	instruction: string;
	estimatedTime?: number;
	tips?: string[];
}

/**
 * Main Recipe interface
 */
export interface Recipe extends MongoDocument {
	title: string;
	description: string;
	ingredients: Ingredient[];
	instructions: InstructionStep[];
	prepTime: number;
	cookTime: number;
	totalTime?: number;
	servings: number;
	difficulty: "easy" | "medium" | "hard";
	cuisine: string;
	tags: string[];
	image?: string;
	notes?: string;
	rating?: number;
	ratings?: {
		userId: string;
		rating: number;
		comment?: string;
		date: Date;
	}[];
	nutrition?: NutritionInfo;
	source?: string;
	isPublic: boolean;
	createdBy: string;
	favoriteCount?: number;
	favorites?: string[]; // Array of userIds
}

/**
 * Recipe category
 */
export interface RecipeCategory {
	_id?: string;
	name: string;
	description?: string;
	icon?: string;
	recipes?: string[]; // Array of recipe IDs
	createdBy: string;
	isPublic: boolean;
}

/**
 * Recipe collection for organizing recipes
 */
export interface RecipeCollection extends MongoDocument {
	name: string;
	description?: string;
	recipes: string[]; // Array of recipe IDs
	isPublic: boolean;
	createdBy: string;
	image?: string;
	tags?: string[];
}
