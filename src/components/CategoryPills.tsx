import { UtensilsCrossed, CakeSlice, Croissant, CupSoda, Coffee, Cookie } from 'lucide-react';

export default function CategoryPills({ activeCategory, setActiveCategory }: { activeCategory: string, setActiveCategory: (cat: string) => void }) {
  const categories = [
    { id: 'all', label: 'All Menu Categories', icon: UtensilsCrossed, count: 5 },
    { id: 'Cakes', label: 'Cakes', icon: CakeSlice, count: 1 },
    { id: 'Pastries', label: 'Pastries & Slices', icon: Croissant, count: 1 },
    { id: 'Cupcakes', label: 'Cupcakes & Muffins', icon: CupSoda, count: 1 },
    { id: 'Beverages', label: 'Beverages & Shakes', icon: Coffee, count: 0 },
    { id: 'Breads', label: 'Breads & Savouries', icon: Cookie, count: 2 },
  ];

  return (
    <div className="w-full bg-white px-4 py-3 relative border-b border-gray-100">
      <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar pb-1">
        {categories.map(cat => {
          const isActive = activeCategory === cat.id;
          const Icon = cat.icon;
          
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap
                ${isActive 
                  ? 'bg-red-50 border-red-100 text-[#e74c3c]' 
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              <Icon size={16} className={isActive ? 'text-[#e74c3c]' : 'text-gray-400'} />
              <span className={`text-sm ${isActive ? 'font-bold' : 'font-semibold'}`}>{cat.label}</span>
              
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md
                ${isActive ? 'bg-[#e74c3c] text-white' : 'bg-gray-100 text-gray-500'}`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Decorative horizontal scrollbar visual */}
      <div className="mt-2 h-1.5 bg-gray-200 rounded-full w-full max-w-4xl mx-auto overflow-hidden">
        <div className="h-full w-1/3 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  );
}
