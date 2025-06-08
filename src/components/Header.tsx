import Link from "next/link";

interface HeaderProps {
	activePage?: string;
}

export default function Header({ activePage }: HeaderProps) {
	return (
		<header className="bg-white shadow">
			<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
				<nav className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<Link href="/" className="text-xl font-semibold text-gray-900">
							Family Recipe App
						</Link>
						<div className="flex space-x-4">
							<Link
								href="/recipes"
								className={`text-gray-600 hover:text-gray-900 ${
									activePage === "recipes" ? "text-gray-900 font-semibold" : ""
								}`}
							>
								Recipes
							</Link>
							<Link
								href="/meal-plans"
								className={`text-gray-600 hover:text-gray-900 ${
									activePage === "meal-plans"
										? "text-gray-900 font-semibold"
										: ""
								}`}
							>
								Meal Plans
							</Link>
							<Link
								href="/shopping-lists"
								className={`text-gray-600 hover:text-gray-900 ${
									activePage === "shopping-lists"
										? "text-gray-900 font-semibold"
										: ""
								}`}
							>
								Shopping Lists
							</Link>
						</div>
					</div>
				</nav>
			</div>
		</header>
	);
}
