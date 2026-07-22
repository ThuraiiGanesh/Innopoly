import React, { useState } from 'react';
import { User, Ruler, Sparkles, CheckCircle2, Copy, Users } from 'lucide-react';
import { CREATORS } from '../data/mockData';

export default function BodyCreatorMatcher({ onSelectCreatorOutfit }) {
  const [height, setHeight] = useState(178); // cm
  const [waist, setWaist] = useState(30); // inches
  const [build, setBuild] = useState('Athletic');
  const [copiedId, setCopiedId] = useState(null);

  const feet = Math.floor(height / 30.48);
  const inches = Math.round((height % 30.48) / 2.54);
  const heightFormatted = `${height} cm (${feet}'${inches}")`;

  const getAIStyleAdvice = () => {
    if (height >= 180 && waist <= 32) {
      return {
        ratio: "Tall & Tapered Frame",
        cuts: "Boxy cropped tops, high-waist straight leg denim, structured double-breasted blazers.",
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
      cuts: "Relaxed crew tees, mid-rise chinos, minimal leather sneakers, light outer layers.",
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
          <User className="w-3.5 h-3.5" /> Height, Waist & Creator Alignment
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
          Personalized Body Proportion & Creator Match
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Input your body dimensions to receive custom AI silhouette advice and instantly discover fashion content creators who share your exact build and height.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Body Profile Sliders & AI Advice */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Ruler className="w-4 h-4 text-slate-800" /> Body Metrics Profile
              </h3>
              <span className="text-xs font-mono text-slate-400">Interactive</span>
            </div>

            {/* Height Slider */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs uppercase font-semibold text-slate-600 tracking-wider">Height</label>
                <span className="text-slate-900 font-bold text-sm px-2.5 py-0.5 rounded-lg bg-slate-100 border border-slate-200">
                  {heightFormatted}
                </span>
              </div>
              <input
                type="range"
                min="150"
                max="195"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>150 cm (4'11")</span>
                <span>175 cm (5'9")</span>
                <span>195 cm (6'5")</span>
              </div>
            </div>

            {/* Waist Slider */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs uppercase font-semibold text-slate-600 tracking-wider">Waist Size</label>
                <span className="text-slate-900 font-bold text-sm px-2.5 py-0.5 rounded-lg bg-slate-100 border border-slate-200">
                  {waist} inches
                </span>
              </div>
              <input
                type="range"
                min="24"
                max="42"
                value={waist}
                onChange={(e) => setWaist(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>24" (XS)</span>
                <span>32" (M)</span>
                <span>42" (XXL)</span>
              </div>
            </div>

            {/* Build Type Selector */}
            <div className="mb-6">
              <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2 font-mono">
                Body Build
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['Slim', 'Athletic', 'Regular', 'Muscular'].map((b) => (
                  <button
                    key={b}
                    onClick={() => setBuild(b)}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all border ${
                      build === b
                        ? 'bg-black text-white border-black shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-black'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Silhouette Recommendation Box */}
            <div className="glass-card p-4 rounded-2xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-4 h-4 text-slate-900" />
                <h4 className="text-slate-900 text-xs font-bold uppercase tracking-wider">
                  AI Proportion Rule: {aiAdvice.ratio}
                </h4>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed mb-1.5">
                <strong>Recommended Cuts:</strong> {aiAdvice.cuts}
              </p>
              <p className="text-xs text-slate-500 leading-relaxed italic">
                <strong>Styling Pitfall to Avoid:</strong> {aiAdvice.avoid}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Matched Creator Cards */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-800" /> Creator Alignment Feed
                </h3>
                <p className="text-xs text-slate-500">
                  Creators near {heightFormatted} height & {waist}" waist
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold">
                Matches Calculated
              </span>
            </div>

            {/* Creators List */}
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {matchedCreators.map((creator) => (
                <div
                  key={creator.id}
                  className="glass-card p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-14 h-14 rounded-full object-cover border border-slate-200 shadow-sm group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-slate-900 font-bold text-base">
                          {creator.name}
                        </h4>
                        <span className="text-xs text-slate-500 font-mono">
                          {creator.handle}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-0.5">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-xs font-mono font-semibold">
                          {creator.height}cm / {creator.waist}" Waist
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-mono">
                          {creator.build}
                        </span>
                        <span className="text-xs text-slate-500">
                          • {creator.followers} followers
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 mt-1 italic">
                        "Wearing: {creator.outfit.top} + {creator.outfit.bottom}"
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end w-full sm:w-auto gap-1.5">
                    <span className="text-xs font-mono text-emerald-600 font-bold">
                      {creator.matchScore}% Match
                    </span>

                    <button
                      onClick={() => handleCopyLook(creator)}
                      className={`px-3.5 py-2 rounded-xl text-xs uppercase font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        copiedId === creator.id
                          ? 'bg-emerald-600 text-white'
                          : 'primary-button'
                      }`}
                    >
                      {copiedId === creator.id ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy Creator Look
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-6 pt-4 border-t border-black/5 text-center">
            * Creator Revenue Sharing: When you buy missing outfit pieces inspired by creators, creators earn a 70% commission split.
          </p>
        </div>
      </div>
    </section>
  );
}
