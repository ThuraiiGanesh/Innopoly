import React, { useState, useEffect } from 'react';
import { X, User, Ruler, Check, Sparkles, Save, ShieldCheck, Mail, LogOut, Heart } from 'lucide-react';
import { DEFAULT_BODY_METRICS, saveUserProfileMetricsInDB, getUserProfileMetricsFromDB } from '../utils/database';

export default function ProfileDashboardModal({ isOpen, onClose, user, onSaveMetrics, onLogout }) {
  const [metrics, setMetrics] = useState(DEFAULT_BODY_METRICS);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (user?.id) {
      const saved = getUserProfileMetricsFromDB(user.id, user.bodyMetrics || DEFAULT_BODY_METRICS);
      setMetrics(saved);
    } else {
      const guestSaved = getUserProfileMetricsFromDB(null, DEFAULT_BODY_METRICS);
      setMetrics(guestSaved);
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const feet = Math.floor(metrics.height / 30.48);
  const inches = Math.round((metrics.height % 30.48) / 2.54);
  const heightFormatted = `${metrics.height} cm (${feet}'${inches}")`;

  const handleSave = (e) => {
    e?.preventDefault();
    saveUserProfileMetricsInDB(user?.id, metrics);
    if (onSaveMetrics) {
      onSaveMetrics(metrics);
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl border border-black/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 text-white flex items-center justify-center border border-white/20">
              <User className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold tracking-tight">User Profile & Body Settings</h3>
              <p className="text-xs text-slate-400 font-mono">
                {user ? user.email : 'Guest Profile Dashboard'}
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
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* User Badge Info */}
          {user && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div className="flex-1">
                <h4 className="text-sm font-extrabold text-slate-900">{user.name}</h4>
                <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-400" /> {user.email}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold">
                ✓ Account Active
              </span>
            </div>
          )}

          {/* Full Body Metrics Profile Card */}
          <div className="glass-card p-5 rounded-2xl border border-slate-200 bg-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Ruler className="w-4 h-4 text-indigo-600" /> Full Body Metrics Profile
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-mono font-bold">
                6 Saved Dimensions
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Input your exact body metrics once below. StyleSync saves these permanently so you never have to re-enter them every time you use the app!
            </p>

            <div className="space-y-3.5 pt-2">
              {/* Height */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Height</label>
                  <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {heightFormatted}
                  </span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="195"
                  value={metrics.height}
                  onChange={(e) => setMetrics({ ...metrics, height: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              {/* Bust / Chest */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Bust / Chest</label>
                  <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {metrics.chest} inches
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="52"
                  value={metrics.chest}
                  onChange={(e) => setMetrics({ ...metrics, chest: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              {/* Waist Size */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Waist Size</label>
                  <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {metrics.waist} inches
                  </span>
                </div>
                <input
                  type="range"
                  min="24"
                  max="44"
                  value={metrics.waist}
                  onChange={(e) => setMetrics({ ...metrics, waist: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              {/* Hips */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Hips</label>
                  <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {metrics.hips} inches
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="50"
                  value={metrics.hips}
                  onChange={(e) => setMetrics({ ...metrics, hips: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              {/* Shoulders */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Shoulders</label>
                  <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {metrics.shoulders} cm
                  </span>
                </div>
                <input
                  type="range"
                  min="36"
                  max="54"
                  value={metrics.shoulders}
                  onChange={(e) => setMetrics({ ...metrics, shoulders: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              {/* Inseam Length */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Inseam Length</label>
                  <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {metrics.inseam} inches
                  </span>
                </div>
                <input
                  type="range"
                  min="26"
                  max="36"
                  value={metrics.inseam}
                  onChange={(e) => setMetrics({ ...metrics, inseam: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              {/* Body Build Buttons */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Body Build</label>
                <div className="grid grid-cols-4 gap-2">
                  {['Slim', 'Athletic', 'Regular', 'Muscular'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setMetrics({ ...metrics, build: b })}
                      className={`py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        metrics.build === b
                          ? 'bg-black text-white border-black shadow-sm'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
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
            <span className="text-[11px] text-slate-400 font-mono">Sign in to sync metrics across devices</span>
          )}

          <button
            onClick={handleSave}
            className="primary-button px-6 py-2.5 text-xs uppercase font-bold tracking-wider flex items-center gap-2 ml-auto"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-400 animate-bounce" /> Saved to Profile!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Body Metrics Profile
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
