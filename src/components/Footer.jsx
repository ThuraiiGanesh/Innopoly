import React from 'react';
import { Shirt, Presentation, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenPitch, onOpenCompliance }) {
  return (
    <footer className="border-t border-black/5 glass-panel py-10 px-6 mt-16 text-slate-600">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-2.5 mb-1.5">
            <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center">
              <Shirt className="w-4 h-4" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">StyleSync</span>
          </div>
          <p className="text-xs text-slate-500 max-w-sm">
            Digitized Wardrobe Optimization meets Budget-Filtered Affiliate Shopping. Built for fashion-tech innovation.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-700">
          <button onClick={onOpenPitch} className="hover:text-black transition-colors flex items-center gap-1.5">
            <Presentation className="w-4 h-4 text-slate-900" /> Pitch Deck & Script
          </button>

          <button onClick={onOpenCompliance} className="hover:text-black transition-colors flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" /> FTC/CCCS Rules
          </button>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          © 2026 StyleSync Inc. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
