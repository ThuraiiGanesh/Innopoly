import React from 'react';
import { Camera, User, Shirt, LogIn, LogOut, Sparkles } from 'lucide-react';

export default function Header({ user, onOpenLogin, onLogout, onOpenPitch }) {
  return (
    <header className="sticky top-0 z-40 transition-all duration-300">
      {/* Clean Light Glassmorphism Navbar */}
      <nav className="glass-panel px-6 py-4 flex items-center justify-between border-b border-black/5 shadow-sm">
        {/* Brand Logo - Minimalist Black & White */}
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-slate-600 uppercase">
          <a href="#digitizer" className="hover:text-black transition-colors py-1">
            Closet Digitizer
          </a>
          <a href="#creator-matcher" className="hover:text-black transition-colors py-1 flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-slate-900" /> Body & Creator Match
          </a>
          <a href="#templates" className="hover:text-black transition-colors py-1">
            Occasions
          </a>
          <a href="#mixer" className="hover:text-black transition-colors py-1">
            Color & Mix/Match
          </a>
          <a href="#compliance" className="hover:text-black transition-colors py-1">
            Budget & Rules
          </a>
        </div>

        {/* Header User Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-slate-100 p-1.5 pr-3 rounded-full border border-slate-200">
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
              className="secondary-button px-4 py-2 text-xs uppercase tracking-wider flex items-center gap-2 font-bold"
            >
              <LogIn className="w-3.5 h-3.5 text-slate-900" /> Sign In
            </button>
          )}

          <a
            href="#digitizer"
            className="primary-button px-4 py-2 text-xs uppercase tracking-wider flex items-center gap-2 font-bold"
          >
            <Camera className="w-3.5 h-3.5" /> Add Closet Item
          </a>
        </div>
      </nav>
    </header>
  );
}
