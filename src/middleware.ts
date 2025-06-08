import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of routes that don't require authentication
const publicRoutes = [
	"/",
	"/api/auth", // For authentication endpoints
	"/about",
	"/privacy-policy",
	"/terms-of-service",
];

// List of routes that are static assets
const staticRoutes = [
	"/_next",
	"/favicon.ico",
	"/manifest.json",
	"/icon",
	"/sw.js",
	"/workbox-",
];

export function middleware(request: NextRequest) {
	// Check if the path is a static asset or public route
	const isStaticRoute = staticRoutes.some((route) =>
		request.nextUrl.pathname.startsWith(route)
	);
	const isPublicRoute = publicRoutes.some(
		(route) => request.nextUrl.pathname === route
	);

	// Allow access to static assets and public routes
	if (isStaticRoute || isPublicRoute) {
		return NextResponse.next();
	}
	// Check for Netlify Identity token
	const nfToken = request.cookies.get("nf_jwt");

	// If no token is present and route requires auth, redirect to home
	if (!nfToken) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	// Continue to the route if authenticated
	return NextResponse.next();
}

// Configure which routes should be handled by the middleware
export const config = {
	matcher: [
		'/dashboard/:path*',
		'/recipes/:path*',
		'/meal-plans/:path*',
		'/shopping-lists/:path*',
		'/pantry/:path*'
	]
		/*
		 * Match all request paths except:
		 * 1. Static files (.png, .jpg, .svg, etc.)
		 * 2. Public routes
		 * 3. API routes that don't require auth
		 */
		"/((?!api/auth|_next/static|_next/image|img/|favicon.ico).*)",
	],
};
