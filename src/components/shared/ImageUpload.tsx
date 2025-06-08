/**
 * ImageUpload
 * Updated: 08/06/2025
 * Author: Deej Potter
 * Description: A reusable component for uploading and previewing images
 */

import React, { useCallback } from "react";
import Image from "next/image";

interface ImageUploadProps {
	currentImage?: string;
	onImageChange: (image: string) => void;
	className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
	currentImage,
	onImageChange,
	className = "",
}) => {
	const handleImageChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (file) {
				if (file.size > 5 * 1024 * 1024) {
					alert("Image size should be less than 5MB");
					return;
				}

				const reader = new FileReader();
				reader.onloadend = () => {
					onImageChange(reader.result as string);
				};
				reader.readAsDataURL(file);
			}
		},
		[onImageChange]
	);

	const handleDrop = useCallback(
		(e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			e.stopPropagation();

			const file = e.dataTransfer.files?.[0];
			if (file && file.type.startsWith("image/")) {
				if (file.size > 5 * 1024 * 1024) {
					alert("Image size should be less than 5MB");
					return;
				}

				const reader = new FileReader();
				reader.onloadend = () => {
					onImageChange(reader.result as string);
				};
				reader.readAsDataURL(file);
			}
		},
		[onImageChange]
	);

	const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
	}, []);

	return (
		<div
			className={`relative border-2 border-dashed rounded-lg p-4 text-center ${className}`}
			onDrop={handleDrop}
			onDragOver={handleDragOver}
		>
			{currentImage ? (
				<div className="relative h-48">
					<Image
						src={currentImage}
						alt="Selected image"
						fill
						className="object-cover rounded"
					/>
					<button
						type="button"
						onClick={() => onImageChange("")}
						className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
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
			) : (
				<>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="mx-auto h-12 w-12 text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
					<p className="mt-1 text-sm text-gray-600">
						Click to upload or drag and drop
					</p>
					<p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
				</>
			)}
			<input
				type="file"
				accept="image/*"
				onChange={handleImageChange}
				className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
			/>
		</div>
	);
};

export default ImageUpload;
