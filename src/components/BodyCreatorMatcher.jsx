import React, { useState } from 'react';
import { User, Ruler, Sparkles, CheckCircle2, Copy, Users, DollarSign, Shirt } from 'lucide-react';
import { CREATORS } from '../data/mockData';

export default function BodyCreatorMatcher({ onSelectCreatorOutfit }) {
  const [height, setHeight] = useState(178); // cm
  const [chest, setChest] = useState(38); // inches (Bust/Chest)
  const [waist, setWaist] = useState(30); // inches
  const [hips, setHips] = useState(38); // inches
  const [shoulders, setShoulders] = useState(44); // cm
  const [inseam, setInseam] = useState(30); // inches
  const [build, setBuild] = useState('Athletic');
  const [copiedId, setCopiedId] = useState(null);

  const feet = Math.floor(height / 30.48);
  const inches = Math.round((height % 30.48) / 2.54);
  const heightFormatted = `${height} cm (${feet}'${inches}")`;

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
          <User className="w-3.5 h-3.5" /> Body Metrics & Creator Alignment
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
          Creator Looks, Photos & Total Outfit Costs
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Explore full outfit photos from creators matching your exact body metrics profile (Bust/Chest, Waist, Hips, Shoulders & Inseam) with complete itemized costs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Body Profile Sliders & AI Advice */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Ruler className="w-4 h-4 text-slate-800" /> Full Body Metrics Profile
              </h3>
              <span className="text-xs font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                6 Dimensions
              </span>
            </div>

            <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
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
                  onChange={(e) => setHeight(Number(e.target.value))}
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
                  onChange={(e) => setChest(Number(e.target.value))}
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
                  onChange={(e) => setWaist(Number(e.target.value))}
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
                  max="54"
                  value={hips}
                  onChange={(e) => setHips(Number(e.target.value))}
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
                  min="35"
                  max="58"
                  value={shoulders}
                  onChange={(e) => setShoulders(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              {/* Inseam Slider */}
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
                  onChange={(e) => setInseam(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              {/* Build Type Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1.5 font-mono">
                  Body Build
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {['Slim', 'Athletic', 'Regular', 'Muscular'].map((b) => (
                    <button
                      key={b}
                      onClick={() => setBuild(b)}
                      className={`py-1.5 rounded-xl text-xs font-semibold transition-all border ${
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
            </div>

            {/* AI Silhouette Recommendation Box */}
            <div className="glass-card p-4 rounded-2xl border border-slate-200 bg-slate-50 mt-4">
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-4 h-4 text-slate-900" />
                <h4 className="text-slate-900 text-xs font-bold uppercase tracking-wider">
                  AI Proportion Rule: {aiAdvice.ratio}
                </h4>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed mb-1">
                <strong>Recommended Cuts:</strong> {aiAdvice.cuts}
              </p>
              <p className="text-xs text-slate-500 leading-relaxed italic">
                <strong>Avoid:</strong> {aiAdvice.avoid}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Matched Creator Cards with Full Outfit Photos & Total Costs */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-800" /> Creator Look Gallery & Total Costs
                </h3>
                <p className="text-xs text-slate-500">
                  Creators matching {heightFormatted}, {waist}" Waist
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold">
                Matches Calculated
              </span>
            </div>

            {/* Creators List */}
            <div className="space-y-6 max-h-[520px] overflow-y-auto pr-1">
              {matchedCreators.map((creator) => (
                <div
                  key={creator.id}
                  className="glass-card p-5 rounded-3xl border border-slate-200 bg-white flex flex-col gap-4 group"
                >
                  {/* Top Header: Creator Avatar & Match Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-sm"
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
                        <span className="text-xs text-slate-500">
                          {creator.height}cm • {creator.waist}" Waist • {creator.build} Build
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono text-emerald-600 font-bold block">
                        {creator.matchScore}% Match
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {creator.followers} Followers
                      </span>
                    </div>
                  </div>

                  {/* Creator Outfit Showcase Photo & Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                    <div className="sm:col-span-5 relative overflow-hidden rounded-xl">
                      <img
                        src={creator.outfitImage}
                        alt={creator.featuredLook}
                        className="w-full h-44 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded-md font-bold">
                        {creator.featuredLook}
                      </span>
                    </div>

                    <div className="sm:col-span-7 flex flex-col justify-between space-y-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 font-mono uppercase font-bold block mb-1">
                          Itemized Outfit Breakdown:
                        </span>
                        <ul className="space-y-1 text-slate-700 font-sans">
                          <li className="flex justify-between border-b border-slate-200/60 pb-1">
                            <span>Top:</span>
                            <strong className="text-slate-900 font-semibold">{creator.outfit.top}</strong>
                          </li>
                          <li className="flex justify-between border-b border-slate-200/60 pb-1">
                            <span>Bottom:</span>
                            <strong className="text-slate-900 font-semibold">{creator.outfit.bottom}</strong>
                          </li>
                          <li className="flex justify-between border-b border-slate-200/60 pb-1">
                            <span>Outer:</span>
                            <strong className="text-slate-900 font-semibold">{creator.outfit.outer}</strong>
                          </li>
                          <li className="flex justify-between">
                            <span>Shoes:</span>
                            <strong className="text-slate-900 font-semibold">{creator.outfit.shoes}</strong>
                          </li>
                        </ul>
                      </div>

                      {/* Total Cost Badge */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-200 font-mono">
                        <span className="text-slate-500 font-medium">Total Outfit Cost:</span>
                        <span className="text-emerald-700 text-sm font-bold bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                          {creator.totalCost}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => handleCopyLook(creator)}
                      className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs uppercase font-semibold flex items-center justify-center gap-2 transition-all ${
                        copiedId === creator.id
                          ? 'bg-emerald-600 text-white'
                          : 'primary-button'
                      }`}
                    >
                      {copiedId === creator.id ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" /> Outfit Loaded into Canvas!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" /> Copy Creator Look to Canvas
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
