import { Search, Plus, Cloud, Smartphone, ChefHat } from 'lucide-react';
import { useAuth } from '../lib/useAuth';

export default function TopHeader() {
  const { role } = useAuth();
  
  return (
    <div className="w-full flex flex-col shadow-sm sticky top-0 z-50 bg-white">
      {/* Red Notification Bar */}
      <div className="bg-[#e74c3c] text-white text-xs font-semibold py-1.5 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-4 uppercase tracking-wider">
          <span>BLOSSOM INVENTORY OS</span>
          <span className="hidden md:inline font-normal opacity-90 capitalize tracking-normal">Real-time bakery stock logger & sync</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Total Stock Value: ₹432.4</span>
          <button className="flex items-center space-x-1 hover:bg-white/20 px-2 py-0.5 rounded transition">
            <Smartphone size={12} />
            <span>Install APK</span>
          </button>
        </div>
      </div>

      {/* Main White Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
        
        {/* Logo & Info */}
        <div className="flex items-center space-x-3">
          <div className="bg-[#e74c3c] text-white p-2 rounded-xl shadow-sm">
            <ChefHat size={28} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-1">
              Blossom <span className="text-[#e74c3c]">Bakery</span>
            </h1>
            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
              5 PRODUCTS • 45 TOTAL UNITS (₹432.4)
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-xl mx-8 relative">
          <Search className="absolute left-3 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search cakes, pastries, ingredients..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#e74c3c] transition"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {role === 'admin' && (
            <button className="hidden sm:flex items-center space-x-1 bg-[#e74c3c] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#c0392b] transition shadow-sm">
              <Plus size={16} />
              <span>Add New Item</span>
            </button>
          )}
          <button className="hidden sm:flex items-center space-x-2 border border-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition">
            <Cloud size={16} />
            <span>Backup Drive</span>
          </button>
          <button className="p-2 border border-red-100 text-[#e74c3c] rounded-xl hover:bg-red-50 transition">
            <Smartphone size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
