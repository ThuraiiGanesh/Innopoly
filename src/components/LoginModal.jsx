import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, User, Shirt, ArrowRight, CheckCircle2, UserPlus, LogIn, Sparkles, ShieldCheck } from 'lucide-react';
import { loginUser, registerUser } from '../utils/database';

export default function LoginModal({ isOpen, onClose, onLoginSuccess, initialRegisterMode = false }) {
  const [isRegister, setIsRegister] = useState(initialRegisterMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setIsRegister(initialRegisterMode);
    }
  }, [isOpen, initialRegisterMode]);

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

      if (!termsChecked || !marketingChecked) {
        setError('You must accept both the Terms & Conditions and Marketing Communications to register.');
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
    setTermsChecked(false);
    setMarketingChecked(false);
    setError('');
  };

  const isSubmitDisabled = isRegister && (!termsChecked || !marketingChecked);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-lg animate-fade-in-up">
      <div className="glass-panel w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden bg-white border border-black/10">
        
        {/* Brand Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center shadow-md">
              <Shirt className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                {isRegister ? 'Create Your Account' : 'Sign In to StyleSync'}
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">
                Fashion-Tech Digital Wardrobe Engine
              </span>
            </div>
          </div>

          <button
            onClick={() => { onClose(); resetForm(); }}
            className="p-2 text-slate-400 hover:text-black rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-2xl mb-5 text-xs font-extrabold font-sans">
          <button
            type="button"
            onClick={() => { setIsRegister(false); setError(''); }}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              !isRegister ? 'bg-black text-white shadow-md' : 'text-slate-600 hover:text-black'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" /> Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsRegister(true); setError(''); }}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              isRegister ? 'bg-black text-white shadow-md' : 'text-slate-600 hover:text-black'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" /> Register Account
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
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
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
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
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
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          {/* Registration Checkboxes (Terms & Conditions + Marketing Ads) */}
          {isRegister && (
            <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs">
              <label className="flex items-start gap-2.5 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={termsChecked}
                  onChange={(e) => setTermsChecked(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-black focus:ring-black accent-black shrink-0"
                />
                <span className="leading-tight">
                  I agree to the <strong className="text-slate-900 underline">Terms of Service</strong> & <strong className="text-slate-900 underline">Privacy Policy</strong>.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={marketingChecked}
                  onChange={(e) => setMarketingChecked(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-black focus:ring-black accent-black shrink-0"
                />
                <span className="leading-tight">
                  I agree to receive personalized style updates, trend recommendations, & marketing ads.
                </span>
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`w-full py-3 text-xs uppercase tracking-wider flex items-center justify-center gap-2 font-extrabold mt-2 shadow-md transition-all ${
              isSubmitDisabled
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed border border-slate-300'
                : 'primary-button shimmer-hover'
            }`}
          >
            {isRegister ? 'Create & Launch Setup' : 'Sign In & Launch Setup'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>{isRegister ? 'Have an account?' : "New to StyleSync?"}</span>
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            className="text-black font-extrabold underline hover:opacity-80"
          >
            {isRegister ? 'Sign In' : 'Register Account'}
          </button>
        </div>
      </div>
    </div>
  );
}
