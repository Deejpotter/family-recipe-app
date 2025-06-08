/**
 * Domain Recipe Types
 * Updated: 08/06/2025
 * Author: Deej Potter
 * Description: Core domain types for recipes and related entities, independent of data storage
 */

/**
 * Base interface for recipe ingredients
 */
export interface BaseIngredient {
	name: string;
	quantity: number;
	unit: string;
	notes?: string;
	substitutes?: string[];
	isOptional?: boolean;
	category?: string;
}

/**
 * Base interface for nutrition information
 */
export interface BaseNutritionInfo {
	calories: number;
	protein: number;
	carbohydrates: number;
	fat: number;
	servingSize: string;
}

/**
 * Base interface for recipe instruction steps
 */
export interface BaseInstructionStep {
	stepNumber: number;
	instruction: string;
	estimatedTime?: number;
	tips?: string[];
}

/**
 * Base interface for recipe ratings
 */
export interface BaseRating {
	userId: string;
	rating: number;
	comment?: string;
	date: Date;
}

/**
 * Core recipe interface with domain-specific properties
 */
export interface BaseRecipe {
	title: string;
	description: string;
	ingredients: BaseIngredient[];
	instructions: BaseInstructionStep[] | string[];
	prepTime: number;
	cookTime: number;
	totalTime?: number;
	servings: number;
	difficulty: "easy" | "medium" | "hard";
	cuisine?: string;
	tags: string[];
	image?: string;
	notes?: string;
	rating?: number;
	ratings?: BaseRating[];
	nutrition?: BaseNutritionInfo;
	source?: string;
	isPublic: boolean;
	createdBy: string;
	favoriteCount?: number;
	favorites?: string[]; // Array of userIds
	leftoversStorageInfo?: string;
	reheatingInstructions?: string;
	stretchedMealSuggestions?: string[];
}

/**
 * Base interface for recipe categories
 */
export interface BaseRecipeCategory {
	name: string;
	description?: string;
	icon?: string;
	recipes?: string[]; // Array of recipe IDs
	createdBy: string;
	isPublic: boolean;
}

/**
 * Base interface for recipe collections
 */
export interface BaseRecipeCollection {
	name: string;
	description?: string;
	recipes: string[]; // Array of recipe IDs
	isPublic: boolean;
	createdBy: string;
	image?: string;
	tags?: string[];
}

/**
 * Base interface for stored food items
 */
export interface BaseStoredFood extends BaseIngredient {
	expirationDate: Date;
	purchaseDate: Date;
	isLeftover: boolean;
	recipeId?: string; // Reference to the recipe if this is a leftover
	notes?: string;
}
