"use client";

import { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Recipe, MealPlan, PlannedMeal } from "@/types/recipe/recipe-types";
import { optimizeMealPlan } from "@/utils/meal-planning";
import DataService from "@/utils/data/DataService";

export default function CreateMealPlanPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedRecipes, setSelectedRecipes] = useState<{[key: string]: Recipe}>({});
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreatePlan = async () => {
    try {
      if (!startDate || !endDate) {
        setError('Please select both start and end dates');
        return;
      }

      setLoading(true);
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Create a basic meal plan
      const newPlan: Omit<MealPlan, 'id'> = {
        startDate: start,
        endDate: end,
        meals: [],
        title: `Meal Plan ${start.toLocaleDateString()} - ${end.toLocaleDateString()}`,
      };

      // Optimize the plan to add leftover suggestions
      const optimizedPlan = optimizeMealPlan(newPlan as MealPlan);

      const res = await DataService.mealPlans.create(optimizedPlan, 'current-user'); // TODO: Get actual user ID
      if (res.success) {
        setMealPlan(res.data);
        // Generate shopping list
        const shoppingList = await DataService.mealPlans.generateShoppingList(res.data.id, 'current-user');
      }
    } catch (err) {
      setError('Failed to create meal plan');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header activePage="meal-plans" />
      
      <main className="flex-grow container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Create New Meal Plan</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4f6df5]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4f6df5]"
              />
            </div>
          </div>

          {/* Recipe Selection will go here */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Select Recipes</h2>
            {/* TODO: Add recipe selection component */}
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <button
            onClick={handleCreatePlan}
            disabled={loading}
            className={`w-full bg-[#4f6df5] hover:bg-[#3a57d8] text-white font-medium py-3 px-4 rounded shadow transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Creating Plan...' : 'Create Plan'}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
