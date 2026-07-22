import React, { useState } from 'react';
import { Palette, ShoppingBag, ExternalLink, Sparkles, Check, Sliders, ShieldCheck, ArrowRight, Layers, Camera, Image, Download, Sparkle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AFFILIATE_PRODUCTS } from '../data/mockData';

export default function OutfitMixer({ wardrobe, currentBudget, selectedTemplate, selectedCreator, onNavigate }) {
  // Filter strictly owned wardrobe items
  const ownedTops = wardrobe.filter(i => i.category === 'Tops');
  const ownedBottoms = wardrobe.filter(i => i.category === 'Bottoms');
  const ownedOuterwear = wardrobe.filter(i => i.category === 'Outerwear');
  const ownedShoes = wardrobe.filter(i => i.category === 'Shoes');

  const [selectedTop, setSelectedTop] = useState(ownedTops[0] || wardrobe[0] || null);
  const [selectedBottom, setSelectedBottom] = useState(ownedBottoms[0] || wardrobe[1] || null);
  const [selectedOuter, setSelectedOuter] = useState(ownedOuterwear[0] || wardrobe[3] || null);
  const [selectedShoes, setSelectedShoes] = useState(ownedShoes[0] || wardrobe[2] || null);

  const [topColor, setTopColor] = useState('#18181b'); // Black
  const [topColorName, setTopColorName] = useState('Midnight Black');

  const [showFinalPhotoModal, setShowFinalPhotoModal] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState({});

  const colorPalette = [
    { name: 'Midnight Black', hex: '#18181b' },
    { name: 'Pure White', hex: '#ffffff' },
    { name: 'Indigo Blue', hex: '#1e1b4b' },
    { name: 'Sand Beige', hex: '#d4b996' },
    { name: 'Emerald Green', hex: '#065f46' },
    { name: 'Charcoal Grey', hex: '#3f3f46' },
    { name: 'Crimson Red', hex: '#881337' },
    { name: 'Royal Purple', hex: '#581c87' }
  ];

  const budgetFilteredProducts = AFFILIATE_PRODUCTS.filter(p => p.price <= currentBudget);

  const handleBuyClick = (productId) => {
    setPurchasedItems(prev => ({ ...prev, [productId]: true }));
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleGenerateFinalLook = () => {
    setShowFinalPhotoModal(true);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.5 }
    });
  };

  return (
    <section id="mixer" className="py-16 px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Stepper / Navigation Banner */}
      <div className="flex items-center justify-between glass-panel p-3.5 px-6 rounded-2xl mb-8 border border-black/5 text-xs">
        <div className="flex items-center gap-2 font-mono text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Section 3 of 6: <strong>Owned Outfit Canvas & Recommendations</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate && onNavigate('closet')}
            className="text-slate-600 hover:text-black font-semibold flex items-center gap-1 hover:underline"
          >
            ← My Closet
          </button>
          <span className="text-slate-300">•</span>
          <button
            onClick={() => onNavigate && onNavigate('creators')}
            className="text-slate-900 font-bold flex items-center gap-1 hover:underline"
          >
            Match Body & Creators →
          </button>
        </div>
      </div>

      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs tracking-wider uppercase text-slate-700 font-semibold mb-3">
          <Palette className="w-3.5 h-3.5" /> Owned Closet Canvas & Recommendation Engine
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
          Interactive Owned Canvas & Assembled Final Look
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Assemble looks exclusively from your owned physical closet items (clothing & shoes only, no faces). Click to generate a clear top-to-bottom assembled outfit photo!
        </p>

        {selectedTemplate && (
          <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 text-white text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Template Loaded: <strong>{selectedTemplate.title}</strong>
          </div>
        )}

        {selectedCreator && (
          <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-700 text-white text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-emerald-200" /> Creator Look: <strong>{selectedCreator.name} ({selectedCreator.height}cm / {selectedCreator.waist}")</strong>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Owned Clothes Outfit Canvas */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-slate-800" /> Owned Wardrobe Canvas
                </h3>
                <span className="text-xs text-emerald-700 font-mono font-semibold">Clean Item Photos Only (No Faces/Models)</span>
              </div>
              <span className="text-xs font-mono text-slate-400">4 Items</span>
            </div>

            {/* Interactive Layered Display - strictly cropped owned items */}
            <div className="space-y-4">
              {/* Outerwear Layer */}
              <div className="glass-card p-4 rounded-2xl flex items-center justify-between gap-3 border border-slate-200 bg-white">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedOuter ? selectedOuter.image : 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80'}
                    alt="Outerwear Item"
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] uppercase font-mono font-bold">Owned Item</span>
                      <span className="text-[10px] text-slate-400 font-mono uppercase">Outerwear</span>
                    </div>
                    <h4 className="text-slate-900 font-bold text-sm">
                      {selectedOuter ? selectedOuter.name : 'Beige Double-Breasted Trench Coat'}
                    </h4>
                    <p className="text-xs text-slate-500 font-mono">
                      {selectedOuter ? selectedOuter.colorName : 'Sand Beige'}
                    </p>
                  </div>
                </div>

                {ownedOuterwear.length > 0 && (
                  <select
                    value={selectedOuter?.id || ''}
                    onChange={(e) => setSelectedOuter(ownedOuterwear.find(i => i.id === e.target.value) || null)}
                    className="bg-slate-100 border border-slate-200 rounded-xl px-2 py-1 text-xs text-slate-900 focus:outline-none"
                  >
                    {ownedOuterwear.map(item => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Top Garment Layer */}
              <div className="glass-card p-4 rounded-2xl border border-slate-300 bg-slate-50 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedTop ? selectedTop.image : 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80'}
                      alt="Top Item"
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] uppercase font-mono font-bold">Owned Item</span>
                        <span className="text-[10px] text-slate-600 font-mono uppercase font-bold">Top ("Choose Color")</span>
                      </div>
                      <h4 className="text-slate-900 font-bold text-sm">
                        {selectedTop ? selectedTop.name : 'Black Oversized Crew Tee'} ({topColorName})
                      </h4>
                    </div>
                  </div>

                  {ownedTops.length > 0 && (
                    <select
                      value={selectedTop?.id || ''}
                      onChange={(e) => setSelectedTop(ownedTops.find(i => i.id === e.target.value) || null)}
                      className="bg-white border border-slate-200 rounded-xl px-2 py-1 text-xs text-slate-900 focus:outline-none"
                    >
                      {ownedTops.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Color Swatch Picker */}
                <div className="pt-2 border-t border-slate-200 flex items-center gap-2 overflow-x-auto pb-1">
                  <span className="text-xs font-semibold text-slate-700 mr-1 whitespace-nowrap">Choose Top Color:</span>
                  {colorPalette.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setTopColor(c.hex);
                        setTopColorName(c.name);
                      }}
                      className={`w-6 h-6 rounded-full border transition-all ${
                        topColor === c.hex
                          ? 'border-black scale-125 shadow-md ring-2 ring-slate-400'
                          : 'border-slate-300 hover:scale-110'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom Garment Layer */}
              <div className="glass-card p-4 rounded-2xl border border-slate-200 bg-white flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedBottom ? selectedBottom.image : 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80'}
                      alt="Bottom Item"
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] uppercase font-mono font-bold">Owned Item</span>
                        <span className="text-[10px] text-slate-400 font-mono uppercase">Bottom</span>
                      </div>
                      <h4 className="text-slate-900 font-bold text-sm">
                        {selectedBottom ? selectedBottom.name : 'Tailored Straight Chinos'}
                      </h4>
                      <p className="text-xs text-slate-500 font-mono">
                        {selectedBottom ? selectedBottom.colorName : 'Charcoal'}
                      </p>
                    </div>
                  </div>

                  {ownedBottoms.length > 0 && (
                    <select
                      value={selectedBottom?.id || ''}
                      onChange={(e) => setSelectedBottom(ownedBottoms.find(i => i.id === e.target.value) || null)}
                      className="bg-slate-100 border border-slate-200 rounded-xl px-2 py-1 text-xs text-slate-900 focus:outline-none"
                    >
                      {ownedBottoms.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              {/* Footwear Layer */}
              <div className="glass-card p-4 rounded-2xl flex items-center justify-between gap-3 border border-slate-200 bg-white">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedShoes ? selectedShoes.image : 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80'}
                    alt="Shoe Item"
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] uppercase font-mono font-bold">Owned Item</span>
                      <span className="text-[10px] text-slate-400 font-mono uppercase">Footwear</span>
                    </div>
                    <h4 className="text-slate-900 font-bold text-sm">
                      {selectedShoes ? selectedShoes.name : 'Classic White Leather Sneakers'}
                    </h4>
                    <p className="text-xs text-slate-500 font-mono">
                      {selectedShoes ? selectedShoes.colorName : 'Pure White'}
                    </p>
                  </div>
                </div>

                {ownedShoes.length > 0 && (
                  <select
                    value={selectedShoes?.id || ''}
                    onChange={(e) => setSelectedShoes(ownedShoes.find(i => i.id === e.target.value) || null)}
                    className="bg-slate-100 border border-slate-200 rounded-xl px-2 py-1 text-xs text-slate-900 focus:outline-none"
                  >
                    {ownedShoes.map(item => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* Generate Final Photo CTA Button */}
            <div className="mt-6 pt-4 border-t border-black/5">
              <button
                onClick={handleGenerateFinalLook}
                className="w-full primary-button py-3 text-xs uppercase tracking-wider flex items-center justify-center gap-2 font-bold shadow-md"
              >
                <Camera className="w-4 h-4 text-white" /> Assembled Final Look Photo
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Our Recommendations for You to Wear */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-slate-800" /> Our Recommendations for You to Wear
                </h3>
                <p className="text-xs text-slate-500">
                  Targeted gap-filling pieces under your ${currentBudget} SGD Budget Cap
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold">
                Recommended
              </span>
            </div>

            {/* Recommended Products Cards */}
            <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
              {budgetFilteredProducts.length === 0 ? (
                <div className="text-center py-12 glass-card rounded-2xl p-6">
                  <Sliders className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-900 font-bold text-sm mb-1">No missing pieces under ${currentBudget} SGD</p>
                  <p className="text-xs text-slate-500">Increase your budget slider to view recommendations.</p>
                </div>
              ) : (
                budgetFilteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="glass-card p-3.5 rounded-2xl flex items-center justify-between gap-3 group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-sm group-hover:scale-105 transition-transform"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-slate-500 uppercase font-bold">
                          {product.merchant}
                        </span>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-mono font-bold">
                          ★ {product.rating}
                        </span>
                      </div>

                      <h4 className="text-slate-900 text-sm truncate font-bold mt-0.5">
                        {product.name}
                      </h4>

                      <p className="text-xs text-emerald-700 font-mono font-bold mt-0.5">
                        ${product.price.toFixed(2)} SGD <span className="text-[10px] text-slate-400 font-normal">(Cost to user: $0 extra)</span>
                      </p>
                    </div>

                    <button
                      onClick={() => handleBuyClick(product.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-all shadow-sm ${
                        purchasedItems[product.id]
                          ? 'bg-emerald-600 text-white'
                          : 'primary-button'
                      }`}
                    >
                      {purchasedItems[product.id] ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Purchased!
                        </>
                      ) : (
                        <>
                          Shop Now <ExternalLink className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Proceed Next Step Button */}
          <div className="mt-6 pt-4 border-t border-black/5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="flex items-center gap-1 font-medium text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-800" /> FTC/CCCS Compliant ($0 Extra Cost)
            </span>

            <button
              onClick={() => onNavigate && onNavigate('creators')}
              className="primary-button px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
            >
              Next: Body & Creator Matcher <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ASSEMBLED FINAL LOOK PHOTO COMPOSITE MODAL (Top-to-Bottom Vertical Outfit Layout, Items Only, No Faces) */}
      {showFinalPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in-up">
          <div className="glass-panel w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between max-h-[92vh]">
            <div className="flex items-center justify-between border-b border-black/5 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-black text-white">
                  <Image className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Assembled Final Outfit Look Photo
                  </h3>
                  <span className="text-xs text-emerald-700 font-mono font-bold">
                    Top-to-Bottom Itemized Assembly (No Models/Faces)
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowFinalPhotoModal(false)}
                className="p-1.5 text-slate-400 hover:text-black rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Vertical Assembled Outfit Photo Container */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col items-center justify-center relative my-2 overflow-y-auto max-h-[420px] shadow-sm space-y-4">
              <span className="text-xs font-mono uppercase font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                ✨ 100% Assembled Look Photo • Reclaimed 52 Mins
              </span>

              {/* Top-to-Bottom Clear Cropped Outfit Layout */}
              <div className="w-full flex flex-col items-center space-y-3 py-2">
                {/* 1. Outerwear Layer */}
                <div className="w-48 h-36 relative group">
                  <img
                    src={selectedOuter ? selectedOuter.image : 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80'}
                    alt="Outerwear item"
                    className="w-full h-full object-cover rounded-2xl border-2 border-slate-200 shadow-md"
                  />
                  <span className="absolute bottom-1 right-2 bg-black/70 text-white text-[9px] font-mono px-2 py-0.5 rounded-full font-bold">
                    Outerwear: {selectedOuter?.name || 'Trench Coat'}
                  </span>
                </div>

                {/* 2. Top Shirt Layer */}
                <div className="w-44 h-32 relative group">
                  <img
                    src={selectedTop ? selectedTop.image : 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80'}
                    alt="Top item"
                    className="w-full h-full object-cover rounded-2xl border-2 border-slate-200 shadow-md"
                  />
                  <span className="absolute bottom-1 right-2 bg-black/70 text-white text-[9px] font-mono px-2 py-0.5 rounded-full font-bold">
                    Top: {selectedTop?.name || 'Crew Tee'} ({topColorName})
                  </span>
                </div>

                {/* 3. Bottom Trousers Layer */}
                <div className="w-44 h-36 relative group">
                  <img
                    src={selectedBottom ? selectedBottom.image : 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80'}
                    alt="Bottom item"
                    className="w-full h-full object-cover rounded-2xl border-2 border-slate-200 shadow-md"
                  />
                  <span className="absolute bottom-1 right-2 bg-black/70 text-white text-[9px] font-mono px-2 py-0.5 rounded-full font-bold">
                    Bottom: {selectedBottom?.name || 'Straight Chinos'}
                  </span>
                </div>

                {/* 4. Shoes & Accessories Layer */}
                <div className="w-40 h-28 relative group">
                  <img
                    src={selectedShoes ? selectedShoes.image : 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80'}
                    alt="Shoe item"
                    className="w-full h-full object-cover rounded-2xl border-2 border-slate-200 shadow-md"
                  />
                  <span className="absolute bottom-1 right-2 bg-black/70 text-white text-[9px] font-mono px-2 py-0.5 rounded-full font-bold">
                    Footwear: {selectedShoes?.name || 'White Sneakers'}
                  </span>
                </div>
              </div>

              {/* Assembled Details Summary */}
              <div className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-800 space-y-1 font-sans text-center">
                <p className="font-bold text-slate-900">Full Assembled Look Checklist:</p>
                <p className="text-slate-600">🧥 {selectedOuter?.name || 'Coat'} • 👕 {selectedTop?.name || 'Top'} • 👖 {selectedBottom?.name || 'Bottom'} • 👟 {selectedShoes?.name || 'Sneakers'}</p>
              </div>
            </div>

            {/* Modal Controls */}
            <div className="flex items-center justify-between border-t border-black/5 pt-4 mt-2">
              <span className="text-xs text-slate-500 font-mono">100% Items Only • No Faces</span>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowFinalPhotoModal(false)}
                  className="secondary-button px-4 py-2 text-xs uppercase font-bold"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    confetti({ particleCount: 100, spread: 80 });
                    alert('Assembled final look photo downloaded to your device!');
                  }}
                  className="primary-button px-4 py-2 text-xs uppercase font-bold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download Final Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
