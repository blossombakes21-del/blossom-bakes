import { useState } from 'react';
import { Package, AlertCircle, Info, Plus, TrendingDown, TrendingUp, ShoppingBag, History, FileText, Settings, Search } from 'lucide-react';
import { useAuth } from '../lib/useAuth';
import NavigationTabs from '../components/NavigationTabs';
import CategoryPills from '../components/CategoryPills';
import TopHeader from '../components/TopHeader';
import AddItemModal from '../components/AddItemModal';

const MOCK_DATA = [
  { 
    id: '1', name: 'Belgian Dark Chocolate...', category: 'Cakes', quantity: 10, unit: 'Pcs', price: 24.99, threshold: 5,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80',
    tags: [{ label: 'Bestseller', color: 'bg-[#e74c3c]' }, { label: 'Eggless', color: 'bg-emerald-600' }]
  },
  { 
    id: '2', name: 'Royal Red Velvet...', category: 'Pastries & Slices', quantity: 15, unit: 'Slice', price: 6.5, threshold: 10,
    image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=500&q=80',
    tags: []
  },
  { 
    id: '3', name: 'Salted Caramel Hazelnut...', category: 'Cupcakes & Muffins', quantity: 20, unit: 'Pcs', price: 4.25, threshold: 8,
    image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=500&q=80',
    tags: [{ label: 'Eggless', color: 'bg-emerald-600' }]
  }
];

export default function Dashboard() {
  const { role } = useAuth();
  const [activeTab, setActiveTab] = useState('inventory');
  const [activeCategory, setActiveCategory] = useState('all');
  const [items, setItems] = useState(MOCK_DATA);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [logFilter, setLogFilter] = useState('all');

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

  const handleAddItem = (newItem: any) => {
    setItems([newItem, ...items]);
  };

  return (
    <div className="min-h-full bg-white flex flex-col font-sans">
      <TopHeader onAddNewItem={() => setIsAddModalOpen(true)} />
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'inventory' && (
        <>
          <CategoryPills activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          
          <div className="p-6 bg-gray-50/50 min-h-screen">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">All Bakery Products</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Click <span className="font-semibold text-[#e74c3c]">Remove 1</span> on any item to reduce quantity & record Blossom stock log
                </p>
              </div>
              
              {role === 'admin' && (
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center space-x-2 text-[#e74c3c] bg-red-50 px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-100 transition border border-red-100 shadow-sm"
                >
                  <Plus size={16} />
                  <span>Add Item inside Category</span>
                </button>
              )}
            </div>

            {/* Grid of Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map(item => (
                <div key={item.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all cursor-pointer relative">
                  
                  {/* Top Tags overlay */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className={`${tag.color} text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide flex items-center space-x-1 shadow-sm`}>
                        {tag.label === 'Bestseller' && <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>}
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
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-800 text-lg leading-tight truncate pr-2">{item.name}</h3>
                      <div className="text-right">
                        <p className="font-bold text-[#e74c3c]">₹{item.price}</p>
                        <p className="text-[10px] text-gray-400">Val: ₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 mb-4 line-clamp-2">Decadent 3-layer artisan cake made with 70% dark Belgian chocolate, silky cocoa ganache...</p>
                    
                    <div className="flex justify-between items-center text-xs font-bold text-gray-400 mb-2 uppercase">
                      <span>In Stock</span>
                      <span>{item.quantity} / {item.quantity} {item.unit.toUpperCase()}</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full mb-4 overflow-hidden">
                      <div className="bg-emerald-500 h-full w-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Daily Logs Tab Content */}
      {activeTab === 'logs' && (
        <div className="p-6 bg-gray-50/50 min-h-screen">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center space-x-4">
                <div className="p-3 bg-red-50 text-[#e74c3c] rounded-xl"><TrendingDown size={24} /></div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Today's Deductions</p>
                  <p className="text-2xl font-bold text-gray-800">-0 <span className="text-sm font-medium text-gray-500">Pcs</span></p>
                  <p className="text-xs font-bold text-[#e74c3c]">Val: ₹0</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center space-x-4">
                <div className="p-3 bg-emerald-50 text-emerald-500 rounded-xl"><TrendingUp size={24} /></div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Today's Restocks</p>
                  <p className="text-2xl font-bold text-gray-800">+0 <span className="text-sm font-medium text-gray-500">Pcs</span></p>
                  <p className="text-xs font-bold text-emerald-500">Val: ₹0</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center space-x-4">
                <div className="p-3 bg-blue-50 text-blue-500 rounded-xl"><ShoppingBag size={24} /></div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Today's Sales Log</p>
                  <p className="text-2xl font-bold text-blue-500">0 <span className="text-sm font-medium text-gray-500">Sold</span></p>
                  <p className="text-xs font-bold text-blue-500">₹0 Revenue</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center space-x-4">
                <div className="p-3 bg-purple-50 text-purple-500 rounded-xl"><History size={24} /></div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Log History</p>
                  <p className="text-2xl font-bold text-purple-500">1 <span className="text-sm font-medium text-gray-500">Events</span></p>
                  <p className="text-[10px] text-gray-400">Auto-saved locally & Drive</p>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-2 flex items-center justify-between">
              <div className="flex space-x-1">
                <button onClick={() => setLogFilter('all')} className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center space-x-2 transition ${logFilter === 'all' ? 'bg-[#1a202c] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                  <FileText size={16} /> <span>All Activity Logs (1)</span>
                </button>
                <button onClick={() => setLogFilter('add')} className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center space-x-2 text-emerald-600 transition ${logFilter === 'add' ? 'bg-emerald-50' : 'hover:bg-gray-100'}`}>
                  <Plus size={16} /> <span>Stock Additions Page</span>
                </button>
                <button onClick={() => setLogFilter('deduct')} className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center space-x-2 text-[#e74c3c] transition ${logFilter === 'deduct' ? 'bg-red-50' : 'hover:bg-gray-100'}`}>
                  <TrendingDown size={16} /> <span>Stock Deductions Page</span>
                </button>
              </div>
              <div className="flex items-center space-x-3 px-4 text-sm font-semibold text-gray-500">
                <span className="text-gray-800">All</span>
                <span>Today</span>
                <span>Yesterday</span>
                <select className="bg-transparent border-none outline-none font-semibold cursor-pointer">
                  <option>All Reasons</option>
                </select>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-gray-800 rounded-full"></div>
                  All Blossom Activity Logs
                  <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full ml-2">1 Entries</span>
                </h3>
                <span className="text-xs text-gray-400 font-semibold">Prices displayed in Indian Rupees (₹)</span>
              </div>

              <div className="relative pl-6 border-l-2 border-emerald-400 pb-4">
                <div className="absolute w-3 h-3 bg-emerald-400 rounded-full -left-[7px] top-1 border-2 border-white"></div>
                <div className="flex justify-between items-start bg-gray-50 border border-gray-100 p-4 rounded-2xl">
                  <div className="flex items-center space-x-4">
                    <img src={MOCK_DATA[0].image} className="w-12 h-12 rounded-xl object-cover shadow-sm" alt="Cake" />
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                        Belgian Dark Chocolate Truffle Cake
                        <span className="bg-emerald-100 text-emerald-600 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Initial Add (+10)</span>
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 font-medium">Stock: 0 → <span className="font-bold text-gray-800">10</span> <span className="italic">"Initial batch added to bakery inventory"</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-800">Thu, 30 Jul, 2026</p>
                    <p className="text-xs text-gray-400 font-semibold mb-2">09:51 PM</p>
                    <button className="text-xs font-bold text-gray-500 border border-gray-200 px-3 py-1 rounded-lg hover:bg-white transition flex items-center gap-1 justify-end w-full">
                      <RotateCw size={12} /> Undo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Categories & Hub Tab Content */}
      {activeTab === 'categories' && (
        <div className="p-6 bg-gray-50/50 min-h-screen">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Menu Categories Manager</h2>
                <p className="text-sm text-gray-500 mt-1">Manage categories, add new bakery sections & view stock levels</p>
              </div>
              {role === 'admin' && (
                <button className="flex items-center space-x-2 bg-[#e74c3c] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#c0392b] transition shadow-md">
                  <Plus size={16} />
                  <span>Add Category</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {/* Category Cards */}
               {[
                 { title: 'Cakes', desc: 'Whole cakes, signature bakes & celebration cakes', items: 1 },
                 { title: 'Pastries & Slices', desc: 'Single-serve slice cakes & tartlets', items: 1 },
                 { title: 'Cupcakes & Muffins', desc: 'Frosted cupcakes & freshly baked muffins', items: 1 },
                 { title: 'Beverages & Shakes', desc: 'Cold coffees, artisan teas & dessert shakes', items: 0 },
                 { title: 'Breads & Savories', desc: 'Artisanal sourdoughs, croissants & puffs', items: 0 }
               ].map((cat, i) => (
                 <div key={i} className="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{cat.title}</h3>
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2 min-h-[32px]">{cat.desc}</p>
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                      <span className="bg-red-50 text-[#e74c3c] text-[10px] uppercase font-bold px-3 py-1.5 rounded-full">
                        {cat.items} Items Registered
                      </span>
                      <button className="bg-gray-50 text-gray-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-gray-100 transition">
                        View Items
                      </button>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddItemModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddItem}
      />
    </div>
  );
}
