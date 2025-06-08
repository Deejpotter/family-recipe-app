/**
 * Recipe Types for MongoDB
 * Updated: 08/06/2025
 * Author: Deej Potter
 * Description: MongoDB-specific type definitions for recipes
 */

import { Types } from "mongoose";
import { MongoDocument } from "./mongo-types";
import {
	BaseRecipe,
	BaseIngredient,
	BaseRecipeCategory,
} from "../domain/recipe";

/**
 * MongoDB-specific recipe ingredient interface
 */
export interface Ingredient extends BaseIngredient {
	id: string;
}

/**
 * MongoDB-specific recipe interface
 * Extends base recipe type with MongoDB-specific fields
 */
export interface Recipe extends BaseRecipe, MongoDocument {
	_id: Types.ObjectId | string;
	ingredients: Ingredient[];
}
