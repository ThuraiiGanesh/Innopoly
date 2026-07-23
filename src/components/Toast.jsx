import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const iconMap = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />,
    info: <Info className="w-4 h-4 text-sky-500 shrink-0" />,
    warning: <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
  };

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 animate-fade-in-up max-w-[90vw] sm:max-w-sm">
      <div className="glass-panel px-4 py-3 rounded-2xl shadow-xl border border-black/10 flex items-center gap-3 bg-white/95">
        {iconMap[type] || iconMap.success}
        <span className="text-xs font-semibold text-slate-900 flex-1 font-sans">
          {message}
        </span>
        <button
          onClick={onClose}
          className="p-1 rounded-full text-slate-400 hover:text-slate-900 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
