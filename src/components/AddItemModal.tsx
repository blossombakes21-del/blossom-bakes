import React, { useState } from 'react';
import { X, Image as ImageIcon, Camera, Link as LinkIcon, Plus } from 'lucide-react';

const PRESETS = [
  { name: 'Belgian Truffle Cake', url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=300&q=80' },
  { name: 'Chocolate Hazelnut', url: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=300&q=80' },
  { name: 'Red Velvet Cake', url: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=300&q=80' },
  { name: 'Caramel Macchiato Cake', url: 'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&w=300&q=80' },
  { name: 'Strawberry Shortcake', url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=300&q=80' },
  { name: 'Vanilla Fruit Gateau', url: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=300&q=80' }
];

export default function AddItemModal({ isOpen, onClose, onAdd }: { isOpen: boolean, onClose: () => void, onAdd: (item: any) => void }) {
  const [imageTab, setImageTab] = useState('presets');
  const [selectedImage, setSelectedImage] = useState(PRESETS[0].url);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Cakes',
    price: '',
    initialStock: '',
    unit: 'Pcs',
    threshold: '',
    description: '',
    ingredients: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: Date.now().toString(),
      name: formData.name || 'New Item',
      category: formData.category,
      price: Number(formData.price) || 0,
      quantity: Number(formData.initialStock) || 0,
      unit: formData.unit,
      threshold: Number(formData.threshold) || 0,
      image: selectedImage,
      tags: [{ label: 'New', color: 'bg-blue-500' }]
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#e74c3c] text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Plus size={24} />
            <span>Add New Bakery Product</span>
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 bg-gray-50 flex-1">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Image Selection Section */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">Product Photo / Image</label>
              
              <div className="flex space-x-2 mb-4 border-b border-gray-100 pb-2">
                <button type="button" onClick={() => setImageTab('presets')} className={`px-4 py-2 rounded-full text-sm font-semibold transition ${imageTab === 'presets' ? 'bg-[#e74c3c] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Gallery Presets</button>
                <button type="button" onClick={() => setImageTab('upload')} className={`px-4 py-2 rounded-full text-sm font-semibold transition ${imageTab === 'upload' ? 'bg-[#e74c3c] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Upload File / Camera</button>
                <button type="button" onClick={() => setImageTab('url')} className={`px-4 py-2 rounded-full text-sm font-semibold transition ${imageTab === 'url' ? 'bg-[#e74c3c] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Image URL</button>
              </div>

              {imageTab === 'presets' && (
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-[#e74c3c] flex-shrink-0 bg-gray-100">
                    {selectedImage ? (
                      <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ImageIcon size={24} />
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 flex-1 w-full">
                    {PRESETS.map((preset) => (
                      <button 
                        key={preset.name} 
                        type="button"
                        onClick={() => setSelectedImage(preset.url)}
                        className={`text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-2 rounded-lg border transition text-center ${selectedImage === preset.url ? 'border-[#e74c3c] text-[#e74c3c] bg-red-50' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {imageTab === 'upload' && (
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-[#e74c3c] flex-shrink-0 bg-gray-100">
                    {selectedImage && selectedImage.startsWith('data:') ? (
                      <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Camera size={24} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 w-full border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition cursor-pointer relative">
                    <input 
                      type="file" 
                      accept="image/*" 
                      capture="environment"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setSelectedImage(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <Camera className="mx-auto text-gray-400 mb-2" size={24} />
                    <p className="text-sm font-semibold text-gray-600">Tap to take a photo or choose from gallery</p>
                    <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG (Max 5MB)</p>
                  </div>
                </div>
              )}

              {imageTab === 'url' && (
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-[#e74c3c] flex-shrink-0 bg-gray-100">
                    {selectedImage ? (
                      <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <LinkIcon size={24} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 w-full">
                    <label className="block text-xs font-bold text-gray-700 mb-1">Image URL</label>
                    <input 
                      type="url" 
                      value={selectedImage.startsWith('http') ? selectedImage : ''} 
                      onChange={(e) => setSelectedImage(e.target.value)} 
                      placeholder="https://example.com/image.jpg" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e74c3c] focus:ring-1 focus:ring-[#e74c3c]" 
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Form Grid */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Item Name <span className="text-[#e74c3c]">*</span></label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Royal Truffle Cake" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e74c3c] focus:ring-1 focus:ring-[#e74c3c]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category <span className="text-[#e74c3c]">*</span></label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e74c3c] focus:ring-1 focus:ring-[#e74c3c]">
                    <option>Cakes</option>
                    <option>Pastries & Slices</option>
                    <option>Cupcakes & Muffins</option>
                    <option>Beverages & Shakes</option>
                    <option>Breads & Savouries</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Price (₹)</label>
                  <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="450" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e74c3c] focus:ring-1 focus:ring-[#e74c3c]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Initial Stock</label>
                  <input type="number" required value={formData.initialStock} onChange={e => setFormData({...formData, initialStock: e.target.value})} placeholder="10" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e74c3c] focus:ring-1 focus:ring-[#e74c3c]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Unit</label>
                  <select value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e74c3c] focus:ring-1 focus:ring-[#e74c3c]">
                    <option>Pcs</option>
                    <option>Kg</option>
                    <option>Ltr</option>
                    <option>Slice</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Low Alert At</label>
                  <input type="number" required value={formData.threshold} onChange={e => setFormData({...formData, threshold: e.target.value})} placeholder="3" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e74c3c] focus:ring-1 focus:ring-[#e74c3c]" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Detailed Info / Description</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="e.g. Multi-layered dark chocolate sponge with fresh whipped cream..." className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e74c3c] focus:ring-1 focus:ring-[#e74c3c] min-h-[80px] resize-y"></textarea>
              </div>
            </div>
            
            <div className="flex justify-end pt-4 space-x-3">
              <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-200 transition">Cancel</button>
              <button type="submit" className="px-8 py-2.5 rounded-xl font-bold bg-[#e74c3c] text-white hover:bg-[#c0392b] shadow-md transition">Add Product to Inventory</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
