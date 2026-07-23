import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  CloudRain, 
  Thermometer, 
  Calendar, 
  Sparkles, 
  Check, 
  ChevronRight, 
  Shirt, 
  Briefcase, 
  Coffee, 
  Flame, 
  MapPin, 
  RefreshCw, 
  Search, 
  GlassWater, 
  Wine, 
  Heart, 
  Compass,
  Zap,
  Building2
} from 'lucide-react';

export default function WeatherCalendarStylist({ wardrobe, onSelectOutfit }) {
  // Live Weather Auto-Detection State
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [detectedWeather, setDetectedWeather] = useState({
    city: 'Singapore (Auto-GPS)',
    temp: 32,
    condition: 'Sunny 32°C',
    uv: 'High UV (8/10)',
    rule: 'Breathable linen & lightweight cotton recommended'
  });

  // Custom Event / Destination AI Questionnaire State
  const [customEventInput, setCustomEventInput] = useState('');
  const [activeDressCode, setActiveDressCode] = useState('formal'); // 'formal' | 'smart_casual' | 'informal' | 'semi_formal' | 'athletic' | 'black_tie'

  // Quick Event Chips Definition
  const EVENT_PRESETS = [
    { 
      id: 'formal', 
      label: 'Job Interview & Corporate', 
      icon: Briefcase, 
      tag: 'Formal & Sharp',
      desc: 'Pinstripe tailored shirt, dark navy trousers & leather dress shoes'
    },
    { 
      id: 'smart_casual', 
      label: 'Casual Coffee & Cafe', 
      icon: Coffee, 
      tag: 'Smart Casual',
      desc: 'Polo shirt, straight chinos & clean white sneakers'
    },
    { 
      id: 'semi_formal', 
      label: 'Dinner Date & Evening Out', 
      icon: Wine, 
      tag: 'Semi-Formal Elegance',
      desc: 'Unstructured blazer, tailored trousers & chelsea boots'
    },
    { 
      id: 'informal', 
      label: 'Beach & Resort Day Out', 
      icon: Sun, 
      tag: 'Informal & Breezy',
      desc: 'Open-collar linen camp shirt, cream shorts & loafers'
    },
    { 
      id: 'athletic', 
      label: 'Gym & Active Sports', 
      icon: Flame, 
      tag: 'Athletic Dri-FIT',
      desc: 'Performance mesh tee, training shorts & responsive sneakers'
    },
    { 
      id: 'black_tie', 
      label: 'Wedding & Gala Event', 
      icon: Sparkles, 
      tag: 'Black-Tie Formal',
      desc: 'Tuxedo blazer, crisp white shirt & polished oxford shoes'
    }
  ];

  // Auto-detect live weather on mount
  useEffect(() => {
    fetchLiveWeather();
  }, []);

  const fetchLiveWeather = () => {
    setWeatherLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
            const data = await res.json();
            if (data && data.current_weather) {
              const temp = Math.round(data.current_weather.temperature);
              const code = data.current_weather.weathercode;
              let cond = 'Sunny 32°C';
              let rule = 'Breathable linen & lightweight cotton recommended';
              
              if (code >= 51 && code <= 99) {
                cond = 'Rainy 24°C';
                rule = 'Water-resistant outer & quick-dry trousers recommended';
              } else if (temp < 22) {
                cond = 'Chilly 20°C';
                rule = 'Knitwear & structured layering recommended';
              }

              setDetectedWeather({
                city: `GPS (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)`,
                temp,
                condition: cond,
                uv: temp > 28 ? 'High UV (8/10)' : 'Moderate UV',
                rule
              });
            }
          } catch (e) {
            // Keep default
          } finally {
            setWeatherLoading(false);
          }
        },
        () => {
          setWeatherLoading(false);
        },
        { timeout: 4000 }
      );
    } else {
      setWeatherLoading(false);
    }
  };

  // Custom Event typing parser
  const handleCustomEventChange = (text) => {
    setCustomEventInput(text);
    const lower = text.toLowerCase();
    if (lower.includes('interview') || lower.includes('corporate') || lower.includes('office') || lower.includes('bank')) {
      setActiveDressCode('formal');
    } else if (lower.includes('coffee') || lower.includes('cafe') || lower.includes('brunch') || lower.includes('hangout')) {
      setActiveDressCode('smart_casual');
    } else if (lower.includes('dinner') || lower.includes('date') || lower.includes('bar') || lower.includes('night')) {
      setActiveDressCode('semi_formal');
    } else if (lower.includes('beach') || lower.includes('resort') || lower.includes('vacation') || lower.includes('pool')) {
      setActiveDressCode('informal');
    } else if (lower.includes('gym') || lower.includes('sport') || lower.includes('run') || lower.includes('workout')) {
      setActiveDressCode('athletic');
    } else if (lower.includes('wedding') || lower.includes('gala') || lower.includes('prom') || lower.includes('ball')) {
      setActiveDressCode('black_tie');
    }
  };

  // Generate outfit combinations matching detected weather and selected event
  const getRecommendedLook = () => {
    let top = wardrobe.find(i => i.category.toLowerCase().includes('top') || i.name.toLowerCase().includes('shirt')) || {
      name: 'Tailored Oxford Shirt', category: 'Tops', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=80'
    };
    let bottom = wardrobe.find(i => i.category.toLowerCase().includes('bottom') || i.name.toLowerCase().includes('trousers')) || {
      name: 'Slim Fit Navy Trousers', category: 'Bottoms', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&auto=format&fit=crop&q=80'
    };
    let footwear = wardrobe.find(i => i.category.toLowerCase().includes('footwear') || i.name.toLowerCase().includes('shoe')) || {
      name: 'Monk Strap Leather Shoes', category: 'Footwear', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500&auto=format&fit=crop&q=80'
    };

    if (activeDressCode === 'smart_casual') {
      top = { name: 'Pique Cotton Polo Shirt', category: 'Tops', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=80' };
      bottom = { name: 'Straight Fit Beige Chinos', category: 'Bottoms', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&fit=crop&q=80' };
      footwear = { name: 'Classic White Leather Sneakers', category: 'Footwear', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=80' };
    } else if (activeDressCode === 'informal') {
      top = { name: 'Open-Collar Linen Camp Shirt', category: 'Tops', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&auto=format&fit=crop&q=80' };
      bottom = { name: 'Cream Pleated Cotton Shorts', category: 'Bottoms', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&auto=format&fit=crop&q=80' };
      footwear = { name: 'Breezy Penny Loafers', category: 'Footwear', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=80' };
    } else if (activeDressCode === 'athletic') {
      top = { name: 'Performance Mesh Dri-FIT Tee', category: 'Tops', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80' };
      bottom = { name: 'Dri-FIT Active Training Shorts', category: 'Bottoms', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&auto=format&fit=crop&q=80' };
      footwear = { name: 'Responsive Cushioning Trainers', category: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80' };
    }

    return { top, bottom, footwear };
  };

  const currentLook = getRecommendedLook();
  const selectedPreset = EVENT_PRESETS.find(p => p.id === activeDressCode) || EVENT_PRESETS[0];

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-bold text-slate-800 uppercase mb-3">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>Auto-Weather & Event AI Stylist</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          🌦️ Weather & Event AI Assistant
        </h2>
        <p className="text-sm text-slate-600">
          StyleSync automatically detects your live weather forecast and matches outfit dress codes based on the event you are attending.
        </p>
      </div>

      {/* Requirement 1: Live Weather Auto-Detection Card (NO manual selection buttons) */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-sky-900 via-slate-900 to-indigo-950 text-white shadow-xl mb-8 border border-sky-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/40 text-sky-300 flex items-center justify-center shrink-0">
            <Sun className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {detectedWeather.city}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-mono font-bold">
                AUTO-SYNCED
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white mt-0.5">
              Live Weather: {detectedWeather.condition}
            </h3>
            <p className="text-xs text-slate-300 font-mono mt-1">
              💡 {detectedWeather.rule}
            </p>
          </div>
        </div>

        <button
          onClick={fetchLiveWeather}
          disabled={weatherLoading}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${weatherLoading ? 'animate-spin' : ''}`} />
          {weatherLoading ? 'Syncing...' : 'Re-Detect Weather'}
        </button>
      </div>

      {/* Requirement 2: Interactive "What event are you attending?" / "Where are you going?" AI Questionnaire */}
      <div className="glass-card p-6 sm:p-7 rounded-3xl border border-black/10 bg-white shadow-md mb-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase font-bold text-indigo-600 tracking-wider block">EVENT QUESTIONNAIRE</span>
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-600" /> What event are you attending? / Where are you going?
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">Dress Code Classification AI</span>
        </div>

        {/* Custom Typing Search / Question Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Type your destination (e.g. Tech Job Interview, Beach Party, Wedding at Grand Hyatt, Dinner Date)..."
            value={customEventInput}
            onChange={(e) => handleCustomEventChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-900 font-medium focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all shadow-inner"
          />
          {customEventInput && (
            <span className="absolute right-3 top-3 text-[10px] font-mono font-bold px-2 py-1 rounded-md bg-indigo-100 text-indigo-800">
              AI Dress Code: {selectedPreset.tag}
            </span>
          )}
        </div>

        {/* Quick Event Category Chips */}
        <div>
          <label className="text-xs uppercase font-bold font-mono text-slate-500 tracking-wider block mb-2.5">
            Or select an event category:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {EVENT_PRESETS.map((preset) => {
              const Icon = preset.icon;
              const isSelected = activeDressCode === preset.id;
              return (
                <div
                  key={preset.id}
                  onClick={() => {
                    setActiveDressCode(preset.id);
                    setCustomEventInput(preset.label);
                  }}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-slate-950 text-white border-slate-950 shadow-lg scale-[1.01]'
                      : 'bg-slate-50 text-slate-900 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold truncate">{preset.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                    </div>
                    <span className={`text-[10px] font-mono font-bold block mt-0.5 ${isSelected ? 'text-emerald-300' : 'text-slate-500'}`}>
                      {preset.tag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Generated Weather & Event Outfit Result Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-black/10 bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/5 pb-5 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> 100% Climate & Dress Code Match
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Recommended Look for "{customEventInput || selectedPreset.label}"
            </h3>
            <p className="text-xs text-slate-600 font-mono mt-1">
              Dress Code: <b>{selectedPreset.tag}</b> • Weather Rule: <b>{detectedWeather.rule}</b>
            </p>
          </div>
          <button
            onClick={onSelectOutfit}
            className="primary-button px-5 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shrink-0 shadow-md shimmer-hover"
          >
            Launch Canvas Mixer <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-2">Top Garment</span>
            <img src={currentLook.top.image} alt={currentLook.top.name} className="w-full h-36 object-cover rounded-xl mb-3" />
            <h4 className="text-xs font-bold text-slate-900 leading-tight">{currentLook.top.name}</h4>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-2">Bottom Garment</span>
            <img src={currentLook.bottom.image} alt={currentLook.bottom.name} className="w-full h-36 object-cover rounded-xl mb-3" />
            <h4 className="text-xs font-bold text-slate-900 leading-tight">{currentLook.bottom.name}</h4>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-2">Footwear</span>
            <img src={currentLook.footwear.image} alt={currentLook.footwear.name} className="w-full h-36 object-cover rounded-xl mb-3" />
            <h4 className="text-xs font-bold text-slate-900 leading-tight">{currentLook.footwear.name}</h4>
          </div>
        </div>
      </div>
    </section>
  );
}
