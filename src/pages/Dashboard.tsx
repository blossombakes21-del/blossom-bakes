import { useState } from 'react';
import { Package, AlertCircle, Trash2 } from 'lucide-react';
import { useAuth } from '../lib/useAuth';
import { logAction } from '../lib/audit';

const MOCK_DATA = [
  { id: '1', name: 'Sourdough Loaf', category: 'Breads', quantity: 12, unit: 'pcs', price: 150, threshold: 5 },
  { id: '2', name: 'Croissant', category: 'Pastries', quantity: 3, unit: 'pcs', price: 80, threshold: 10 },
  { id: '3', name: 'Baguette', category: 'Breads', quantity: 24, unit: 'pcs', price: 100, threshold: 8 },
  { id: '4', name: 'Chocolate Babka', category: 'Pastries', quantity: 5, unit: 'pcs', price: 250, threshold: 5 },
  { id: '5', name: 'All-Purpose Flour', category: 'Raw Materials', quantity: 45, unit: 'kg', price: 40, threshold: 20 },
];

export default function Dashboard() {
  const { role } = useAuth();
  const [items, setItems] = useState(MOCK_DATA);
  
  const lowStockItems = items.filter(item => item.quantity <= item.threshold);

  const handleDelete = (item: any) => {
    if (role === 'employee') {
      logAction('DELETE_ATTEMPT', item.name, item.id, undefined, 'Employee attempted to delete item.');
      alert('Access Denied: You do not have permission to delete items. This attempt has been logged and the admin has been notified.');
      return;
    }
    
    // If admin
    if (confirm(`Are you sure you want to delete ${item.name}?`)) {
       logAction('DELETE_SUCCESS', item.name, item.id, undefined, 'Admin deleted item.');
       setItems(items.filter(i => i.id !== item.id));
    }
  };

  return (
    <div className="p-4 pt-8 min-h-screen bg-pink-50/50">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Overview</h1>
          <p className="text-sm text-gray-500">Role: <span className="font-semibold uppercase text-pink-500">{role}</span></p>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100 flex flex-col justify-between">
          <div className="flex items-center space-x-2 text-pink-500 mb-2">
            <Package size={20} />
            <span className="font-medium text-sm">Total Items</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">{items.length}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100 flex flex-col justify-between">
          <div className="flex items-center space-x-2 text-red-400 mb-2">
            <AlertCircle size={20} />
            <span className="font-medium text-sm">Low Stock</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">{lowStockItems.length}</span>
        </div>
      </div>

      {/* Admin Only: Recent Activity Logs */}
      {role === 'admin' && (
        <section className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
            <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-1 rounded-full">Admin Only</span>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden">
             {/* Note: We will fetch real logs here later, for now we show a placeholder or empty state to match the beautiful UI */}
             <div className="p-5 flex flex-col space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-xl border border-red-100">
                   <div className="bg-red-100 p-2 rounded-lg"><AlertCircle className="text-red-500" size={16} /></div>
                   <div>
                      <p className="text-sm font-semibold text-gray-800">Unauthorized Delete Attempt</p>
                      <p className="text-xs text-gray-500 mt-0.5">Employee tried to delete 'Croissant'.</p>
                      <p className="text-[10px] text-gray-400 mt-1">Today, 10:42 AM</p>
                   </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-xl border border-green-100">
                   <div className="bg-green-100 p-2 rounded-lg"><Package className="text-green-600" size={16} /></div>
                   <div>
                      <p className="text-sm font-semibold text-gray-800">Stock Added</p>
                      <p className="text-xs text-gray-500 mt-0.5">Added 10 Baguettes.</p>
                      <p className="text-[10px] text-gray-400 mt-1">Today, 09:15 AM</p>
                   </div>
                </div>
             </div>
          </div>
        </section>
      )}


      {/* All Inventory */}
      <section className="pb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Current Inventory</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden">
          <ul className="divide-y divide-gray-50">
            {items.map(item => (
              <li key={item.id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-xs text-gray-500">₹{item.price} / {item.unit}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${item.quantity <= item.threshold ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {item.quantity} {item.unit}
                  </div>
                  <button 
                    onClick={() => handleDelete(item)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
