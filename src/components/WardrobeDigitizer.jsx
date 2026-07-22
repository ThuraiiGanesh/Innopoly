import React, { useState } from 'react';
import { Camera, Check, Plus, Trash2, Tag, Layers, Sparkles } from 'lucide-react';

export default function WardrobeDigitizer({ wardrobe, onAddItem, onDeleteItem }) {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('Tops');
  const [colorName, setColorName] = useState('Black');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const handleSimulatedUpload = (e) => {
    e.preventDefault();
    if (!itemName.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      onAddItem({
        id: 'w_' + Date.now(),
        name: itemName,
        category: category,
        color: colorName.toLowerCase().includes('white') ? '#ffffff' : colorName.toLowerCase().includes('beige') ? '#d4b996' : '#18181b',
        colorName: colorName,
        style: 'Smart Casual',
        image: category === 'Tops' 
          ? 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80'
          : category === 'Bottoms'
          ? 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80'
          : category === 'Outerwear'
          ? 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
        owned: true
      });
      setItemName('');
      setIsAnalyzing(false);
    }, 1000);
  };

  const filteredWardrobe = selectedFilter === 'All' 
    ? wardrobe 
    : wardrobe.filter(item => item.category === selectedFilter);

  return (
    <section id="digitizer" className="py-16 px-6 max-w-7xl mx-auto scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs tracking-wider uppercase text-slate-700 font-semibold mb-3">
          <Camera className="w-3.5 h-3.5" /> Wardrobe Digitization Engine
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
          Snap, Upload & Catalog Your Closet
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Digitize your physical clothing inventory in seconds. StyleSync prioritizes the garments you already own before suggesting any new purchases.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Photo Upload & AI Scanner Form */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-slate-800" /> AI Photo Analyzer
              </h3>
              <span className="text-xs font-mono text-slate-400">Step 1 of 3</span>
            </div>

            <form onSubmit={handleSimulatedUpload} className="space-y-4">
              {/* Photo Upload Dropzone Simulation */}
              <div className="border-2 border-dashed border-slate-300 hover:border-slate-800 rounded-2xl p-6 text-center bg-white/60 cursor-pointer transition-all group">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-800 mb-0.5">
                  Click to Take Photo or Drag Image
                </p>
                <p className="text-xs text-slate-500">
                  Supports JPG, PNG, WEBP • Background Auto-Removed
                </p>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1 font-mono">
                  Garment Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vintage Black Oversized Tee"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1 font-mono">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-black transition-colors"
                  >
                    <option value="Tops">Tops</option>
                    <option value="Bottoms">Bottoms</option>
                    <option value="Outerwear">Outerwear</option>
                    <option value="Shoes">Shoes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1 font-mono">
                    Color
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Charcoal Black"
                    value={colorName}
                    onChange={(e) => setColorName(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isAnalyzing || !itemName.trim()}
                className="w-full primary-button py-3 text-xs uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing Cut & Color...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" /> Add Garment to Closet
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-6 pt-4 border-t border-black/5 text-xs text-slate-500 flex items-center justify-between">
            <span>Digitized Count: <strong className="text-slate-900 font-bold">{wardrobe.length} Items</strong></span>
            <span className="text-emerald-600 flex items-center gap-1 font-semibold"><Check className="w-3.5 h-3.5" /> Ready for AI</span>
          </div>
        </div>

        {/* Digital Closet Grid */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-black/5 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-800" /> Digitized Closet Collection
              </h3>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                {['All', 'Tops', 'Bottoms', 'Outerwear', 'Shoes'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedFilter(cat)}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      selectedFilter === cat
                        ? 'bg-white text-black shadow-sm font-bold'
                        : 'text-slate-500 hover:text-black'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Closet Display Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-1">
              {filteredWardrobe.map((item) => (
                <div
                  key={item.id}
                  className="glass-card p-3.5 rounded-2xl flex items-center gap-3 group relative"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl border border-slate-200 shadow-sm group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] uppercase font-mono font-bold">
                        Owned
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="text-slate-900 text-sm font-semibold truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Tag className="w-3 h-3 text-slate-400" /> {item.colorName} • {item.style}
                    </p>
                  </div>

                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-6 pt-4 border-t border-black/5 italic text-center">
            * StyleSync AI reads fabric texture, color spectrum, and cut geometry from your uploaded photos.
          </p>
        </div>
      </div>
    </section>
  );
}
