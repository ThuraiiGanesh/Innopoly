import React, { useState } from 'react';
import { Sliders, DollarSign, CheckCircle, Edit3 } from 'lucide-react';
import { STORE_TIERS } from '../data/mockData';

export default function BudgetCompliance({ currentBudget, onBudgetChange }) {
  const [customInput, setCustomInput] = useState(currentBudget);

  const handlePresetSelect = (tier) => {
    onBudgetChange(tier.max);
    setCustomInput(tier.max);
  };

  const handleCustomChange = (e) => {
    const val = Math.max(1, Number(e.target.value) || 0);
    setCustomInput(val);
    onBudgetChange(val);
  };

  return (
    <section id="compliance" className="py-12 px-4 sm:px-6 max-w-4xl mx-auto scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs tracking-wider uppercase text-slate-700 font-bold mb-3">
          <Sliders className="w-3.5 h-3.5" /> Store-Aligned Smart Budget Filter
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
          Brand Store Budget Boxes & Custom Price Input
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Select a store budget tier arranged by clothing brand stores (Shopee, Uniqlo, Zalora, Nike) or type your exact target price.
        </p>
      </div>

      {/* Smart Store-Based Budget Box (Centered Full-Width Panel) */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-lg border border-black/5">
        <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" /> Smart Store Budget Range Boxes
          </h3>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            Capped: ${currentBudget} SGD
          </span>
        </div>

        {/* 1. Store Preset Budget Boxes */}
        <div className="space-y-2.5 mb-6">
          <label className="text-xs uppercase font-bold text-slate-600 tracking-wider block mb-2 font-mono">
            Select Store Budget Range Box:
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {STORE_TIERS.map((tier) => {
              const isSelected = currentBudget === tier.max || (tier.id === 'all' && currentBudget >= 999);
              return (
                <div
                  key={tier.id}
                  onClick={() => handlePresetSelect(tier)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-950 text-white border-slate-950 shadow-md scale-[1.02]'
                      : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-extrabold">{tier.label}</span>
                    {isSelected && <span className="text-[9px] font-mono bg-emerald-500 text-white px-2 py-0.5 rounded font-bold">ACTIVE</span>}
                  </div>
                  <span className={`text-[10px] font-mono block ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {tier.sublabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Custom Exact Price Typing Input */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
          <label className="text-xs uppercase font-bold text-slate-700 tracking-wider flex items-center gap-1.5 mb-2 font-mono">
            <Edit3 className="w-3.5 h-3.5 text-indigo-600" /> Or Type Your Custom Target Price:
          </label>
          
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-400 text-sm">$</span>
              <input
                type="number"
                min="1"
                max="1000"
                value={customInput}
                onChange={handleCustomChange}
                placeholder="Enter max price (e.g. 50)"
                className="w-full bg-white border border-slate-300 rounded-xl pl-8 pr-16 py-2.5 text-sm font-extrabold text-slate-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black shadow-inner"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-slate-500">SGD</span>
            </div>
            
            <button
              type="button"
              onClick={() => onBudgetChange(customInput)}
              className="primary-button px-5 py-2.5 text-xs font-bold uppercase tracking-wider shrink-0"
            >
              Apply Price
            </button>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50">
          <h4 className="text-emerald-900 text-xs font-bold mb-1 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> Active Store Budget Enforcement
          </h4>
          <p className="text-xs text-slate-700 leading-relaxed">
            All affiliate recommendations across our catalog are dynamically capped at <strong className="text-slate-900">${currentBudget} SGD</strong>.
          </p>
        </div>

        <p className="text-[11px] text-slate-400 mt-5 pt-3 border-t border-black/5 text-center font-mono">
          * Selecting store boxes or typing custom price updates the Outfit Mixer affiliate buy links in real-time.
        </p>
      </div>
    </section>
  );
}
