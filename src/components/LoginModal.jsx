import React, { useState } from 'react';
import { X, Lock, Mail, User, Shirt, ArrowRight, CheckCircle2, UserPlus, LogIn } from 'lucide-react';
import { loginUser, registerUser } from '../utils/database';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    if (isRegister) {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      const result = registerUser(name, email, password);
      if (result.success) {
        onLoginSuccess(result.user);
        onClose();
        resetForm();
      } else {
        setError(result.error || 'Registration failed.');
      }
    } else {
      const result = loginUser(email, password);
      if (result.success) {
        onLoginSuccess(result.user);
        onClose();
        resetForm();
      } else {
        setError(result.error || 'Invalid credentials.');
      }
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setError('');
  };

  const handleQuickDemo = () => {
    const result = loginUser('alex@stylesync.ai', 'demo');
    if (result.success) {
      onLoginSuccess(result.user);
      onClose();
      resetForm();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in-up">
      <div className="glass-panel w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center">
              <Shirt className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {isRegister ? 'Create Account' : 'Sign In to Account'}
              </h3>
              <span className="text-xs text-slate-500 font-mono">
                Stores your wardrobe & preferences
              </span>
            </div>
          </div>

          <button
            onClick={() => { onClose(); resetForm(); }}
            className="p-2 text-slate-400 hover:text-black rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-2xl mb-5 text-xs font-bold font-sans">
          <button
            type="button"
            onClick={() => { setIsRegister(false); setError(''); }}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              !isRegister ? 'bg-black text-white shadow-sm' : 'text-slate-600 hover:text-black'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" /> Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsRegister(true); setError(''); }}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              isRegister ? 'bg-black text-white shadow-sm' : 'text-slate-600 hover:text-black'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" /> Register Account
          </button>
        </div>

        {/* Quick Demo Login Banner */}
        <div className="glass-card p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-900">1-Click Demo Login</span>
          </div>
          <button
            type="button"
            onClick={handleQuickDemo}
            className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
          >
            Sign In Demo
          </button>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200 animate-fade-in-up">
            {error}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          {isRegister && (
            <div>
              <label className="block text-xs uppercase font-bold text-slate-600 mb-1 font-mono">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Alex Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs uppercase font-bold text-slate-600 mb-1 font-mono">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                placeholder="alex@stylesync.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-slate-600 mb-1 font-mono">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full primary-button py-3 text-xs uppercase tracking-wider flex items-center justify-center gap-2 font-bold mt-2"
          >
            {isRegister ? 'Create & Save Account' : 'Sign In to Account'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          {isRegister ? 'Already have an account?' : "Don't have an account yet?"}{' '}
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            className="text-black font-bold underline hover:opacity-80"
          >
            {isRegister ? 'Sign In' : 'Register Account'}
          </button>
        </div>
      </div>
    </div>
  );
}
