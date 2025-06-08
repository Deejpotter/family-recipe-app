import { Recipe, MealPlan, PlannedMeal } from "../types/recipe/recipe.types";
import { optimizeMealPlan, suggestLeftovers } from "../utils/meal-planning";

describe("Meal Planning Optimization", () => {
	const mockRecipe: Recipe = {
		id: "1",
		title: "Spaghetti Bolognese",
		description: "Classic Italian pasta dish",
		servings: 4,
		prepTime: 20,
		cookTime: 40,
		ingredients: [
			{
				id: "1",
				name: "Ground beef",
				quantity: 500,
				unit: "g",
				category: "meat",
			},
			{
				id: "2",
				name: "Pasta",
				quantity: 400,
				unit: "g",
				category: "pantry",
			},
		],
		instructions: ["Step 1", "Step 2"],
		tags: ["italian", "pasta", "dinner"],
		createdAt: new Date(),
		updatedAt: new Date(),
		leftoversStorageInfo: "Store in airtight container for up to 3 days",
		reheatingInstructions: "Microwave with a splash of water",
		stretchedMealSuggestions: [
			"Turn into pasta bake",
			"Make into sandwich filling",
		],
	};

	const today = new Date();
	const tomorrow = new Date(today);
	tomorrow.setDate(today.getDate() + 1);

	const mockMealPlan: MealPlan = {
		id: "1",
		startDate: today,
		endDate: new Date(today.getTime() + 13 * 24 * 60 * 60 * 1000), // 2 weeks
		meals: [
			{
				id: "1",
				date: today,
				mealType: "dinner",
				recipe: mockRecipe,
				servings: 4,
				isLeftover: false,
			},
		],
	};

	describe("optimizeMealPlan", () => {
		it("should suggest leftover meals based on original meals", () => {
			const optimizedPlan = optimizeMealPlan(mockMealPlan);

			// Should add a leftover meal suggestion for the next day
			const leftoverMeal = optimizedPlan.meals.find(
				(meal) => meal.date.getDate() === tomorrow.getDate() && meal.isLeftover
			);

			expect(leftoverMeal).toBeDefined();
			expect(leftoverMeal?.originalMealId).toBe("1");
			expect(leftoverMeal?.servings).toBe(2); // Assuming 2 portions are saved for leftovers
		});
	});

	describe("suggestLeftovers", () => {
		it("should calculate the number of leftover portions correctly", () => {
			const leftovers = suggestLeftovers(mockRecipe, 4);

			expect(leftovers.remainingServings).toBe(2); // Assuming we save half for leftovers
			expect(leftovers.suggestedUses).toContain("Turn into pasta bake");
			expect(leftovers.daysGoodFor).toBe(3); // Based on storage info
		});
	});
});
