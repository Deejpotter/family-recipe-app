/**
 * Meal Plan Optimizer
 * Updated: 08/06/2025
 * Author: Deej Potter
 * Description: Advanced meal planning optimization with food efficiency focus
 */

import {
	MealPlan,
	Recipe,
	StoredFood,
	PlannedMeal,
} from "../types/recipe/recipe.types";
import { calculateFreshness } from "./food-tracking";
import { suggestLeftovers, optimizeMealPlan } from "./meal-planning";

export interface OptimizationResult {
	mealPlan: MealPlan;
	efficiency: {
		ingredientUsage: number;
		leftoverUtilization: number;
		expirationOptimization: number;
	};
	recommendations: string[];
}

export function optimizeMealPlanWithFoodEfficiency(
	plan: MealPlan,
	pantryItems: StoredFood[]
): OptimizationResult {
	// Start with basic meal plan optimization
	const optimizedPlan = optimizeMealPlan(plan);
	const recommendations: string[] = [];

	// Track ingredient usage across meals
	const ingredientUsage = new Map<string, number>();
	let totalIngredients = 0;
	let usedIngredients = 0;

	// Analyze ingredient usage and expiration dates
	optimizedPlan.meals.forEach((meal) => {
		if (meal.recipe) {
			meal.recipe.ingredients.forEach((ingredient) => {
				totalIngredients++;
				const usage = ingredientUsage.get(ingredient.name) || 0;
				ingredientUsage.set(ingredient.name, usage + 1);

				// Find matching pantry item
				const pantryItem = pantryItems.find(
					(item) => item.name.toLowerCase() === ingredient.name.toLowerCase()
				);

				if (pantryItem) {
					const freshness = calculateFreshness(pantryItem);
					if (freshness.status === "use-soon") {
						recommendations.push(
							`Use ${pantryItem.name} soon (expires in ${freshness.daysUntilExpiration} days)`
						);
					}
				}
			});
		}
	});

	// Calculate efficiency metrics
	const ingredientUsageEfficiency =
		Array.from(ingredientUsage.values()).reduce(
			(sum, count) => sum + (count > 1 ? 1 : 0),
			0
		) / totalIngredients;

	const leftoverUtilization =
		optimizedPlan.meals.filter((meal) => meal.isLeftover).length /
		optimizedPlan.meals.length;

	// Prioritize soon-to-expire ingredients
	const expiringItems = pantryItems
		.map((item) => ({ item, freshness: calculateFreshness(item) }))
		.filter(({ freshness }) => freshness.status === "use-soon");

	const expirationOptimization =
		expiringItems.length > 0
			? expiringItems.filter(({ item }) =>
					optimizedPlan.meals.some((meal) =>
						meal.recipe?.ingredients.some(
							(i) => i.name.toLowerCase() === item.name.toLowerCase()
						)
					)
			  ).length / expiringItems.length
			: 1;

	// Add recommendations for better food efficiency
	if (ingredientUsageEfficiency < 0.5) {
		recommendations.push(
			"Consider recipes that share more common ingredients to improve efficiency"
		);
	}

	if (leftoverUtilization < 0.3) {
		recommendations.push(
			"Try planning more meals using leftovers to reduce waste"
		);
	}

	if (expirationOptimization < 0.7) {
		recommendations.push(
			"Some ingredients will expire soon. Consider adjusting meal plan to use them"
		);
	}

	return {
		mealPlan: optimizedPlan,
		efficiency: {
			ingredientUsage: Math.round(ingredientUsageEfficiency * 100),
			leftoverUtilization: Math.round(leftoverUtilization * 100),
			expirationOptimization: Math.round(expirationOptimization * 100),
		},
		recommendations,
	};
}
