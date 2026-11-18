import { createClient, SupabaseClient, Session, User } from '@supabase/supabase-js';
import { HistoryItem, GenerationJobItem } from '../types';

const STORAGE_KEY_URL = 'archipics_supabase_url';
const STORAGE_KEY_ANON = 'archipics_supabase_anon_key';

// Read from env or local storage
const getInitialUrl = (): string => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  if (
    envUrl &&
    typeof envUrl === 'string' &&
    envUrl.startsWith('http') &&
    envUrl !== 'https://your-project-id.supabase.co'
  ) {
    return envUrl;
  }
  return localStorage.getItem(STORAGE_KEY_URL) || '';
};

const getInitialAnonKey = (): string => {
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (
    envKey &&
    typeof envKey === 'string' &&
    envKey.length > 20 &&
    envKey !== 'your-anon-public-api-key'
  ) {
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

// Initialize immediately on module load if env or localStorage exists
initSupabaseClient();

let backendFetchPromise: Promise<{ url: string; anonKey: string } | null> | null = null;

export const fetchBackendConfigOnce = async (): Promise<{ url: string; anonKey: string } | null> => {
  if (backendFetchPromise) return backendFetchPromise;
  backendFetchPromise = (async () => {
    if (typeof window === 'undefined') return null;
    try {
      const res = await fetch('/api/supabase/status');
      const data = await res.json();
      if (data?.ok && data?.url && data?.anonKey) {
        localStorage.setItem(STORAGE_KEY_URL, data.url);
        localStorage.setItem(STORAGE_KEY_ANON, data.anonKey);
        initSupabaseClient(data.url, data.anonKey);
        return { url: data.url, anonKey: data.anonKey };
      }
    } catch {
      // silent fail
    }
    return null;
  })();
  return backendFetchPromise;
};

// Auto fetch backend config if not yet configured
if (!supabaseInstance && typeof window !== 'undefined') {
  fetchBackendConfigOnce();
}

export const getSupabaseClient = (): SupabaseClient | null => {
  if (!supabaseInstance) {
    supabaseInstance = initSupabaseClient();
  }
  return supabaseInstance;
};

export const getSupabaseConfig = () => {
  const url = getInitialUrl();
  const key = getInitialAnonKey();
  const isEnv = Boolean(
    import.meta.env.VITE_SUPABASE_URL &&
      import.meta.env.VITE_SUPABASE_URL !== 'https://your-project-id.supabase.co' &&
      import.meta.env.VITE_SUPABASE_ANON_KEY
  );
  return {
    url,
    anonKey: key,
    isConfigured: Boolean(url && key),
    isEnv,
  };
};

// ─── Backend API Helper (Kết nối tới api/index.js) ──────────────────────────

export const apiRequest = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const config = getSupabaseConfig();
  const session = await getCurrentSession();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (config.url) {
    headers['x-supabase-url'] = config.url;
  }
  if (config.anonKey) {
    headers['x-supabase-anon-key'] = config.anonKey;
  }
  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  const data = await response.json();
  if (!response.ok || data?.ok === false) {
    throw new Error(data?.error || data?.message || `Lỗi kết nối API (${response.status})`);
  }
  return data as T;
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

    // Đồng bộ cấu hình xuống Back-end (/api/index.js)
    apiRequest('/api/supabase/config', {
      method: 'POST',
      body: JSON.stringify({ url: cleanUrl, anonKey: cleanKey }),
    }).catch((err) => {
      console.warn('Sync Supabase config to backend notice:', err);
    });

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

  apiRequest('/api/supabase/config', {
    method: 'DELETE',
  }).catch(() => {});
};

export const checkBackendSupabaseStatus = async () => {
  try {
    return await apiRequest<{
      ok: boolean;
      connected: boolean;
      isConfigured: boolean;
      url?: string;
      tablesReady?: boolean;
      tableNotice?: string;
      latencyMs?: number;
      message?: string;
    }>('/api/supabase/status');
  } catch (err: any) {
    return {
      ok: false,
      connected: false,
      isConfigured: false,
      message: err.message || 'Không thể kết nối tới Back-end API.',
    };
  }
};

export const fetchSupabaseSchemaSql = async (): Promise<string> => {
  const res = await apiRequest<{ ok: boolean; sql: string }>('/api/supabase/schema');
  return res.sql;
};

// ─── Authentication Operations (Client + Backend Sync) ───────────────────────

export const signInWithEmail = async (email: string, password: string) => {
  const client = getSupabaseClient();
  if (client) {
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    apiRequest('/api/auth/me').catch(() => {});
    return data;
  }

  // Fallback trực tiếp qua Back-end API (/api/auth/login)
  const res = await apiRequest<{ ok: boolean; user: any; session: any; profile: any }>(
    '/api/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }
  );
  return { user: res.user, session: res.session };
};

export const signUpWithEmail = async (
  email: string,
  password: string,
  fullName?: string,
  phone?: string
) => {
  const client = getSupabaseClient();
  if (client) {
    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || 'KTS ArchiPics',
          phone: phone || '',
        },
      },
    });
    if (error) throw error;
    if (data.session) {
      apiRequest('/api/auth/me').catch(() => {});
    }
    return data;
  }

  // Fallback trực tiếp qua Back-end API (/api/auth/register)
  const res = await apiRequest<{ ok: boolean; user: any; session: any; profile: any }>(
    '/api/auth/register',
    {
      method: 'POST',
      body: JSON.stringify({ email, password, name: fullName, phone }),
    }
  );
  return { user: res.user, session: res.session };
};

export const signInWithMagicLink = async (email: string) => {
  const client = getSupabaseClient();
  if (client) {
    const { data, error } = await client.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) throw error;
    return data;
  }

  // Fallback trực tiếp qua Back-end API (/api/auth/magic-link)
  const res = await apiRequest<{ ok: boolean; data: any }>('/api/auth/magic-link', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
  return res.data;
};

export const signInWithOAuth = async (provider: 'google' | 'github') => {
  const client = getSupabaseClient();
  if (client) {
    const { data, error } = await client.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) throw error;
    return data;
  }

  // Fallback trực tiếp qua Back-end API (/api/auth/oauth)
  const res = await apiRequest<{ ok: boolean; url: string }>('/api/auth/oauth', {
    method: 'POST',
    body: JSON.stringify({ provider }),
  });
  if (res.url) {
    window.location.href = res.url;
  }
  return res;
};

export const signOutSupabase = async () => {
  let client = getSupabaseClient();
  if (client) {
    try {
      await client.auth.signOut();
    } catch (err) {
      console.error('Error signing out of Supabase:', err);
    }
  }
  // Remove any remaining Supabase auth tokens in localStorage for clean logout
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('sb-') || key.includes('supabase.auth.token'))) {
        localStorage.removeItem(key);
      }
    }
  } catch {
    // ignore
  }
  apiRequest('/api/auth/logout', { method: 'POST' }).catch(() => {});
};

export const getCurrentSession = async (): Promise<Session | null> => {
  let client = getSupabaseClient();
  if (!client) {
    await fetchBackendConfigOnce();
    client = getSupabaseClient();
  }
  if (!client) return null;

  try {
    const { data, error } = await client.auth.getSession();
    if (error || !data?.session) return null;
    return data.session;
  } catch {
    return null;
  }
};

export const onSupabaseAuthStateChange = (
  callback: (session: Session | null, user: User | null) => void
) => {
  let activeSub: { unsubscribe: () => void } | null = null;

  const attachListener = (c: SupabaseClient) => {
    const {
      data: { subscription },
    } = c.auth.onAuthStateChange((_event, session) => {
      callback(session, session?.user || null);
    });
    activeSub = subscription;
  };

  const client = getSupabaseClient();
  if (client) {
    attachListener(client);
  } else {
    fetchBackendConfigOnce().then(() => {
      const c = getSupabaseClient();
      if (c) attachListener(c);
    });
  }

  return () => {
    activeSub?.unsubscribe();
  };
};

// ─── Data Sync Operations with api/index.js ──────────────────────────────────

export const apiDeductCredits = async (userId: string, amount: number, action?: string) => {
  return apiRequest<{ ok: boolean; credits: number; deducted: number }>('/api/user/credits/deduct', {
    method: 'POST',
    body: JSON.stringify({ userId, amount, action }),
  });
};

export const apiAddCredits = async (userId: string, amount: number, reason?: string, plan?: string) => {
  return apiRequest<{ ok: boolean; credits: number; added: number }>('/api/user/credits/add', {
    method: 'POST',
    body: JSON.stringify({ userId, amount, reason, plan }),
  });
};

export const apiFetchHistory = async (): Promise<HistoryItem[]> => {
  const res = await apiRequest<{ ok: boolean; items: HistoryItem[] }>('/api/history');
  return res.items || [];
};

export const apiSaveHistoryItem = async (item: HistoryItem & { userId?: string }) => {
  return apiRequest<{ ok: boolean; item: HistoryItem }>('/api/history', {
    method: 'POST',
    body: JSON.stringify(item),
  });
};

export const apiToggleFavoriteHistory = async (id: string, isFavorite?: boolean) => {
  return apiRequest<{ ok: boolean; id: string; isFavorite: boolean }>(`/api/history/${id}/favorite`, {
    method: 'PATCH',
    body: JSON.stringify({ isFavorite }),
  });
};

export const apiDeleteHistoryItem = async (id: string) => {
  return apiRequest<{ ok: boolean; deletedId: string }>(`/api/history/${id}`, {
    method: 'DELETE',
  });
};

export const apiConfirmPaymentOrder = async (payload: {
  orderId?: string;
  planId: string;
  transferCode?: string;
  userId?: string;
}) => {
  return apiRequest<{
    ok: boolean;
    message: string;
    order: any;
    profile: any;
  }>('/api/payments/confirm', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const apiGetSupabaseSchema = async () => {
  return apiRequest<{
    ok: boolean;
    sql: string;
    tables: { name: string; description: string }[];
  }>('/api/supabase/schema');
};

export const apiCheckSupabaseTables = async () => {
  return apiRequest<{
    ok: boolean;
    connected: boolean;
    allReady?: boolean;
    message?: string;
    tables: { name: string; ready: boolean; error: string | null }[];
  }>('/api/supabase/tables-check');
};

// ─── Generation Jobs Operations (Tiến trình tạo ảnh AI) ──────────────────────

export const apiFetchGenerationJobs = async (status?: string): Promise<GenerationJobItem[]> => {
  const query = status ? `?status=${encodeURIComponent(status)}` : '';
  const res = await apiRequest<{ ok: boolean; jobs: GenerationJobItem[] }>(`/api/jobs${query}`);
  return res.jobs || [];
};

export const apiCreateGenerationJob = async (
  job: Partial<GenerationJobItem>
): Promise<GenerationJobItem> => {
  const res = await apiRequest<{ ok: boolean; job: GenerationJobItem }>('/api/jobs', {
    method: 'POST',
    body: JSON.stringify(job),
  });
  return res.job;
};

export const apiGetGenerationJob = async (id: string): Promise<GenerationJobItem> => {
  const res = await apiRequest<{ ok: boolean; job: GenerationJobItem }>(`/api/jobs/${id}`);
  return res.job;
};

export const apiUpdateGenerationJob = async (
  id: string,
  updates: Partial<GenerationJobItem>
): Promise<GenerationJobItem> => {
  const res = await apiRequest<{ ok: boolean; job: GenerationJobItem }>(`/api/jobs/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
  return res.job;
};


