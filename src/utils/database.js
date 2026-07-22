// StyleSync Client-Side Persistent Database Layer (LocalStorage & State Sync)

const STORAGE_KEYS = {
  USERS: 'stylesync_db_users',
  CURRENT_USER: 'stylesync_db_current_user',
  WARDROBE: 'stylesync_db_wardrobe',
  SAVED_OUTFITS: 'stylesync_db_saved_outfits',
  USER_PROFILE: 'stylesync_db_profile'
};

const DEFAULT_USER = {
  id: 'u_101',
  name: 'Alex Vance',
  email: 'alex@stylesync.ai',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  height: 178,
  waist: 30,
  build: 'Athletic',
  budgetCap: 50
};

export const initDatabase = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([DEFAULT_USER]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USER));
  }
};

export const getCurrentUser = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return DEFAULT_USER;
  }
};

export const setCurrentUserInDB = (user) => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
};

export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  let existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!existing) {
    // Auto-create account for smooth demo testing
    existing = {
      id: 'u_' + Date.now(),
      name: email.split('@')[0].toUpperCase(),
      email: email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      height: 175,
      waist: 30,
      build: 'Regular',
      budgetCap: 50
    };
    users.push(existing);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }
  
  setCurrentUserInDB(existing);
  return existing;
};

export const logoutUserInDB = () => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

export const saveUserWardrobeInDB = (wardrobe) => {
  localStorage.setItem(STORAGE_KEYS.WARDROBE, JSON.stringify(wardrobe));
};

export const getUserWardrobeFromDB = (fallback) => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.WARDROBE);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
};
