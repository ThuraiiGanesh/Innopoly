import React, { useState } from 'react';
import { Tag, ShoppingBag, ArrowRight } from 'lucide-react';
import { TEMPLATES } from '../data/mockData';

export default function CategoryTemplates({ onSelectTemplate }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Smart Casual',
    'Streetwear',
    'Formal',
    'Vacation'
  ];

  const filteredTemplates = selectedCategory === 'All'
    ? TEMPLATES
    : TEMPLATES.filter(t => t.category === selectedCategory);

  return (
    <section id="templates" className="py-16 px-6 max-w-7xl mx-auto scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs tracking-wider uppercase text-slate-700 font-semibold mb-3">
          <Tag className="w-3.5 h-3.5" /> Occasion Templates & Category Filters
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
          Curated Occasion Style Templates
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Select ready-to-wear styling templates categorized by occasion. StyleSync instantly scans your digitized wardrobe and isolates missing pieces within budget.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
                selectedCategory === cat
                  ? 'bg-black text-white border-black shadow-sm scale-105'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTemplates.map((tpl) => (
          <div
            key={tpl.id}
            className="glass-panel rounded-3xl overflow-hidden flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-60 overflow-hidden">
                <img
                  src={tpl.image}
                  alt={tpl.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-xs font-mono font-bold uppercase tracking-wider border border-white">
                    {tpl.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white text-xs font-mono font-semibold shadow-sm">
                      {tpl.ownedCount} Owned Used
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-white text-xs font-mono font-semibold shadow-sm">
                      {tpl.missingCount} Missing Piece
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-1.5">
                  {tpl.title}
                </h3>
                <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                  {tpl.description}
                </p>

                {/* Missing Piece Affiliate Card */}
                <div className="glass-card p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-5">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-1">
                    <span>Missing Piece Gap-Filling:</span>
                    <span className="text-emerald-600 font-bold">${tpl.missingItemPrice.toFixed(2)} SGD</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-900 font-semibold text-sm flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-slate-800" /> {tpl.missingItemName}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      via {tpl.merchant}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => onSelectTemplate(tpl)}
                className="w-full primary-button py-3 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                Load into Mix & Match Canvas <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
