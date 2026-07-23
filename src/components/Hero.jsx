import React from 'react';
import { Clock, ShieldCheck, ShoppingBag, ChevronRight, Sparkles, Layers, User, Sun, Palette } from 'lucide-react';

export default function Hero({ onNavigate, onOpenCompliance }) {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center items-center px-4 sm:px-6 py-8 sm:py-12 text-center">
      {/* Background Soft Lighting Gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[450px] h-[320px] sm:h-[450px] bg-slate-200/60 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Floating Light Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-[11px] sm:text-xs tracking-wider font-semibold text-slate-700 uppercase mb-4 sm:mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>Fashion-Tech Engine Winner</span>
        </div>

        {/* Clean Hero Title */}
        <h1 className="text-3xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 mb-4 sm:mb-5 max-w-4xl leading-[1.1]">
          Reclaim Your <span className="underline decoration-indigo-300 decoration-wavy">52 Minutes.</span>
        </h1>

        <p className="text-sm sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed mb-6 sm:mb-8 text-balance px-2">
          StyleSync digitizes your closet, matches outfit cuts to your height & waist, and fills style gaps with budget-filtered affiliate buy links.
        </p>

        {/* Action Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8 sm:mb-12 w-full px-2">
          <button
            onClick={() => onNavigate('styling')}
            className="primary-button px-5 sm:px-6 py-2.5 sm:py-3 text-xs uppercase tracking-wider flex items-center gap-2 font-bold shimmer-hover"
          >
            Launch Outfit Mixer <ChevronRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onNavigate('closet')}
            className="secondary-button px-4 sm:px-6 py-2.5 sm:py-3 text-xs uppercase tracking-wider flex items-center gap-2 font-bold"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-600" /> Digitize Closet
          </button>

          <button
            onClick={() => onNavigate('weather')}
            className="secondary-button px-4 sm:px-6 py-2.5 sm:py-3 text-xs uppercase tracking-wider flex items-center gap-2 font-bold"
          >
            <Sun className="w-3.5 h-3.5 text-amber-500" /> Weather AI
          </button>
        </div>

        {/* Responsive Feature Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-3xl text-left">
          <div 
            onClick={() => onNavigate('weather')}
            className="glass-card p-4 sm:p-5 rounded-2xl border border-black/5 cursor-pointer hover:border-black/20 flex items-center sm:flex-col sm:items-start gap-3 sm:gap-1.5"
          >
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 shrink-0">
              <Sun className="w-5 h-5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <span className="text-base sm:text-xl font-bold text-slate-900 block">Weather AI</span>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-normal">
                Temperature & forecast outfit recommendations.
              </p>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('color')}
            className="glass-card p-4 sm:p-5 rounded-2xl border border-black/5 cursor-pointer hover:border-black/20 flex items-center sm:flex-col sm:items-start gap-3 sm:gap-1.5"
          >
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600 shrink-0">
              <Palette className="w-5 h-5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <span className="text-base sm:text-xl font-bold text-slate-900 block">Color Season</span>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-normal">
                Skin undertone diagnostic & closet color scoring.
              </p>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('creators')}
            className="glass-card p-4 sm:p-5 rounded-2xl border border-black/5 cursor-pointer hover:border-black/20 flex items-center sm:flex-col sm:items-start gap-3 sm:gap-1.5"
          >
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
              <User className="w-5 h-5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <span className="text-base sm:text-xl font-bold text-slate-900 block">Body & Creators</span>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-normal">
                Match outfit cuts to your height & waist.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
