import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WardrobeDigitizer from './components/WardrobeDigitizer';
import BodyCreatorMatcher from './components/BodyCreatorMatcher';
import CategoryTemplates from './components/CategoryTemplates';
import OutfitMixer from './components/OutfitMixer';
import BudgetCompliance from './components/BudgetCompliance';
import PitchDeckModal from './components/PitchDeckModal';
import ComplianceModal from './components/ComplianceModal';
import LoginModal from './components/LoginModal';
import ProfileDashboardModal from './components/ProfileDashboardModal';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import Toast from './components/Toast';

// Smart AI Components
import WeatherCalendarStylist from './components/WeatherCalendarStylist';
import ColorSeasonAnalyzer from './components/ColorSeasonAnalyzer';

import { INITIAL_WARDROBE } from './data/mockData';
import { 
  initDatabase, 
  getCurrentUser, 
  logoutUserInDB, 
  getUserWardrobeFromDB, 
  saveUserWardrobeInDB 
} from './utils/database';
import { syncWardrobeToCloud } from './utils/supabase';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'weather' | 'color' | 'closet' | 'styling' | 'creators' | 'templates' | 'compliance'
  const [user, setUser] = useState(null);
  const [wardrobe, setWardrobe] = useState([]);
  const [currentBudget, setCurrentBudget] = useState(50);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedCreator, setSelectedCreator] = useState(null);

  const [pitchDeckOpen, setPitchDeckOpen] = useState(false);
  const [complianceOpen, setComplianceOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginRegisterMode, setLoginRegisterMode] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Floating Toast Notification State
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    initDatabase();
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      const savedWardrobe = getUserWardrobeFromDB(currentUser.id, []);
      setWardrobe(savedWardrobe);
    } else {
      const savedWardrobe = getUserWardrobeFromDB(null, []);
      setWardrobe(savedWardrobe);
      // Explicitly start logged out on site launch
      setUser(null);
    }
  }, []);

  useEffect(() => {
    saveUserWardrobeInDB(user?.id, wardrobe);
    if (user?.id) {
      syncWardrobeToCloud(user.id, wardrobe);
    }
  }, [wardrobe, user]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleAddItem = (newItem) => {
    setWardrobe((prev) => [newItem, ...prev]);
    showToast(`✨ Added "${newItem.name}" to closet!`);
  };

  const handleDeleteItem = (id) => {
    const item = wardrobe.find((i) => i.id === id);
    setWardrobe((prev) => prev.filter((i) => i.id !== id));
    showToast(`Removed ${item ? `"${item.name}"` : 'item'} from closet`, 'info');
  };

  const handleBudgetChange = (newBudget) => {
    setCurrentBudget(newBudget);
    showToast(`Budget cap updated to $${newBudget} SGD`, 'info');
  };

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setSelectedCreator(null);
    setActiveTab('styling');
    showToast(`Applied ${template.title || 'occasion'} template!`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCreatorOutfit = (creator) => {
    setSelectedCreator(creator);
    setSelectedTemplate(null);
    setActiveTab('styling');
    showToast(`Matched ${creator.name}'s outfit cut!`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLoginModal = (isRegister = false) => {
    setLoginRegisterMode(isRegister);
    setLoginModalOpen(true);
  };

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    const userWardrobe = getUserWardrobeFromDB(loggedInUser.id, INITIAL_WARDROBE);
    setWardrobe(userWardrobe);
    showToast(`Welcome, ${loggedInUser.name}!`);
    // Bring user to Profile Dashboard for style aesthetic & body metrics setup
    setProfileModalOpen(true);
  };

  const handleLogout = () => {
    logoutUserInDB();
    setUser(null);
    setWardrobe(INITIAL_WARDROBE);
    showToast("Signed out successfully", "info");
  };

  const handleNavigate = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between selection:bg-black selection:text-white pb-safe">
      {/* Floating Action Toast Notification */}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: 'success' })} 
      />

      {/* Header Navigation Bar with Active Section Tabs & Mobile Bottom Bar */}
      <Header
        user={user}
        activeTab={activeTab}
        onTabChange={handleNavigate}
        onOpenLogin={() => handleOpenLoginModal(false)}
        onOpenProfile={() => setProfileModalOpen(true)}
        onLogout={handleLogout}
        onOpenPitch={() => setPitchDeckOpen(true)}
      />

      <main className="flex-1 pb-16 lg:pb-12">
        {/* Section View 1: Home Overview */}
        {activeTab === 'home' && (
          <div className="animate-fade-in-up">
            <Hero 
              user={user}
              onNavigate={handleNavigate}
              onOpenLogin={handleOpenLoginModal}
              onOpenCompliance={() => setComplianceOpen(true)} 
            />
          </div>
        )}

        {/* Section View 2: Weather & Calendar AI Stylist */}
        {activeTab === 'weather' && (
          <div className="animate-fade-in-up">
            <WeatherCalendarStylist
              wardrobe={wardrobe}
              onSelectOutfit={() => handleNavigate('styling')}
            />
          </div>
        )}

        {/* Section View 3: Personal Color Season Analyzer */}
        {activeTab === 'color' && (
          <div className="animate-fade-in-up">
            <ColorSeasonAnalyzer
              wardrobe={wardrobe}
            />
          </div>
        )}

        {/* Section View 4: Closet Digitizer */}
        {activeTab === 'closet' && (
          <div className="animate-fade-in-up">
            <WardrobeDigitizer
              wardrobe={wardrobe}
              onAddItem={handleAddItem}
              onDeleteItem={handleDeleteItem}
            />
          </div>
        )}

        {/* Section View 5: Height, Waist & Creator Matcher */}
        {activeTab === 'creators' && (
          <div className="animate-fade-in-up">
            <BodyCreatorMatcher
              user={user}
              onSelectCreatorOutfit={handleSelectCreatorOutfit}
              onOpenProfile={() => setProfileModalOpen(true)}
            />
          </div>
        )}

        {/* Section View 6: Occasion Templates */}
        {activeTab === 'templates' && (
          <div className="animate-fade-in-up">
            <CategoryTemplates
              onSelectTemplate={handleSelectTemplate}
            />
          </div>
        )}

        {/* Section View 7: Interactive Outfit Mixer & "Choose Color" Canvas */}
        {activeTab === 'styling' && (
          <div className="animate-fade-in-up">
            <OutfitMixer
              wardrobe={wardrobe}
              currentBudget={currentBudget}
              selectedTemplate={selectedTemplate}
              selectedCreator={selectedCreator}
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {/* Section View 8: Budget Controls & Regulatory Rules */}
        {activeTab === 'compliance' && (
          <div className="animate-fade-in-up">
            <BudgetCompliance
              currentBudget={currentBudget}
              onBudgetChange={handleBudgetChange}
              onOpenCompliance={() => setComplianceOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Floating AI Fashion Stylist Chatbot */}
      <Chatbot
        userProfile={user}
        wardrobe={wardrobe}
        currentBudget={currentBudget}
      />

      {/* Footer */}
      <Footer
        onOpenPitch={() => setPitchDeckOpen(true)}
        onOpenCompliance={() => setComplianceOpen(true)}
      />

      {/* Login & Registration Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        initialRegisterMode={loginRegisterMode}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Profile Dashboard Modal (Style Aesthetic Themes & Full Body Metrics Setup) */}
      <ProfileDashboardModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        user={user}
        onSaveMetrics={(metrics) => {
          showToast("Saved body metrics & style preferences!", "success");
        }}
        onCompleteOnboarding={() => {
          showToast("✨ Profile setup complete! Welcome to StyleSync.");
        }}
        onLogout={handleLogout}
      />

      {/* Pitch Deck Modal */}
      <PitchDeckModal
        isOpen={pitchDeckOpen}
        onClose={() => setPitchDeckOpen(false)}
      />

      {/* Compliance Rules Modal */}
      <ComplianceModal
        isOpen={complianceOpen}
        onClose={() => setComplianceOpen(false)}
      />
    </div>
  );
}
