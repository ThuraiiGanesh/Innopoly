import React from 'react';
import { Clock, ShieldCheck, ShoppingBag, ArrowRight, ChevronRight, Sparkles, Layers, User } from 'lucide-react';

export default function Hero({ onNavigate, onOpenCompliance }) {
  return (
    <section className="relative min-h-[75vh] flex flex-col justify-center items-center px-6 py-12 text-center">
      {/* Background Soft Lighting Gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-slate-200/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Floating Light Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs tracking-wider font-medium text-slate-700 uppercase mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-slate-900" />
          <span>Fashion-Tech Hackathon Winner Project</span>
        </div>

        {/* Clean Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950 mb-5 max-w-4xl leading-[1.08]">
          Reclaim Your <span className="underline decoration-slate-300 decoration-wavy">52 Minutes.</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed mb-8 text-balance">
          StyleSync digitizes your closet, matches outfit cuts to your height & waist, and fills style gaps with budget-filtered affiliate buy links.
        </p>

        {/* Action Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => onNavigate('styling')}
            className="primary-button px-6 py-3 text-xs uppercase tracking-wider flex items-center gap-2 font-bold"
          >
            Launch Outfit Mixer <ChevronRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onNavigate('creators')}
            className="secondary-button px-6 py-3 text-xs uppercase tracking-wider flex items-center gap-2 font-bold"
          >
            <User className="w-3.5 h-3.5" /> Match Height & Waist
          </button>

          <button
            onClick={() => onNavigate('closet')}
            className="secondary-button px-6 py-3 text-xs uppercase tracking-wider flex items-center gap-2 font-bold"
          >
            <Layers className="w-3.5 h-3.5" /> Digitize Closet
          </button>
        </div>

        {/* Light Glassmorphic Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl text-left">
          <div 
            onClick={() => onNavigate('styling')}
            className="glass-card p-5 rounded-2xl border border-black/5 cursor-pointer hover:border-black/20"
          >
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="p-2 rounded-xl bg-slate-100 text-slate-900">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-slate-900">52 Mins</span>
            </div>
            <p className="text-xs text-slate-500 leading-normal">
              Saved per event by eliminating outfit decision fatigue.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('compliance')}
            className="glass-card p-5 rounded-2xl border border-black/5 cursor-pointer hover:border-black/20"
          >
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-slate-900">100% Honest</span>
            </div>
            <p className="text-xs text-slate-500 leading-normal">
              FTC & CCCS compliant. Objective price sorting with zero paid bias.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('styling')}
            className="glass-card p-5 rounded-2xl border border-black/5 cursor-pointer hover:border-black/20"
          >
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-slate-900">5% - 20%</span>
            </div>
            <p className="text-xs text-slate-500 leading-normal">
              Zero inventory affiliate commissions on missing piece links.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
