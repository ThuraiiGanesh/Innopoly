import React, { useState, useEffect } from 'react';
import { User, Ruler, Sparkles, CheckCircle2, Copy, Users, DollarSign, Shirt, Settings, Check } from 'lucide-react';
import { CREATORS } from '../data/mockData';
import { DEFAULT_BODY_METRICS, getUserProfileMetricsFromDB, saveUserProfileMetricsInDB } from '../utils/database';

export default function BodyCreatorMatcher({ user, onSelectCreatorOutfit, onOpenProfile }) {
  const [metrics, setMetrics] = useState(DEFAULT_BODY_METRICS);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const saved = getUserProfileMetricsFromDB(user?.id, user?.bodyMetrics || DEFAULT_BODY_METRICS);
    setMetrics(saved);
  }, [user]);

  const { height, chest, waist, hips, shoulders, inseam, build } = metrics;

  const feet = Math.floor(height / 30.48);
  const inches = Math.round((height % 30.48) / 2.54);
  const heightFormatted = `${height} cm (${feet}'${inches}")`;

  const updateMetric = (key, val) => {
    const next = { ...metrics, [key]: val };
    setMetrics(next);
    saveUserProfileMetricsInDB(user?.id, next);
  };

  const getAIStyleAdvice = () => {
    if (height >= 180 && waist <= 32) {
      return {
        ratio: "Tall & Tapered Frame",
        cuts: "Boxy cropped tops, high-waist straight leg denim, 30\" inseam trousers, structured 44cm shoulders.",
        avoid: "Overly tight skinny jeans or extra-long tunic tees that obscure waist proportions."
      };
    } else if (height < 172 && waist <= 32) {
      return {
        ratio: "Compact Proportion",
        cuts: "Monochrome vertical tonal outfits, high-waisted ankle trousers (28\" inseam), tucked-in fitted tees.",
        avoid: "Overly dropped shoulders or heavy ankle break trousers that shorten leg lines."
      };
    } else if (waist > 34) {
      return {
        ratio: "Relaxed Comfort Silhouette",
        cuts: "Open-collar linen camp shirts, relaxed straight chinos, structured unlined chore coats.",
        avoid: "Stiff horizontal stripes or hyper-tapered jogger ankles."
      };
    }
    return {
      ratio: "Balanced Proportional Ratio",
      cuts: "Relaxed crew tees, mid-rise chinos (30\" inseam), minimal leather sneakers, light outer layers.",
      avoid: "Excessively mismatched oversized layers."
    };
  };

  const aiAdvice = getAIStyleAdvice();

  const matchedCreators = CREATORS.map(creator => {
    const heightDiff = Math.abs(creator.height - height);
    const waistDiff = Math.abs(creator.waist - waist);
    const matchScore = Math.max(70, 100 - (heightDiff * 3 + waistDiff * 4));
    return { ...creator, matchScore, heightDiff, waistDiff };
  }).sort((a, b) => b.matchScore - a.matchScore);

  const handleCopyLook = (creator) => {
    setCopiedId(creator.id);
    onSelectCreatorOutfit(creator);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="creator-matcher" className="py-16 px-6 max-w-7xl mx-auto scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs tracking-wider uppercase text-slate-700 font-semibold mb-3">
          <User className="w-3.5 h-3.5 text-indigo-600" /> Saved Body Metrics Profile
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
          Creator Looks, Photos & Total Outfit Costs
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Matches creators to your exact saved body metrics (Height, Bust, Waist, Hips, Shoulders & Inseam). Automatically restored from your user profile!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Saved Body Profile Banner & Controls */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-4 border-b border-black/5 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Ruler className="w-4 h-4 text-slate-800" /> Full Body Metrics Profile
              </h3>
              <button
                onClick={onOpenProfile}
                className="text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-full border border-indigo-200 transition-colors flex items-center gap-1"
              >
                <Settings className="w-3 h-3" /> Profile Settings
              </button>
            </div>

            {/* Profile Saved Status Pill */}
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between mb-5">
              <span className="flex items-center gap-1.5 font-mono text-[11px]">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" /> Saved in Profile Dashboard
              </span>
              <span className="text-[10px] font-bold text-emerald-700 font-mono">Auto-Restored</span>
            </div>

            <div className="space-y-4 max-h-[440px] overflow-y-auto pr-1">
              {/* Height Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs uppercase font-semibold text-slate-600 tracking-wider">Height</label>
                  <span className="text-slate-900 font-bold text-xs px-2.5 py-0.5 rounded-lg bg-slate-100 border border-slate-200">
                    {heightFormatted}
                  </span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="195"
                  value={height}
                  onChange={(e) => updateMetric('height', Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              {/* Bust / Chest Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs uppercase font-semibold text-slate-600 tracking-wider">Bust / Chest</label>
                  <span className="text-slate-900 font-bold text-xs px-2.5 py-0.5 rounded-lg bg-slate-100 border border-slate-200">
                    {chest} inches
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="52"
                  value={chest}
                  onChange={(e) => updateMetric('chest', Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              {/* Waist Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs uppercase font-semibold text-slate-600 tracking-wider">Waist Size</label>
                  <span className="text-slate-900 font-bold text-xs px-2.5 py-0.5 rounded-lg bg-slate-100 border border-slate-200">
                    {waist} inches
                  </span>
                </div>
                <input
                  type="range"
                  min="24"
                  max="44"
                  value={waist}
                  onChange={(e) => updateMetric('waist', Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              {/* Hips Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs uppercase font-semibold text-slate-600 tracking-wider">Hips</label>
                  <span className="text-slate-900 font-bold text-xs px-2.5 py-0.5 rounded-lg bg-slate-100 border border-slate-200">
                    {hips} inches
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="50"
                  value={hips}
                  onChange={(e) => updateMetric('hips', Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              {/* Shoulders Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs uppercase font-semibold text-slate-600 tracking-wider">Shoulders</label>
                  <span className="text-slate-900 font-bold text-xs px-2.5 py-0.5 rounded-lg bg-slate-100 border border-slate-200">
                    {shoulders} cm
                  </span>
                </div>
                <input
                  type="range"
                  min="36"
                  max="54"
                  value={shoulders}
                  onChange={(e) => updateMetric('shoulders', Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              {/* Inseam Length Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs uppercase font-semibold text-slate-600 tracking-wider">Inseam Length</label>
                  <span className="text-slate-900 font-bold text-xs px-2.5 py-0.5 rounded-lg bg-slate-100 border border-slate-200">
                    {inseam} inches
                  </span>
                </div>
                <input
                  type="range"
                  min="26"
                  max="36"
                  value={inseam}
                  onChange={(e) => updateMetric('inseam', Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              {/* Body Build selector buttons */}
              <div>
                <label className="text-xs uppercase font-semibold text-slate-600 tracking-wider block mb-1.5">Body Build</label>
                <div className="grid grid-cols-4 gap-2">
                  {['Slim', 'Athletic', 'Regular', 'Muscular'].map((b) => (
                    <button
                      key={b}
                      onClick={() => updateMetric('build', b)}
                      className={`py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        build === b
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

          {/* AI Style Rules Box */}
          <div className="mt-6 pt-4 border-t border-black/5">
            <div className="glass-card p-4 rounded-2xl border border-indigo-200 bg-indigo-50/40">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-900 font-mono uppercase">
                  AI Proportion Rule: {aiAdvice.ratio}
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed mb-2">
                <strong>Recommended Cuts:</strong> {aiAdvice.cuts}
              </p>
              <p className="text-xs text-slate-500 italic">
                <strong>Avoid:</strong> {aiAdvice.avoid}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Matched Creator Cards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between glass-panel p-4 rounded-2xl border border-black/5">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-900">
              <Users className="w-4 h-4 text-slate-700" />
              <span>Matched Creators for ({height}cm, {waist}" waist)</span>
            </div>
            <span className="text-xs text-slate-500 font-mono">Sorted by Match Score</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {matchedCreators.map((creator) => (
              <div
                key={creator.id}
                className="glass-card rounded-2xl border border-black/10 overflow-hidden flex flex-col justify-between group hover:border-black/30 transition-all shadow-sm"
              >
                {/* Outfit Photo Preview */}
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img
                    src={creator.outfitImage}
                    alt={creator.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Match Score Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-emerald-400 font-mono text-xs font-bold border border-emerald-500/40">
                    ★ {creator.matchScore}% Match
                  </div>

                  {/* Creator Avatar & Handle */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-8 h-8 rounded-full object-cover border border-white"
                      />
                      <div>
                        <h4 className="text-sm font-bold leading-tight">{creator.name}</h4>
                        <span className="text-[10px] text-slate-300 font-mono">{creator.handle}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-slate-200">
                      {creator.height}cm / {creator.waist}"
                    </span>
                  </div>
                </div>

                {/* Outfit Details & Items Breakdown */}
                <div className="p-4 space-y-3 bg-white flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-900">{creator.featuredLook}</span>
                      <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Total: {creator.totalCost}
                      </span>
                    </div>

                    <ul className="text-xs text-slate-600 space-y-1 font-mono">
                      <li className="truncate">👕 {creator.outfit.top}</li>
                      <li className="truncate">👖 {creator.outfit.bottom}</li>
                      {creator.outfit.outer !== 'None' && <li className="truncate">🧥 {creator.outfit.outer}</li>}
                      <li className="truncate">👟 {creator.outfit.shoes}</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => handleCopyLook(creator)}
                    className={`w-full py-2 rounded-xl text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                      copiedId === creator.id
                        ? 'bg-emerald-600 text-white'
                        : 'primary-button'
                    }`}
                  >
                    {copiedId === creator.id ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Matched to Outfit Mixer!
                      </>
                    ) : (
                      <>
                        <Shirt className="w-3.5 h-3.5 text-white" /> Copy Creator Cut to Mixer
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
