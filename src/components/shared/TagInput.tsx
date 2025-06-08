/**
 * TagInput
 * Updated: 08/06/2025
 * Author: Deej Potter
 * Description: A reusable input component for managing tags
 */

import React, { useState, useRef } from "react";

interface TagInputProps {
	tags: string[];
	onChange: (tags: string[]) => void;
	suggestions?: string[];
	placeholder?: string;
	className?: string;
}

const TagInput: React.FC<TagInputProps> = ({
	tags,
	onChange,
	suggestions = [],
	placeholder = "Add tags...",
	className = "",
}) => {
	const [inputValue, setInputValue] = useState("");
	const [showSuggestions, setShowSuggestions] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();
			addTag(inputValue);
		} else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
			removeTag(tags[tags.length - 1]);
		}
	};

	const addTag = (tag: string) => {
		const normalizedTag = tag.trim().toLowerCase();
		if (normalizedTag && !tags.includes(normalizedTag)) {
			onChange([...tags, normalizedTag]);
			setInputValue("");
		}
	};

	const removeTag = (tagToRemove: string) => {
		onChange(tags.filter((tag) => tag !== tagToRemove));
	};

	const filteredSuggestions = suggestions.filter(
		(suggestion) =>
			!tags.includes(suggestion.toLowerCase()) &&
			suggestion.toLowerCase().includes(inputValue.toLowerCase())
	);

	return (
		<div className="relative">
			<div
				className={`flex flex-wrap gap-2 p-2 border rounded-md bg-white ${
					showSuggestions ? "border-indigo-500" : "border-gray-300"
				} ${className}`}
				onClick={() => inputRef.current?.focus()}
			>
				{tags.map((tag) => (
					<div
						key={tag}
						className="flex items-center gap-1 bg-gray-100 text-gray-800 px-2 py-1 rounded"
					>
						<span className="text-sm">{tag}</span>
						<button
							type="button"
							onClick={() => removeTag(tag)}
							className="text-gray-500 hover:text-gray-700"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
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
				))}
				<input
					ref={inputRef}
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handleKeyDown}
					onFocus={() => setShowSuggestions(true)}
					onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
					placeholder={tags.length === 0 ? placeholder : ""}
					className="flex-grow outline-none text-sm min-w-[120px]"
				/>
			</div>
			{showSuggestions && filteredSuggestions.length > 0 && (
				<div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
					{filteredSuggestions.map((suggestion) => (
						<button
							key={suggestion}
							type="button"
							onClick={() => addTag(suggestion)}
							className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						>
							{suggestion}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default TagInput;
