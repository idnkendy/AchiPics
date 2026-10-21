import { createClient, SupabaseClient, Session, User } from '@supabase/supabase-js';

const STORAGE_KEY_URL = 'archipics_supabase_url';
const STORAGE_KEY_ANON = 'archipics_supabase_anon_key';

// Read from env or local storage
const getInitialUrl = (): string => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.startsWith('http')) {
    return envUrl;
  }
  return localStorage.getItem(STORAGE_KEY_URL) || '';
};

const getInitialAnonKey = (): string => {
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (envKey && typeof envKey === 'string' && envKey.length > 10) {
    return envKey;
  }
  return localStorage.getItem(STORAGE_KEY_ANON) || '';
};

let supabaseInstance: SupabaseClient | null = null;

export const initSupabaseClient = (customUrl?: string, customKey?: string): SupabaseClient | null => {
  const url = customUrl || getInitialUrl();
  const key = customKey || getInitialAnonKey();

  if (!url || !key) {
    supabaseInstance = null;
    return null;
  }

  try {
    supabaseInstance = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
    return supabaseInstance;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    supabaseInstance = null;
    return null;
  }
};

// Initialize immediately on module load
initSupabaseClient();

export const getSupabaseClient = (): SupabaseClient | null => {
  if (!supabaseInstance) {
    supabaseInstance = initSupabaseClient();
  }
  return supabaseInstance;
};

export const getSupabaseConfig = () => {
  const url = getInitialUrl();
  const key = getInitialAnonKey();
  const isEnv = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
  return {
    url,
    anonKey: key,
    isConfigured: Boolean(url && key),
    isEnv,
  };
};

export const saveSupabaseConfig = (url: string, anonKey: string): boolean => {
  try {
    const cleanUrl = url.trim();
    const cleanKey = anonKey.trim();

    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      throw new Error('Supabase URL phải bắt đầu bằng https://');
    }
    if (cleanKey.length < 20) {
      throw new Error('Supabase Anon Key không hợp lệ');
    }

    localStorage.setItem(STORAGE_KEY_URL, cleanUrl);
    localStorage.setItem(STORAGE_KEY_ANON, cleanKey);
    initSupabaseClient(cleanUrl, cleanKey);
    return true;
  } catch (error) {
    console.error('Save Supabase config error:', error);
    throw error;
  }
};

export const clearSupabaseConfig = () => {
  localStorage.removeItem(STORAGE_KEY_URL);
  localStorage.removeItem(STORAGE_KEY_ANON);
  supabaseInstance = null;
};

// ─── Authentication Operations ──────────────────────────────────────────────

export const signInWithEmail = async (email: string, password: string) => {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Chưa cấu hình Supabase! Vui lòng nhập URL và Anon Key của dự án Supabase.');
  }
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signUpWithEmail = async (
  email: string,
  password: string,
  fullName?: string
) => {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Chưa cấu hình Supabase! Vui lòng nhập URL và Anon Key của dự án Supabase.');
  }
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName || 'KTS ArchiPics',
      },
    },
  });
  if (error) throw error;
  return data;
};

export const signInWithMagicLink = async (email: string) => {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Chưa cấu hình Supabase! Vui lòng nhập URL và Anon Key của dự án Supabase.');
  }
  const { data, error } = await client.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin,
    },
  });
  if (error) throw error;
  return data;
};

export const signInWithOAuth = async (provider: 'google' | 'github') => {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Chưa cấu hình Supabase! Vui lòng nhập URL và Anon Key của dự án Supabase.');
  }
  const { data, error } = await client.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.origin,
    },
  });
  if (error) throw error;
  return data;
};

export const signOutSupabase = async () => {
  const client = getSupabaseClient();
  if (!client) return;
  try {
    await client.auth.signOut();
  } catch (err) {
    console.error('Error signing out of Supabase:', err);
  }
};

export const getCurrentSession = async (): Promise<Session | null> => {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data } = await client.auth.getSession();
    return data.session;
  } catch {
    return null;
  }
};

export const onSupabaseAuthStateChange = (
  callback: (session: Session | null, user: User | null) => void
) => {
  const client = getSupabaseClient();
  if (!client) return () => {};

  const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
    callback(session, session?.user || null);
  });

  return () => {
    subscription.unsubscribe();
  };
};
