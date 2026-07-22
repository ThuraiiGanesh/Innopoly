import React from 'react';
import { Clock, ShieldCheck, ShoppingBag, ArrowDown, ChevronRight, Sparkles } from 'lucide-react';

export default function Hero({ onOpenCompliance }) {
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center items-center px-6 py-16 text-center">
      {/* Background Soft Lighting Gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-200/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Floating Light Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs tracking-wider font-medium text-slate-700 uppercase mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-slate-900" />
          <span>Fashion-Tech Hackathon Winner Project</span>
        </div>

        {/* Clean Hero Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950 mb-6 max-w-4xl leading-[1.08]">
          Reclaim Your <span className="underline decoration-slate-300 decoration-wavy">52 Minutes.</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed mb-10 text-balance">
          Stop staring at an overflowing closet. StyleSync digitizes your wardrobe, matches outfit proportions to your height & waist, and fills style gaps with budget-filtered affiliate buy links.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href="#mixer"
            className="primary-button px-7 py-3.5 text-sm uppercase tracking-wider flex items-center gap-2"
          >
            Launch Outfit Mixer <ChevronRight className="w-4 h-4" />
          </a>
          
          <a
            href="#creator-matcher"
            className="secondary-button px-7 py-3.5 text-sm uppercase tracking-wider flex items-center gap-2"
          >
            Match Height & Waist
          </a>
        </div>

        {/* Light Glassmorphic Stat Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl text-left">
          <div className="glass-card p-6 rounded-2xl border border-black/5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-900">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-slate-900">52 Mins</span>
            </div>
            <p className="text-xs text-slate-500 leading-normal">
              Saved per vacation & formal event by eliminating decision fatigue.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-black/5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-slate-900">100% Honest</span>
            </div>
            <p className="text-xs text-slate-500 leading-normal">
              FTC & CCCS compliant. Objective price sorting with zero paid bias.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-black/5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-slate-900">5% - 20%</span>
            </div>
            <p className="text-xs text-slate-500 leading-normal">
              Zero inventory affiliate commissions on missing item links.
            </p>
          </div>
        </div>
      </div>

      <a href="#digitizer" className="mt-12 text-slate-400 hover:text-slate-900 transition-colors flex flex-col items-center gap-2 text-xs tracking-wider uppercase font-mono">
        <span>Scroll Down</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}
