import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/navbar/Navbar";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const metadata: Metadata = {
	title: "Family Recipe App",
	description: "Personal family recipe manager and meal planner",
	manifest: "/manifest.json",
	themeColor: "#4f6df5",
	viewport: "width=device-width, initial-scale=1, maximum-scale=1",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: "Recipe App",
	},
};

// Navigation items
const navItems = [
	{ name: "Recipes", path: "/recipes" },
	{ name: "Meal Plans", path: "/meal-plans" },
	{ name: "Shopping Lists", path: "/shopping-lists" },
	{ name: "Pantry", path: "/pantry" },
];

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
			<body className="min-h-screen bg-gray-50">
				<AuthProvider>
					<div className="flex flex-col min-h-screen">
						<Navbar brand="Family Recipe App" navItems={navItems} />
						<main className="flex-grow">{children}</main>
					</div>
				</AuthProvider>
			</body>
		</html>
	);
}
