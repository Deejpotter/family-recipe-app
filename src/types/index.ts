// Basic types for the Family Recipe App

// Recipe-related types
export interface Recipe {
	id: string;
	title: string;
	description: string;
	ingredients: Ingredient[];
	instructions: string[];
	prepTime: number;
	cookTime: number;
	servings: number;
	tags: string[];
	image?: string;
	createdBy: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Ingredient {
	id?: string;
	name: string;
	quantity: number;
	unit: string;
	notes?: string;
}

// Meal planning types
export interface MealPlan {
	id: string;
	title: string;
	startDate: Date;
	endDate: Date;
	meals: Meal[];
	createdBy: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Meal {
	id: string;
	date: Date;
	type: MealType;
	recipes: Recipe[];
	notes?: string;
}

export enum MealType {
	Breakfast = "breakfast",
	Lunch = "lunch",
	Dinner = "dinner",
	Snack = "snack",
	Dessert = "dessert",
	Other = "other",
}

// Shopping list types
export interface ShoppingList {
	id: string;
	title: string;
	items: ShoppingItem[];
	createdAt: Date;
	updatedAt: Date;
}

export interface ShoppingItem {
	id: string;
	name: string;
	quantity: number;
	unit: string;
	category: GroceryCategory;
	checked: boolean;
	notes?: string;
}

export enum GroceryCategory {
	Produce = "produce",
	Meat = "meat",
	Dairy = "dairy",
	Bakery = "bakery",
	Frozen = "frozen",
	Pantry = "pantry",
	Beverages = "beverages",
	Household = "household",
	Other = "other",
}

// Pantry types
export interface PantryItem {
	id: string;
	name: string;
	quantity: number;
	unit: string;
	category: GroceryCategory;
	expirationDate?: Date;
	lowStockThreshold?: number;
	notes?: string;
}

// User/Family types
export interface User {
	id: string;
	name: string;
	email: string;
	preferences: UserPreferences;
}

export interface UserPreferences {
	dietaryRestrictions: string[];
	favoriteCuisines: string[];
	dislikedIngredients: string[];
	mealPlanSettings: {
		defaultMealTypes: MealType[];
		planningPeriod: "weekly" | "biweekly" | "monthly";
	};
}

export interface FamilyMember extends User {
	role: "admin" | "contributor" | "viewer";
}
