import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RecipesPage() {
  // Mock data - will be replaced with actual database data
  const recipes = [
    {
      id: '1',
      title: 'Spaghetti Bolognese',
      description: 'A classic Italian pasta dish with a meaty sauce.',
      prepTime: 15,
      cookTime: 45,
      servings: 4,
      tags: ['italian', 'pasta', 'dinner'],
      image: 'https://placehold.co/600x400/4f6df5/ffffff?text=Spaghetti'
    },
    {
      id: '2',
      title: 'Chicken Curry',
      description: 'A flavorful curry dish with tender chicken pieces.',
      prepTime: 20,
      cookTime: 30,
      servings: 4,
      tags: ['indian', 'spicy', 'dinner'],
      image: 'https://placehold.co/600x400/f97316/ffffff?text=Curry'
    },
    {
      id: '3',
      title: 'Chocolate Chip Cookies',
      description: 'Classic homemade cookies with chocolate chips.',
      prepTime: 15,
      cookTime: 10,
      servings: 24,
      tags: ['dessert', 'baking', 'snack'],
      image: 'https://placehold.co/600x400/4f6df5/ffffff?text=Cookies'
    },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <Header activePage="recipes" />

      {/* Main content */}
      <main className="flex-grow container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Recipes</h1>
          <Link href="/recipes/new" 
            className="bg-[#4f6df5] hover:bg-[#3a57d8] text-white font-medium py-2 px-4 rounded shadow transition-colors">
            Add New Recipe
          </Link>
        </div>

        {/* Filter and search section */}
        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <input 
                type="text" 
                placeholder="Search recipes..." 
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-gray-300 rounded">
                <option value="">All Categories</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="dessert">Dessert</option>
                <option value="snack">Snack</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded">
                <option value="">Sort By</option>
                <option value="name">Name</option>
                <option value="newest">Newest</option>
                <option value="prep-time">Prep Time</option>
              </select>
            </div>
          </div>
        </div>        {/* Recipe grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
                <p className="text-gray-600 mb-4">{recipe.description}</p>
                <div className="flex gap-4 text-sm text-gray-500 mb-4">
                  <div>Prep: {recipe.prepTime} min</div>
                  <div>Cook: {recipe.cookTime} min</div>
                  <div>Serves: {recipe.servings}</div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {recipe.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/recipes/${recipe.id}`} 
                  className="block text-center bg-[#f97316] hover:bg-[#ea580c] text-white font-medium py-2 px-4 rounded shadow transition-colors">
                  View Recipe
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
