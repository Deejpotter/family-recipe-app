import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ShoppingListsPage() {
  // Mock data - will be replaced with actual database data
  const shoppingLists = [
    {
      id: '1',
      title: 'Weekly Groceries',
      createdAt: new Date('2025-05-24'),
      itemCount: 18,
      completedCount: 5,
    },
    {
      id: '2',
      title: 'BBQ Party',
      createdAt: new Date('2025-05-20'),
      itemCount: 12,
      completedCount: 12,
    },
    {
      id: '3',
      title: 'Birthday Cake Ingredients',
      createdAt: new Date('2025-05-18'),
      itemCount: 8,
      completedCount: 8,
    },
  ];

  // Mock current shopping list
  const currentList = {
    id: '1',
    title: 'Weekly Groceries',
    createdAt: new Date('2025-05-24'),
    items: [
      { id: '1', name: 'Milk', quantity: 1, unit: 'gallon', category: 'dairy', checked: true },
      { id: '2', name: 'Eggs', quantity: 12, unit: 'count', category: 'dairy', checked: true },
      { id: '3', name: 'Bread', quantity: 1, unit: 'loaf', category: 'bakery', checked: true },
      { id: '4', name: 'Apples', quantity: 6, unit: 'count', category: 'produce', checked: true },
      { id: '5', name: 'Chicken breast', quantity: 2, unit: 'lbs', category: 'meat', checked: true },
      { id: '6', name: 'Tomatoes', quantity: 4, unit: 'count', category: 'produce', checked: false },
      { id: '7', name: 'Pasta', quantity: 1, unit: 'box', category: 'pantry', checked: false },
      { id: '8', name: 'Onions', quantity: 3, unit: 'count', category: 'produce', checked: false },
      { id: '9', name: 'Cheese', quantity: 8, unit: 'oz', category: 'dairy', checked: false },
      { id: '10', name: 'Ground beef', quantity: 1, unit: 'lb', category: 'meat', checked: false },
      { id: '11', name: 'Rice', quantity: 1, unit: 'bag', category: 'pantry', checked: false },
      { id: '12', name: 'Carrots', quantity: 1, unit: 'bunch', category: 'produce', checked: false },
      { id: '13', name: 'Yogurt', quantity: 6, unit: 'count', category: 'dairy', checked: false },
    ]
  };

  // Group items by category
  const groupedItems = currentList.items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  // Categories in a specific order
  const categoryOrder = ['produce', 'meat', 'dairy', 'bakery', 'pantry', 'frozen', 'household'];
  
  // Calculate progress
  const progress = Math.round((currentList.items.filter(item => item.checked).length / currentList.items.length) * 100);

  return (
    <div className="flex flex-col min-h-screen">
      <Header activePage="shopping-lists" />

      {/* Main content */}
      <main className="flex-grow container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Shopping Lists</h1>
          <Link href="/shopping-lists/new" 
            className="bg-[#4f6df5] hover:bg-[#3a57d8] text-white font-medium py-2 px-4 rounded shadow transition-colors">
            Create New List
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left sidebar - List of shopping lists */}
          <div className="bg-white rounded-lg shadow p-4 md:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Your Lists</h2>
            <ul className="space-y-2">
              {shoppingLists.map((list) => (
                <li key={list.id} className={`p-3 rounded-md cursor-pointer ${list.id === currentList.id ? 'bg-blue-100' : 'hover:bg-gray-50'}`}>
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{list.title}</h3>
                      <p className="text-sm text-gray-500">{list.createdAt.toLocaleDateString()}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {list.completedCount}/{list.itemCount}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Main content - Current shopping list */}
          <div className="bg-white rounded-lg shadow p-4 md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{currentList.title}</h2>
              <div className="flex gap-2">
                <button className="text-gray-500 hover:text-[#4f6df5]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-[#4f6df5]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>{progress}% Complete</span>
                <span>{currentList.items.filter(item => item.checked).length}/{currentList.items.length} items</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            </div>

            {/* Shopping list items by category */}
            <div className="space-y-6">
              {categoryOrder.map(category => {
                if (!groupedItems[category]) return null;
                
                return (
                  <div key={category} className="border-b pb-4 last:border-0">
                    <h3 className="font-medium text-lg capitalize mb-2">{category}</h3>
                    <ul className="space-y-2">
                      {groupedItems[category].map(item => (
                        <li key={item.id} className="flex items-center">
                          <input 
                            type="checkbox" 
                            checked={item.checked} 
                            className="h-5 w-5 text-[#4f6df5] rounded mr-3"
                          />
                          <div className={`flex-grow ${item.checked ? 'line-through text-gray-400' : ''}`}>
                            <span className="font-medium">{item.name}</span>
                            <span className="text-gray-500 ml-2">{item.quantity} {item.unit}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Add item form */}
            <div className="mt-6 pt-4 border-t">
              <form className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add item..."
                  className="flex-grow px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4f6df5]"
                />
                <button 
                  type="submit"
                  className="bg-[#4f6df5] hover:bg-[#3a57d8] text-white px-4 py-2 rounded">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
