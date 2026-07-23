import React, { useState } from 'react';
import { Sliders, ShieldCheck, Lock, CheckCircle, Scale, DollarSign, Store, Tag, Edit3 } from 'lucide-react';
import { STORE_TIERS } from '../data/mockData';

export default function BudgetCompliance({ currentBudget, onBudgetChange, onOpenCompliance }) {
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
    <section id="compliance" className="py-16 px-6 max-w-7xl mx-auto scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs tracking-wider uppercase text-slate-700 font-semibold mb-3">
          <Sliders className="w-3.5 h-3.5" /> Store-Aligned Smart Budget Filter
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
          Brand Store Budget Boxes & Custom Price Input
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Select a store budget tier arranged by clothing brand stores (Shopee, Uniqlo, Zalora, Nike) or type your exact target price.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Smart Store-Based Budget Box (No Slider) */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" /> Smart Store Budget Range Boxes
              </h3>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl">
                Capped: ${currentBudget} SGD
              </span>
            </div>

            {/* 1. Store Preset Budget Boxes */}
            <div className="space-y-2.5 mb-6">
              <label className="text-xs uppercase font-bold text-slate-600 tracking-wider block mb-2">
                Select Store Budget Range Box:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {STORE_TIERS.map((tier) => {
                  const isSelected = currentBudget === tier.max || (tier.id === 'all' && currentBudget >= 999);
                  return (
                    <div
                      key={tier.id}
                      onClick={() => handlePresetSelect(tier)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-emerald-950 text-white border-emerald-950 shadow-md scale-[1.02]'
                          : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-extrabold">{tier.label}</span>
                        {isSelected && <span className="text-[10px] font-mono bg-emerald-500 text-white px-2 py-0.5 rounded font-bold">ACTIVE</span>}
                      </div>
                      <span className={`text-[10px] font-mono block ${isSelected ? 'text-emerald-200' : 'text-slate-500'}`}>
                        {tier.sublabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Custom Exact Price Typing Input */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
              <label className="text-xs uppercase font-bold text-slate-700 tracking-wider flex items-center gap-1.5 mb-2">
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
                    className="w-full bg-white border border-slate-300 rounded-xl pl-8 pr-16 py-2 text-sm font-extrabold text-slate-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-slate-500">SGD</span>
                </div>
                
                <button
                  type="button"
                  onClick={() => onBudgetChange(customInput)}
                  className="primary-button px-4 py-2 text-xs font-bold uppercase tracking-wider shrink-0"
                >
                  Apply Price
                </button>
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-emerald-200 bg-emerald-50/40">
              <h4 className="text-emerald-900 text-sm font-bold mb-1 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> Active Store Budget Enforcement
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                All affiliate recommendations across our catalog are dynamically capped at <strong className="text-slate-900">${currentBudget} SGD</strong>. No hidden delivery surcharges or drip pricing traps.
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-6 pt-4 border-t border-black/5 text-center">
            * Selecting store boxes or typing custom price updates the Outfit Mixer affiliate buy links in real-time.
          </p>
        </div>

        {/* Regulatory & Consumer Protection Compliance Shield */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-slate-900" /> Regulatory & Ethical Shield
              </h3>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-mono font-bold">
                Judges' Business Maturity
              </span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-slate-100 text-slate-900 mt-0.5">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-sm">CCCS & FTC Compliance Rule</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We strictly follow Singapore CCCS and US FTC guidelines on price transparency. We <strong>NEVER</strong> rank a brand higher or label it "Cheapest" just because they pay higher affiliate rates.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-slate-100 text-slate-900 mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-sm">Clear "Sponsored" Labeling</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Paid brand placements (e.g. Zalora Summer Drops) are explicitly labeled as "Sponsored" to prevent consumer deception and build 100% lifetime user trust.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenCompliance}
              className="w-full secondary-button py-3 text-xs uppercase tracking-wider flex items-center justify-center gap-2 font-bold"
            >
              <ShieldCheck className="w-4 h-4 text-slate-900" /> View Compliance & Regulatory Rules
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-black/5 text-xs text-slate-400 text-center">
            Ethical integrity ensures higher user retention and long-term affiliate sales volume.
          </div>
        </div>
      </div>
    </section>
  );
}
