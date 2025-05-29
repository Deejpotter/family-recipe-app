// filepath: c:\Users\Deej\Repos\family-recipe-app\src\app\page.tsx
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header activePage="home" />

			{/* Main content */}
			<main className="flex-grow container mx-auto p-6">
				{/* Hero section */}
				<section className="text-center py-12">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						Your Personal Recipe Collection
					</h1>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
						Store your favorite recipes, create meal plans, and simplify grocery
						shopping
					</p>
					<div className="flex flex-col sm:flex-row justify-center gap-4">
						<Link
							href="/recipes"
							className="bg-[#4f6df5] hover:bg-[#3a57d8] text-white font-bold py-3 px-6 rounded-full shadow-lg transition-colors"
						>
							Browse Recipes
						</Link>
						<Link
							href="/recipes/new"
							className="bg-white hover:bg-gray-100 text-[#4f6df5] font-bold py-3 px-6 rounded-full shadow-lg border border-[#4f6df5] transition-colors"
						>
							Add New Recipe
						</Link>
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
							<div className="text-[#f97316] mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="40"
									height="40"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M12 2L2 7l10 5 10-5-10-5z"></path>
									<path d="M2 17l10 5 10-5"></path>
									<path d="M2 12l10 5 10-5"></path>
								</svg>
							</div>
							<h3 className="text-xl font-bold mb-2">Recipe Collection</h3>
							<p className="text-gray-600">
								Store and organize all your favorite family recipes in one
								place.
							</p>
						</div>

						{/* Meal Planning */}
						<div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
							<div className="text-[#4f6df5] mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="40"
									height="40"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
									<line x1="16" y1="2" x2="16" y2="6"></line>
									<line x1="8" y1="2" x2="8" y2="6"></line>
									<line x1="3" y1="10" x2="21" y2="10"></line>
								</svg>
							</div>
							<h3 className="text-xl font-bold mb-2">Meal Planning</h3>
							<p className="text-gray-600">
								Create weekly and monthly meal plans based on your preferences.
							</p>
						</div>

						{/* Shopping Lists */}
						<div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
							<div className="text-[#f97316] mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="40"
									height="40"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
									<line x1="3" y1="6" x2="21" y2="6"></line>
									<path d="M16 10a4 4 0 0 1-8 0"></path>
								</svg>
							</div>
							<h3 className="text-xl font-bold mb-2">Shopping Lists</h3>
							<p className="text-gray-600">
								Automatically generate shopping lists from your meal plans.
							</p>
						</div>

						{/* Pantry Inventory */}
						<div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
							<div className="text-[#4f6df5] mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="40"
									height="40"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<polyline points="21 8 21 21 3 21 3 8"></polyline>
									<rect x="1" y="3" width="22" height="5"></rect>
									<line x1="10" y1="12" x2="14" y2="12"></line>
								</svg>
							</div>
							<h3 className="text-xl font-bold mb-2">Pantry Inventory</h3>
							<p className="text-gray-600">
								Track what ingredients you have on hand and get notified when
								you're running low.
							</p>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
