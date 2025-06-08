declare module "netlify-identity-widget" {
	export interface User {
		id: string;
		email: string;
		user_metadata: {
			full_name?: string;
			avatar_url?: string;
		};
		app_metadata: {
			roles?: string[];
		};
	}

	interface Settings {
		autoclose?: boolean;
		locale?: string;
	}

	interface InitOptions {
		container?: string | HTMLElement;
		APIUrl?: string;
		locale?: string;
	}
	interface NetlifyIdentityAPI {
		init(options?: InitOptions): void;
		open(type?: "login" | "signup"): void;
		close(): void;
		logout(callback?: () => void): void;
		refresh(callback?: (jwt: string) => void): void;
		currentUser(): User | null;
		on(event: string, callback: (user?: User) => void): void;
		off(event: string): void;
		store: {
			user: {
				set(user: User): void;
				get(): User | null;
			};
		};
	}

	declare const netlifyIdentity: NetlifyIdentityAPI;
	export default netlifyIdentity;
}
