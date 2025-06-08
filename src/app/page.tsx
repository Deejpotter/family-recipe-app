// filepath: c:\Users\Deej\Repos\family-recipe-app\src\app\page.tsx
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {	const { user, isLoading, error, clearError, login, signup } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (user && !isLoading) {
			router.push("/dashboard");
		}
	}, [user, isLoading, router]);

	useEffect(() => {
		if (error) {
			const timer = setTimeout(clearError, 5000);
			return () => clearTimeout(timer);
		}
	}, [error, clearError]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#4f6df5]"></div>
			</div>
		);
	}

	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow container mx-auto p-6">
				{/* Hero section */}
				<section className="text-center py-12">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						Simplify Your Meal Planning
					</h1>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
						Your family's recipe collection, meal planner, and shopping assistant - all in one place.
					</p>					<div className="flex flex-col sm:flex-row justify-center gap-4">
						<button
							onClick={signup}
							className="bg-[#4f6df5] hover:bg-[#3a57d8] text-white font-bold py-3 px-6 rounded-full shadow-lg transition-colors"
						>
							Get Started
						</button>
						<button
							onClick={login}
							className="bg-white hover:bg-gray-100 text-[#4f6df5] font-bold py-3 px-6 rounded-full shadow-lg border border-[#4f6df5] transition-colors"
						>
							Sign In
						</button>
					</div>
				</section>

				{/* Feature highlights */}
				<section className="py-12">
					<h2 className="text-3xl font-bold text-center mb-10">
						What You Can Do
					</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{/* Recipe Management */}
						<div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
							<div className="text-[#f97316] mb-4 flex justify-center">
								<span className="text-4xl">📖</span>
							</div>
							<h3 className="text-xl font-bold mb-2 text-center">Recipe Collection</h3>
							<p className="text-gray-600 text-center">
								Store and organize all your favorite family recipes in one place.
							</p>
						</div>

						{/* Meal Planning */}
						<div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
							<div className="text-[#4f6df5] mb-4 flex justify-center">
								<span className="text-4xl">📅</span>
							</div>
							<h3 className="text-xl font-bold mb-2 text-center">Meal Planning</h3>
							<p className="text-gray-600 text-center">
								Create weekly and monthly meal plans based on your preferences.
							</p>
						</div>

						{/* Shopping Lists */}
						<div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
							<div className="text-[#f97316] mb-4 flex justify-center">
								<span className="text-4xl">🛒</span>
							</div>
							<h3 className="text-xl font-bold mb-2 text-center">Shopping Lists</h3>
							<p className="text-gray-600 text-center">
								Automatically generate shopping lists from your meal plans.
							</p>
						</div>

						{/* Pantry Inventory */}
						<div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
							<div className="text-[#4f6df5] mb-4 flex justify-center">
								<span className="text-4xl">🏠</span>
							</div>
							<h3 className="text-xl font-bold mb-2 text-center">Pantry Inventory</h3>
							<p className="text-gray-600 text-center">
								Track what ingredients you have and get low stock alerts.
							</p>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
