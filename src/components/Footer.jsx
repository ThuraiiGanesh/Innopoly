import React from 'react';
import { Shirt } from 'lucide-react';

export default function Footer({ onOpenPitch, onOpenCompliance }) {
  return (
    <footer className="border-t border-black/5 glass-panel py-8 px-6 mt-16 text-slate-600">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
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

        <div className="text-xs text-slate-400 font-mono">
          © 2026 StyleSync Inc. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
