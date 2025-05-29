import Link from "next/link";

type HeaderProps = {
	activePage?:
		| "home"
		| "recipes"
		| "meal-plans"
		| "shopping-lists"
		| "pantry"
		| "family";
};

/**
 * Header component with navigation for consistent UI across all pages
 */
export default function Header({ activePage = "home" }: HeaderProps) {
	// Navigation links for the main menu
	const navLinks = [
		{ name: "Home", href: "/", active: activePage === "home" },
		{ name: "Recipes", href: "/recipes", active: activePage === "recipes" },
		{
			name: "Meal Plans",
			href: "/meal-plans",
			active: activePage === "meal-plans",
		},
		{
			name: "Shopping Lists",
			href: "/shopping-lists",
			active: activePage === "shopping-lists",
		},
		{ name: "Pantry", href: "/pantry", active: activePage === "pantry" },
	];

	return (
		<header className="bg-[#4f6df5] text-white p-4 shadow-md">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-2xl font-bold">
					<Link href="/">Family Recipe App</Link>
				</h1>

				{/* Desktop Navigation */}
				<nav className="hidden md:block">
					<ul className="flex space-x-6">
						{navLinks.map((link) => (
							<li key={link.name}>
								<Link
									href={link.href}
									className={`hover:underline ${
										link.active ? "font-bold" : ""
									}`}
								>
									{link.name}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				{/* Mobile Menu Button */}
				<button className="md:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<line x1="3" y1="12" x2="21" y2="12"></line>
						<line x1="3" y1="6" x2="21" y2="6"></line>
						<line x1="3" y1="18" x2="21" y2="18"></line>
					</svg>
				</button>
			</div>
		</header>
	);
}
