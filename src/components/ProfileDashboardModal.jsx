import React, { useState, useEffect } from 'react';
import { X, User, Ruler, Check, Sparkles, Save, ShieldCheck, Mail, LogOut, Shirt, Palette, ChevronRight, CheckCircle2 } from 'lucide-react';
import { 
  DEFAULT_BODY_METRICS, 
  STYLE_THEMES, 
  saveUserProfileMetricsInDB, 
  getUserProfileMetricsFromDB,
  saveUserStyleThemeInDB,
  getUserStyleThemeFromDB
} from '../utils/database';

export default function ProfileDashboardModal({ isOpen, onClose, user, onSaveMetrics, onLogout, onCompleteOnboarding }) {
  const [metrics, setMetrics] = useState(DEFAULT_BODY_METRICS);
  const [selectedTheme, setSelectedTheme] = useState('old_money');
  const [autoSaveStatus, setAutoSaveStatus] = useState('Auto-Restored');

  useEffect(() => {
    if (isOpen) {
      const savedMetrics = getUserProfileMetricsFromDB(user?.id, user?.bodyMetrics || DEFAULT_BODY_METRICS);
      const savedTheme = getUserStyleThemeFromDB(user?.id, user?.styleTheme || 'old_money');
      setMetrics(savedMetrics);
      setSelectedTheme(savedTheme);
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const feet = Math.floor(metrics.height / 30.48);
  const inches = Math.round((metrics.height % 30.48) / 2.54);
  const heightFormatted = `${metrics.height} cm (${feet}'${inches}")`;

  // Real-time auto save handler
  const handleMetricChange = (key, val) => {
    const updated = { ...metrics, [key]: val };
    setMetrics(updated);
    saveUserProfileMetricsInDB(user?.id, updated);
    setAutoSaveStatus('Auto-Saved!');
    setTimeout(() => setAutoSaveStatus('Auto-Restored'), 1500);
  };

  const handleThemeSelect = (themeId) => {
    setSelectedTheme(themeId);
    saveUserStyleThemeInDB(user?.id, themeId);
    setAutoSaveStatus('Theme Saved!');
    setTimeout(() => setAutoSaveStatus('Auto-Restored'), 1500);
  };

  const handleSaveAndContinue = (e) => {
    e?.preventDefault();
    saveUserProfileMetricsInDB(user?.id, metrics);
    saveUserStyleThemeInDB(user?.id, selectedTheme);
    if (onSaveMetrics) onSaveMetrics(metrics);
    if (onCompleteOnboarding) onCompleteOnboarding();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl border border-black/10 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-950 text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 text-white flex items-center justify-center border border-white/20">
              <User className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold tracking-tight">Profile & Style Dashboard</h3>
              <p className="text-xs text-slate-400 font-mono">
                {user ? user.email : 'Personal Aesthetic & Body Metrics Setup'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 space-y-8 overflow-y-auto flex-1">
          
          {/* Step 1: Choose Fashion Aesthetic & Style Theme */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-600 tracking-wider block">Step 1 of 2</span>
                <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-emerald-600" /> Select Your Style Aesthetic Theme
                </h4>
              </div>
              <span className="text-xs text-slate-500 font-mono">Visual Lookbook</span>
            </div>

            <p className="text-xs text-slate-600">
              Choose your preferred clothing aesthetic. StyleSync customizes recommendations, outfit photos, and creator matches based on your selection!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {STYLE_THEMES.map((theme) => {
                const isSelected = selectedTheme === theme.id;
                return (
                  <div
                    key={theme.id}
                    onClick={() => handleThemeSelect(theme.id)}
                    className={`group relative rounded-2xl border cursor-pointer overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-600 ring-2 ring-emerald-500 shadow-lg scale-[1.02]'
                        : 'border-slate-200 hover:border-slate-400 hover:shadow-md'
                    }`}
                  >
                    {/* Style Picture Box */}
                    <div className="relative h-36 overflow-hidden bg-slate-900">
                      <img
                        src={theme.image}
                        alt={theme.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Active Selection Badge */}
                      {isSelected && (
                        <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-emerald-600 text-white font-mono text-[10px] font-bold flex items-center gap-1 shadow-md">
                          <Check className="w-3 h-3" /> ACTIVE
                        </div>
                      )}

                      <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                        <h5 className="text-xs font-extrabold leading-tight">{theme.name}</h5>
                      </div>
                    </div>

                    {/* Tagline & Specs */}
                    <div className="p-3 bg-white space-y-2 flex-1 flex flex-col justify-between">
                      <p className="text-[11px] text-slate-600 font-medium leading-snug">
                        {theme.tagline}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 pt-1">
                        {theme.tags.map((t, i) => (
                          <span key={i} className="text-[9px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Full Body Metrics Profile (Matching Image 1) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-600 tracking-wider block">Step 2 of 2</span>
                <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-slate-800" /> Full Body Metrics Profile
                </h4>
              </div>
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-mono font-bold">
                ⚙️ Profile Settings
              </span>
            </div>

            {/* Auto-Saved Green Banner */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
              <span className="flex items-center gap-2 font-mono font-semibold">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" /> Saved in Profile Dashboard
              </span>
              <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                {autoSaveStatus}
              </span>
            </div>

            {/* Sliders Container */}
            <div className="glass-card p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white space-y-4">
              
              {/* HEIGHT */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs uppercase font-bold text-slate-600 tracking-wider">HEIGHT</label>
                  <span className="text-slate-900 font-extrabold text-xs px-2.5 py-0.5 rounded-lg bg-slate-100 border border-slate-200 font-mono">
                    {heightFormatted}
                  </span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="195"
                  value={metrics.height}
                  onChange={(e) => handleMetricChange('height', Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              {/* BUST / CHEST */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs uppercase font-bold text-slate-600 tracking-wider">BUST / CHEST</label>
                  <span className="text-slate-900 font-extrabold text-xs px-2.5 py-0.5 rounded-lg bg-slate-100 border border-slate-200 font-mono">
                    {metrics.chest} inches
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="52"
                  value={metrics.chest}
                  onChange={(e) => handleMetricChange('chest', Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              {/* WAIST SIZE */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs uppercase font-bold text-slate-600 tracking-wider">WAIST SIZE</label>
                  <span className="text-slate-900 font-extrabold text-xs px-2.5 py-0.5 rounded-lg bg-slate-100 border border-slate-200 font-mono">
                    {metrics.waist} inches
                  </span>
                </div>
                <input
                  type="range"
                  min="24"
                  max="44"
                  value={metrics.waist}
                  onChange={(e) => handleMetricChange('waist', Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              {/* HIPS */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs uppercase font-bold text-slate-600 tracking-wider">HIPS</label>
                  <span className="text-slate-900 font-extrabold text-xs px-2.5 py-0.5 rounded-lg bg-slate-100 border border-slate-200 font-mono">
                    {metrics.hips} inches
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="50"
                  value={metrics.hips}
                  onChange={(e) => handleMetricChange('hips', Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              {/* SHOULDERS */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs uppercase font-bold text-slate-600 tracking-wider">SHOULDERS</label>
                  <span className="text-slate-900 font-extrabold text-xs px-2.5 py-0.5 rounded-lg bg-slate-100 border border-slate-200 font-mono">
                    {metrics.shoulders} cm
                  </span>
                </div>
                <input
                  type="range"
                  min="36"
                  max="54"
                  value={metrics.shoulders}
                  onChange={(e) => handleMetricChange('shoulders', Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              {/* INSEAM LENGTH */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs uppercase font-bold text-slate-600 tracking-wider">INSEAM LENGTH</label>
                  <span className="text-slate-900 font-extrabold text-xs px-2.5 py-0.5 rounded-lg bg-slate-100 border border-slate-200 font-mono">
                    {metrics.inseam} inches
                  </span>
                </div>
                <input
                  type="range"
                  min="26"
                  max="36"
                  value={metrics.inseam}
                  onChange={(e) => handleMetricChange('inseam', Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              {/* BODY BUILD Selector */}
              <div>
                <label className="text-xs uppercase font-bold text-slate-600 tracking-wider block mb-2">BODY BUILD</label>
                <div className="grid grid-cols-4 gap-2">
                  {['Slim', 'Athletic', 'Regular', 'Muscular'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => handleMetricChange('build', b)}
                      className={`py-2 rounded-xl text-xs font-extrabold border transition-all ${
                        metrics.build === b
                          ? 'bg-black text-white border-black shadow-md scale-[1.02]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {user ? (
            <button
              onClick={() => {
                if (onLogout) onLogout();
                onClose();
              }}
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          ) : (
            <span className="text-[11px] text-slate-400 font-mono">Auto-saved to guest session</span>
          )}

          <button
            onClick={handleSaveAndContinue}
            className="primary-button px-7 py-3 text-xs uppercase font-extrabold tracking-wider flex items-center gap-2 ml-auto shadow-md shimmer-hover"
          >
            Save & Continue to App <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
