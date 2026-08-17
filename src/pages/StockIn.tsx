import { useState, useRef } from 'react';
import { ArrowDownToLine, Save, Camera, Image as ImageIcon } from 'lucide-react';
import { logAction } from '../lib/audit';

export default function StockIn() {
  const [loading, setLoading] = useState(false);
  const [itemName, setItemName] = useState('Sourdough Loaf');
  const [quantity, setQuantity] = useState('');
  const [info, setInfo] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      // Log the action
      logAction('STOCK_IN', itemName, null, Number(quantity), `Added via form. Info: ${info}`);
      
      setLoading(false);
      alert('Stock added successfully!');
      setQuantity('');
      setInfo('');
      setImagePreview(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-pink-50 p-4 pt-8 pb-20">
      <header className="mb-6 flex items-center">
        <div className="bg-green-100 p-2 rounded-full mr-3">
          <ArrowDownToLine className="text-green-600" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Stock In</h1>
          <p className="text-sm text-gray-500">Log new additions to inventory</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-pink-100 space-y-4">
          
          {/* Image Capture Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Item Photo</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-40 rounded-xl border-2 border-dashed border-pink-200 flex flex-col items-center justify-center bg-pink-50/50 text-pink-500 cursor-pointer overflow-hidden relative hover:bg-pink-50 transition-colors"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <Camera size={32} className="mb-2" />
                  <span className="text-sm font-medium">Tap to Capture Image</span>
                </>
              )}
            </div>
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageCapture}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item</label>
            <select 
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
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
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              placeholder="0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Extra Info</label>
            <textarea 
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
              rows={3}
              placeholder="Supplier name, batch number, condition..."
            ></textarea>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-green-500 text-white font-semibold py-4 rounded-2xl hover:bg-green-600 transition-colors shadow-md flex justify-center items-center"
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
