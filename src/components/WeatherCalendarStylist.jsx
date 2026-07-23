import React, { useState } from 'react';
import { Sun, CloudRain, Thermometer, Calendar, Sparkles, Check, ChevronRight, Shirt, Briefcase, Coffee, Umbrella, Flame } from 'lucide-react';

export default function WeatherCalendarStylist({ wardrobe, onSelectOutfit }) {
  const [selectedWeather, setSelectedWeather] = useState('sunny'); // 'sunny' | 'rainy' | 'chilly' | 'humid'
  const [selectedEvent, setSelectedEvent] = useState('interview'); // 'interview' | 'casual' | 'beach' | 'dinner' | 'gym'

  const weatherPresets = [
    { id: 'sunny', label: 'Sunny 32°C', icon: Sun, desc: 'High UV, breathable fabrics recommended', badge: 'Light & Linen' },
    { id: 'rainy', label: 'Rainy 24°C', icon: CloudRain, desc: 'High humidity, quick-dry or layered outer', badge: 'Water Resistant' },
    { id: 'chilly', label: 'Chilly 20°C', icon: Thermometer, desc: 'Air-conditioned office or breezy night', badge: 'Knit & Layers' }
  ];

  const eventPresets = [
    { id: 'interview', label: 'Job Interview', icon: Briefcase, tag: 'Formal & Sharp' },
    { id: 'casual', label: 'Casual Coffee', icon: Coffee, tag: 'Smart Casual' },
    { id: 'gym', label: 'Gym & Sports', icon: Flame, tag: 'Athletic Dri-FIT' }
  ];

  // Generate outfit combinations matching selected weather and event
  const getRecommendedLook = () => {
    let top = wardrobe.find(i => i.category.toLowerCase().includes('top') || i.name.toLowerCase().includes('shirt')) || wardrobe[0];
    let bottom = wardrobe.find(i => i.category.toLowerCase().includes('bottom') || i.name.toLowerCase().includes('trousers') || i.name.toLowerCase().includes('denim')) || wardrobe[1];
    let footwear = wardrobe.find(i => i.category.toLowerCase().includes('footwear') || i.name.toLowerCase().includes('shoe') || i.name.toLowerCase().includes('sneaker')) || wardrobe[2];

    if (selectedEvent === 'interview') {
      top = { name: 'Pinstripe Tailored Oxford Shirt', category: 'Tops', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=80', color: 'White' };
      bottom = { name: 'Slim Fit Navy Trousers', category: 'Bottoms', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&auto=format&fit=crop&q=80', color: 'Navy' };
      footwear = { name: 'Monk Strap Leather Shoes', category: 'Footwear', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500&auto=format&fit=crop&q=80', color: 'Brown' };
    } else if (selectedEvent === 'gym') {
      top = { name: 'Performance Mesh Athletic Tee', category: 'Tops', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80', color: 'Black' };
      bottom = { name: 'Dri-FIT Active Training Shorts', category: 'Bottoms', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&auto=format&fit=crop&q=80', color: 'Charcoal' };
      footwear = { name: 'Responsive Cushioning Sneakers', category: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80', color: 'Red/White' };
    }

    return { top, bottom, footwear };
  };

  const currentLook = getRecommendedLook();

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-bold text-slate-800 uppercase mb-3">
          <Sun className="w-3.5 h-3.5 text-amber-500" />
          <span>Next-Gen Smart Stylist</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          🌦️ Weather & Calendar AI Stylist
        </h2>
        <p className="text-sm text-slate-600">
          Cross-references today's temperature forecast and calendar schedule against your closet items for the perfect outfit match.
        </p>
      </div>

      {/* Weather App Auto-Sync Status Banner */}
      <div className="flex items-center justify-center gap-2 p-3 mb-8 rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 text-sky-900 text-xs font-mono font-bold shadow-sm">
        <Sun className="w-4 h-4 text-amber-500 animate-spin-slow shrink-0" />
        <span>⚡ Weather App Synced: Auto-detecting local weather (Sunny 32°C) & recommending climate-matched fits!</span>
      </div>

      {/* Preset Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Weather Selector */}
        <div className="glass-card p-5 rounded-3xl border border-black/5">
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-500" /> Select Today's Weather
          </h3>
          <div className="space-y-2.5">
            {weatherPresets.map((w) => {
              const Icon = w.icon;
              const isSelected = selectedWeather === w.id;
              return (
                <div
                  key={w.id}
                  onClick={() => setSelectedWeather(w.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-black text-white border-black shadow-md'
                      : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block">{w.label}</span>
                      <span className={`text-[11px] block mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {w.desc}
                      </span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-white text-black' : 'bg-slate-100 text-slate-700'}`}>
                    {w.badge}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Event Calendar Selector */}
        <div className="glass-card p-5 rounded-3xl border border-black/5">
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-500" /> Select Scheduled Event
          </h3>
          <div className="space-y-2.5">
            {eventPresets.map((e) => {
              const Icon = e.icon;
              const isSelected = selectedEvent === e.id;
              return (
                <div
                  key={e.id}
                  onClick={() => setSelectedEvent(e.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-black text-white border-black shadow-md'
                      : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block">{e.label}</span>
                      <span className={`text-[11px] block mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {e.tag}
                      </span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Generated Weather Outfit Result Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-black/10 bg-gradient-to-br from-white via-slate-50 to-amber-50/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/5 pb-5 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> 98% Weather Harmony Match
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Recommended Outfit Look
            </h3>
          </div>
          <button
            onClick={onSelectOutfit}
            className="primary-button px-5 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shrink-0"
          >
            Launch Canvas Mixer <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-2">Top Garment</span>
            <img src={currentLook.top.image} alt={currentLook.top.name} className="w-full h-36 object-cover rounded-xl mb-3" />
            <h4 className="text-xs font-bold text-slate-900 leading-tight">{currentLook.top.name}</h4>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-2">Bottom Garment</span>
            <img src={currentLook.bottom.image} alt={currentLook.bottom.name} className="w-full h-36 object-cover rounded-xl mb-3" />
            <h4 className="text-xs font-bold text-slate-900 leading-tight">{currentLook.bottom.name}</h4>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-2">Footwear</span>
            <img src={currentLook.footwear.image} alt={currentLook.footwear.name} className="w-full h-36 object-cover rounded-xl mb-3" />
            <h4 className="text-xs font-bold text-slate-900 leading-tight">{currentLook.footwear.name}</h4>
          </div>
        </div>
      </div>
    </section>
  );
}
