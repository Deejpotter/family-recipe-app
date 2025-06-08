"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import netlifyIdentity, { User } from "netlify-identity-widget";

// The AuthContextType interface defines the shape of the context object for authentication.
interface AuthError {
	message: string;
	code?: string;
}

interface AuthContextType {
	user: User | null;
	login: () => Promise<void>;
	signup: () => Promise<void>;
	logout: () => Promise<void>;
	isLoading: boolean;
	error: AuthError | null;
	clearError: () => void;
}

// The default value for the AuthContext
const defaultAuthContextValue: AuthContextType = {
	user: null,
	login: async () => {},
	signup: async () => {},
	logout: async () => {},
	isLoading: true,
	error: null,
	clearError: () => {},
};

// Creating the AuthContext with the default value.
export const AuthContext = createContext<AuthContextType>(
	defaultAuthContextValue
);

// AuthProvider component that will wrap the application components
export const AuthProvider = ({ children }: { children: ReactNode }) => {	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<AuthError | null>(null);
	const router = useRouter();

	// Reset loading state on first render
	useEffect(() => {
		setIsLoading(false);
	}, []);

	useEffect(() => {
		netlifyIdentity.init({
			APIUrl: process.env.NEXT_PUBLIC_NETLIFY_IDENTITY_URL
		});

		const currentUser = netlifyIdentity.currentUser();
		setUser(currentUser);
		setIsLoading(false);

		const handleLogin = (user?: User) => {
			if (user) {
				setUser(user);
				netlifyIdentity.close();
				router.push('/dashboard');
			}
		};

		const handleLogout = () => {
			setUser(null);
			router.push('/');
		};

		netlifyIdentity.on("login", handleLogin);
		netlifyIdentity.on("logout", handleLogout);

		return () => {
			netlifyIdentity.off("login");
			netlifyIdentity.off("logout");
		};
	}, [router]);
	const clearError = () => setError(null);

	const login = async () => {
		try {
			setError(null);
			netlifyIdentity.open("login");
		} catch (err) {
			setError({ message: "Failed to login. Please try again." });
			console.error("Login error:", err);
		}
	};

	const signup = async () => {
		try {
			setError(null);
			netlifyIdentity.open("signup");
		} catch (err) {
			setError({ message: "Failed to sign up. Please try again." });
			console.error("Signup error:", err);
		}
	};

	const logout = async () => {
		try {
			setError(null);
			await netlifyIdentity.logout();
		} catch (err) {
			setError({ message: "Failed to logout. Please try again." });
			console.error("Logout error:", err);
		}
	};

	return (
		<AuthContext.Provider value={{ user, login, signup, logout, isLoading, error, clearError }}>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook to use the auth context in components.
export const useAuth = () => useContext(AuthContext);
