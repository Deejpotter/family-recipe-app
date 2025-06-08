/**
 * Data Service
 * Updated: 08/06/2025
 * Author: Deej Potter
 * Description: Centralized service for data operations across the application
 * Makes it easy to access data with the appropriate provider and options
 */

import ShippingItem from "@/types/box-shipping-calculator/ShippingItem";
import { Recipe } from "@/types/recipe/recipe-types";
import { MealPlan, ShoppingList } from "@/types/meal-plan/meal-plan-types";
import { DatabaseResponse, MongoDocument } from "@/types/mongodb/mongo-types";
import { MongoDBProvider } from "./MongoDBProvider"; // Added

// Singleton instance of the hybrid provider
const dataProvider = new MongoDBProvider(); // Changed to MongoDBProvider

/**
 * Data Service
 * Provides specialized methods for each domain model
 */
export const DataService = {
	/**
	 * Initialize the data service - call this early in the application lifecycle
	 * Can be used to perform any necessary setup like loading initial data
	 */
	initialize: async () => {
		// Trigger sync with remote on initialization
		// MongoDBProvider does not have syncWithRemote
		// await dataProvider.syncWithRemote?.();
	},

	/**
	 * Box Shipping Calculator API
	 * Specialized methods for ShippingItem operations
	 */
	shippingItems: {
		/**
		 * Get all available (non-deleted) shipping items
		 */
		getAvailable: async (): Promise<DatabaseResponse<ShippingItem[]>> => {
			// Use generic getDocuments method from MongoDBProvider
			return dataProvider.getDocuments<ShippingItem>("Items", {
				deletedAt: null,
			});
		},

		/**
		 * Add a new shipping item
		 */
		add: async (
			item: Omit<ShippingItem, "_id">
		): Promise<DatabaseResponse<ShippingItem>> => {
			// Use generic createDocument method from MongoDBProvider
			// MongoDBProvider's createDocument handles adding createdAt and updatedAt
			return dataProvider.createDocument<ShippingItem>("Items", {
				...item,
				deletedAt: null,
			});
		},

		/**
		 * Update an existing shipping item
		 */
		update: async (
			item: ShippingItem
		): Promise<DatabaseResponse<ShippingItem>> => {
			// Use generic updateDocument method from MongoDBProvider
			const { _id, ...updateData } = item;

			if (!_id) {
				throw new Error("Cannot update item without an _id");
			}

			// MongoDBProvider's updateDocument handles updating updatedAt
			return dataProvider.updateDocument<ShippingItem>(
				"Items",
				_id.toString(),
				updateData
			);
		},

		/**
		 * Delete a shipping item (soft delete)
		 */
		delete: async (id: string): Promise<DatabaseResponse<ShippingItem>> => {
			// Use generic deleteDocument method from MongoDBProvider
			// MongoDBProvider's deleteDocument handles the soft delete by setting deletedAt
			return dataProvider.deleteDocument<ShippingItem>("Items", id.toString());
		},
	},

	/**
	 * User-specific data API
	 * Use these methods for data that should be associated with a specific user
	 */
	userData: {
		/**
		 * Get all documents from a user-specific collection
		 */
		getAll: async <T extends MongoDocument>(
			collection: string,
			userId: string
		): Promise<DatabaseResponse<T[]>> => {
			return dataProvider.getAllDocuments<T>(collection, {
				userId,
				isPublic: false,
			});
		},

		/**
		 * Get filtered documents from a user-specific collection
		 */
		getFiltered: async <T extends MongoDocument>(
			collection: string,
			userId: string,
			filter: Record<string, any>
		): Promise<DatabaseResponse<T[]>> => {
			return dataProvider.getDocuments<T>(collection, filter, {
				userId,
				isPublic: false,
			});
		},

		/**
		 * Add a document to a user-specific collection
		 */
		add: async <T extends MongoDocument>(
			collection: string,
			userId: string,
			document: Omit<T, "_id">
		): Promise<DatabaseResponse<T>> => {
			return dataProvider.createDocument<T>(collection, document, {
				userId,
				isPublic: false,
			});
		},

		/**
		 * Update a document in a user-specific collection
		 */
		update: async <T extends MongoDocument>(
			collection: string,
			userId: string,
			id: string,
			update: Partial<T>
		): Promise<DatabaseResponse<T>> => {
			return dataProvider.updateDocument<T>(collection, id, update, {
				userId,
				isPublic: false,
			});
		},

		/**
		 * Delete a document from a user-specific collection
		 */
		delete: async <T extends MongoDocument>(
			collection: string,
			userId: string,
			id: string
		): Promise<DatabaseResponse<T>> => {
			return dataProvider.deleteDocument<T>(collection, id, {
				userId,
				isPublic: false,
			});
		},
	},

	/**
	 * Recipe API
	 * Methods for managing recipes
	 */
	recipes: {
		/**
		 * Get all recipes accessible to the user
		 */
		getAll: async (userId: string): Promise<DatabaseResponse<Recipe[]>> => {
			return dataProvider.getDocuments<Recipe>("Recipes", {
				$or: [{ createdBy: userId }, { isPublic: true }, { favorites: userId }],
				deletedAt: null,
			});
		},

		/**
		 * Get a single recipe by ID
		 */
		getById: async (id: string): Promise<DatabaseResponse<Recipe>> => {
			return dataProvider
				.getDocuments<Recipe>("Recipes", { _id: id })
				.then((res) => ({
					...res,
					data: res.data?.[0],
				}));
		},

		/**
		 * Create a new recipe
		 */
		create: async (
			recipe: Omit<Recipe, "_id">,
			userId: string
		): Promise<DatabaseResponse<Recipe>> => {
			return dataProvider.createDocument<Recipe>("Recipes", {
				...recipe,
				createdBy: userId,
			});
		},

		/**
		 * Update an existing recipe
		 */
		update: async (
			id: string,
			recipe: Partial<Recipe>
		): Promise<DatabaseResponse<Recipe>> => {
			return dataProvider.updateDocument<Recipe>("Recipes", id, recipe);
		},

		/**
		 * Delete a recipe (soft delete)
		 */
		delete: async (id: string): Promise<DatabaseResponse<Recipe>> => {
			return dataProvider.deleteDocument<Recipe>("Recipes", id);
		},

		/**
		 * Toggle a recipe favorite status for a user
		 */
		toggleFavorite: async (
			recipeId: string,
			userId: string
		): Promise<DatabaseResponse<Recipe>> => {
			const recipe = await dataProvider
				.getDocuments<Recipe>("Recipes", { _id: recipeId })
				.then((res) => res.data?.[0]);
			if (!recipe) {
				return {
					success: false,
					error: "Recipe not found",
					status: 404,
					message: "Recipe not found",
				};
			}

			const favorites = recipe.favorites || [];
			const isFavorited = favorites.includes(userId);

			return dataProvider.updateDocument<Recipe>("Recipes", recipeId, {
				favorites: isFavorited
					? favorites.filter((id) => id !== userId)
					: [...favorites, userId],
				favoriteCount: (recipe.favoriteCount || 0) + (isFavorited ? -1 : 1),
			});
		},
	},

	/**
	 * Meal Plan API
	 * Methods for managing meal plans
	 */
	mealPlans: {
		/**
		 * Get all meal plans for a user
		 */
		getAll: async (userId: string): Promise<DatabaseResponse<MealPlan[]>> => {
			return dataProvider.getDocuments<MealPlan>("MealPlans", {
				$or: [{ createdBy: userId }, { sharedWith: userId }],
				deletedAt: null,
			});
		},

		/**
		 * Get a single meal plan by ID
		 */
		getById: async (id: string): Promise<DatabaseResponse<MealPlan>> => {
			return dataProvider
				.getDocuments<MealPlan>("MealPlans", { _id: id })
				.then((res) => ({
					...res,
					data: res.data?.[0],
				}));
		},

		/**
		 * Create a new meal plan
		 */
		create: async (
			mealPlan: Omit<MealPlan, "_id">,
			userId: string
		): Promise<DatabaseResponse<MealPlan>> => {
			return dataProvider.createDocument<MealPlan>("MealPlans", {
				...mealPlan,
				createdBy: userId,
			});
		},

		/**
		 * Update an existing meal plan
		 */
		update: async (
			id: string,
			mealPlan: Partial<MealPlan>
		): Promise<DatabaseResponse<MealPlan>> => {
			return dataProvider.updateDocument<MealPlan>("MealPlans", id, mealPlan);
		},

		/**
		 * Delete a meal plan (soft delete)
		 */
		delete: async (id: string): Promise<DatabaseResponse<MealPlan>> => {
			return dataProvider.deleteDocument<MealPlan>("MealPlans", id);
		},

		/**
		 * Generate a shopping list from a meal plan
		 */
		generateShoppingList: async (
			mealPlanId: string,
			userId: string
		): Promise<DatabaseResponse<ShoppingList>> => {
			// Get the meal plan
			const mealPlan = await dataProvider
				.getDocuments<MealPlan>("MealPlans", { _id: mealPlanId })
				.then((res) => res.data?.[0]);
			if (!mealPlan) {
				return {
					success: false,
					error: "Meal plan not found",
					status: 404,
					message: "Meal plan not found",
				};
			}

			// Get all recipes used in the meal plan
			const recipeIds = new Set(
				mealPlan.days.flatMap((day) => day.meals.map((meal) => meal.recipeId))
			);

			const recipes = await dataProvider
				.getDocuments<Recipe>("Recipes", {
					_id: { $in: Array.from(recipeIds) },
				})
				.then((res) => res.data || []);

			// Aggregate ingredients
			const aggregatedIngredients = new Map<
				string,
				{
					quantity: number;
					unit: string;
					category: string;
					recipes: string[];
					referenceIds: string[];
				}
			>();

			for (const recipe of recipes) {
				for (const ingredient of recipe.ingredients) {
					const key = ingredient.name.toLowerCase();
					const existing = aggregatedIngredients.get(key) || {
						quantity: 0,
						unit: ingredient.unit,
						category: "uncategorized",
						recipes: [],
						referenceIds: [],
					};

					existing.quantity += ingredient.quantity;
					if (!existing.recipes.includes(recipe.title)) {
						existing.recipes.push(recipe.title);
						existing.referenceIds.push(recipe._id as string);
					}

					aggregatedIngredients.set(key, existing);
				}
			}

			// Create shopping list
			const shoppingList: Omit<ShoppingList, "_id"> = {
				title: `Shopping List for ${mealPlan.title}`,
				mealPlanId: mealPlanId,
				dateRange: {
					start: mealPlan.startDate,
					end: mealPlan.endDate,
				},
				items: Array.from(aggregatedIngredients.entries()).map(
					([name, data]) => ({
						name,
						quantity: data.quantity,
						unit: data.unit,
						category: data.category,
						checked: false,
						reference: data.recipes.join(", "),
						referenceId: data.referenceIds[0],
					})
				),
				createdBy: userId,
				sharedWith: mealPlan.sharedWith,
			};

			return dataProvider.createDocument<ShoppingList>(
				"ShoppingLists",
				shoppingList
			);
		},
	},

	/**
	 * Force sync with remote database
	 */
	sync: async (): Promise<void> => {
		// MongoDBProvider does not have syncWithRemote
		// return dataProvider.syncWithRemote?.();
		return Promise.resolve(); // Or implement a health check if needed
	},

	/**
	 * Checks the database connection status by pinging the database.
	 */
	checkDbConnection: async (): Promise<DatabaseResponse<{ ok: number }>> => {
		if (typeof dataProvider.ping === "function") {
			return dataProvider.ping();
		} else {
			return Promise.resolve({
				success: false,
				error: "Ping function not available on provider.",
				status: 500,
				message: "Ping function not available on provider.",
			});
		}
	},

	/**
	 * Access to the raw data provider for advanced operations
	 */
	provider: dataProvider,
};

export default DataService;
