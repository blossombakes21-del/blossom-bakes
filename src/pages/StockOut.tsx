import { useState } from 'react';
import { ArrowUpFromLine, Save } from 'lucide-react';
import { logAction } from '../lib/audit';

export default function StockOut() {
  const [loading, setLoading] = useState(false);
  const [itemName, setItemName] = useState('Sourdough Loaf');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('Sale');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
       logAction('STOCK_OUT', itemName, null, Number(quantity), `Reason: ${reason}. Notes: ${notes}`);

      setLoading(false);
      alert('Stock deducted successfully!');
      setQuantity('');
      setNotes('');
    }, 1000);
  };

  const reasons = ['Sale', 'Wastage', 'Internal Use', 'Other'];

  return (
    <div className="min-h-screen bg-pink-50 p-4 pt-8 pb-20">
      <header className="mb-6 flex items-center">
        <div className="bg-red-100 p-2 rounded-full mr-3">
          <ArrowUpFromLine className="text-red-600" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Stock Out</h1>
          <p className="text-sm text-gray-500">Log deductions or sales</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-pink-100 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item</label>
            <select 
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none bg-white"
            >
              <option>Sourdough Loaf</option>
              <option>Croissant</option>
              <option>Baguette</option>
              <option>Chocolate Babka</option>
              <option>All-Purpose Flour</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input 
              type="number" 
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              placeholder="0"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
            <div className="grid grid-cols-2 gap-3 mb-2">
              {reasons.map((r) => (
                <button 
                  key={r}
                  type="button" 
                  onClick={() => setReason(r)}
                  className={`py-2 px-4 rounded-xl border text-sm font-medium transition-colors ${reason === r ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-700 border-gray-200 hover:bg-red-50'}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes & Info</label>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none resize-none"
              rows={2}
              placeholder="Details..."
            ></textarea>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-red-500 text-white font-semibold py-4 rounded-2xl hover:bg-red-600 transition-colors shadow-md flex justify-center items-center"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
          ) : (
            <>
              <Save className="mr-2" size={20} />
              Save Entry
            </>
          )}
        </button>
      </form>
    </div>
  );
}
