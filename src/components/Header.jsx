import React from 'react';
import { Camera, User, Shirt, LogIn, LogOut, Sparkles, Layers, Palette, Sliders, Home, Settings } from 'lucide-react';

export default function Header({ user, activeTab, onTabChange, onOpenLogin, onLogout, onOpenProfile }) {
  const desktopTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'color', label: '🎨 Color Season', icon: Palette },
    { id: 'closet', label: 'My Closet', icon: Layers },
    { id: 'styling', label: 'Outfit Canvas', icon: Sparkles },
    { id: 'creators', label: 'Discover', icon: User },
    { id: 'compliance', label: 'Store Budget', icon: Sliders }
  ];

  const mobileBottomTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'color', label: 'Color', icon: Palette },
    { id: 'closet', label: 'Closet', icon: Layers },
    { id: 'styling', label: 'Canvas', icon: Sparkles },
    { id: 'creators', label: 'Discover', icon: User }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 transition-all duration-300">
        {/* Top Navbar */}
        <nav className="glass-panel px-4 sm:px-6 py-3 flex items-center justify-between border-b border-black/10 shadow-sm bg-white/95 backdrop-blur-md">
          {/* Brand Logo - Sleek Modern Luxury Monogram */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer group" 
            onClick={() => onTabChange('home')}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-slate-950 via-slate-900 to-emerald-950 text-white flex items-center justify-center shadow-lg border border-slate-800 shrink-0 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <Shirt className="w-4 h-4 text-white -ml-2" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 block leading-none font-sans">
                Style<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Sync</span>
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-slate-500 font-mono block mt-0.5 font-bold">
                Fashion-Tech Engine
              </span>
            </div>
          </div>

          {/* Desktop Navigation Bar */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200 text-xs font-semibold shadow-inner">
            {desktopTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-black text-white shadow-md font-bold scale-[1.02]'
                      : 'text-slate-600 hover:text-black hover:bg-slate-200/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Top User Actions */}
          <div className="flex items-center gap-2.5">
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenProfile}
                  title="Open User Profile & Settings"
                  className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 p-1 pr-2.5 rounded-full border border-slate-200 transition-colors shadow-sm"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover border border-white"
                  />
                  <span className="text-[11px] sm:text-xs font-bold text-slate-900 truncate max-w-[80px] sm:max-w-[120px]">
                    {user.name}
                  </span>
                  <Settings className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
                </button>
                <button
                  onClick={onLogout}
                  className="p-1.5 text-slate-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="bg-slate-900 hover:bg-black text-white px-3.5 py-2 text-[11px] uppercase tracking-wider flex items-center gap-1.5 font-bold rounded-xl shadow-sm transition-all"
              >
                <LogIn className="w-3.5 h-3.5 text-emerald-400" /> Sign In / Register
              </button>
            )}

            {/* High-Contrast Standout CTA: ADD ITEM */}
            <button
              onClick={() => onTabChange('closet')}
              className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white px-3.5 sm:px-4 py-2 text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 font-extrabold rounded-xl shadow-md border border-emerald-400/40 transition-all transform hover:scale-[1.03]"
            >
              <Camera className="w-3.5 h-3.5 text-emerald-200" /> <span>+ ADD ITEM</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Bottom Tab Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-black/10 px-2 py-1.5 flex items-center justify-around text-[10px] font-semibold text-slate-600 pb-safe shadow-2xl bg-white/95 backdrop-blur-md">
        {mobileBottomTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all ${
                isActive ? 'text-black font-extrabold scale-105' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className={`p-1.5 rounded-xl ${isActive ? 'bg-black text-white shadow-sm' : 'bg-transparent text-slate-600'}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="leading-none mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
