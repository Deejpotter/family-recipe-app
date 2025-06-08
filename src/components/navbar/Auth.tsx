"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Gravatar from "./Gravatar";

export default function Auth() {
	const { user, login, signup, logout } = useAuth();

	return (
		<div className="flex items-center gap-2">
			{user ? (
				<div className="flex items-center gap-2">
					<Gravatar email={user.email} className="w-8 h-8 rounded-full" />
					<button
						onClick={logout}
						className="px-3 py-1 text-sm text-red-600 hover:text-red-800 font-medium"
					>
						Logout
					</button>
				</div>
			) : (
				<div className="flex gap-2">
					<button
						onClick={login}
						className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 font-medium"
					>
						Login
					</button>
					<button
						onClick={signup}
						className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
					>
						Sign Up
					</button>
				</div>
			)}
		</div>
	);
}
