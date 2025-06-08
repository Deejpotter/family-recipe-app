"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import netlifyIdentity, { User } from "netlify-identity-widget";

// The AuthContextType interface defines the shape of the context object for authentication.
interface AuthContextType {
	user: User | null;
	login: () => void;
	signup: () => void;
	logout: () => void;
}

// The default value for the AuthContext
const defaultAuthContextValue: AuthContextType = {
	user: null,
	login: () => {},
	signup: () => {},
	logout: () => {},
};

// Creating the AuthContext with the default value.
export const AuthContext = createContext<AuthContextType>(
	defaultAuthContextValue
);

// AuthProvider component that will wrap the application components
export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		netlifyIdentity.init();

		const currentUser = netlifyIdentity.currentUser();
		setUser(currentUser);
		const handleLogin = (user?: User) => {
			if (user) {
				setUser(user);
				netlifyIdentity.close();
			}
		};

		const handleLogout = () => {
			setUser(null);
		};

		netlifyIdentity.on("login", handleLogin);
		netlifyIdentity.on("logout", handleLogout);

		return () => {
			netlifyIdentity.off("login");
			netlifyIdentity.off("logout");
		};
	}, []);

	const login = () => netlifyIdentity.open("login");
	const signup = () => netlifyIdentity.open("signup");
	const logout = () => netlifyIdentity.logout();

	return (
		<AuthContext.Provider value={{ user, login, signup, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook to use the auth context in components.
export const useAuth = () => useContext(AuthContext);
