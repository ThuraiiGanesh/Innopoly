import React from 'react';
import { Camera, User, Shirt, LogIn, LogOut, Sparkles, Layers, Palette, Tag, ShieldCheck, Home } from 'lucide-react';

export default function Header({ user, activeTab, onTabChange, onOpenLogin, onLogout, onOpenPitch }) {
  const navTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'closet', label: 'My Closet', icon: Layers },
    { id: 'styling', label: 'Outfit Canvas', icon: Palette },
    { id: 'creators', label: 'Body & Creators', icon: User },
    { id: 'templates', label: 'Occasions', icon: Tag },
    { id: 'compliance', label: 'Rules & Budget', icon: ShieldCheck }
  ];

  return (
    <header className="sticky top-0 z-40 transition-all duration-300">
      {/* Clean Light Glassmorphism Navbar */}
      <nav className="glass-panel px-6 py-3.5 flex flex-wrap items-center justify-between border-b border-black/5 shadow-sm">
        {/* Brand Logo - Minimalist Black & White */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer" 
          onClick={() => onTabChange('home')}
        >
          <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center shadow-md">
            <Shirt className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 block leading-none">
              StyleSync
            </span>
            <span className="text-[10px] tracking-wider uppercase text-slate-500 font-mono block mt-0.5">
              Fashion-Tech Engine
            </span>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200 text-xs font-semibold">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-3.5 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
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

        {/* Header User Actions */}
        <div className="flex items-center gap-2.5">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-slate-100 p-1 pr-3 rounded-full border border-slate-200">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs font-bold text-slate-900 font-sans">
                  {user.name}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-slate-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="secondary-button px-3.5 py-2 text-xs uppercase tracking-wider flex items-center gap-1.5 font-bold"
            >
              <LogIn className="w-3.5 h-3.5 text-slate-900" /> Sign In
            </button>
          )}

          <button
            onClick={() => onTabChange('closet')}
            className="primary-button px-3.5 py-2 text-xs uppercase tracking-wider flex items-center gap-1.5 font-bold"
          >
            <Camera className="w-3.5 h-3.5" /> Add Item
          </button>
        </div>
      </nav>

      {/* Mobile Tab Navigation Bar */}
      <div className="lg:hidden glass-panel px-4 py-2 border-b border-black/5 flex items-center justify-around text-xs font-semibold overflow-x-auto">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 whitespace-nowrap ${
                isActive ? 'bg-black text-white font-bold' : 'text-slate-600'
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
