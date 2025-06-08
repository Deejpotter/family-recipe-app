"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Auth from "./Auth";

/**
 * Generic navigation item type for portability.
 * Supports dropdowns via optional 'items' array.
 */
export interface NavItem {
	name: string; // Display name
	path?: string; // URL path (for links)
	items?: NavItem[]; // Dropdown items (optional)
}

/**
 * NavbarProps defines the props required for the Navbar component.
 * - brand: Branding text or element for the navbar.
 * - navItems: Array of navigation items (links, dropdowns, etc.).
 */
export interface NavbarProps {
	brand: React.ReactNode;
	navItems: NavItem[];
}

/**
 * Navbar component - a reusable, transportable navigation bar.
 * Accepts navigation structure and branding as props, so it can be dropped into any project.
 * Handles dropdowns, active link highlighting, and mobile collapse.
 *
 * To use in a non-Next.js project, replace 'Link' with your router's link component.
 */
export default function Navbar({ brand, navItems }: NavbarProps) {
	const pathname = usePathname();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { user, isLoading } = useAuth();

	return (
		<nav className="bg-white border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex">
						<div className="flex-shrink-0 flex items-center">
							{typeof brand === "string" ? (
								<Link href={user ? "/dashboard" : "/"} className="text-xl font-semibold">
									{brand}
								</Link>
							) : (
								brand
							)}
						</div>
						{user && !isLoading && (
							<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
								{navItems.map((item) => (
									<Link
										key={item.name}
										href={item.path || "#"}
										className={`inline-flex items-center px-1 pt-1 text-sm font-medium
											${
												pathname === item.path
													? "border-b-2 border-indigo-500 text-gray-900"
													: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
											}`}
									>
										{item.name}
									</Link>
								))}
							</div>
						)}
					</div>

					{/* Auth component in the navbar */}
					<div className="hidden sm:ml-6 sm:flex sm:items-center">
						<Auth />
					</div>

					{/* Mobile menu button */}
					<div className="flex items-center sm:hidden">
						<button
							type="button"
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
							aria-controls="mobile-menu"
							aria-expanded="false"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						>
							<span className="sr-only">Open main menu</span>
							{/* Icon when menu is closed */}
							<svg
								className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
							{/* Icon when menu is open */}
							<svg
								className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>			{/* Mobile menu */}
			<div
				className={`${isMobileMenuOpen ? "block" : "hidden"} sm:hidden`}
				id="mobile-menu"
			>
				<div className="pt-2 pb-3 space-y-1">
					{user && !isLoading && navItems.map((item) => (
						<Link
							key={item.name}
							href={item.path || "#"}
							className={`block pl-3 pr-4 py-2 text-base font-medium
                ${
									pathname === item.path
										? "bg-indigo-50 border-l-4 border-indigo-500 text-indigo-700"
										: "border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
								}`}
						>
							{item.name}
						</Link>
					))}
					<div className="pl-3 pr-4 py-2">
						<Auth />
					</div>
				</div>
			</div>
		</nav>
	);
}
