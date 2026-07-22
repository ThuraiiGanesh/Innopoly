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
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';

import { INITIAL_WARDROBE } from './data/mockData';
import { 
  initDatabase, 
  getCurrentUser, 
  logoutUserInDB, 
  getUserWardrobeFromDB, 
  saveUserWardrobeInDB 
} from './utils/database';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'closet' | 'styling' | 'creators' | 'templates' | 'compliance'
  const [user, setUser] = useState(null);
  const [wardrobe, setWardrobe] = useState(INITIAL_WARDROBE);
  const [currentBudget, setCurrentBudget] = useState(50);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedCreator, setSelectedCreator] = useState(null);

  const [pitchDeckOpen, setPitchDeckOpen] = useState(false);
  const [complianceOpen, setComplianceOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    initDatabase();
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    const savedWardrobe = getUserWardrobeFromDB(INITIAL_WARDROBE);
    setWardrobe(savedWardrobe);
  }, []);

  useEffect(() => {
    saveUserWardrobeInDB(wardrobe);
  }, [wardrobe]);

  const handleAddItem = (newItem) => {
    setWardrobe((prev) => [newItem, ...prev]);
  };

  const handleDeleteItem = (id) => {
    setWardrobe((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setSelectedCreator(null);
    setActiveTab('styling');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCreatorOutfit = (creator) => {
    setSelectedCreator(creator);
    setSelectedTemplate(null);
    setActiveTab('styling');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    logoutUserInDB();
    setUser(null);
  };

  const handleNavigate = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between selection:bg-black selection:text-white">
      {/* Header Navigation Bar with Active Section Tabs */}
      <Header
        user={user}
        activeTab={activeTab}
        onTabChange={handleNavigate}
        onOpenLogin={() => setLoginModalOpen(true)}
        onLogout={handleLogout}
        onOpenPitch={() => setPitchDeckOpen(true)}
      />

      <main className="flex-1 pb-12">
        {/* Section View 1: Home Overview */}
        {activeTab === 'home' && (
          <div className="animate-fade-in-up">
            <Hero 
              onNavigate={handleNavigate}
              onOpenCompliance={() => setComplianceOpen(true)} 
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
            />
          </div>
        )}

        {/* Section View 3: Height, Waist & Creator Matcher */}
        {activeTab === 'creators' && (
          <div className="animate-fade-in-up">
            <BodyCreatorMatcher
              onSelectCreatorOutfit={handleSelectCreatorOutfit}
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

        {/* Section View 5: Interactive Outfit Mixer & "Choose Color" Canvas */}
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

        {/* Section View 6: Budget Controls & Regulatory Rules */}
        {activeTab === 'compliance' && (
          <div className="animate-fade-in-up">
            <BudgetCompliance
              currentBudget={currentBudget}
              onBudgetChange={setCurrentBudget}
              onOpenCompliance={() => setComplianceOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Floating AI Fashion Stylist Chatbot (Accessible across all views) */}
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
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
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
