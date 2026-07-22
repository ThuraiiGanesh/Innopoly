import React, { useState } from 'react';
import { Palette, ShoppingBag, ExternalLink, Sparkles, Check, Sliders, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AFFILIATE_PRODUCTS } from '../data/mockData';

export default function OutfitMixer({ wardrobe, currentBudget, selectedTemplate, selectedCreator }) {
  const [topColor, setTopColor] = useState('#18181b'); // Black
  const [topColorName, setTopColorName] = useState('Midnight Black');
  const [bottomColor, setBottomColor] = useState('#1e1b4b'); // Indigo
  const [bottomColorName, setBottomColorName] = useState('Indigo Blue');
  const [outerColor, setOuterColor] = useState('#d4b996'); // Beige
  
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

  return (
    <section id="mixer" className="py-16 px-6 max-w-7xl mx-auto scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs tracking-wider uppercase text-slate-700 font-semibold mb-3">
          <Palette className="w-3.5 h-3.5" /> Mix & Match AI Engine & Color Swapper
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
          Interactive Outfit Canvas & "Choose Color"
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Mix owned clothing items with live color customization. Missing pieces update in real-time with direct, transparent affiliate links filtered strictly under your budget.
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
        {/* Outfit Visualizer Canvas */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-slate-800" /> Outfit Preview Canvas
              </h3>
              <span className="text-xs font-mono text-slate-400">Real-Time Simulation</span>
            </div>

            {/* Interactive Layered Outfit Display */}
            <div className="space-y-3">
              {/* Outerwear Layer */}
              <div className="glass-card p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-7 h-7 rounded-full border border-slate-300 shadow-sm"
                    style={{ backgroundColor: outerColor }}
                  />
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">Outerwear Layer</span>
                    <h4 className="text-slate-900 font-semibold text-sm">Beige Linen Blend Trench Blazer</h4>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold">
                  Owned Garment
                </span>
              </div>

              {/* Top Garment Layer with Color Selector */}
              <div className="glass-card p-4 rounded-2xl border border-slate-300 bg-slate-50 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-7 h-7 rounded-full border border-slate-400 shadow-sm"
                      style={{ backgroundColor: topColor }}
                    />
                    <div>
                      <span className="text-[10px] text-slate-600 font-mono uppercase block font-bold">Top Layer ("Choose Color")</span>
                      <h4 className="text-slate-900 font-bold text-sm">Oversized Heavyweight Tee ({topColorName})</h4>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold">
                    Owned Garment
                  </span>
                </div>

                {/* Color Swatch Picker */}
                <div className="pt-2 border-t border-slate-200 flex items-center gap-2 overflow-x-auto pb-1">
                  <span className="text-xs font-semibold text-slate-700 mr-1 whitespace-nowrap">Choose Color:</span>
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

              {/* Bottom Garment Layer (Affiliate Missing Piece) */}
              <div className="glass-card p-4 rounded-2xl border border-amber-300 bg-amber-50/50 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-7 h-7 rounded-full border border-slate-400 shadow-sm"
                      style={{ backgroundColor: bottomColor }}
                    />
                    <div>
                      <span className="text-[10px] text-amber-800 font-mono uppercase block font-bold">Bottom Layer (Missing Piece)</span>
                      <h4 className="text-slate-900 font-bold text-sm">Wide-Leg Indigo Trousers ({bottomColorName})</h4>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-mono font-bold">
                    Affiliate Missing Piece
                  </span>
                </div>

                <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-xs text-slate-700">
                  <span>Max Budget Cap: <strong className="text-emerald-700 font-mono">${currentBudget} SGD</strong></span>
                  <span className="text-slate-600 font-mono">Buy-Link Verified</span>
                </div>
              </div>

              {/* Footwear Layer */}
              <div className="glass-card p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full border border-slate-300 bg-white shadow-sm" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">Footwear</span>
                    <h4 className="text-slate-900 font-semibold text-sm">Minimalist White Leather Sneakers</h4>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold">
                  Owned Garment
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs text-slate-500">
            <span>Look Match Score: <strong className="text-emerald-700 font-bold">98% Synergy</strong></span>
            <span className="text-slate-700">75% Owned • 25% Affiliate Gap</span>
          </div>
        </div>

        {/* Affiliate Buy Links Panel */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-slate-800" /> Targeted Affiliate Buy Links
                </h3>
                <p className="text-xs text-slate-500">
                  Filtered under your ${currentBudget} SGD Budget Cap
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold">
                100% Fair Price Ranked
              </span>
            </div>

            {/* Product Cards */}
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {budgetFilteredProducts.length === 0 ? (
                <div className="text-center py-12 glass-card rounded-2xl p-6">
                  <Sliders className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-900 font-bold text-sm mb-1">No missing pieces under ${currentBudget} SGD</p>
                  <p className="text-xs text-slate-500">Increase your budget slider below to view affiliate recommendations.</p>
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
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 shadow-sm group-hover:scale-105 transition-transform"
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
                        ${product.price.toFixed(2)} SGD <span className="text-[10px] text-slate-400 font-normal">(Direct Merchant Price)</span>
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

          <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-800" /> FTC/CCCS Fair Ranking Compliant
            </span>
            <span>StyleSync Earns 5%–20% Affiliate Cut</span>
          </div>
        </div>
      </div>
    </section>
  );
}
