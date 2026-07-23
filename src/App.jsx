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

// Smart AI Component
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
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'color' | 'closet' | 'styling' | 'creators' | 'templates' | 'compliance'
  const [user, setUser] = useState(null);
  const [wardrobe, setWardrobe] = useState([]);
  const [currentBudget, setCurrentBudget] = useState(50);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedCreator, setSelectedCreator] = useState(null);

  const [pitchDeckOpen, setPitchDeckOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginRegisterMode, setLoginRegisterMode] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Floating Toast Notification State
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    initDatabase();
    // Guarantee 100% brand new logged-out launch state on site open
    logoutUserInDB();
    setUser(null);
    setWardrobe([]);
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

      {/* Header Navigation Bar */}
      <Header
        user={user}
        activeTab={activeTab}
        onTabChange={handleNavigate}
        onOpenLogin={() => handleOpenLoginModal(false)}
        onOpenProfile={() => setProfileModalOpen(true)}
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

        {/* Section View 2: Personal Color Season Analyzer */}
        {activeTab === 'color' && (
          <div className="animate-fade-in-up">
            <ColorSeasonAnalyzer
              wardrobe={wardrobe}
            />
          </div>
        )}

        {/* Section View 3: Closet Digitizer */}
        {activeTab === 'closet' && (
          <div className="animate-fade-in-up">
            <WardrobeDigitizer
              wardrobe={wardrobe}
              onAddItem={handleAddItem}
              onDeleteItem={handleDeleteItem}
            />
          </div>
        )}

        {/* Section View 4: Height, Waist & Creator Matcher */}
        {activeTab === 'creators' && (
          <div className="animate-fade-in-up">
            <BodyCreatorMatcher
              user={user}
              onSelectCreatorOutfit={handleSelectCreatorOutfit}
              onOpenProfile={() => setProfileModalOpen(true)}
            />
          </div>
        )}

        {/* Section View 5: Occasion Templates */}
        {activeTab === 'templates' && (
          <div className="animate-fade-in-up">
            <CategoryTemplates
              onSelectTemplate={handleSelectTemplate}
            />
          </div>
        )}

        {/* Section View 6: Interactive Outfit Mixer */}
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

        {/* Section View 7: Budget Controls */}
        {activeTab === 'compliance' && (
          <div className="animate-fade-in-up">
            <BudgetCompliance
              currentBudget={currentBudget}
              onBudgetChange={handleBudgetChange}
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

      {/* Profile Dashboard Modal */}
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
    </div>
  );
}
