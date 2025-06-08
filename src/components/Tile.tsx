import Link from "next/link";
import React from "react";

// TileProps defines the props that can be passed to the Tile component
export interface TileProps {
	title: string;
	description: string;
	link: string;
	linkText: string;
	icon?: string;
}

const Tile: React.FC<TileProps> = ({
	title,
	description,
	link,
	linkText,
	icon,
}) => {
	return (
		<div className="col-span-1">
			<div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
				{icon && (
					<div className="mb-4 flex justify-center">
						<span className="text-4xl">{icon}</span>
					</div>
				)}
				<h3 className="text-xl font-bold mb-2">{title}</h3>
				<p className="text-gray-600 mb-4">{description}</p>
				<Link
					href={link}
					className="inline-flex items-center text-[#4f6df5] hover:text-[#3a57d8] font-medium transition-colors"
				>
					{linkText}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="w-5 h-5 ml-1"
					>
						<path
							fillRule="evenodd"
							d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
							clipRule="evenodd"
						/>
					</svg>
				</Link>
			</div>
		</div>
	);
};

export default Tile;
