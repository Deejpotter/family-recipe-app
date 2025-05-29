import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MealPlansPage() {
  // Mock data - will be replaced with actual database data
  const currentDate = new Date();
  const weekStartDate = new Date(currentDate);
  weekStartDate.setDate(currentDate.getDate() - currentDate.getDay());
  
  const days = Array(7).fill(null).map((_, index) => {
    const date = new Date(weekStartDate);
    date.setDate(weekStartDate.getDate() + index);
    return {
      date,
      dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
      shortDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      meals: {
        breakfast: index % 3 === 0 ? 'Oatmeal with Berries' : index % 3 === 1 ? 'Avocado Toast' : 'Scrambled Eggs',
        lunch: index % 4 === 0 ? 'Chicken Salad' : index % 4 === 1 ? 'Vegetable Soup' : index % 4 === 2 ? 'Tuna Sandwich' : 'Quinoa Bowl',
        dinner: index % 5 === 0 ? 'Spaghetti Bolognese' : index % 5 === 1 ? 'Grilled Salmon' : index % 5 === 2 ? 'Chicken Curry' : index % 5 === 3 ? 'Beef Stir Fry' : 'Vegetable Lasagna',
      }
    };
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header activePage="meal-plans" />

      {/* Main content */}
      <main className="flex-grow container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Meal Plans</h1>
          <div className="flex gap-3">
            <Link href="/meal-plans/shopping-list" 
              className="bg-[#f97316] hover:bg-[#ea580c] text-white font-medium py-2 px-4 rounded shadow transition-colors">
              Generate Shopping List
            </Link>
            <Link href="/meal-plans/new" 
              className="bg-[#4f6df5] hover:bg-[#3a57d8] text-white font-medium py-2 px-4 rounded shadow transition-colors">
              Create New Plan
            </Link>
          </div>
        </div>

        {/* Week navigation */}
        <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-lg">
          <button className="flex items-center gap-1 text-[#4f6df5]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Previous Week
          </button>
          <h2 className="text-xl font-semibold">
            {weekStartDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - 
            {new Date(weekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
          </h2>
          <button className="flex items-center gap-1 text-[#4f6df5]">
            Next Week
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>

        {/* Meal plan calendar */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3 bg-gray-100 text-left"></th>
                {days.map((day) => (
                  <th key={day.shortDate} className="p-3 bg-gray-100 text-left min-w-[150px]">
                    <div className="font-bold">{day.dayName}</div>
                    <div className="text-gray-500 text-sm">{day.shortDate}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Breakfast row */}
              <tr>
                <td className="p-3 bg-gray-50 font-semibold">Breakfast</td>
                {days.map((day) => (
                  <td key={`breakfast-${day.shortDate}`} className="p-3 border border-gray-200">
                    <div className="flex justify-between items-start">
                      <span>{day.meals.breakfast}</span>
                      <button className="text-gray-400 hover:text-[#4f6df5]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
              
              {/* Lunch row */}
              <tr>
                <td className="p-3 bg-gray-50 font-semibold">Lunch</td>
                {days.map((day) => (
                  <td key={`lunch-${day.shortDate}`} className="p-3 border border-gray-200">
                    <div className="flex justify-between items-start">
                      <span>{day.meals.lunch}</span>
                      <button className="text-gray-400 hover:text-[#4f6df5]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
              
              {/* Dinner row */}
              <tr>
                <td className="p-3 bg-gray-50 font-semibold">Dinner</td>
                {days.map((day) => (
                  <td key={`dinner-${day.shortDate}`} className="p-3 border border-gray-200">
                    <div className="flex justify-between items-start">
                      <span>{day.meals.dinner}</span>
                      <button className="text-gray-400 hover:text-[#4f6df5]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
}
