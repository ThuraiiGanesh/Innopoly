import React from 'react';
import { Clock, ShieldCheck, ShoppingBag, ChevronRight, Sparkles, Layers, User, Sun, Palette, LogIn, UserPlus, Lock } from 'lucide-react';

export default function Hero({ user, onNavigate, onOpenLogin, onOpenRegister, onOpenCompliance }) {
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
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8 sm:mb-10 w-full px-2">
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-3xl text-left mb-8">
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

        {/* User Account Login & Registration Action Box (Right below Weather AI / Color Season / Body & Creators cards) */}
        {!user && (
          <div className="w-full max-w-3xl glass-panel p-6 rounded-3xl border border-black/10 bg-white/90 shadow-md text-center flex flex-col items-center gap-4 animate-fade-in-up">
            <div className="flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-extrabold uppercase font-mono text-slate-900 tracking-wider">
                Create or Access Your Saved Style Profile
              </span>
            </div>
            <p className="text-xs text-slate-600 max-w-xl">
              Sign in or register to save your exact body measurements, style theme (Preppy, Starboy, Old Money), and digitized closet items across sessions!
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
              <button
                onClick={() => onOpenLogin && onOpenLogin(false)}
                className="flex-1 primary-button py-3 px-5 text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 shadow-sm"
              >
                <LogIn className="w-4 h-4" /> Sign In to Account
              </button>

              <button
                onClick={() => onOpenLogin && onOpenLogin(true)}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white py-3 px-5 text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 rounded-xl transition-all shadow-sm"
              >
                <UserPlus className="w-4 h-4" /> Register Account
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
