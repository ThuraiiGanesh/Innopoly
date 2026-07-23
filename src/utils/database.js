// StyleSync Client-Side Persistent Database Layer (User Auth & Per-User Storage)

const STORAGE_KEYS = {
  USERS: 'stylesync_db_users',
  CURRENT_USER: 'stylesync_db_current_user',
  WARDROBE_PREFIX: 'stylesync_db_wardrobe_'
};

const DEFAULT_USER = {
  id: 'u_101',
  name: 'Alex Vance',
  email: 'alex@stylesync.ai',
  password: 'demo',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
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

export const getUsersFromDB = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  } catch (e) {
    return [DEFAULT_USER];
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
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};

export const registerUser = (name, email, password) => {
  const users = getUsersFromDB();
  const existing = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
  
  if (existing) {
    return { success: false, error: 'An account with this email already exists.' };
  }

  const newUser = {
    id: 'u_' + Date.now(),
    name: name.trim() || email.split('@')[0],
    email: email.trim().toLowerCase(),
    password: password,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    budgetCap: 50
  };

  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  setCurrentUserInDB(newUser);

  return { success: true, user: newUser };
};

export const loginUser = (email, password) => {
  const users = getUsersFromDB();
  const found = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());

  if (!found) {
    // If not registered yet, auto-register for frictionless testing
    return registerUser(email.split('@')[0], email, password);
  }

  if (found.password && found.password !== password) {
    return { success: false, error: 'Incorrect password. Please try again.' };
  }

  setCurrentUserInDB(found);
  return { success: true, user: found };
};

export const logoutUserInDB = () => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

export const saveUserWardrobeInDB = (userId, wardrobe) => {
  const key = userId ? `${STORAGE_KEYS.WARDROBE_PREFIX}${userId}` : 'stylesync_db_wardrobe_guest';
  localStorage.setItem(key, JSON.stringify(wardrobe));
};

export const getUserWardrobeFromDB = (userId, fallback) => {
  try {
    const key = userId ? `${STORAGE_KEYS.WARDROBE_PREFIX}${userId}` : 'stylesync_db_wardrobe_guest';
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
};
