import React, { useState, useEffect } from 'react';
import { User, Ruler, Sparkles, CheckCircle2, Copy, Users, DollarSign, Shirt, Settings, Check, ArrowRight } from 'lucide-react';
import { CREATORS } from '../data/mockData';
import { DEFAULT_BODY_METRICS, getUserProfileMetricsFromDB } from '../utils/database';

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

  const getAIStyleAdvice = () => {
    if (height >= 180 && waist <= 32) {
      return {
        ratio: "Tall & Tapered Frame",
        cuts: "Boxy cropped tops, high-waist straight leg denim, 30\" inseam trousers, structured shoulders.",
        avoid: "Overly tight skinny jeans or extra-long tunic tees that obscure waist proportions."
      };
    } else if (height < 172 && waist <= 32) {
      return {
        ratio: "Compact Proportion",
        cuts: "Monochrome vertical tonal outfits, high-waisted ankle trousers, tucked-in fitted tees.",
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

  // All creators with match scores based on user metrics
  const scoredCreators = CREATORS.map(creator => {
    const heightDiff = Math.abs(creator.height - height);
    const waistDiff = Math.abs(creator.waist - waist);
    const matchScore = Math.max(70, 100 - (heightDiff * 3 + waistDiff * 4));
    return { ...creator, matchScore, heightDiff, waistDiff };
  }).sort((a, b) => b.matchScore - a.matchScore);

  // Column 1: Directly matched creators according to user metrics (Score >= 85%)
  const userMatchedCreators = scoredCreators.filter(c => c.matchScore >= 85);
  // Column 2: Other creators outfits
  const otherCreators = scoredCreators.filter(c => c.matchScore < 85);
  // Fallback split if all score high
  const col1Creators = userMatchedCreators.length > 0 ? userMatchedCreators : scoredCreators.slice(0, 2);
  const col2Creators = userMatchedCreators.length > 0 ? otherCreators : scoredCreators.slice(2);

  const handleCopyLook = (creator) => {
    setCopiedId(creator.id);
    onSelectCreatorOutfit(creator);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="creator-matcher" className="py-16 px-6 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs tracking-wider uppercase text-slate-800 font-semibold mb-3">
          <Users className="w-3.5 h-3.5 text-indigo-600" /> Stylists & Creators
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
          Creators & Stylist Fits
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Outfits automatically recommended for your body frame ({heightFormatted}, {waist}" waist) and trending creator styles across the community.
        </p>

        {/* User Metrics Quick Info Pill + Profile Settings Trigger */}
        <div className="mt-4 inline-flex items-center gap-3 bg-white p-2 px-4 rounded-2xl border border-slate-200 shadow-sm text-xs font-mono">
          <span className="text-slate-600 font-bold">Your Metrics: <strong>{heightFormatted}</strong> • <strong>{waist}" Waist</strong></span>
          <button
            onClick={onOpenProfile}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline flex items-center gap-1"
          >
            <Settings className="w-3.5 h-3.5" /> Edit Profile Metrics
          </button>
        </div>
      </div>

      {/* AI Proportion Rule Banner */}
      <div className="glass-panel p-5 rounded-3xl mb-10 border border-indigo-200 bg-indigo-50/50 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-5 h-5 text-indigo-200" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-indigo-700 tracking-wider">
                AI Proportion Diagnosis ({aiAdvice.ratio})
              </span>
              <p className="text-xs text-slate-800 font-medium mt-0.5 leading-relaxed">
                <strong>Recommended Cuts:</strong> {aiAdvice.cuts}
              </p>
            </div>
          </div>
          <button
            onClick={onOpenProfile}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase px-4 py-2 rounded-xl transition-all shadow-sm shrink-0 font-mono"
          >
            Adjust Body Height & Waist →
          </button>
        </div>
      </div>

      {/* TWO HORIZONTAL COLUMNS LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Column 1: Outfits Suggested According to User Metrics */}
        <div className="space-y-6">
          <div className="flex items-center justify-between glass-panel p-4 rounded-2xl border border-emerald-300/60 bg-emerald-50/60 shadow-sm">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-950">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>1. Outfits Matched to Your Metrics ({height}cm, {waist}" waist)</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
              AI Tailored
            </span>
          </div>

          <div className="space-y-6">
            {col1Creators.map((creator) => (
              <div
                key={creator.id}
                className="glass-card rounded-3xl border border-black/10 overflow-hidden flex flex-col justify-between group hover:border-black/30 transition-all shadow-sm bg-white"
              >
                {/* Outfit Photo Preview */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-100">
                  <img
                    src={creator.outfitImage}
                    alt={creator.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Match Score Badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-emerald-400 font-mono text-xs font-bold border border-emerald-500/40">
                    ★ {creator.matchScore}% Metric Match
                  </div>

                  {/* Creator Avatar & Handle */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-9 h-9 rounded-full object-cover border border-white"
                      />
                      <div>
                        <h4 className="text-sm font-bold leading-tight">{creator.name}</h4>
                        <span className="text-[10px] text-slate-300 font-mono">{creator.handle}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded text-slate-100 font-bold">
                      {creator.height}cm / {creator.waist}"
                    </span>
                  </div>
                </div>

                {/* Outfit Details & Items Breakdown */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-extrabold text-slate-900">{creator.featuredLook}</span>
                      <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        Total: {creator.totalCost}
                      </span>
                    </div>

                    <ul className="text-xs text-slate-700 space-y-1.5 font-mono pt-1">
                      <li className="truncate">👕 {creator.outfit.top}</li>
                      <li className="truncate">👖 {creator.outfit.bottom}</li>
                      {creator.outfit.outer !== 'None' && <li className="truncate">🧥 {creator.outfit.outer}</li>}
                      <li className="truncate">👟 {creator.outfit.shoes}</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => handleCopyLook(creator)}
                    className={`w-full py-3 rounded-xl text-xs uppercase font-extrabold tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                      copiedId === creator.id
                        ? 'bg-emerald-600 text-white'
                        : 'primary-button'
                    }`}
                  >
                    {copiedId === creator.id ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-white" /> Matched to Outfit Canvas!
                      </>
                    ) : (
                      <>
                        <Shirt className="w-4 h-4 text-white" /> Copy Creator Cut to Mixer
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Suggesting Other Creators Outfits */}
        <div className="space-y-6">
          <div className="flex items-center justify-between glass-panel p-4 rounded-2xl border border-slate-300/80 bg-slate-100/70 shadow-sm">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-900">
              <Users className="w-4 h-4 text-indigo-600" />
              <span>2. Explore Other Creator & Stylist Outfits</span>
            </div>
            <span className="text-[10px] font-mono text-slate-600 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
              Trending Style Catalog
            </span>
          </div>

          <div className="space-y-6">
            {(col2Creators.length > 0 ? col2Creators : scoredCreators).map((creator) => (
              <div
                key={creator.id}
                className="glass-card rounded-3xl border border-black/10 overflow-hidden flex flex-col justify-between group hover:border-black/30 transition-all shadow-sm bg-white"
              >
                {/* Outfit Photo Preview */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-100">
                  <img
                    src={creator.outfitImage}
                    alt={creator.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Match Score Badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md text-slate-200 font-mono text-xs font-bold border border-slate-700">
                    {creator.matchingCategory}
                  </div>

                  {/* Creator Avatar & Handle */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-9 h-9 rounded-full object-cover border border-white"
                      />
                      <div>
                        <h4 className="text-sm font-bold leading-tight">{creator.name}</h4>
                        <span className="text-[10px] text-slate-300 font-mono">{creator.handle} • {creator.followers}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded text-slate-100 font-bold">
                      {creator.height}cm / {creator.waist}"
                    </span>
                  </div>
                </div>

                {/* Outfit Details & Items Breakdown */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-extrabold text-slate-900">{creator.featuredLook}</span>
                      <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                        Total: {creator.totalCost}
                      </span>
                    </div>

                    <ul className="text-xs text-slate-700 space-y-1.5 font-mono pt-1">
                      <li className="truncate">👕 {creator.outfit.top}</li>
                      <li className="truncate">👖 {creator.outfit.bottom}</li>
                      {creator.outfit.outer !== 'None' && <li className="truncate">🧥 {creator.outfit.outer}</li>}
                      <li className="truncate">👟 {creator.outfit.shoes}</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => handleCopyLook(creator)}
                    className={`w-full py-3 rounded-xl text-xs uppercase font-extrabold tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                      copiedId === creator.id
                        ? 'bg-emerald-600 text-white'
                        : 'secondary-button font-extrabold'
                    }`}
                  >
                    {copiedId === creator.id ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-white" /> Matched to Outfit Canvas!
                      </>
                    ) : (
                      <>
                        <Shirt className="w-4 h-4 text-slate-900" /> Copy Creator Cut to Mixer
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
