import { useState } from 'react';
import { Package, AlertCircle, Info, Plus } from 'lucide-react';
import { useAuth } from '../lib/useAuth';
import NavigationTabs from '../components/NavigationTabs';
import CategoryPills from '../components/CategoryPills';

const MOCK_DATA = [
  { 
    id: '1', name: 'Chocolate Truffle Cake', category: 'Cakes', quantity: 10, unit: 'Pcs', price: 550, threshold: 5,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80',
    tags: [{ label: 'Bestseller', color: 'bg-[#e74c3c]' }, { label: 'Eggless', color: 'bg-emerald-600' }]
  },
  { 
    id: '2', name: 'Butter Croissant', category: 'Pastries', quantity: 3, unit: 'Pcs', price: 80, threshold: 10,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f40ce88f4?auto=format&fit=crop&w=500&q=80',
    tags: [{ label: 'Fresh', color: 'bg-blue-500' }]
  },
  { 
    id: '3', name: 'Vanilla Cupcake', category: 'Cupcakes', quantity: 24, unit: 'Pcs', price: 60, threshold: 8,
    image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=500&q=80',
    tags: [{ label: 'Eggless', color: 'bg-emerald-600' }]
  },
  { 
    id: '4', name: 'Sourdough Loaf', category: 'Breads', quantity: 12, unit: 'Pcs', price: 150, threshold: 5,
    image: 'https://images.unsplash.com/photo-1589367920969-abceafd9eca1?auto=format&fit=crop&w=500&q=80',
    tags: []
  }
];

export default function Dashboard() {
  const { role } = useAuth();
  const [activeTab, setActiveTab] = useState('inventory');
  const [activeCategory, setActiveCategory] = useState('all');
  const [items, setItems] = useState(MOCK_DATA);

  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const handleRemoveOne = (id: string) => {
    setItems(items.map(item => {
      if (item.id === id && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }));
  };

  return (
    <div className="min-h-full bg-white flex flex-col">
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'inventory' && (
        <>
          <CategoryPills activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          
          <div className="p-6">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{activeCategory === 'all' ? 'All Items' : activeCategory}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Click <span className="font-semibold text-[#e74c3c]">Remove 1</span> on any item to reduce quantity & record Blossom stock log
                </p>
              </div>
              
              {role === 'admin' && (
                <button className="flex items-center space-x-2 text-[#e74c3c] bg-red-50 px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-100 transition">
                  <Plus size={16} />
                  <span>Add Item inside {activeCategory === 'all' ? 'Inventory' : activeCategory}</span>
                </button>
              )}
            </div>

            {/* Grid of Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map(item => (
                <div key={item.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all cursor-pointer relative">
                  
                  {/* Top Tags overlay */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className={`${tag.color} text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide flex items-center space-x-1 shadow-sm`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                        <span>{tag.label}</span>
                      </span>
                    ))}
                  </div>

                  {/* Category overlay */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                      {item.category}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="h-48 w-full overflow-hidden relative bg-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    
                    {/* Bottom overlay for Quantity */}
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-white text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                        {item.quantity} {item.unit} Remaining
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/90 p-1.5 rounded-full shadow-md text-gray-500 hover:text-gray-800 transition">
                      <Info size={16} />
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="p-4 bg-white flex flex-col justify-between flex-1">
                    <h3 className="font-bold text-gray-800 text-lg leading-tight mb-4">{item.name}</h3>
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleRemoveOne(item.id); }}
                      className="w-full py-2 border-2 border-red-50 text-[#e74c3c] font-bold rounded-xl hover:bg-red-50 transition-colors"
                    >
                      Remove 1
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Daily Logs Tab Content */}
      {activeTab === 'logs' && (
        <div className="p-6 max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Blossom Daily Logs</h2>
          {role === 'admin' ? (
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="bg-red-50 p-3 rounded-xl"><AlertCircle className="text-red-500" size={20} /></div>
                <div>
                  <p className="font-bold text-gray-800">Unauthorized Delete Attempt</p>
                  <p className="text-sm text-gray-500 mt-1">Employee tried to delete 'Croissant'.</p>
                  <p className="text-xs text-gray-400 mt-2 font-medium">Today, 10:42 AM</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="bg-green-50 p-3 rounded-xl"><Package className="text-green-600" size={20} /></div>
                <div>
                  <p className="font-bold text-gray-800">Stock Added</p>
                  <p className="text-sm text-gray-500 mt-1">Added 10 Baguettes.</p>
                  <p className="text-xs text-gray-400 mt-2 font-medium">Today, 09:15 AM</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 text-center">
              <AlertCircle className="mx-auto text-gray-400 mb-3" size={32} />
              <h3 className="font-bold text-gray-700">Access Denied</h3>
              <p className="text-gray-500 text-sm mt-1">Only admins can view the daily logs.</p>
            </div>
          )}
        </div>
      )}

      {/* Categories & Hub Tab Content */}
      {activeTab === 'categories' && (
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Categories Hub</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {/* Placeholder for Hub */}
             <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center hover:bg-gray-100 cursor-pointer transition">
                <p className="font-bold text-gray-700">Manage Categories</p>
             </div>
             <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center hover:bg-gray-100 cursor-pointer transition">
                <p className="font-bold text-gray-700">Analytics</p>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}
