/**
 * Footer component with copyright information
 */
export default function Footer() {
	return (
		<footer className="bg-gray-100 py-8">
			<div className="container mx-auto px-6">
				<p className="text-center text-gray-600">
					© {new Date().getFullYear()} Family Recipe App. Built with ❤️ for
					personal use.
				</p>
			</div>
		</footer>
	);
}
