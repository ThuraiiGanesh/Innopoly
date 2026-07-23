import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Shirt, TrendingUp, Star, Compass, Filter, ExternalLink } from 'lucide-react';
import { CREATORS } from '../data/mockData';
import { DEFAULT_BODY_METRICS, getUserProfileMetricsFromDB } from '../utils/database';

export default function BodyCreatorMatcher({ user, onSelectCreatorOutfit, onOpenProfile }) {
  const [metrics, setMetrics] = useState(DEFAULT_BODY_METRICS);
  const [copiedId, setCopiedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const saved = getUserProfileMetricsFromDB(user?.id, user?.bodyMetrics || DEFAULT_BODY_METRICS);
    setMetrics(saved);
  }, [user]);

  const { height, waist } = metrics;

  // Calculate match score behind the scenes to populate Column 1 according to user metrics
  const scoredCreators = CREATORS.map(creator => {
    const heightDiff = Math.abs(creator.height - height);
    const waistDiff = Math.abs(creator.waist - waist);
    const matchScore = Math.max(72, Math.min(99, 100 - (heightDiff * 2.5 + waistDiff * 3)));
    return { ...creator, matchScore };
  }).sort((a, b) => b.matchScore - a.matchScore);

  // Filter creators by category if selected
  const filteredCreators = selectedCategory === 'All'
    ? scoredCreators
    : scoredCreators.filter(c => c.matchingCategory?.toLowerCase() === selectedCategory.toLowerCase() || c.styleTheme?.toLowerCase() === selectedCategory.toLowerCase());

  // Column 1: Directly suggested outfits according to user metrics (Highest match scores >= 85%)
  const userMetricsMatched = filteredCreators.filter(c => c.matchScore >= 85);
  // Fallback if filter is narrow
  const col1Creators = userMetricsMatched.length > 0 ? userMetricsMatched : filteredCreators.slice(0, 3);

  // Column 2: Suggested outfits from other creators
  const col2Creators = filteredCreators.filter(c => !col1Creators.some(col1 => col1.id === c.id));

  const handleCopyLook = (creator) => {
    setCopiedId(creator.id);
    onSelectCreatorOutfit(creator);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const categories = ['All', 'Casual', 'Smart Casual', 'Streetwear', 'Old Money', 'Formal'];

  return (
    <section id="discover-page" className="py-10 sm:py-14 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Page Header — Discover */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 text-emerald-400 font-mono text-xs font-bold mb-3 shadow-md border border-slate-800">
          <Compass className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" /> Discover Styles & Outfits
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
          Discover Outfits & Creator Lookbooks
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Explore curated outfit ideas automatically recommended for your proportions alongside trending creator lookbooks across the community.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-black text-white shadow-md scale-[1.03]'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ================================================================ */}
      {/* TWO HORIZONTAL COLUMNS LAYOUT                                    */}
      {/* ================================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        
        {/* ============ COLUMN 1: Outfits Suggested According to User Metrics ============ */}
        <div className="space-y-5">
          <div className="flex items-center justify-between glass-panel p-4 rounded-2xl border border-emerald-300/80 bg-emerald-50/80 shadow-sm">
            <div className="flex items-center gap-2.5 font-mono text-xs font-extrabold text-emerald-950">
              <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="block leading-tight text-sm">Suggested for Your Body Metrics</span>
                <span className="text-[10px] text-emerald-700 font-normal">AI proportion & silhouette match</span>
              </div>
            </div>
            <span className="text-[10px] font-mono font-extrabold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-300 shadow-2xs">
              ★ Tailored Fits ({col1Creators.length})
            </span>
          </div>

          <div className="space-y-6">
            {col1Creators.map((creator) => (
              <div
                key={creator.id}
                className="glass-card rounded-3xl border border-slate-200 overflow-hidden flex flex-col justify-between group hover:border-emerald-500/60 transition-all shadow-sm bg-white hover:shadow-xl"
              >
                {/* Outfit Photo Preview */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-100">
                  <img
                    src={creator.outfitImage}
                    alt={creator.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  
                  {/* Match Score Badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-600 text-white font-mono text-xs font-extrabold border border-emerald-400 shadow-md flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> {creator.matchScore}% Metric Match
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/90 text-slate-100 font-mono text-[10px] font-bold border border-slate-700 backdrop-blur-md">
                    {creator.matchingCategory}
                  </div>

                  {/* Creator Avatar & Handle */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-emerald-400 shadow-md"
                      />
                      <div>
                        <h4 className="text-sm font-extrabold leading-tight">{creator.name}</h4>
                        <span className="text-[11px] text-slate-300 font-mono">{creator.handle}</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono bg-emerald-950/80 backdrop-blur-md text-emerald-300 px-3 py-1 rounded-xl border border-emerald-500/40 font-bold">
                      {creator.height}cm • {creator.waist}" waist
                    </span>
                  </div>
                </div>

                {/* Outfit Details & Breakdown */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-extrabold text-slate-900">{creator.featuredLook}</h3>
                      <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                        {creator.totalCost}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                      {creator.bio || "Tailored fit designed for proportional balance and modern silhouette comfort."}
                    </p>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1 text-xs text-slate-700 font-mono">
                      <div className="flex items-center justify-between py-0.5">
                        <span className="text-slate-500">Top:</span>
                        <span className="font-bold text-slate-900 truncate max-w-[200px]">{creator.outfit.top}</span>
                      </div>
                      <div className="flex items-center justify-between py-0.5 border-t border-slate-200/60">
                        <span className="text-slate-500">Bottom:</span>
                        <span className="font-bold text-slate-900 truncate max-w-[200px]">{creator.outfit.bottom}</span>
                      </div>
                      {creator.outfit.outer !== 'None' && (
                        <div className="flex items-center justify-between py-0.5 border-t border-slate-200/60">
                          <span className="text-slate-500">Outerwear:</span>
                          <span className="font-bold text-slate-900 truncate max-w-[200px]">{creator.outfit.outer}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between py-0.5 border-t border-slate-200/60">
                        <span className="text-slate-500">Shoes:</span>
                        <span className="font-bold text-slate-900 truncate max-w-[200px]">{creator.outfit.shoes}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyLook(creator)}
                    className={`w-full py-3 rounded-xl text-xs uppercase font-extrabold tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                      copiedId === creator.id
                        ? 'bg-emerald-600 text-white'
                        : 'primary-button shimmer-hover'
                    }`}
                  >
                    {copiedId === creator.id ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-white" /> Sent to Outfit Canvas!
                      </>
                    ) : (
                      <>
                        <Shirt className="w-4 h-4 text-white" /> Copy Look to Outfit Canvas
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============ COLUMN 2: Outfits Suggested from Other Creators ============ */}
        <div className="space-y-5">
          <div className="flex items-center justify-between glass-panel p-4 rounded-2xl border border-indigo-300/80 bg-indigo-50/80 shadow-sm">
            <div className="flex items-center gap-2.5 font-mono text-xs font-extrabold text-indigo-950">
              <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <span className="block leading-tight text-sm">Suggested Other Creators' Outfits</span>
                <span className="text-[10px] text-indigo-700 font-normal">Trending style inspiration & creator feeds</span>
              </div>
            </div>
            <span className="text-[10px] font-mono font-extrabold text-indigo-800 bg-white px-2.5 py-1 rounded-lg border border-indigo-300 shadow-2xs">
              🔥 Trending Looks ({col2Creators.length})
            </span>
          </div>

          <div className="space-y-6">
            {(col2Creators.length > 0 ? col2Creators : scoredCreators).map((creator) => (
              <div
                key={creator.id}
                className="glass-card rounded-3xl border border-slate-200 overflow-hidden flex flex-col justify-between group hover:border-indigo-500/60 transition-all shadow-sm bg-white hover:shadow-xl"
              >
                {/* Outfit Photo Preview */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-100">
                  <img
                    src={creator.outfitImage}
                    alt={creator.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  
                  {/* Followers Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-indigo-600 text-white font-mono text-xs font-bold flex items-center gap-1 shadow-md">
                    <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /> {creator.followers} followers
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-900/90 text-slate-100 font-mono text-[10px] font-bold border border-slate-700 backdrop-blur-md">
                    {creator.matchingCategory}
                  </div>

                  {/* Creator Avatar & Handle */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-indigo-400 shadow-md"
                      />
                      <div>
                        <h4 className="text-sm font-extrabold leading-tight">{creator.name}</h4>
                        <span className="text-[11px] text-slate-300 font-mono">{creator.handle}</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono bg-white/20 backdrop-blur-md px-3 py-1 rounded-xl text-slate-100 font-bold border border-white/30">
                      {creator.height}cm • {creator.waist}" waist
                    </span>
                  </div>
                </div>

                {/* Outfit Details & Breakdown */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-extrabold text-slate-900">{creator.featuredLook}</h3>
                      <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-xl border border-slate-200">
                        {creator.totalCost}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                      {creator.bio || "Trending street-style combo combining clean lines with versatile casual aesthetics."}
                    </p>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1 text-xs text-slate-700 font-mono">
                      <div className="flex items-center justify-between py-0.5">
                        <span className="text-slate-500">Top:</span>
                        <span className="font-bold text-slate-900 truncate max-w-[200px]">{creator.outfit.top}</span>
                      </div>
                      <div className="flex items-center justify-between py-0.5 border-t border-slate-200/60">
                        <span className="text-slate-500">Bottom:</span>
                        <span className="font-bold text-slate-900 truncate max-w-[200px]">{creator.outfit.bottom}</span>
                      </div>
                      {creator.outfit.outer !== 'None' && (
                        <div className="flex items-center justify-between py-0.5 border-t border-slate-200/60">
                          <span className="text-slate-500">Outerwear:</span>
                          <span className="font-bold text-slate-900 truncate max-w-[200px]">{creator.outfit.outer}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between py-0.5 border-t border-slate-200/60">
                        <span className="text-slate-500">Shoes:</span>
                        <span className="font-bold text-slate-900 truncate max-w-[200px]">{creator.outfit.shoes}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyLook(creator)}
                    className={`w-full py-3 rounded-xl text-xs uppercase font-extrabold tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                      copiedId === creator.id
                        ? 'bg-emerald-600 text-white'
                        : 'secondary-button font-extrabold'
                    }`}
                  >
                    {copiedId === creator.id ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-white" /> Sent to Outfit Canvas!
                      </>
                    ) : (
                      <>
                        <Shirt className="w-4 h-4 text-slate-900" /> Copy Creator Look
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

