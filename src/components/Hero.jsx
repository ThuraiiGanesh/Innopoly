import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Layers, 
  User, 
  Sun, 
  CloudRain, 
  Cloud, 
  Thermometer, 
  Palette, 
  LogIn, 
  UserPlus, 
  Lock, 
  ChevronRight, 
  Camera,
  Shirt,
  Compass,
  Zap
} from 'lucide-react';

// ================= DYNAMIC WEATHER BACKGROUND CANVAS COMPONENT =================
function WeatherBackground({ weather }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      canvas.width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
      canvas.height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Particle engines for weather types
    let raindrops = [];
    let sunDust = [];
    let clouds = [];

    const width = canvas.width;
    const height = canvas.height;

    // Initialize Rain
    if (weather === 'rainy') {
      const dropCount = Math.floor(width / 12);
      for (let i = 0; i < dropCount; i++) {
        raindrops.push({
          x: Math.random() * width,
          y: Math.random() * height,
          length: Math.random() * 20 + 15,
          speed: Math.random() * 8 + 10,
          opacity: Math.random() * 0.4 + 0.2,
          thickness: Math.random() * 1.5 + 0.5
        });
      }
    }

    // Initialize Sun Dust / Flares
    if (weather === 'sunny') {
      for (let i = 0; i < 35; i++) {
        sunDust.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: -Math.random() * 0.5 - 0.2,
          opacity: Math.random() * 0.6 + 0.2
        });
      }
    }

    // Initialize Clouds / Fog
    if (weather === 'cloudy') {
      for (let i = 0; i < 8; i++) {
        clouds.push({
          x: Math.random() * width - width / 2,
          y: Math.random() * (height * 0.6),
          radius: Math.random() * 180 + 120,
          speed: Math.random() * 0.3 + 0.1,
          opacity: Math.random() * 0.15 + 0.05
        });
      }
    }

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (weather === 'rainy') {
        // Draw Falling Raindrops
        ctx.strokeStyle = '#38bdf8';
        ctx.lineCap = 'round';
        raindrops.forEach((drop) => {
          ctx.beginPath();
          ctx.lineWidth = drop.thickness;
          ctx.strokeStyle = `rgba(56, 189, 248, ${drop.opacity})`;
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x - drop.speed * 0.2, drop.y + drop.length);
          ctx.stroke();

          drop.y += drop.speed;
          drop.x -= drop.speed * 0.2;

          if (drop.y > canvas.height) {
            drop.y = -drop.length;
            drop.x = Math.random() * canvas.width;
          }
        });
      } else if (weather === 'sunny') {
        // Draw Glowing Golden Sun Rays
        const gradient = ctx.createRadialGradient(
          canvas.width * 0.8,
          0,
          20,
          canvas.width * 0.8,
          0,
          canvas.width * 0.7
        );
        gradient.addColorStop(0, 'rgba(251, 191, 36, 0.25)');
        gradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.08)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Sun Dust Particles
        sunDust.forEach((particle) => {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(252, 211, 77, ${particle.opacity})`;
          ctx.fill();

          particle.x += particle.speedX;
          particle.y += particle.speedY;

          if (particle.y < 0) particle.y = canvas.height;
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
        });
      } else if (weather === 'cloudy') {
        // Draw Soft Fog Clouds
        clouds.forEach((cloud) => {
          const cloudGrad = ctx.createRadialGradient(
            cloud.x,
            cloud.y,
            10,
            cloud.x,
            cloud.y,
            cloud.radius
          );
          cloudGrad.addColorStop(0, `rgba(203, 213, 225, ${cloud.opacity})`);
          cloudGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = cloudGrad;
          ctx.beginPath();
          ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
          ctx.fill();

          cloud.x += cloud.speed;
          if (cloud.x - cloud.radius > canvas.width) {
            cloud.x = -cloud.radius;
          }
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [weather]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000"
    />
  );
}

export default function Hero({ user, onNavigate, onOpenLogin, onOpenRegister, onOpenCompliance }) {
  const [currentWeather, setCurrentWeather] = useState('rainy'); // 'rainy' | 'sunny' | 'cloudy'

  // Dynamic Time of Day Greeting (Good morning / afternoon / evening)
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const userName = user?.name ? user.name.split(' ')[0] : 'Stylist';
  const timeGreeting = getGreeting();

  // Weather config details
  const weatherConfigs = {
    rainy: {
      conditionText: 'raining',
      badgeLabel: 'Rainy 24°C Forecast',
      badgeIcon: CloudRain,
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-400/30',
      bgGlow: 'bg-slate-900/90',
      accentColor: 'text-sky-400'
    },
    sunny: {
      conditionText: 'sunny',
      badgeLabel: 'Sunny 32°C Forecast',
      badgeIcon: Sun,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
      bgGlow: 'bg-amber-950/20',
      accentColor: 'text-amber-400'
    },
    cloudy: {
      conditionText: 'cloudy',
      badgeLabel: 'Cloudy 26°C Forecast',
      badgeIcon: Cloud,
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30',
      bgGlow: 'bg-slate-900/80',
      accentColor: 'text-indigo-400'
    }
  };

  const activeWeather = weatherConfigs[currentWeather] || weatherConfigs.rainy;
  const WeatherIcon = activeWeather.badgeIcon;

  return (
    <section className="relative min-h-[75vh] flex flex-col justify-center items-center px-4 sm:px-6 py-10 sm:py-14 text-center overflow-hidden">
      
      {/* Requirement 1: Full-Screen Subtle CSS/Canvas Dynamic Weather Background */}
      <WeatherBackground weather={currentWeather} />

      {/* Glassmorphism Dark Layer to ensure high text contrast and clickability */}
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] z-0 pointer-events-none" />

      {/* Soft Center Lighting Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-slate-800/30 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Main Interactive Foreground Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full animate-fade-in">
        
        {/* Weather Prediction Selector Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 z-10">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-md text-xs font-mono font-bold shadow-md transition-all ${activeWeather.badgeColor}`}>
            <WeatherIcon className="w-4 h-4 animate-pulse" />
            <span>{activeWeather.badgeLabel}</span>
          </div>

          {/* Quick Weather Preset Switcher Buttons */}
          <div className="inline-flex items-center bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10 gap-1 text-[11px] font-mono">
            {['rainy', 'sunny', 'cloudy'].map((w) => (
              <button
                key={w}
                onClick={() => setCurrentWeather(w)}
                className={`px-2.5 py-0.5 rounded-full capitalize transition-all ${
                  currentWeather === w
                    ? 'bg-white text-black font-extrabold shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        {/* Requirement 2: The Contextual Greeting Header */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5 max-w-3xl leading-[1.15] drop-shadow-md">
          {timeGreeting} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">{userName}</span>, the weather forecast predicts it will be{' '}
          <span className={`underline decoration-wavy underline-offset-8 ${activeWeather.accentColor}`}>
            {activeWeather.conditionText}
          </span>{' '}
          today, here are some outfit recommendations for you.
        </h1>

        <p className="text-xs sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed mb-8 sm:mb-10 text-balance px-2 font-mono">
          StyleSync analyzes live atmospheric humidity ({currentWeather === 'rainy' ? '88%' : currentWeather === 'sunny' ? '45%' : '65%'}), UV levels & your saved body proportions to calculate your optimal daily fit.
        </p>

        {/* Requirement 3: The Primary Actions (The Split) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mb-10 px-2">
          
          {/* Action A: Launch Outfit Mixer */}
          <button
            onClick={() => onNavigate('styling')}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white p-4 sm:p-5 flex items-center justify-between shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 border border-emerald-400/30"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center border border-white/20 shrink-0">
                <Sparkles className="w-5 h-5 text-emerald-200 group-hover:rotate-12 transition-transform" />
              </div>
              <div>
                <span className="text-sm font-extrabold block tracking-wide uppercase">Launch Outfit Mixer</span>
                <span className="text-[10px] text-emerald-100 font-mono">Anti-Gravity AI Canvas Engine</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-emerald-200 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Action B: Digitalize Closet */}
          <button
            onClick={() => onNavigate('closet')}
            className="group relative overflow-hidden rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-4 sm:p-5 flex items-center justify-between shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 border border-white/20"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                <Camera className="w-5 h-5 text-sky-300 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <span className="text-sm font-extrabold block tracking-wide uppercase">Digitalize Closet</span>
                <span className="text-[10px] text-slate-300 font-mono">Camera & Multi-Shot Scanner</span>
              </div>
            </div>
            <Layers className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Feature Overview Quick Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-3xl text-left mb-8">
          <div 
            onClick={() => onNavigate('weather')}
            className="glass-card p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md cursor-pointer transition-all flex items-center gap-3"
          >
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30 shrink-0">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-white block">Weather AI</span>
              <p className="text-[11px] text-slate-300 leading-normal">
                Climate & temperature outfit matches.
              </p>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('color')}
            className="glass-card p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md cursor-pointer transition-all flex items-center gap-3"
          >
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-400/30 shrink-0">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-white block">Color Season</span>
              <p className="text-[11px] text-slate-300 leading-normal">
                Face photo undertone diagnosis.
              </p>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('creators')}
            className="glass-card p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md cursor-pointer transition-all flex items-center gap-3"
          >
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-white block">Body & Creators</span>
              <p className="text-[11px] text-slate-300 leading-normal">
                Match cuts to your height & waist.
              </p>
            </div>
          </div>
        </div>

        {/* User Auth Prompts when logged out */}
        {!user && (
          <div className="w-full max-w-3xl glass-panel p-5 sm:p-6 rounded-3xl border border-white/20 bg-black/40 backdrop-blur-xl shadow-2xl text-center flex flex-col items-center gap-3 animate-fade-in-up">
            <div className="flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-extrabold uppercase font-mono text-white tracking-wider">
                Create or Access Your Saved Style Profile
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-xl">
              Sign in or register to save your body measurements, multi-select style themes, and digitized closet items across sessions!
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
              <button
                onClick={() => onOpenLogin && onOpenLogin(false)}
                className="flex-1 primary-button py-3 px-5 text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 shadow-sm"
              >
                <LogIn className="w-4 h-4" /> Sign In to Account
              </button>

              <button
                onClick={() => onOpenLogin && onOpenLogin(true)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-5 text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 rounded-xl transition-all shadow-sm"
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
