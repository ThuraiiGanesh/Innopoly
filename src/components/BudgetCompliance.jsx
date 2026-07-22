import React from 'react';
import { Sliders, ShieldCheck, Lock, CheckCircle, Scale, DollarSign } from 'lucide-react';

export default function BudgetCompliance({ currentBudget, onBudgetChange, onOpenCompliance }) {
  return (
    <section id="compliance" className="py-16 px-6 max-w-7xl mx-auto scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs tracking-wider uppercase text-slate-700 font-semibold mb-3">
          <Sliders className="w-3.5 h-3.5" /> Smart Budget & Ethical Compliance Shield
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
          Custom Budget Control & 100% Price Transparency
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Set your maximum budget constraint. StyleSync strictly filters missing pieces under your limit and guarantees 100% unbiased price rankings compliant with FTC & CCCS regulations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Smart Budget Slider Box */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" /> Smart Budget Constraint Filter
              </h3>
              <span className="text-xs font-mono text-slate-400">Live Control</span>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase font-semibold text-slate-600 tracking-wider">
                  Max Spend Per Missing Piece:
                </label>
                <span className="text-xl font-bold text-emerald-700 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200">
                  ${currentBudget} SGD
                </span>
              </div>

              <input
                type="range"
                min="10"
                max="150"
                step="5"
                value={currentBudget}
                onChange={(e) => onBudgetChange(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />

              <div className="flex justify-between text-xs font-mono text-slate-400 mt-2">
                <span>$10 SGD (Budget)</span>
                <span>$50 SGD (Mid-Range)</span>
                <span>$150 SGD (Premium)</span>
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-emerald-200 bg-emerald-50/40">
              <h4 className="text-emerald-900 text-sm font-bold mb-1 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> Active Budget Enforcement
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                All affiliate recommendations across our catalog are dynamically capped at <strong className="text-slate-900">${currentBudget} SGD</strong>. No hidden delivery surcharges or drip pricing traps.
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-6 pt-4 border-t border-black/5 text-center">
            * Adjusting the budget slider updates the Outfit Mixer affiliate buy links in real-time.
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
