import { Recipe, MealPlan, PlannedMeal } from "../types/recipe/recipe.types";

interface LeftoverSuggestion {
	remainingServings: number;
	suggestedUses: string[];
	daysGoodFor: number;
}

/**
 * Calculate leftover portions and provide usage suggestions for a recipe
 */
export function suggestLeftovers(
	recipe: Recipe,
	originalServings: number
): LeftoverSuggestion {
	// By default, save 50% of the meal for leftovers
	const remainingServings = Math.floor(originalServings / 2);

	// Parse storage info to get days good for
	const daysGoodFor = recipe.leftoversStorageInfo
		? parseInt(recipe.leftoversStorageInfo.match(/\d+/)?.[0] || "3")
		: 3;

	return {
		remainingServings,
		suggestedUses: recipe.stretchedMealSuggestions || [],
		daysGoodFor,
	};
}

/**
 * Optimize a meal plan by suggesting leftover meals and ingredient reuse
 */
export function optimizeMealPlan(plan: MealPlan): MealPlan {
	const optimizedMeals: PlannedMeal[] = [...plan.meals];

	// Process each non-leftover meal to suggest leftover meals
	plan.meals.forEach((meal) => {
		if (!meal.isLeftover && meal.recipe) {
			const leftovers = suggestLeftovers(meal.recipe, meal.servings);

			if (leftovers.remainingServings > 0) {
				// Create a leftover meal for the next day
				const nextDay = new Date(meal.date);
				nextDay.setDate(meal.date.getDate() + 1);

				const leftoverMeal: PlannedMeal = {
					id: `${meal.id}-leftover`,
					date: nextDay,
					mealType: meal.mealType,
					recipe: meal.recipe,
					servings: leftovers.remainingServings,
					isLeftover: true,
					originalMealId: meal.id,
					notes: `Leftover meal from ${meal.recipe.title}. ${meal.recipe.reheatingInstructions}`,
				};

				optimizedMeals.push(leftoverMeal);
			}
		}
	});

	return {
		...plan,
		meals: optimizedMeals.sort((a, b) => a.date.getTime() - b.date.getTime()),
	};
}
