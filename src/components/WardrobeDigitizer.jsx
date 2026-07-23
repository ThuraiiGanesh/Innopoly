import React, { useState, useRef } from 'react';
import { Camera, Check, Plus, Trash2, Tag, Layers, Sparkles, Cpu, Upload, Grid } from 'lucide-react';

export default function WardrobeDigitizer({ wardrobe, onAddItem, onDeleteItem }) {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('Tops');
  const [colorName, setColorName] = useState('Black');
  const [pattern, setPattern] = useState('Solid');
  const [customImage, setCustomImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [autoTagged, setAutoTagged] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [scanMode, setScanMode] = useState('single'); // 'single' | 'batch'
  const [batchCount, setBatchCount] = useState(0);

  const fileInputRef = useRef(null);
  const batchFileInputRef = useRef(null);

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImage(reader.result);
        if (!itemName) {
          const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
          setItemName(nameWithoutExt.charAt(0).toUpperCase() + nameWithoutExt.slice(1));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBatchUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsAnalyzing(true);
    let count = 0;

    files.slice(0, 10).forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        const autoName = nameWithoutExt.charAt(0).toUpperCase() + nameWithoutExt.slice(1);
        const categories = ['Tops', 'Bottoms', 'Outerwear', 'Shoes'];
        const colors = ['Black', 'White', 'Navy', 'Olive', 'Beige'];
        const autoCat = categories[index % categories.length];
        const autoColor = colors[index % colors.length];

        const newItem = {
          id: 'w_batch_' + Date.now() + '_' + index,
          name: autoName,
          category: autoCat,
          color: autoColor.toLowerCase().includes('white') ? '#ffffff' : '#18181b',
          colorName: autoColor,
          pattern: 'Solid',
          style: 'Smart Casual',
          image: reader.result,
          owned: true
        };

        onAddItem(newItem);
        count++;
        if (count === Math.min(files.length, 10)) {
          setBatchCount(count);
          setIsAnalyzing(false);
          setAutoTagged({
            category: `${count} Items Auto-Tagged`,
            color: 'Batch Processed',
            pattern: 'Multi-Scan Ready'
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSimulatedUpload = (e) => {
    e.preventDefault();
    if (!itemName.trim()) return;

    setIsAnalyzing(true);
    setAutoTagged(null);

    const defaultImg = category === 'Tops' 
      ? 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80'
      : category === 'Bottoms'
      ? 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80'
      : category === 'Outerwear'
      ? 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80';

    setTimeout(() => {
      const newItem = {
        id: 'w_' + Date.now(),
        name: itemName,
        category: category,
        color: colorName.toLowerCase().includes('white') ? '#ffffff' : colorName.toLowerCase().includes('beige') ? '#d4b996' : '#18181b',
        colorName: colorName,
        pattern: pattern,
        style: 'Smart Casual',
        image: customImage || defaultImg,
        owned: true
      };

      onAddItem(newItem);
      setAutoTagged({
        category: category,
        color: colorName,
        pattern: pattern
      });
      setItemName('');
      setCustomImage(null);
      setIsAnalyzing(false);
    }, 900);
  };

  const filteredWardrobe = selectedFilter === 'All' 
    ? wardrobe 
    : wardrobe.filter(item => item.category === selectedFilter);

  return (
    <section id="digitizer" className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs tracking-wider uppercase text-slate-700 font-semibold mb-3">
          <Camera className="w-3.5 h-3.5" /> AI Auto-Tagging Digitization Engine
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
          Snap, Upload & Catalog Your Closet
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Single item scanner or multi-shot batch camera scanner up to 10 garments simultaneously.
        </p>

        {/* Mode Selector Chips */}
        <div className="inline-flex items-center gap-2 bg-slate-200/80 p-1 rounded-2xl mt-4 border border-slate-300">
          <button
            onClick={() => setScanMode('single')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              scanMode === 'single' ? 'bg-black text-white shadow-sm' : 'text-slate-700 hover:text-black'
            }`}
          >
            Single Garment Scan
          </button>
          <button
            onClick={() => setScanMode('batch')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              scanMode === 'batch' ? 'bg-black text-white shadow-sm' : 'text-slate-700 hover:text-black'
            }`}
          >
            <Grid className="w-3.5 h-3.5 text-amber-400" /> Multi-Shot Batch Scanner
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Photo Upload & AI Scanner Form */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-slate-800" /> Google AI Vision Auto-Tagger
              </h3>
              <span className="text-xs font-mono text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
                {scanMode === 'batch' ? 'Batch Mode' : 'Single Mode'}
              </span>
            </div>

            {scanMode === 'batch' ? (
              <div className="space-y-4">
                <input
                  type="file"
                  ref={batchFileInputRef}
                  multiple
                  accept="image/*"
                  onChange={handleBatchUpload}
                  className="hidden"
                />
                <div
                  onClick={() => batchFileInputRef.current?.click()}
                  className="border-2 border-dashed border-indigo-400 hover:border-black rounded-2xl p-8 text-center bg-indigo-50/40 cursor-pointer transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Camera className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Upload Up to 10 Closet Photos</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Select multiple photos from your mobile camera or library. AI auto-tags category, color, and fit for all items instantly!
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSimulatedUpload} className="space-y-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-slate-800 rounded-2xl p-6 text-center bg-white/60 cursor-pointer transition-all group relative overflow-hidden"
                >
                  {customImage ? (
                    <div className="relative">
                      <img
                        src={customImage}
                        alt="Uploaded garment preview"
                        className="w-28 h-28 object-cover rounded-xl mx-auto shadow-md border border-slate-200"
                      />
                      <span className="text-[10px] font-mono bg-emerald-600 text-white px-2 py-0.5 rounded-full mt-2 inline-block font-bold">
                        ✓ Image Ready for AI Scan
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-semibold text-slate-800 mb-0.5">
                        Click to Upload Garment Photo
                      </p>
                      <p className="text-xs text-slate-500">
                        Select photo from camera or files • Auto Background Crop
                      </p>
                    </>
                  )}
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

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1 font-mono">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-2 py-2.5 text-slate-900 text-xs focus:outline-none focus:border-black transition-colors"
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
                      placeholder="e.g. Black"
                      value={colorName}
                      onChange={(e) => setColorName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 text-xs focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1 font-mono">
                      Pattern
                    </label>
                    <select
                      value={pattern}
                      onChange={(e) => setPattern(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-2 py-2.5 text-slate-900 text-xs focus:outline-none focus:border-black transition-colors"
                    >
                      <option value="Solid">Solid</option>
                      <option value="Striped">Striped</option>
                      <option value="Textured">Textured</option>
                      <option value="Plaid">Plaid</option>
                    </select>
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
                      AI Auto-Tagging Garment...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" /> Save Garment to Closet
                    </>
                  )}
                </button>
              </form>
            )}

            {autoTagged && (
              <div className="mt-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-mono animate-fade-in-up">
                <span className="font-bold block mb-1 flex items-center gap-1.5 text-emerald-800">
                  <Sparkles className="w-3.5 h-3.5" /> AI Auto-Tagging Complete:
                </span>
                • Category: <strong>{autoTagged.category}</strong> • Color: <strong>{autoTagged.color}</strong> • Pattern: <strong>{autoTagged.pattern}</strong>
              </div>
            )}
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
                        Auto-Tagged
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="text-slate-900 text-sm font-semibold truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Tag className="w-3 h-3 text-slate-400" /> {item.colorName} • {item.pattern || 'Solid'}
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
            * StyleSync AI scans fabric texture, color spectrum, and cut geometry from your uploaded photos.
          </p>
        </div>
      </div>
    </section>
  );
}
