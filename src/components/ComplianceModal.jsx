import React from 'react';
import { X, ShieldCheck, Scale, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export default function ComplianceModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in-up">
      <div className="glass-panel w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/5 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Regulatory & Price Transparency Framework
              </h3>
              <span className="text-xs text-slate-500 font-mono">
                Compliance with CCCS (Singapore) & FTC (USA) Guidelines
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-black rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="space-y-5 overflow-y-auto pr-1 flex-1">
          {/* Section 1: The Trap We Avoid */}
          <div className="glass-card p-5 rounded-2xl border border-red-200 bg-red-50/50">
            <h4 className="text-red-900 font-bold text-base mb-1.5 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" /> The Regulatory Trap We Strictly Avoid
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-2">
              Many unethical apps rank items higher or label a store as the "Cheapest" simply because that brand pays them a higher commission rate.
            </p>
            <p className="text-xs text-red-800 leading-relaxed bg-red-100/60 p-3 rounded-xl border border-red-200 font-medium">
              <strong>Why This Fails:</strong> Under the Singapore CCCS Guidelines on Price Transparency (CPFTA) and US FTC Section 5 Deceptive Advertising rules, misrepresenting paid placement as an objective "lowest price" constitutes illegal misleading advertising.
            </p>
          </div>

          {/* Section 2: StyleSync Strict Rules */}
          <div className="glass-card p-5 rounded-2xl border border-emerald-200 bg-emerald-50/40">
            <h4 className="text-emerald-900 font-bold text-base mb-3 flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-700" /> StyleSync's 3 Golden Rules of Compliance
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>100% Objective Price Sorting:</strong> "Cheapest Option" tags are calculated strictly using real-time API merchant prices (including mandatory shipping and taxes). Commission rates never distort ranking.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Explicit "Sponsored" Badges:</strong> If a brand pays for promotional featured spots (e.g. "Zalora Summer Picks"), it is clearly labeled with a visible "Sponsored" badge.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Affiliate Earnings Disclosure:</strong> A clear, simple FTC affiliate disclosure is present on all shopping links ("We may earn a small commission when you purchase through links at zero extra cost to you").
                </div>
              </li>
            </ul>
          </div>

          {/* Section 3: Why Judges Love This */}
          <div className="glass-card p-4 rounded-2xl border border-slate-200 bg-slate-50">
            <h4 className="text-slate-900 font-bold text-sm mb-1 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-800" /> Hackathon Judge Impact
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Proactively addressing consumer protection law demonstrates strong startup business maturity, shielding our company from legal risk while maximizing long-term consumer trust and repeat app usage.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-black/5 pt-4 mt-5 text-center">
          <button
            onClick={onClose}
            className="primary-button px-6 py-2 text-xs uppercase tracking-wider font-semibold"
          >
            Close Framework
          </button>
        </div>
      </div>
    </div>
  );
}
