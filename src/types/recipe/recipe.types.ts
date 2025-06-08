export interface Ingredient {
	id: string;
	name: string;
	quantity: number;
	unit: string;
	category: string;
	expirationDate?: Date;
	purchaseDate?: Date;
}

export interface Recipe {
	id: string;
	title: string;
	description: string;
	servings: number;
	prepTime: number;
	cookTime: number;
	ingredients: Ingredient[];
	instructions: string[];
	tags: string[];
	image?: string;
	createdAt: Date;
	updatedAt: Date;
	notes?: string;
	leftoversStorageInfo?: string;
	reheatingInstructions?: string;
	stretchedMealSuggestions?: string[];
}

export interface MealPlan {
	id: string;
	startDate: Date;
	endDate: Date;
	meals: PlannedMeal[];
	shoppingList?: Ingredient[];
	notes?: string;
}

export interface PlannedMeal {
	id: string;
	date: Date;
	mealType: "breakfast" | "lunch" | "dinner" | "snack";
	recipe?: Recipe;
	servings: number;
	isLeftover: boolean;
	originalMealId?: string; // Reference to the original meal if this is a leftover
	notes?: string;
}

export interface StoredFood {
	id: string;
	name: string;
	quantity: number;
	unit: string;
	category: string;
	expirationDate: Date;
	purchaseDate: Date;
	isLeftover: boolean;
	recipeId?: string; // Reference to the recipe if this is a leftover
	notes?: string;
}
