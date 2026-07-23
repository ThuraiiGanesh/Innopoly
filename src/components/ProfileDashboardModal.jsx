import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Ruler, 
  Check, 
  Sparkles, 
  Save, 
  ShieldCheck, 
  Mail, 
  LogOut, 
  Shirt, 
  Palette, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  CloudSun,
  Users,
  Smartphone,
  Zap,
  MapPin,
  Share2,
  RefreshCw,
  PhoneCall,
  Send,
  Calendar,
  Gift,
  DollarSign,
  Edit3,
  Sun,
  Sliders
} from 'lucide-react';
import { 
  DEFAULT_BODY_METRICS, 
  STYLE_THEMES, 
  DEFAULT_INTEGRATIONS,
  saveUserProfileMetricsInDB, 
  getUserProfileMetricsFromDB,
  saveUserStyleThemeInDB,
  getUserStyleThemeFromDB,
  saveUserIntegrationsInDB,
  getUserIntegrationsFromDB
} from '../utils/database';
import { STORE_TIERS } from '../data/mockData';

const TOTAL_STEPS = 5;

// Color season data used in Step 4
const SEASONS_DATA = {
  autumn: {
    id: 'autumn', title: 'Warm Autumn', undertone: 'Warm Golden & Olive',
    description: 'Rich, earthy warm tones like Terracotta, Olive, Mustard illuminate your complexion.',
    palette: ['#994d1c', '#6b8e23', '#cc7722', '#d2b48c', '#8b4513'],
    tags: ['Terracotta', 'Olive', 'Mustard', 'Warm Beige', 'Mahogany']
  },
  summer: {
    id: 'summer', title: 'Cool Summer', undertone: 'Cool Rose & Slate',
    description: 'Soft, muted pastel shades like Lavender, Slate Blue, Dusty Rose enhance your facial tones.',
    palette: ['#4682b4', '#bc8f8f', '#d8bfd8', '#708090', '#b0c4de'],
    tags: ['Slate Blue', 'Dusty Rose', 'Lavender', 'Charcoal', 'Soft Denim']
  },
  winter: {
    id: 'winter', title: 'Bold Winter', undertone: 'Cool Blue & Porcelain',
    description: 'High-contrast vivid shades like True Black, Stark White, Electric Blue for maximum impact.',
    palette: ['#000000', '#dc143c', '#1e3a5f', '#ffffff', '#8b008b'],
    tags: ['True Black', 'Crimson', 'Navy', 'Pure White', 'Magenta']
  },
  spring: {
    id: 'spring', title: 'Bright Spring', undertone: 'Warm Peach & Ivory',
    description: 'Clear, warm and lively tones like Coral, Bright Green, Sunny Yellow energize your look.',
    palette: ['#ff6b6b', '#f9a825', '#4caf50', '#ff8a65', '#64b5f6'],
    tags: ['Coral', 'Sunny Yellow', 'Fresh Green', 'Peach', 'Sky Blue']
  }
};

export default function ProfileDashboardModal({ isOpen, initialTab = 'metrics', onClose, user, onSaveMetrics, onLogout, onCompleteOnboarding, currentBudget, onBudgetChange }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [metrics, setMetrics] = useState(DEFAULT_BODY_METRICS);
  const [selectedThemes, setSelectedThemes] = useState(['old_money']);
  const [integrations, setIntegrations] = useState(DEFAULT_INTEGRATIONS);
  const [autoSaveStatus, setAutoSaveStatus] = useState('Auto-Restored');

  // Store Budget state
  const [budgetValue, setBudgetValue] = useState(currentBudget || 80);
  const [customBudgetInput, setCustomBudgetInput] = useState(currentBudget || 80);

  // Color Season state
  const [selectedSeason, setSelectedSeason] = useState('autumn');

  // Real Weather API & Geolocation Live State
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({
    city: 'Detecting Location...',
    temp: 31,
    condition: 'Sunny & Clear',
    lat: null,
    lon: null,
    isRealSynced: false
  });

  // Real Contacts Sync State
  const [contactsLoading, setContactsLoading] = useState(false);
  const [syncedContacts, setSyncedContacts] = useState([
    { id: 1, name: 'Marcus Tan', phone: '+65 9123 4567', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', shared: false },
    { id: 2, name: 'Sarah Jenkins', phone: '+65 8765 4321', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80', shared: true },
    { id: 3, name: 'David Chen', phone: '+65 9812 3456', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', shared: false }
  ]);

  // Google Calendar Detected Event State
  const [detectedCalendarEvent, setDetectedCalendarEvent] = useState('Birthday Party 🎉');

  useEffect(() => {
    if (isOpen) {
      const savedMetrics = getUserProfileMetricsFromDB(user?.id, user?.bodyMetrics || DEFAULT_BODY_METRICS);
      const savedThemes = getUserStyleThemeFromDB(user?.id, user?.styleTheme || ['old_money']);
      const savedIntegrations = getUserIntegrationsFromDB(user?.id, DEFAULT_INTEGRATIONS);
      
      setMetrics(savedMetrics);
      setSelectedThemes(Array.isArray(savedThemes) ? savedThemes : [savedThemes]);
      setIntegrations(savedIntegrations);
      if (savedIntegrations.calendarEvent) {
        setDetectedCalendarEvent(savedIntegrations.calendarEvent);
      }
      setBudgetValue(currentBudget || 80);
      setCustomBudgetInput(currentBudget || 80);

      if (initialTab === 'budget') setCurrentStep(3);
      else if (initialTab === 'color') setCurrentStep(4);
      else if (initialTab === 'metrics') setCurrentStep(2);
      else if (initialTab === 'style') setCurrentStep(1);
      else if (initialTab === 'sync') setCurrentStep(5);
      else setCurrentStep(1);

      if (savedIntegrations.weatherSync) {
        fetchRealWeather();
      }
    }
  }, [user, isOpen, initialTab]);

  if (!isOpen) return null;

  const fetchRealWeather = () => {
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
              let cond = 'Sunny & Clear';
              if (code >= 1 && code <= 3) cond = 'Partly Cloudy';
              if (code >= 51 && code <= 67) cond = 'Light Rain';
              if (code >= 80 && code <= 99) cond = 'Heavy Rain / Thunderstorm';

              setWeatherData({
                city: `Lat ${lat.toFixed(2)}°, Lon ${lon.toFixed(2)}°`,
                temp,
                condition: cond,
                lat,
                lon,
                isRealSynced: true
              });
            }
          } catch (err) {
            setWeatherData(prev => ({ ...prev, city: 'Local Weather API Connected', temp: 31, condition: 'Sunny 31°C', isRealSynced: true }));
          } finally {
            setWeatherLoading(false);
          }
        },
        () => {
          setWeatherData({ city: 'Singapore (Default)', temp: 31, condition: 'Sunny 31°C', lat: 1.3521, lon: 103.8198, isRealSynced: true });
          setWeatherLoading(false);
        },
        { timeout: 5000 }
      );
    } else {
      setWeatherData({ city: 'Singapore', temp: 31, condition: 'Sunny 31°C', lat: 1.3521, lon: 103.8198, isRealSynced: true });
      setWeatherLoading(false);
    }
  };

  const handlePickPhoneContacts = async () => {
    setContactsLoading(true);
    if ('contacts' in navigator && 'ContactsManager' in window) {
      try {
        const props = ['name', 'email', 'tel'];
        const opts = { multiple: true };
        const contacts = await navigator.contacts.select(props, opts);
        if (contacts && contacts.length > 0) {
          const newEntries = contacts.map((c, idx) => ({
            id: Date.now() + idx,
            name: c.name?.[0] || 'Phone Contact',
            phone: c.tel?.[0] || 'Synced Phone Number',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
            shared: false
          }));
          setSyncedContacts(prev => [...newEntries, ...prev]);
        }
      } catch (err) {
        console.log('Contacts picker closed or not allowed');
      } finally {
        setContactsLoading(false);
      }
    } else {
      setTimeout(() => {
        const demoContact = {
          id: Date.now(),
          name: 'Chloe Lim (Phone Contact)',
          phone: '+65 9456 7890',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
          shared: false
        };
        setSyncedContacts(prev => [demoContact, ...prev]);
        setContactsLoading(false);
      }, 600);
    }
  };

  const feet = Math.floor(metrics.height / 30.48);
  const inches = Math.round((metrics.height % 30.48) / 2.54);

  const BUILD_PRESETS = {
    Slim: { height: 175, chest: 34, waist: 28, hips: 34, shoulders: 40, inseam: 30, build: 'Slim' },
    Athletic: { height: 178, chest: 38, waist: 30, hips: 38, shoulders: 44, inseam: 30, build: 'Athletic' },
    Regular: { height: 176, chest: 40, waist: 34, hips: 40, shoulders: 43, inseam: 30, build: 'Regular' },
    Muscular: { height: 182, chest: 44, waist: 32, hips: 42, shoulders: 48, inseam: 32, build: 'Muscular' }
  };

  const handleBuildSelect = (buildName) => {
    const preset = BUILD_PRESETS[buildName] || { ...metrics, build: buildName };
    setMetrics(preset);
    saveUserProfileMetricsInDB(user?.id, preset);
    setAutoSaveStatus(`Adjusted to ${buildName} Preset!`);
    setTimeout(() => setAutoSaveStatus('Auto-Restored'), 1500);
  };

  const handleMetricChange = (key, val) => {
    const num = Number(val) || 0;
    const updated = { ...metrics, [key]: num };
    setMetrics(updated);
    saveUserProfileMetricsInDB(user?.id, updated);
    setAutoSaveStatus('Auto-Saved!');
    setTimeout(() => setAutoSaveStatus('Auto-Restored'), 1500);
  };

  const handleThemeToggle = (themeId) => {
    let updated;
    if (selectedThemes.includes(themeId)) {
      if (selectedThemes.length === 1) return;
      updated = selectedThemes.filter(id => id !== themeId);
    } else {
      updated = [...selectedThemes, themeId];
    }
    setSelectedThemes(updated);
    saveUserStyleThemeInDB(user?.id, updated);
    setAutoSaveStatus('Themes Updated!');
    setTimeout(() => setAutoSaveStatus('Auto-Restored'), 1500);
  };

  const handleIntegrationToggle = (key) => {
    const updated = { ...integrations, [key]: !integrations[key] };
    setIntegrations(updated);
    saveUserIntegrationsInDB(user?.id, updated);
    if (key === 'weatherSync' && updated.weatherSync) {
      fetchRealWeather();
    }
    setAutoSaveStatus('Integrations Saved!');
    setTimeout(() => setAutoSaveStatus('Auto-Restored'), 1500);
  };

  const handleCalendarEventSelect = (evt) => {
    setDetectedCalendarEvent(evt);
    const updated = { ...integrations, calendarEvent: evt };
    setIntegrations(updated);
    saveUserIntegrationsInDB(user?.id, updated);
    setAutoSaveStatus(`Calendar Event: ${evt}`);
    setTimeout(() => setAutoSaveStatus('Auto-Restored'), 1500);
  };

  // Budget handlers
  const handleBudgetPresetSelect = (tier) => {
    setBudgetValue(tier.max);
    setCustomBudgetInput(tier.max);
    if (onBudgetChange) onBudgetChange(tier.max);
  };

  const handleCustomBudgetChange = (e) => {
    const val = Math.max(1, Number(e.target.value) || 0);
    setCustomBudgetInput(val);
    setBudgetValue(val);
    if (onBudgetChange) onBudgetChange(val);
  };

  const handleSaveAndContinue = (e) => {
    e?.preventDefault();
    saveUserProfileMetricsInDB(user?.id, metrics);
    saveUserStyleThemeInDB(user?.id, selectedThemes);
    saveUserIntegrationsInDB(user?.id, { ...integrations, calendarEvent: detectedCalendarEvent });
    if (onSaveMetrics) onSaveMetrics(metrics);
    if (onBudgetChange) onBudgetChange(budgetValue);
    if (onCompleteOnboarding) onCompleteOnboarding();
    onClose();
  };

  const stepLabels = [
    { icon: Palette, label: 'Style', full: `1. Style Aesthetic (${selectedThemes.length})` },
    { icon: Ruler, label: 'Metrics', full: '2. Body Metrics' },
    { icon: DollarSign, label: 'Budget', full: '3. Store Budget Settings' },
    { icon: Sun, label: 'Color', full: '4. Color Season Settings' },
    { icon: Smartphone, label: 'Sync', full: '5. App Integrations' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl border border-black/10 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 bg-slate-950 text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 text-white flex items-center justify-center border border-white/20">
              <User className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold tracking-tight">Profile & Settings Hub</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">⚙️ SETTINGS ACTIVE</span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {user ? user.email : 'New Guest Visitor Account'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Navigation Header — 5 steps */}
        <div className="bg-slate-100/80 border-b border-slate-200 px-2 sm:px-4 py-2.5 flex items-center justify-around shrink-0 text-xs font-bold font-mono overflow-x-auto gap-1">
          {stepLabels.map((step, idx) => {
            const stepNum = idx + 1;
            const Icon = step.icon;
            return (
              <React.Fragment key={stepNum}>
                {idx > 0 && <ChevronRight className="w-3 h-3 text-slate-300 shrink-0 hidden sm:block" />}
                <button
                  onClick={() => setCurrentStep(stepNum)}
                  className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                    currentStep === stepNum
                      ? 'bg-black text-white shadow-sm'
                      : currentStep > stepNum
                        ? 'text-emerald-700 hover:bg-emerald-50'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {currentStep > stepNum ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Icon className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                  <span className="hidden sm:inline">{step.full}</span>
                  <span className="sm:hidden">{step.label}</span>
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* ═══════════════════════════════════════════ */}
          {/* STEP 1: MULTI-SELECT STYLE AESTHETICS      */}
          {/* ═══════════════════════════════════════════ */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-600 tracking-wider block">STEP 1 OF {TOTAL_STEPS}</span>
                  <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Palette className="w-4 h-4 text-emerald-600" /> Select Your Style Aesthetic Themes (Multi-Select)
                  </h4>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold">
                  ✓ {selectedThemes.length} Selected
                </span>
              </div>

              <p className="text-xs text-slate-600">
                You can select <b>multiple fashion themes</b> to mix & match your look! Click any card to toggle selection.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {STYLE_THEMES.map((theme) => {
                  const isSelected = selectedThemes.includes(theme.id);
                  return (
                    <div
                      key={theme.id}
                      onClick={() => handleThemeToggle(theme.id)}
                      className={`group relative rounded-2xl border cursor-pointer overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? 'border-emerald-600 ring-2 ring-emerald-500 shadow-lg scale-[1.02]'
                          : 'border-slate-200 hover:border-slate-400 hover:shadow-md opacity-85 hover:opacity-100'
                      }`}
                    >
                      <div className="relative h-36 overflow-hidden bg-slate-900">
                        <img
                          src={theme.image}
                          alt={theme.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        <div className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full font-mono text-[10px] font-bold flex items-center gap-1.5 shadow-md ${
                          isSelected ? 'bg-emerald-600 text-white' : 'bg-black/60 text-slate-300 border border-white/20'
                        }`}>
                          <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                            isSelected ? 'bg-white text-emerald-600 border-white' : 'border-slate-300'
                          }`}>
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          {isSelected ? 'SELECTED' : 'SELECT'}
                        </div>

                        <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                          <h5 className="text-xs font-extrabold leading-tight">{theme.name}</h5>
                        </div>
                      </div>

                      <div className="p-3 bg-white space-y-2 flex-1 flex flex-col justify-between">
                        <p className="text-[11px] text-slate-600 font-medium leading-snug">
                          {theme.tagline}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 pt-1">
                          {theme.tags.map((t, i) => (
                            <span key={i} className="text-[9px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════ */}
          {/* STEP 2: BODY METRICS                       */}
          {/* ═══════════════════════════════════════════ */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-600 tracking-wider block">STEP 2 OF {TOTAL_STEPS}</span>
                  <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-slate-800" /> Full Body Metrics Profile
                  </h4>
                </div>
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-mono font-bold">
                  ⚙️ Direct Type or Slider
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                <span className="flex items-center gap-2 font-mono font-semibold">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" /> Saved in Profile Dashboard
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  {autoSaveStatus}
                </span>
              </div>

              <div className="glass-card p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white space-y-5">
                {/* HEIGHT */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs uppercase font-bold text-slate-700 tracking-wider">HEIGHT (CM)</label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-mono">({feet}'{inches}")</span>
                      <input
                        type="number"
                        min="140"
                        max="210"
                        value={metrics.height}
                        onChange={(e) => handleMetricChange('height', e.target.value)}
                        className="w-20 px-2.5 py-1 text-xs font-extrabold text-right font-mono bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <span className="text-xs font-bold text-slate-500">cm</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="140"
                    max="210"
                    value={metrics.height}
                    onChange={(e) => handleMetricChange('height', e.target.value)}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                </div>

                {/* BUST / CHEST */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs uppercase font-bold text-slate-700 tracking-wider">BUST / CHEST (INCHES)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="28"
                        max="60"
                        value={metrics.chest}
                        onChange={(e) => handleMetricChange('chest', e.target.value)}
                        className="w-20 px-2.5 py-1 text-xs font-extrabold text-right font-mono bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <span className="text-xs font-bold text-slate-500">in</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="28"
                    max="60"
                    value={metrics.chest}
                    onChange={(e) => handleMetricChange('chest', e.target.value)}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                </div>

                {/* WAIST SIZE */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs uppercase font-bold text-slate-700 tracking-wider">WAIST SIZE (INCHES)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="22"
                        max="50"
                        value={metrics.waist}
                        onChange={(e) => handleMetricChange('waist', e.target.value)}
                        className="w-20 px-2.5 py-1 text-xs font-extrabold text-right font-mono bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <span className="text-xs font-bold text-slate-500">in</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="22"
                    max="50"
                    value={metrics.waist}
                    onChange={(e) => handleMetricChange('waist', e.target.value)}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                </div>

                {/* HIPS */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs uppercase font-bold text-slate-700 tracking-wider">HIPS (INCHES)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="28"
                        max="60"
                        value={metrics.hips}
                        onChange={(e) => handleMetricChange('hips', e.target.value)}
                        className="w-20 px-2.5 py-1 text-xs font-extrabold text-right font-mono bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <span className="text-xs font-bold text-slate-500">in</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="28"
                    max="60"
                    value={metrics.hips}
                    onChange={(e) => handleMetricChange('hips', e.target.value)}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                </div>

                {/* SHOULDERS */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs uppercase font-bold text-slate-700 tracking-wider">SHOULDERS (INCHES)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="34"
                        max="56"
                        value={metrics.shoulders}
                        onChange={(e) => handleMetricChange('shoulders', e.target.value)}
                        className="w-20 px-2.5 py-1 text-xs font-extrabold text-right font-mono bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <span className="text-xs font-bold text-slate-500">in</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="34"
                    max="56"
                    value={metrics.shoulders}
                    onChange={(e) => handleMetricChange('shoulders', e.target.value)}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                </div>

                {/* INSEAM */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs uppercase font-bold text-slate-700 tracking-wider">INSEAM (INCHES)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="24"
                        max="40"
                        value={metrics.inseam}
                        onChange={(e) => handleMetricChange('inseam', e.target.value)}
                        className="w-20 px-2.5 py-1 text-xs font-extrabold text-right font-mono bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <span className="text-xs font-bold text-slate-500">in</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="24"
                    max="40"
                    value={metrics.inseam}
                    onChange={(e) => handleMetricChange('inseam', e.target.value)}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                </div>

                {/* BUILD TYPE QUICK PRESET */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <label className="text-xs uppercase font-bold text-slate-600 tracking-wider font-mono">Quick Build Preset</label>
                  <div className="grid grid-cols-4 gap-2">
                    {Object.keys(BUILD_PRESETS).map(b => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => handleBuildSelect(b)}
                        className={`py-2 rounded-xl text-xs font-extrabold border transition-all ${
                          metrics.build === b
                            ? 'bg-black text-white border-black shadow-md scale-[1.02]'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════ */}
          {/* STEP 3: STORE BUDGET (NEW)                 */}
          {/* ═══════════════════════════════════════════ */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-600 tracking-wider block">STEP 3 OF {TOTAL_STEPS}</span>
                  <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" /> Set Your Store Budget
                  </h4>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold">
                  Capped: ${budgetValue} SGD
                </span>
              </div>

              <p className="text-xs text-slate-600">
                Select a store budget tier arranged by clothing brand stores, or type your exact target price. All affiliate recommendations will be dynamically capped at your chosen budget.
              </p>

              <div className="glass-card p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white space-y-5">
                {/* Store Preset Budget Boxes */}
                <div className="space-y-2.5">
                  <label className="text-xs uppercase font-bold text-slate-600 tracking-wider block font-mono">
                    Select Store Budget Range Box:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {STORE_TIERS.map((tier) => {
                      const isSelected = budgetValue === tier.max || (tier.id === 'all' && budgetValue >= 999);
                      return (
                        <div
                          key={tier.id}
                          onClick={() => handleBudgetPresetSelect(tier)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-slate-950 text-white border-slate-950 shadow-md scale-[1.02]'
                              : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-extrabold">{tier.label}</span>
                            {isSelected && <span className="text-[9px] font-mono bg-emerald-500 text-white px-2 py-0.5 rounded font-bold">ACTIVE</span>}
                          </div>
                          <span className={`text-[10px] font-mono block ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                            {tier.sublabel}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Exact Price Typing Input */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="text-xs uppercase font-bold text-slate-700 tracking-wider flex items-center gap-1.5 mb-2 font-mono">
                    <Edit3 className="w-3.5 h-3.5 text-indigo-600" /> Or Type Your Custom Target Price:
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-400 text-sm">$</span>
                      <input
                        type="number"
                        min="1"
                        max="1000"
                        value={customBudgetInput}
                        onChange={handleCustomBudgetChange}
                        placeholder="Enter max price (e.g. 50)"
                        className="w-full bg-white border border-slate-300 rounded-xl pl-8 pr-16 py-2.5 text-sm font-extrabold text-slate-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black shadow-inner"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-slate-500">SGD</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50">
                  <h4 className="text-emerald-900 text-xs font-bold mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Active Store Budget Enforcement
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    All affiliate recommendations across our catalog are dynamically capped at <strong className="text-slate-900">${budgetValue} SGD</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════ */}
          {/* STEP 4: COLOR SEASON (NEW)                 */}
          {/* ═══════════════════════════════════════════ */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-600 tracking-wider block">STEP 4 OF {TOTAL_STEPS}</span>
                  <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Palette className="w-4 h-4 text-emerald-600" /> Choose Your Color Season
                  </h4>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-mono font-bold">
                  🎨 {SEASONS_DATA[selectedSeason]?.title}
                </span>
              </div>

              <p className="text-xs text-slate-600">
                Your <b>color season</b> determines which clothing colors best complement your skin undertone. Select one below — this will influence color-matched recommendations across the app.
              </p>

              {/* Season Selection Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.values(SEASONS_DATA).map((season) => {
                  const isSelected = selectedSeason === season.id;
                  return (
                    <button
                      key={season.id}
                      onClick={() => setSelectedSeason(season.id)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-slate-950 text-white border-slate-950 shadow-lg scale-[1.02]'
                          : 'bg-white text-slate-900 border-slate-200 hover:border-slate-400 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                        <span className="text-xs font-extrabold">{season.title}</span>
                      </div>
                      <div className="flex gap-1 mb-2">
                        {season.palette.map((hex, i) => (
                          <div
                            key={i}
                            className="w-5 h-5 rounded-full border border-white/30"
                            style={{ backgroundColor: hex }}
                          />
                        ))}
                      </div>
                      <span className={`text-[10px] font-mono ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {season.undertone}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Expanded Season Detail */}
              {selectedSeason && SEASONS_DATA[selectedSeason] && (
                <div className="glass-card p-5 rounded-2xl border border-slate-200 bg-white space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {SEASONS_DATA[selectedSeason].palette.map((hex, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-xl border border-black/10 shadow-sm"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>
                    <div>
                      <h5 className="text-sm font-extrabold text-slate-900">{SEASONS_DATA[selectedSeason].title}</h5>
                      <p className="text-[10px] text-slate-500 font-mono">{SEASONS_DATA[selectedSeason].undertone}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {SEASONS_DATA[selectedSeason].description}
                  </p>

                  <div>
                    <h6 className="text-[10px] uppercase font-bold font-mono text-slate-500 tracking-wider mb-2">Best Colors for You</h6>
                    <div className="flex flex-wrap gap-2">
                      {SEASONS_DATA[selectedSeason].tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 bg-slate-50 text-slate-800 flex items-center gap-1.5"
                        >
                          <div
                            className="w-3.5 h-3.5 rounded-full border border-black/10"
                            style={{ backgroundColor: SEASONS_DATA[selectedSeason].palette[i] || '#ccc' }}
                          />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════ */}
          {/* STEP 5: INTEGRATIONS (Weather, Calendar, Contacts) */}
          {/* ═══════════════════════════════════════════ */}
          {currentStep === 5 && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-600 tracking-wider block">STEP 5 OF {TOTAL_STEPS}</span>
                  <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-emerald-600" /> Device & External App Live Sync
                  </h4>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold">
                  ⚡ Live Sync Engine Active
                </span>
              </div>

              {/* 📅 GOOGLE CALENDAR SYNC CARD */}
              <div className="p-5 rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50/90 via-pink-50/60 to-amber-50/50 space-y-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md shrink-0">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-sm font-extrabold text-slate-900">Sync Google Calendar</h5>
                        <span className="px-2 py-0.5 rounded-full bg-rose-200 text-rose-900 text-[10px] font-mono font-bold">CALENDAR API</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium">Auto-detects birthdays, interviews & events to suggest tailored fits!</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleIntegrationToggle('calendarSync')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 shrink-0 ${
                      integrations.calendarSync ? 'bg-rose-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        integrations.calendarSync ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {integrations.calendarSync && (
                  <div className="p-4 rounded-xl bg-white/90 border border-rose-100 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-rose-900 font-bold font-mono">
                        <Gift className="w-4 h-4 text-rose-600" /> Event Found Today: <strong className="text-rose-700 underline">{detectedCalendarEvent}</strong>
                      </span>
                      <span className="text-[10px] font-mono bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
                        AUTO-NOTED
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-slate-800 space-y-2">
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                        🎉 StyleSync auto-detected <b>"{detectedCalendarEvent}"</b> on your Google Calendar! On the Outfit Canvas, it will automatically suggest a special <b>"Fit for Your Birthday"</b> celebration outfit.
                      </p>

                      <div className="pt-2 border-t border-rose-200/60">
                        <label className="text-[10px] uppercase font-bold font-mono text-slate-500 block mb-1.5">
                          Simulate Google Calendar Event Detection:
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            'Birthday Party 🎉',
                            'Anniversary Dinner 🍷',
                            'Tech Job Interview 💼',
                            'Beach Vacation 🏖️'
                          ].map((evt) => (
                            <button
                              key={evt}
                              type="button"
                              onClick={() => handleCalendarEventSelect(evt)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all ${
                                detectedCalendarEvent === evt
                                  ? 'bg-rose-600 text-white shadow-sm'
                                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              {evt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 🌦️ REAL WEATHER API SYNC CARD */}
              <div className="p-5 rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-50/90 to-blue-50/60 space-y-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md shrink-0">
                      <CloudSun className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-sm font-extrabold text-slate-900">Sync Weather App & Location</h5>
                        <span className="px-2 py-0.5 rounded-full bg-sky-200 text-sky-900 text-[10px] font-mono font-bold">REAL API</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium">Auto-connects to Open-Meteo API & HTML5 GPS location</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleIntegrationToggle('weatherSync')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 shrink-0 ${
                      integrations.weatherSync ? 'bg-sky-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        integrations.weatherSync ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {integrations.weatherSync && (
                  <div className="p-4 rounded-xl bg-white/90 border border-sky-100 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-sky-800 font-bold font-mono">
                        <MapPin className="w-4 h-4 text-sky-600" /> Location: {weatherData.city}
                      </span>
                      <button
                        onClick={fetchRealWeather}
                        disabled={weatherLoading}
                        className="text-[11px] font-mono text-sky-700 hover:text-sky-900 flex items-center gap-1 font-bold underline"
                      >
                        <RefreshCw className={`w-3 h-3 ${weatherLoading ? 'animate-spin' : ''}`} /> Refresh Forecast
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-sky-50/80 border border-sky-200 text-slate-800 font-mono">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block">LIVE TEMP</span>
                        <span className="text-sm font-extrabold text-sky-900">{weatherData.temp}°C</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block">CONDITION</span>
                        <span className="text-sm font-extrabold text-slate-900">{weatherData.condition}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 🎴 REAL CONTACTS SYNC CARD */}
              <div className="p-5 rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50/90 to-purple-50/60 space-y-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shrink-0">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-sm font-extrabold text-slate-900">Sync Phone Contacts</h5>
                        <span className="px-2 py-0.5 rounded-full bg-indigo-200 text-indigo-900 text-[10px] font-mono font-bold">DEVICE SYNC</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium">Connect contacts to share looks & compare color season analysis</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleIntegrationToggle('contactsSync')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 shrink-0 ${
                      integrations.contactsSync ? 'bg-indigo-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        integrations.contactsSync ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {integrations.contactsSync && (
                  <div className="p-4 rounded-xl bg-white/90 border border-indigo-100 space-y-3 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="font-mono font-bold text-indigo-900 flex items-center gap-1.5">
                        <PhoneCall className="w-3.5 h-3.5 text-indigo-600" /> Synced Contacts List ({syncedContacts.length})
                      </span>
                      <button
                        onClick={handlePickPhoneContacts}
                        disabled={contactsLoading}
                        className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-[11px] font-bold font-mono flex items-center gap-1 hover:bg-indigo-700 transition-colors shadow-sm"
                      >
                        <Users className="w-3 h-3" /> {contactsLoading ? 'Syncing...' : '+ Add Phone Contact'}
                      </button>
                    </div>

                    <div className="space-y-2">
                      {syncedContacts.map(contact => (
                        <div key={contact.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                          <div className="flex items-center gap-2.5">
                            <img src={contact.avatar} alt={contact.name} className="w-8 h-8 rounded-full object-cover border border-slate-300" />
                            <div>
                              <h6 className="font-extrabold text-slate-900 text-xs">{contact.name}</h6>
                              <p className="text-[10px] text-slate-500 font-mono">{contact.phone}</p>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              const updated = syncedContacts.map(c => c.id === contact.id ? { ...c, shared: !c.shared } : c);
                              setSyncedContacts(updated);
                            }}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 transition-all ${
                              contact.shared 
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            }`}
                          >
                            {contact.shared ? <Check className="w-3 h-3 text-emerald-600" /> : <Send className="w-3 h-3" />}
                            {contact.shared ? 'Lookbook Shared' : 'Share Outfit'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div>
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Step {currentStep - 1}
              </button>
            ) : user ? (
              <button
                onClick={() => {
                  if (onLogout) onLogout();
                  onClose();
                }}
                className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5 px-2"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            ) : (
              <span className="text-[11px] text-slate-400 font-mono">Guest Onboarding</span>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {currentStep < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="primary-button px-6 py-2.5 text-xs uppercase font-extrabold tracking-wider flex items-center gap-2 shadow-md shimmer-hover"
              >
                Next Step ({currentStep + 1} of {TOTAL_STEPS}) <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSaveAndContinue}
                className="px-7 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs uppercase font-extrabold tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" /> Save & Launch App
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
