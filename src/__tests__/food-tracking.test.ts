import { describe, expect, test } from "@jest/globals";
import {
	calculateFreshness,
	generateQuickUseRecipes,
	suggestStretchedMeals,
	calculateIngredientEfficiency,
} from "../utils/food-tracking";
import { optimizeMealPlanWithFoodEfficiency } from "../utils/meal-plan-optimizer";
import { Recipe, StoredFood, Ingredient } from "../types/mongodb/recipe-types";
import { MealPlan } from "../types/mongodb/meal-plan-types";

describe("Food Tracking", () => {
	const mockStoredFood: StoredFood = {
		_id: "1",
		name: "Chicken breast",
		quantity: 2,
		unit: "lbs",
		category: "meat",
		expirationDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
		purchaseDate: new Date(),
		isLeftover: false,
		notes: "Fresh from store",
	};

	test("calculateFreshness should properly categorize food", () => {
		const freshness = calculateFreshness(mockStoredFood);

		expect(freshness.status).toBe("use-soon");
		expect(freshness.daysUntilExpiration).toBe(2);
		expect(freshness.recommendedUses.length).toBeGreaterThan(0);
	});

	test("generateQuickUseRecipes should provide relevant suggestions", () => {
		const suggestions = generateQuickUseRecipes(mockStoredFood);

		expect(suggestions).toContain("Make sandwich filling");
		expect(suggestions.length).toBeGreaterThan(0);
	});

	test("suggestStretchedMeals should provide recipe-specific suggestions", () => {
		const mockRecipe: Recipe = {
			_id: "1",
			title: "Spaghetti Bolognese",
			description: "Classic pasta dish",
			servings: 4,
			prepTime: 20,
			cookTime: 30,
			difficulty: "medium",
			ingredients: [
				{ name: "Ground beef", quantity: 1, unit: "lb", category: "meat" },
				{ name: "Pasta", quantity: 1, unit: "lb", category: "pantry" },
			],
			instructions: ["Step 1", "Step 2"],
			tags: ["pasta", "italian"],
			isPublic: true,
			createdBy: "test-user",
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const suggestions = suggestStretchedMeals(mockRecipe);

		expect(suggestions).toContain("Add more vegetables and stretch the sauce");
		expect(suggestions.length).toBeGreaterThan(0);
	});

	test("calculateIngredientEfficiency should return correct percentage", () => {
		const ingredients = [
			{ name: "Tomatoes", quantity: 4, unit: "whole", category: "produce" },
			{ name: "Onion", quantity: 1, unit: "whole", category: "produce" },
		] as Ingredient[];

		const efficiency = calculateIngredientEfficiency(ingredients, 2);

		expect(efficiency).toBeGreaterThanOrEqual(0);
		expect(efficiency).toBeLessThanOrEqual(100);
	});
});

describe("Meal Plan Optimization", () => {
	const mockRecipe: Recipe = {
		id: "1",
		title: "Chicken Stir Fry",
		description: "Quick and easy stir fry",
		servings: 4,
		prepTime: 15,
		cookTime: 15,
		ingredients: [
			{
				id: "1",
				name: "Chicken breast",
				quantity: 1,
				unit: "lb",
				category: "meat",
			},
			{
				id: "2",
				name: "Mixed vegetables",
				quantity: 2,
				unit: "cups",
				category: "produce",
			},
		],
		instructions: ["Step 1", "Step 2"],
		tags: ["asian", "quick"],
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const mockMealPlan: MealPlan = {
		id: "1",
		startDate: new Date(),
		endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		meals: [
			{
				id: "1",
				date: new Date(),
				mealType: "dinner",
				recipe: mockRecipe,
				servings: 4,
				isLeftover: false,
			},
		],
	};

	const mockPantryItems: StoredFood[] = [
		{
			id: "1",
			name: "Chicken breast",
			quantity: 2,
			unit: "lbs",
			category: "meat",
			expirationDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
			purchaseDate: new Date(),
			isLeftover: false,
		},
	];

	test("optimizeMealPlanWithFoodEfficiency should provide optimization metrics", () => {
		const result = optimizeMealPlanWithFoodEfficiency(
			mockMealPlan,
			mockPantryItems
		);

		expect(result.efficiency.ingredientUsage).toBeDefined();
		expect(result.efficiency.leftoverUtilization).toBeDefined();
		expect(result.efficiency.expirationOptimization).toBeDefined();
		expect(result.recommendations.length).toBeGreaterThan(0);
	});
});
