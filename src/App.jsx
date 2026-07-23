import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WardrobeDigitizer from './components/WardrobeDigitizer';
import BodyCreatorMatcher from './components/BodyCreatorMatcher';
import CategoryTemplates from './components/CategoryTemplates';
import OutfitMixer from './components/OutfitMixer';
import BudgetCompliance from './components/BudgetCompliance';
import PitchDeckModal from './components/PitchDeckModal';
import LoginModal from './components/LoginModal';
import ProfileDashboardModal from './components/ProfileDashboardModal';
import Footer from './components/Footer';
import Toast from './components/Toast';

// Smart AI Components
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
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [wardrobe, setWardrobe] = useState(INITIAL_WARDROBE);
  const [currentBudget, setCurrentBudget] = useState(50);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedCreator, setSelectedCreator] = useState(null);

  const [pitchDeckOpen, setPitchDeckOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginRegisterMode, setLoginRegisterMode] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileModalTab, setProfileModalTab] = useState('metrics');

  // Floating Toast Notification State
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    initDatabase();
    // Persistent Login Session: Restore user from localStorage on refresh
    const existingUser = getCurrentUser();
    if (existingUser) {
      setUser(existingUser);
      const userWardrobe = getUserWardrobeFromDB(existingUser.id, INITIAL_WARDROBE);
      setWardrobe(userWardrobe);
    } else {
      // First visit / Logged out user: Open Login/Register Modal automatically
      setLoginRegisterMode(false);
      setLoginModalOpen(true);
      setWardrobe(INITIAL_WARDROBE);
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      saveUserWardrobeInDB(user.id, wardrobe);
      syncWardrobeToCloud(user.id, wardrobe);
    }
  }, [wardrobe, user]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleAddItem = (newItem) => {
    if (!user) {
      handleOpenLoginModal(true);
      showToast('Please sign in or register to add garments to your closet', 'info');
      return;
    }
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
    showToast(`Welcome back, ${loggedInUser.name}!`);
  };

  const handleLogout = () => {
    logoutUserInDB();
    setUser(null);
    setWardrobe(INITIAL_WARDROBE);
    showToast("Signed out successfully", "info");
    setLoginModalOpen(true);
  };

  const handleNavigate = (tab) => {
    // Require login for interactive features
    if (!user && tab !== 'home') {
      handleOpenLoginModal(false);
      showToast('Please sign in or register to access this section', 'info');
      return;
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProfileWithTab = (tab = 'budget') => {
    setProfileModalTab(tab);
    setProfileModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between selection:bg-black selection:text-white pb-safe">
      {/* Floating Action Toast Notification */}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: 'success' })} 
      />

      {/* Header Navigation Bar */}
      <Header
        user={user}
        activeTab={activeTab}
        onTabChange={handleNavigate}
        onOpenLogin={() => handleOpenLoginModal(false)}
        onOpenProfile={(tab) => handleOpenProfileWithTab(tab || 'budget')}
        onLogout={handleLogout}
      />

      <main className="flex-1 pb-16 lg:pb-12">
        {/* Section View 1: Home Overview */}
        {activeTab === 'home' && (
          <div className="animate-fade-in-up">
            <Hero 
              user={user}
              onNavigate={handleNavigate}
              onOpenLogin={handleOpenLoginModal}
            />
          </div>
        )}

        {/* Section View 2: Closet Digitizer */}
        {activeTab === 'closet' && (
          <div className="animate-fade-in-up">
            <WardrobeDigitizer
              wardrobe={wardrobe}
              onAddItem={handleAddItem}
              onDeleteItem={handleDeleteItem}
              onNavigateToCanvas={() => handleNavigate('styling')}
            />
          </div>
        )}

        {/* Section View 3: Creators Page (Two Horizontal Columns) */}
        {activeTab === 'creators' && (
          <div className="animate-fade-in-up">
            <BodyCreatorMatcher
              user={user}
              onSelectCreatorOutfit={handleSelectCreatorOutfit}
              onOpenProfile={() => handleOpenProfileWithTab('metrics')}
            />
          </div>
        )}

        {/* Section View 4: Occasion Templates */}
        {activeTab === 'templates' && (
          <div className="animate-fade-in-up">
            <CategoryTemplates
              onSelectTemplate={handleSelectTemplate}
            />
          </div>
        )}

        {/* Section View 5: Interactive Outfit Mixer (Outfit Canvas) */}
        {activeTab === 'styling' && (
          <div className="animate-fade-in-up">
            <OutfitMixer
              user={user}
              wardrobe={wardrobe}
              currentBudget={currentBudget}
              selectedTemplate={selectedTemplate}
              selectedCreator={selectedCreator}
              onNavigate={handleNavigate}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenPitch={() => setPitchDeckOpen(true)}
      />

      {/* Login & Registration Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        initialRegisterMode={loginRegisterMode}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Profile Dashboard & Settings Modal */}
      <ProfileDashboardModal
        isOpen={profileModalOpen}
        initialTab={profileModalTab}
        onClose={() => setProfileModalOpen(false)}
        user={user}
        wardrobe={wardrobe}
        currentBudget={currentBudget}
        onBudgetChange={handleBudgetChange}
        onSaveMetrics={(metrics) => {
          showToast("Saved body metrics & style preferences!", "success");
        }}
        onCompleteOnboarding={() => {
          showToast("✨ Profile & Settings saved! Welcome to StyleSync.");
        }}
        onLogout={handleLogout}
      />

      {/* Pitch Deck Modal */}
      <PitchDeckModal
        isOpen={pitchDeckOpen}
        onClose={() => setPitchDeckOpen(false)}
      />
    </div>
  );
}
