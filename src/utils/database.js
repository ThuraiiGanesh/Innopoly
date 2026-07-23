// StyleSync Client-Side Persistent Database Layer (User Auth, Body Metrics, Style Themes & Storage)

const STORAGE_KEYS = {
  USERS: 'stylesync_db_users',
  CURRENT_USER: 'stylesync_db_current_user',
  WARDROBE_PREFIX: 'stylesync_db_wardrobe_',
  METRICS_PREFIX: 'stylesync_db_metrics_',
  STYLE_THEME_PREFIX: 'stylesync_db_theme_'
};

export const DEFAULT_BODY_METRICS = {
  height: 178,   // cm
  chest: 38,     // inches
  waist: 30,     // inches
  hips: 38,      // inches
  shoulders: 44, // cm
  inseam: 30,    // inches
  build: 'Athletic'
};

export const STYLE_THEMES = [
  {
    id: 'old_money',
    name: 'Old Money & Quiet Luxury',
    tagline: 'Tailored blazers, crisp linen, neutral trousers & leather loafers',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    tags: ['Tailored', 'Linen', 'Quiet Luxury', 'Loafers']
  },
  {
    id: 'preppy',
    name: 'Preppy & Ivy League',
    tagline: 'Cable-knit tennis sweaters, polo shirts, chinos & classic loafers',
    image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80',
    tags: ['Cable Knit', 'Polo', 'Chinos', 'Collegiate']
  },
  {
    id: 'starboy',
    name: 'Starboy & Cyber-Minimalist',
    tagline: 'Sleek leather jackets, dark monochrome, fitted tees & metallic edge',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80',
    tags: ['Leather Jacket', 'Monochrome', 'Fitted Black Tee', 'Street Edge']
  },
  {
    id: 'streetwear',
    name: 'Urban Streetwear & Gorpcore',
    tagline: 'Boxy oversized graphic tees, baggy denim, retro sneakers & technical shell jackets',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80',
    tags: ['Oversized Tee', 'Baggy Denim', 'Sneakers', 'Gorpcore']
  },
  {
    id: 'minimalist',
    name: 'Minimalist Smart Casual',
    tagline: 'Clean monochrome lines, neutral coats, straight chinos & white kicks',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    tags: ['Clean Lines', 'Trench Coat', 'Minimal Kicks', 'Basics']
  },
  {
    id: 'resort',
    name: 'Resort & Vacation Elegance',
    tagline: 'Open-collar linen camp shirts, cream shorts & breezy resort wear',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80',
    tags: ['Linen Camp Shirt', 'Cream Shorts', 'Vacation', 'Resort']
  },
  {
    id: 'y2k',
    name: 'Y2K & Cyberpunk Street',
    tagline: 'Low-rise baggy cargos, chrome metallic accents, graphic hoodies & visor shades',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
    tags: ['Y2K Cargo', 'Chrome', 'Graphic Hoodie', 'Futuristic']
  },
  {
    id: 'opium',
    name: 'Opium & Darkwear Minimal',
    tagline: 'Oversized black silhouettes, chunky platform boots, silver hardware & dark drape',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80',
    tags: ['Opium Dark', 'Platform Boots', 'Silver Chains', 'Avant-Garde']
  },
  {
    id: 'clean_aesthetic',
    name: 'Clean Girl / Clean Boy Fit',
    tagline: 'Neutral monochrome sweat sets, fitted ribbed tops, caps & sleek white trainers',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80',
    tags: ['Neutral Set', 'Athleisure', 'Caps', 'Sleek Trainers']
  },
  {
    id: 'vintage_90s',
    name: 'Vintage Thrift & Retro 90s',
    tagline: 'Patterned cardigans, relaxed vintage denim & distressed leather bomber jackets',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80',
    tags: ['Thrift Vintage', 'Retro Denim', 'Leather Bomber', '90s Vibe']
  }
];

export const initDatabase = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
  }
};

export const getUsersFromDB = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  } catch (e) {
    return [];
  }
};

export const getCurrentUser = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
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
    budgetCap: 50,
    styleTheme: ['old_money'],
    bodyMetrics: DEFAULT_BODY_METRICS,
    isFirstLogin: true
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

export const getUserWardrobeFromDB = (userId, fallback = []) => {
  try {
    const key = userId ? `${STORAGE_KEYS.WARDROBE_PREFIX}${userId}` : 'stylesync_db_wardrobe_guest';
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
};

export const saveUserProfileMetricsInDB = (userId, metrics) => {
  const key = userId ? `${STORAGE_KEYS.METRICS_PREFIX}${userId}` : 'stylesync_db_metrics_guest';
  localStorage.setItem(key, JSON.stringify(metrics));
  
  const currentUser = getCurrentUser();
  if (currentUser && (currentUser.id === userId || (!userId && !currentUser.id))) {
    currentUser.bodyMetrics = metrics;
    setCurrentUserInDB(currentUser);
  }
};

export const getUserProfileMetricsFromDB = (userId, fallback = DEFAULT_BODY_METRICS) => {
  try {
    const key = userId ? `${STORAGE_KEYS.METRICS_PREFIX}${userId}` : 'stylesync_db_metrics_guest';
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
};

export const saveUserStyleThemeInDB = (userId, themeIds) => {
  const key = userId ? `${STORAGE_KEYS.STYLE_THEME_PREFIX}${userId}` : 'stylesync_db_theme_guest';
  const dataToSave = Array.isArray(themeIds) ? JSON.stringify(themeIds) : JSON.stringify([themeIds]);
  localStorage.setItem(key, dataToSave);

  const currentUser = getCurrentUser();
  if (currentUser && (currentUser.id === userId || (!userId && !currentUser.id))) {
    currentUser.styleTheme = themeIds;
    setCurrentUserInDB(currentUser);
  }
};

export const getUserStyleThemeFromDB = (userId, fallback = ['old_money']) => {
  try {
    const key = userId ? `${STORAGE_KEYS.STYLE_THEME_PREFIX}${userId}` : 'stylesync_db_theme_guest';
    const raw = localStorage.getItem(key);
    if (!raw) return Array.isArray(fallback) ? fallback : [fallback];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return [raw];
    }
  } catch (e) {
    return Array.isArray(fallback) ? fallback : [fallback];
  }
};

export const DEFAULT_INTEGRATIONS = {
  weatherSync: true,
  contactsSync: true,
  locationPermission: true,
  friendOutfitsSharing: false
};

export const saveUserIntegrationsInDB = (userId, integrations) => {
  const key = userId ? `stylesync_db_integrations_${userId}` : 'stylesync_db_integrations_guest';
  localStorage.setItem(key, JSON.stringify(integrations));
};

export const getUserIntegrationsFromDB = (userId, fallback = DEFAULT_INTEGRATIONS) => {
  try {
    const key = userId ? `stylesync_db_integrations_${userId}` : 'stylesync_db_integrations_guest';
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
};

