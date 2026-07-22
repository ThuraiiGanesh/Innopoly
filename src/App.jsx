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
  const [user, setUser] = useState(null);
  const [wardrobe, setWardrobe] = useState(INITIAL_WARDROBE);
  const [currentBudget, setCurrentBudget] = useState(50);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedCreator, setSelectedCreator] = useState(null);

  const [pitchDeckOpen, setPitchDeckOpen] = useState(false);
  const [complianceOpen, setComplianceOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Initialize DB and load user on mount
  useEffect(() => {
    initDatabase();
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    const savedWardrobe = getUserWardrobeFromDB(INITIAL_WARDROBE);
    setWardrobe(savedWardrobe);
  }, []);

  // Sync wardrobe changes to persistent DB
  useEffect(() => {
    saveUserWardrobeInDB(wardrobe);
  }, [wardrobe]);

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleAddItem = (newItem) => {
    setWardrobe((prev) => [newItem, ...prev]);
  };

  const handleDeleteItem = (id) => {
    setWardrobe((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setSelectedCreator(null);
    const mixerElement = document.getElementById('mixer');
    if (mixerElement) {
      mixerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCreatorOutfit = (creator) => {
    setSelectedCreator(creator);
    setSelectedTemplate(null);
    const mixerElement = document.getElementById('mixer');
    if (mixerElement) {
      mixerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    logoutUserInDB();
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between selection:bg-black selection:text-white">
      {/* Header Navigation */}
      <Header
        user={user}
        onOpenLogin={() => setLoginModalOpen(true)}
        onLogout={handleLogout}
        onOpenPitch={() => setPitchDeckOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenCompliance={() => setComplianceOpen(true)} />

        {/* Section 1: Closet Digitizer */}
        <div className="reveal-on-scroll">
          <WardrobeDigitizer
            wardrobe={wardrobe}
            onAddItem={handleAddItem}
            onDeleteItem={handleDeleteItem}
          />
        </div>

        {/* Section 2: Height, Waist & Creator Matcher */}
        <div className="reveal-on-scroll">
          <BodyCreatorMatcher
            onSelectCreatorOutfit={handleSelectCreatorOutfit}
          />
        </div>

        {/* Section 3: Occasion Style Templates */}
        <div className="reveal-on-scroll">
          <CategoryTemplates
            onSelectTemplate={handleSelectTemplate}
          />
        </div>

        {/* Section 4: Mix & Match Canvas + Color Swapper + Affiliate Links */}
        <div className="reveal-on-scroll">
          <OutfitMixer
            wardrobe={wardrobe}
            currentBudget={currentBudget}
            selectedTemplate={selectedTemplate}
            selectedCreator={selectedCreator}
          />
        </div>

        {/* Section 5: Budget Filter & Compliance Rules */}
        <div className="reveal-on-scroll">
          <BudgetCompliance
            currentBudget={currentBudget}
            onBudgetChange={setCurrentBudget}
            onOpenCompliance={() => setComplianceOpen(true)}
          />
        </div>
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

      {/* User Login & Signup Modal */}
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

      {/* Compliance Modal */}
      <ComplianceModal
        isOpen={complianceOpen}
        onClose={() => setComplianceOpen(false)}
      />
    </div>
  );
}
