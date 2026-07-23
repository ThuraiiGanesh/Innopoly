import React from 'react';
import { Camera, User, Shirt, LogIn, LogOut, Sparkles, Layers, Palette, ShieldCheck, Home, Sun, Settings } from 'lucide-react';

export default function Header({ user, activeTab, onTabChange, onOpenLogin, onLogout, onOpenProfile }) {
  const desktopTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'weather', label: '🌦️ Weather AI', icon: Sun },
    { id: 'color', label: '🎨 Color Season', icon: Palette },
    { id: 'closet', label: 'My Closet', icon: Layers },
    { id: 'styling', label: 'Outfit Canvas', icon: Palette },
    { id: 'creators', label: 'Body & Creators', icon: User },
    { id: 'compliance', label: 'Rules & Budget', icon: ShieldCheck }
  ];

  const mobileBottomTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'weather', label: 'Weather', icon: Sun },
    { id: 'color', label: 'Color', icon: Palette },
    { id: 'closet', label: 'Closet', icon: Layers },
    { id: 'styling', label: 'Canvas', icon: Palette }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 transition-all duration-300">
        {/* Top Navbar */}
        <nav className="glass-panel px-4 sm:px-6 py-3 flex items-center justify-between border-b border-black/5 shadow-sm">
          {/* Brand Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => onTabChange('home')}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-black text-white flex items-center justify-center shadow-md shrink-0">
              <Shirt className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 block leading-none">
                StyleSync
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-wider uppercase text-slate-500 font-mono block mt-0.5">
                Fashion-Tech Engine
              </span>
            </div>
          </div>

          {/* Desktop Navigation Bar (Large Screens) */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200 text-xs font-semibold">
            {desktopTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-3 py-1.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-black text-white shadow-sm font-bold scale-[1.02]'
                      : 'text-slate-600 hover:text-black hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Top User Actions */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onOpenProfile}
                  title="Open User Profile & Body Metrics Dashboard"
                  className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 p-1 pr-2.5 rounded-full border border-slate-200 transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border border-white"
                  />
                  <span className="text-[11px] sm:text-xs font-bold text-slate-900 truncate max-w-[80px] sm:max-w-[120px]">
                    {user.name}
                  </span>
                  <Settings className="w-3 h-3 text-slate-400 ml-0.5" />
                </button>
                <button
                  onClick={onLogout}
                  className="p-1.5 text-slate-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="secondary-button px-3 py-1.5 text-[11px] uppercase tracking-wider flex items-center gap-1 font-bold"
              >
                <LogIn className="w-3.5 h-3.5 text-slate-900" /> Sign In / Sign Up
              </button>
            )}

            <button
              onClick={() => onTabChange('closet')}
              className="primary-button px-3 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1 font-bold"
            >
              <Camera className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Add Item</span><span className="sm:hidden">+</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Sleek Mobile Bottom Tab Bar (Fixed at bottom for smartphones) */}
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
