/**
 * Rimport { Recipe, Ingredient, InstructionStep } from "@/types/recipe/recipe-types";cipeForm
 * Updated: 08/06/2025
 * Author: Deej Potter
 * Description: Form component for creating and editing recipes
 */

import React from "react";
import { useCallback, useState } from "react";
import { Recipe, Ingredient } from "@/types/recipe/recipe-types";
import TagInput from "../shared/TagInput";
import ImageUpload from "../shared/ImageUpload";

interface RecipeFormProps {
	initialRecipe?: Partial<Recipe>;
	onSubmit: (
		recipe: Omit<Recipe, "id" | "createdAt" | "updatedAt">
	) => Promise<void>;
	onCancel: () => void;
}

const defaultIngredient: Ingredient = {
	name: "",
	quantity: 0,
	unit: "",
	notes: "",
	isOptional: false,
};

const RecipeForm: React.FC<RecipeFormProps> = ({
	initialRecipe,
	onSubmit,
	onCancel,
}) => {
	const [recipe, setRecipe] = useState<Partial<Recipe>>({
		title: "",
		description: "",
		prepTime: 0,
		cookTime: 0,
		servings: 1,
		ingredients: [],
		instructions: [],
		tags: [],
		difficulty: "medium",
		cuisine: "",
		isPublic: true,
		...initialRecipe,
	});

	const [newInstruction, setNewInstruction] = useState("");
	const [ingredient, setIngredient] = useState<Ingredient>(defaultIngredient);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const updateRecipe = (updates: Partial<Recipe>) => {
		setRecipe((prev) => ({ ...prev, ...updates }));
	};

	const addIngredient = () => {
		if (ingredient.name && ingredient.quantity > 0 && ingredient.unit) {
			updateRecipe({
				ingredients: [...(recipe.ingredients || []), ingredient],
			});
			setIngredient(defaultIngredient);
		}
	};

	const removeIngredient = (index: number) => {
		updateRecipe({
			ingredients: recipe.ingredients?.filter((_, i) => i !== index),
		});
	};

	const addInstruction = () => {
		if (newInstruction.trim()) {
			const newStep = {
				stepNumber: (recipe.instructions?.length || 0) + 1,
				instruction: newInstruction.trim(),
				estimatedTime: 0,
				tips: []
			};
			updateRecipe({
				instructions: [...(recipe.instructions || []), newStep],
			});
			setNewInstruction("");
		}
	};

	const removeInstruction = (index: number) => {
		updateRecipe({
			instructions: recipe.instructions?.filter((_, i) => i !== index),
		});
	};

	const handleSubmit = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			if (isSubmitting) return;

			// Validate required fields
			if (
				!recipe.title ||
				!recipe.description ||
				!recipe.ingredients?.length ||
				!recipe.instructions?.length
			) {
				alert("Please fill in all required fields");
				return;
			}

			try {
				setIsSubmitting(true);
				await onSubmit(
					recipe as Required<Omit<Recipe, "id" | "createdAt" | "updatedAt">>
				);
			} catch (error) {
				console.error("Error submitting recipe:", error);
				alert("Failed to save recipe. Please try again.");
			} finally {
				setIsSubmitting(false);
			}
		},
		[recipe, isSubmitting, onSubmit]
	);

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div>
				<h3 className="text-lg font-medium mb-4">Basic Information</h3>
				<div className="grid md:grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Title*
						</label>
						<input
							type="text"
							value={recipe.title}
							onChange={(e) => updateRecipe({ title: e.target.value })}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Cuisine
						</label>
						<input
							type="text"
							value={recipe.cuisine}
							onChange={(e) => updateRecipe({ cuisine: e.target.value })}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>
				</div>

				<div className="mt-4">
					<label className="block text-sm font-medium text-gray-700">
						Description*
					</label>
					<textarea
						value={recipe.description}
						onChange={(e) => updateRecipe({ description: e.target.value })}
						rows={3}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						required
					/>
				</div>

				<div className="grid md:grid-cols-3 gap-4 mt-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Prep Time (minutes)*
						</label>
						<input
							type="number"
							min="0"
							value={recipe.prepTime}
							onChange={(e) =>
								updateRecipe({ prepTime: parseInt(e.target.value) || 0 })
							}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Cook Time (minutes)*
						</label>
						<input
							type="number"
							min="0"
							value={recipe.cookTime}
							onChange={(e) =>
								updateRecipe({ cookTime: parseInt(e.target.value) || 0 })
							}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Servings*
						</label>
						<input
							type="number"
							min="1"
							value={recipe.servings}
							onChange={(e) =>
								updateRecipe({ servings: parseInt(e.target.value) || 1 })
							}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							required
						/>
					</div>
				</div>
			</div>

			<div>
				<h3 className="text-lg font-medium mb-4">Recipe Photo</h3>
				<ImageUpload
					currentImage={recipe.image}
					onImageChange={(image) => updateRecipe({ image })}
					className="max-w-lg"
				/>
			</div>

			<div>
				<h3 className="text-lg font-medium mb-4">Ingredients*</h3>
				<div className="space-y-4">
					{recipe.ingredients?.map((ing, index) => (
						<div key={index} className="flex items-center gap-2">
							<span className="flex-grow">
								{ing.quantity} {ing.unit} {ing.name}
								{ing.notes && ` (${ing.notes})`}
								{ing.isOptional && " (Optional)"}
							</span>
							<button
								type="button"
								onClick={() => removeIngredient(index)}
								className="text-red-500 hover:text-red-700"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
							</button>
						</div>
					))}

					<div className="grid md:grid-cols-4 gap-4">
						<div>
							<input
								type="text"
								value={ingredient.name}
								onChange={(e) =>
									setIngredient((prev) => ({ ...prev, name: e.target.value }))
								}
								placeholder="Ingredient name"
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							/>
						</div>
						<div>
							<input
								type="number"
								min="0"
								step="0.1"
								value={ingredient.quantity || ""}
								onChange={(e) =>
									setIngredient((prev) => ({
										...prev,
										quantity: parseFloat(e.target.value) || 0,
									}))
								}
								placeholder="Quantity"
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							/>
						</div>
						<div>
							<input
								type="text"
								value={ingredient.unit}
								onChange={(e) =>
									setIngredient((prev) => ({ ...prev, unit: e.target.value }))
								}
								placeholder="Unit (g, cups, etc.)"
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							/>
						</div>
						<div>
							<button
								type="button"
								onClick={addIngredient}
								className="mt-1 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Add Ingredient
							</button>
						</div>
					</div>
				</div>
			</div>

			<div>
				<h3 className="text-lg font-medium mb-4">Instructions*</h3>
				<div className="space-y-4">
					{recipe.instructions?.map((instruction, index) => (
						<div key={index} className="flex items-start gap-2">
							<span className="font-medium text-gray-500 mt-1">
								{index + 1}.
							</span>
							<p className="flex-grow">{instruction.instruction}</p>
							<button
								type="button"
								onClick={() => removeInstruction(index)}
								className="text-red-500 hover:text-red-700 mt-1"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
							</button>
						</div>
					))}

					<div className="flex gap-4">
						<textarea
							value={newInstruction}
							onChange={(e) => setNewInstruction(e.target.value)}
							placeholder="Enter instruction step..."
							rows={2}
							className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
						<button
							type="button"
							onClick={addInstruction}
							className="inline-flex shrink-0 justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Add Step
						</button>
					</div>
				</div>
			</div>

			<div>
				<h3 className="text-lg font-medium mb-4">Additional Details</h3>
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Tags
						</label>
						<TagInput
							tags={recipe.tags || []}
							onChange={(tags) => updateRecipe({ tags })}
							suggestions={[
								"breakfast",
								"lunch",
								"dinner",
								"dessert",
								"vegetarian",
								"vegan",
								"gluten-free",
								"quick",
								"easy",
								"healthy",
							]}
							className="mt-1"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">
							Notes (optional)
						</label>
						<textarea
							value={recipe.notes || ""}
							onChange={(e) => updateRecipe({ notes: e.target.value })}
							rows={3}
							placeholder="Add any additional notes, tips, or variations..."
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">
							Storage Instructions
						</label>
						<input
							type="text"
							value={recipe.leftoversStorageInfo || ""}
							onChange={(e) =>
								updateRecipe({ leftoversStorageInfo: e.target.value })
							}
							placeholder="e.g., Store in airtight container for up to 3 days"
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">
							Reheating Instructions
						</label>
						<input
							type="text"
							value={recipe.reheatingInstructions || ""}
							onChange={(e) =>
								updateRecipe({ reheatingInstructions: e.target.value })
							}
							placeholder="e.g., Microwave for 2 minutes or heat in oven at 350°F for 10 minutes"
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>
				</div>
			</div>

			<div>
				<div className="flex items-start">
					<div className="flex items-center h-5">
						<input
							type="checkbox"
							checked={recipe.isPublic}
							onChange={(e) => updateRecipe({ isPublic: e.target.checked })}
							className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
						/>
					</div>
					<div className="ml-3 text-sm">
						<label className="font-medium text-gray-700">
							Make recipe public
						</label>
						<p className="text-gray-500">
							Allow other family members to view this recipe
						</p>
					</div>
				</div>
			</div>

			<div className="flex justify-end gap-4 pt-4 border-t">
				<button
					type="button"
					onClick={onCancel}
					className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Cancel
				</button>
				<button
					type="submit"
					disabled={isSubmitting}
					className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#f97316] hover:bg-[#ea580c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f97316] disabled:opacity-50"
				>
					{isSubmitting ? "Saving..." : "Save Recipe"}
				</button>
			</div>
		</form>
	);
};

export default RecipeForm;
