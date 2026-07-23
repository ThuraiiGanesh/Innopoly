// Supabase Cloud Database & Storage Integration Client

const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
};

// Cloud Database Helper Functions (with automatic local storage fallback)
export const syncWardrobeToCloud = async (userId, wardrobeItems) => {
  if (!isSupabaseConfigured()) {
    return { success: true, mode: 'local' };
  }
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/user_wardrobes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify({
        user_id: userId,
        wardrobe: wardrobeItems,
        updated_at: new Date().toISOString()
      })
    });
    return { success: response.ok, mode: 'cloud' };
  } catch (e) {
    console.warn("Supabase Sync Fallback to Local Storage:", e);
    return { success: true, mode: 'local' };
  }
};

export const fetchWardrobeFromCloud = async (userId) => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/user_wardrobes?user_id=eq.${userId}&select=*`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      return data?.[0]?.wardrobe || null;
    }
  } catch (e) {
    console.warn("Supabase Fetch Fallback:", e);
  }
  return null;
};
