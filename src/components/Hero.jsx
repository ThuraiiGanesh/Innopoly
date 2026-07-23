import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Layers, 
  User, 
  Palette, 
  LogIn, 
  UserPlus, 
  Lock, 
  ChevronRight, 
  ChevronLeft,
  Camera,
  Shirt,
  Zap,
  Shuffle,
  Play,
  CheckCircle2,
  Sliders,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

// Mix and Match Sample Reel Items for Landing Page Swiping
const HERO_TOPS = [
  { id: 'ht1', name: 'Black Oversized Crew Tee', color: '#18181b', colorName: 'Midnight Black', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80', style: 'Smart Casual' },
  { id: 'ht2', name: 'Open Collar Linen Camp Shirt', color: '#d4b996', colorName: 'Sand Beige', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80', style: 'Resort Vacation' },
  { id: 'ht3', name: 'Silk Draped Satin Top', color: '#065f46', colorName: 'Emerald Green', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80', style: 'Formal Gala' },
  { id: 'ht4', name: 'Heavyweight Boxy Graphic Tee', color: '#3f3f46', colorName: 'Charcoal Grey', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80', style: 'Urban Streetwear' }
];

const HERO_BOTTOMS = [
  { id: 'hb1', name: 'Tailored Straight Chinos', color: '#3f3f46', colorName: 'Charcoal Grey', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80', style: 'Smart Casual' },
  { id: 'hb2', name: 'Wide-Leg Indigo Denim', color: '#1e1b4b', colorName: 'Deep Indigo', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80', style: 'Streetwear' },
  { id: 'hb3', name: 'Uniqlo Smart Ankle Trousers', color: '#18181b', colorName: 'Midnight Black', image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80', style: 'Old Money' },
  { id: 'hb4', name: 'Tailored Cream Shorts', color: '#fef3c7', colorName: 'Cream White', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80', style: 'Resort' }
];

const HERO_SHOES = [
  { id: 'hs1', name: 'Classic White Leather Sneakers', color: '#ffffff', colorName: 'Pure White', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80', style: 'Clean Fit' },
  { id: 'hs2', name: 'Leather Penny Loafers', color: '#451a03', colorName: 'Chestnut Brown', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop&q=80', style: 'Quiet Luxury' },
  { id: 'hs3', name: 'Retro High Canvas Kicks', color: '#18181b', colorName: 'Black Canvas', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&auto=format&fit=crop&q=80', style: 'Streetwear' },
  { id: 'hs4', name: 'Pointed Slingback Heels', color: '#09090b', colorName: 'Obsidian', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80', style: 'Evening Formal' }
];

export default function Hero({ user, onNavigate, onOpenLogin }) {
  const [topIdx, setTopIdx] = useState(0);
  const [bottomIdx, setBottomIdx] = useState(0);
  const [shoeIdx, setShoeIdx] = useState(0);
  const [isAutoShuffling, setIsAutoShuffling] = useState(false);
  const [animatingRow, setAnimatingRow] = useState(null); // 'top' | 'bottom' | 'shoes'

  // Auto-swipe/mix loop interval
  useEffect(() => {
    const interval = setInterval(() => {
      setTopIdx(prev => (prev + 1) % HERO_TOPS.length);
      setBottomIdx(prev => (prev + 1) % HERO_BOTTOMS.length);
      setShoeIdx(prev => (prev + 1) % HERO_SHOES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleTopSlide = (direction) => {
    setAnimatingRow('top');
    if (direction === 'left') {
      setTopIdx(prev => (prev === 0 ? HERO_TOPS.length - 1 : prev - 1));
    } else {
      setTopIdx(prev => (prev + 1) % HERO_TOPS.length);
    }
    setTimeout(() => setAnimatingRow(null), 300);
  };

  const handleBottomSlide = (direction) => {
    setAnimatingRow('bottom');
    if (direction === 'left') {
      setBottomIdx(prev => (prev === 0 ? HERO_BOTTOMS.length - 1 : prev - 1));
    } else {
      setBottomIdx(prev => (prev + 1) % HERO_BOTTOMS.length);
    }
    setTimeout(() => setAnimatingRow(null), 300);
  };

  const handleShoeSlide = (direction) => {
    setAnimatingRow('shoes');
    if (direction === 'left') {
      setShoeIdx(prev => (prev === 0 ? HERO_SHOES.length - 1 : prev - 1));
    } else {
      setShoeIdx(prev => (prev + 1) % HERO_SHOES.length);
    }
    setTimeout(() => setAnimatingRow(null), 300);
  };

  const handleShuffle = () => {
    setIsAutoShuffling(true);
    setTopIdx(Math.floor(Math.random() * HERO_TOPS.length));
    setBottomIdx(Math.floor(Math.random() * HERO_BOTTOMS.length));
    setShoeIdx(Math.floor(Math.random() * HERO_SHOES.length));
    setTimeout(() => setIsAutoShuffling(false), 500);
  };

  const currentTop = HERO_TOPS[topIdx];
  const currentBottom = HERO_BOTTOMS[bottomIdx];
  const currentShoe = HERO_SHOES[shoeIdx];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const userName = user?.name ? user.name.split(' ')[0] : 'Stylist';
  const timeGreeting = getGreeting();

  return (
    <section className="relative min-h-[90vh] bg-slate-950 text-white flex flex-col justify-center items-center px-4 sm:px-6 py-12 sm:py-16 text-center overflow-hidden border-b border-slate-800">
      
      {/* High-Definition Background Video Loop */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80"
        className="absolute inset-0 w-full h-full object-cover opacity-25 z-0 pointer-events-none filter saturate-150"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-photoshoot-41617-large.mp4" type="video/mp4" />
        <source src="https://assets.mixkit.co/videos/preview/mixkit-model-walking-on-a-catwalk-41489-large.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950/95 pointer-events-none z-0" />

      {/* Glow ambient background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Main Foreground Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full animate-fade-in">
        
        {/* Brand Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-slate-900/90 text-emerald-400 border-emerald-500/40 backdrop-blur-md text-xs font-mono font-bold shadow-xl mb-6">
          <Sparkles className="w-4 h-4 text-emerald-400 animate-spin-slow shrink-0" />
          <span>3-Tier Mix & Match Mannequin Column</span>
        </div>

        {/* High Contrast Header */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 max-w-3xl leading-[1.12] drop-shadow-md font-sans">
          {timeGreeting} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">{userName}</span>, Swipe Tops, Bottoms & Shoes
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal leading-relaxed mb-8 text-balance px-2 font-mono drop-shadow">
          Swipe the left and right arrows on each clothing slot to mix & match your top, bottom, and footwear!
        </p>

        {/* ================= VERTICAL 3-TIER MANNEQUIN COLUMN WITH HORIZONTAL SWIPE ARROWS (MATCHING USER SKETCH) ================= */}
        <div className="w-full max-w-md glass-panel p-4 sm:p-6 rounded-3xl border border-slate-800 bg-slate-900/95 backdrop-blur-2xl shadow-2xl mb-10 text-center relative overflow-hidden">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-300 font-bold">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Active Look: <strong className="text-emerald-400 uppercase">{currentTop.style}</strong></span>
            </div>

            <button
              onClick={handleShuffle}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-xl text-xs font-mono font-extrabold flex items-center gap-1 transition-all shadow-md active:scale-95"
            >
              <Shuffle className={`w-3.5 h-3.5 ${isAutoShuffling ? 'animate-spin' : ''}`} /> Shuffle
            </button>
          </div>

          {/* Vertical Stacked 3-Slot Mannequin Tower */}
          <div className="space-y-4">
            
            {/* ROW 1: TOP / SHIRT SLOT WITH LEFT (<--) AND RIGHT (-->) ARROWS */}
            <div className="glass-card p-3 rounded-2xl border border-slate-800 bg-slate-950/90 relative flex items-center justify-between gap-2 shadow-inner group">
              {/* Left Arrow <-- */}
              <button
                onClick={() => handleTopSlide('left')}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-800 shadow-md shrink-0 active:scale-90"
                title="Swipe Top Left"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Center Garment Card: Shirt */}
              <div className="flex-1 h-36 rounded-xl overflow-hidden relative bg-slate-900 border border-slate-800 flex items-center justify-center">
                <img
                  src={currentTop.image}
                  alt={currentTop.name}
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    animatingRow === 'top' || isAutoShuffling ? 'scale-110 opacity-70 blur-xs' : 'scale-100 opacity-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-emerald-400 font-bold border border-emerald-500/30">
                  👕 TOP GARMENT
                </div>
                <span className="absolute bottom-2 left-2 right-2 text-xs font-extrabold text-white truncate font-sans text-left">
                  {currentTop.name}
                </span>
              </div>

              {/* Right Arrow --> */}
              <button
                onClick={() => handleTopSlide('right')}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-800 shadow-md shrink-0 active:scale-90"
                title="Swipe Top Right"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* ROW 2: PANTS / BOTTOM SLOT WITH LEFT (<--) AND RIGHT (-->) ARROWS */}
            <div className="glass-card p-3 rounded-2xl border border-slate-800 bg-slate-950/90 relative flex items-center justify-between gap-2 shadow-inner group">
              {/* Left Arrow <-- */}
              <button
                onClick={() => handleBottomSlide('left')}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-800 shadow-md shrink-0 active:scale-90"
                title="Swipe Pants Left"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Center Garment Card: Pants */}
              <div className="flex-1 h-36 rounded-xl overflow-hidden relative bg-slate-900 border border-slate-800 flex items-center justify-center">
                <img
                  src={currentBottom.image}
                  alt={currentBottom.name}
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    animatingRow === 'bottom' || isAutoShuffling ? 'scale-110 opacity-70 blur-xs' : 'scale-100 opacity-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-emerald-400 font-bold border border-emerald-500/30">
                  👖 BOTTOM GARMENT
                </div>
                <span className="absolute bottom-2 left-2 right-2 text-xs font-extrabold text-white truncate font-sans text-left">
                  {currentBottom.name}
                </span>
              </div>

              {/* Right Arrow --> */}
              <button
                onClick={() => handleBottomSlide('right')}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-800 shadow-md shrink-0 active:scale-90"
                title="Swipe Pants Right"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* ROW 3: SHOES / FOOTWEAR SLOT WITH LEFT (<--) AND RIGHT (-->) ARROWS */}
            <div className="glass-card p-3 rounded-2xl border border-slate-800 bg-slate-950/90 relative flex items-center justify-between gap-2 shadow-inner group">
              {/* Left Arrow <-- */}
              <button
                onClick={() => handleShoeSlide('left')}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-800 shadow-md shrink-0 active:scale-90"
                title="Swipe Shoes Left"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Center Garment Card: Shoes */}
              <div className="flex-1 h-36 rounded-xl overflow-hidden relative bg-slate-900 border border-slate-800 flex items-center justify-center">
                <img
                  src={currentShoe.image}
                  alt={currentShoe.name}
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    animatingRow === 'shoes' || isAutoShuffling ? 'scale-110 opacity-70 blur-xs' : 'scale-100 opacity-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-emerald-400 font-bold border border-emerald-500/30">
                  👟 FOOTWEAR
                </div>
                <span className="absolute bottom-2 left-2 right-2 text-xs font-extrabold text-white truncate font-sans text-left">
                  {currentShoe.name}
                </span>
              </div>

              {/* Right Arrow --> */}
              <button
                onClick={() => handleShoeSlide('right')}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-800 shadow-md shrink-0 active:scale-90"
                title="Swipe Shoes Right"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-mono text-[11px] truncate">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {currentTop.name.split(' ')[0]} + {currentBottom.name.split(' ')[0]}
            </span>

            <button
              onClick={() => onNavigate('styling')}
              className="text-emerald-400 font-extrabold hover:underline flex items-center gap-1 font-mono text-[11px] shrink-0"
            >
              Open Outfit Canvas →
            </button>
          </div>
        </div>

        {/* Primary Action CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mb-10 px-2">
          
          {/* Action A: Launch Outfit Mixer */}
          <button
            onClick={() => onNavigate('styling')}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white p-4 sm:p-5 flex items-center justify-between shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 border border-emerald-400/40"
          >
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center border border-white/30 shrink-0 shadow-md">
                <Sparkles className="w-5 h-5 text-emerald-200 group-hover:rotate-12 transition-transform" />
              </div>
              <div>
                <span className="text-sm font-extrabold block tracking-wide uppercase text-white">Launch Outfit Canvas</span>
                <span className="text-[10px] text-emerald-100 font-mono font-medium">Anti-Gravity AI Canvas Engine</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-emerald-200 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Action B: Digitalize Closet */}
          <button
            onClick={() => onNavigate('closet')}
            className="group relative overflow-hidden rounded-2xl bg-slate-900/90 hover:bg-slate-800 backdrop-blur-xl text-white p-4 sm:p-5 flex items-center justify-between shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 border border-slate-700/80"
          >
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0 shadow-md">
                <Camera className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <span className="text-sm font-extrabold block tracking-wide uppercase text-white">Digitalize Closet</span>
                <span className="text-[10px] text-slate-300 font-mono font-medium">Camera & Multi-Shot Scanner</span>
              </div>
            </div>
            <Layers className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Feature Quick Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-3xl text-left mb-8">
          <div 
            onClick={() => onNavigate('styling')}
            className="p-4 rounded-2xl border border-slate-800 bg-slate-900/90 hover:border-slate-700 backdrop-blur-xl cursor-pointer transition-all flex items-center gap-3.5 shadow-lg group"
          >
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-extrabold text-white block">Outfit Canvas</span>
              <p className="text-[11px] text-slate-300 leading-normal font-medium">
                Assemble looks & Google Calendar fits.
              </p>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('color')}
            className="p-4 rounded-2xl border border-slate-800 bg-slate-900/90 hover:border-slate-700 backdrop-blur-xl cursor-pointer transition-all flex items-center gap-3.5 shadow-lg group"
          >
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 shrink-0 group-hover:scale-105 transition-transform">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-extrabold text-white block">Color Season</span>
              <p className="text-[11px] text-slate-300 leading-normal font-medium">
                Face photo undertone diagnosis.
              </p>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('creators')}
            className="p-4 rounded-2xl border border-slate-800 bg-slate-900/90 hover:border-slate-700 backdrop-blur-xl cursor-pointer transition-all flex items-center gap-3.5 shadow-lg group"
          >
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0 group-hover:scale-105 transition-transform">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-extrabold text-white block">Creators</span>
              <p className="text-[11px] text-slate-300 leading-normal font-medium">
                Match cuts to your height & waist.
              </p>
            </div>
          </div>
        </div>

        {/* User Auth Prompts when logged out */}
        {!user && (
          <div className="w-full max-w-3xl p-6 sm:p-7 rounded-3xl border border-slate-800 bg-slate-900/95 backdrop-blur-2xl shadow-2xl text-center flex flex-col items-center gap-4 animate-fade-in-up">
            <div className="flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-extrabold uppercase font-mono text-emerald-400 tracking-wider">
                Create or Access Your Saved Style Profile
              </span>
            </div>
            <p className="text-xs text-slate-200 max-w-xl font-medium leading-relaxed">
              Sign in or register to save your body measurements, multi-select style themes, and digitized closet items across sessions!
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
              <button
                onClick={() => onOpenLogin && onOpenLogin(false)}
                className="flex-1 bg-white hover:bg-slate-200 text-slate-950 font-extrabold py-3 px-5 text-xs uppercase tracking-wider flex items-center justify-center gap-2 rounded-xl transition-all shadow-md"
              >
                <LogIn className="w-4 h-4 text-slate-900" /> Sign In to Account
              </button>

              <button
                onClick={() => onOpenLogin && onOpenLogin(true)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3 px-5 text-xs uppercase tracking-wider flex items-center justify-center gap-2 rounded-xl transition-all shadow-md"
              >
                <UserPlus className="w-4 h-4" /> Register Account
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
