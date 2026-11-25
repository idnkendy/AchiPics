import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  ThemeMode,
  MainToolType,
  ExtendedToolType,
  UserProfileData,
  HistoryItem,
  NotificationItem,
} from '../types';
import { translations } from '../i18n/translations';
import { ARCH_ASSETS } from '../data/mockAssets';
import {
  getCurrentSession,
  onSupabaseAuthStateChange,
  apiDeductCredits,
  apiAddCredits,
  apiSaveHistoryItem,
  apiToggleFavoriteHistory,
  apiDeleteHistoryItem,
  apiRequest,
} from '../lib/supabase';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  activeRoute: string;
  setActiveRoute: (route: string) => void;
  activeMainTool: MainToolType;
  setActiveMainTool: (tool: MainToolType) => void;
  activeExtendedTool: ExtendedToolType | null;
  setActiveExtendedTool: (tool: ExtendedToolType | null) => void;
  user: UserProfileData;
  setUser: React.Dispatch<React.SetStateAction<UserProfileData>>;
  deductCredits: (amount: number) => boolean;
  addCredits: (amount: number) => void;
  historyList: HistoryItem[];
  addHistoryItem: (item: HistoryItem) => void;
  toggleFavorite: (id: string) => void;
  deleteHistoryItem: (id: string) => void;
  notifications: NotificationItem[];
  markNotificationsRead: () => void;
  selectedPaymentPlan: string | null;
  setSelectedPaymentPlan: (plan: string | null) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_HISTORY: HistoryItem[] = [
  {
    id: 'hist-1',
    tool: 'Render',
    prompt: 'Villa hiện đại bên hồ nước, kết cấu cantilever bê tông xám & đèn hắt ấm áp, hoàng hôn',
    resultImage: ARCH_ASSETS.heroVilla,
    createdAt: '2026-10-04 07:45',
    isFavorite: true,
    aspectRatio: '16:9',
    style: 'Modern Minimalist',
    cost: 30,
  },
  {
    id: 'hist-2',
    tool: 'Render',
    prompt: 'Phòng khách Japandi mộc mạc, vách nan gỗ sồi, sofa nỉ cong boucle trắng, ánh sáng ban mai',
    resultImage: ARCH_ASSETS.heroInterior,
    createdAt: '2026-10-03 16:20',
    isFavorite: true,
    aspectRatio: '16:9',
    style: 'Japandi',
    cost: 30,
  },
  {
    id: 'hist-3',
    tool: 'FloorPlan',
    prompt: 'Mặt bằng căn hộ 148m² 3 phòng ngủ master, phối cảnh isometric 3D có nội thất gỗ óc chó',
    resultImage: ARCH_ASSETS.floorPlan3D,
    createdAt: '2026-10-02 11:15',
    isFavorite: false,
    aspectRatio: '4:3',
    style: 'Contemporary 3D',
    cost: 40,
  },
  {
    id: 'hist-4',
    tool: 'Renovation',
    prompt: 'Cải tạo mặt tiền nhà phố 4 tầng xuống cấp thành phong cách hiện đại với lam chắn nắng và kính tràn',
    resultImage: ARCH_ASSETS.renovationAfter,
    originalImage: ARCH_ASSETS.renovationBefore,
    createdAt: '2026-10-01 14:30',
    isFavorite: true,
    aspectRatio: '4:3',
    style: 'Modern Renovation',
    cost: 50,
  },
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Nâng cấp Gemini 3.0 Pro',
    message: 'Hệ thống đã cập nhật model Gemini 3.0 Pro cho tốc độ render nhanh hơn 40%.',
    time: '10 phút trước',
    isRead: false,
  },
  {
    id: 'notif-2',
    title: 'Chào mừng bạn đến với OPZEN AI!',
    message: 'Tài khoản của bạn đã được kích hoạt gói Free với 60 Credits khởi tạo.',
    time: 'Hôm qua',
    isRead: true,
  },
];

export const GUEST_USER: UserProfileData = {
  id: '',
  name: 'Khách',
  email: '',
  phone: '',
  credits: 0,
  plan: 'Free',
  expiryDate: '',
  isLoggedIn: false,
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('vi');
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('achipics_theme');
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });
  const KNOWN_ROUTES = new Set([
    '/',
    '/image',
    '/auth',
    '/pricing',
    '/payment',
    '/contacts',
    '/terms-of-service',
    '/term-of-service',
    '/privacy-policy',
    '/history',
    '/profile',
  ]);

  const normalizeRoute = (path: string): string => {
    const clean = path.length > 1 ? path.replace(/\/+$/, '') : path;
    if (clean === '/term-of-service') return '/terms-of-service';
    return KNOWN_ROUTES.has(clean) ? clean : '/';
  };

  const [activeRoute, setActiveRouteState] = useState<string>(() => {
    try {
      return normalizeRoute(window.location.pathname);
    } catch {
      return '/';
    }
  });

  const setActiveRoute = (route: string) => {
    const target = normalizeRoute(route);
    setActiveRouteState(target);
    try {
      if (window.location.pathname !== target) {
        window.history.pushState({}, '', target);
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
    } catch {
      // Ignore history errors
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setActiveRouteState(normalizeRoute(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [activeMainTool, setActiveMainTool] = useState<MainToolType>('render');
  const [activeExtendedTool, setActiveExtendedTool] = useState<ExtendedToolType | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState<string | null>('pro');

  // Khởi tạo trạng thái mặc định là Khách (Chưa đăng nhập) - Chỉ đăng nhập khi có session Supabase thực sự
  const [user, setUser] = useState<UserProfileData>(GUEST_USER);

  const [historyList, setHistoryList] = useState<HistoryItem[]>(INITIAL_HISTORY);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Sync Supabase Auth session on mount and listen to changes
  useEffect(() => {
    let isMounted = true;

    getCurrentSession().then(async (session) => {
      if (!isMounted) return;

      if (session?.user) {
        let syncedCredits = 60;
        let syncedPlan: UserProfileData['plan'] = 'Free';
        let syncedExpiry = 'Không giới hạn';
        let syncedPhone = session.user.user_metadata?.phone || '';
        let syncedName =
          session.user.user_metadata?.full_name ||
          session.user.email?.split('@')[0] ||
          'KTS ArchiPics';

        try {
          const meRes = await apiRequest<{ ok: boolean; profile?: any }>('/api/auth/me');
          if (meRes?.profile) {
            syncedCredits = meRes.profile.credits ?? 60;
            syncedPlan = (meRes.profile.plan as UserProfileData['plan']) || 'Free';
            syncedExpiry = meRes.profile.expiry_date || 'Không giới hạn';
            syncedPhone = meRes.profile.phone || syncedPhone;
            syncedName = meRes.profile.name || syncedName;
          }
        } catch {
          // Fallback to default values
        }

        setUser({
          id: session.user.id,
          name: syncedName,
          email: session.user.email || '',
          phone: syncedPhone,
          avatarUrl: session.user.user_metadata?.avatar_url,
          credits: syncedCredits,
          plan: syncedPlan,
          expiryDate: syncedExpiry,
          isLoggedIn: true,
          provider: session.user.app_metadata?.provider || 'supabase',
        });
      } else {
        // Không có session hợp lệ -> đảm bảo luôn là Khách chưa đăng nhập
        setUser(GUEST_USER);
      }
    });

    const unsubscribe = onSupabaseAuthStateChange((session, authUser) => {
      if (!isMounted) return;
      if (session && authUser) {
        setUser({
          id: authUser.id,
          name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'KTS ArchiPics',
          email: authUser.email || '',
          phone: authUser.user_metadata?.phone || '',
          avatarUrl: authUser.user_metadata?.avatar_url,
          credits: 60,
          plan: 'Free',
          expiryDate: 'Không giới hạn',
          isLoggedIn: true,
          provider: authUser.app_metadata?.provider || 'supabase',
        });
      } else {
        setUser(GUEST_USER);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // Sync HTML title & body classes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.className = 'bg-[#0E1726] text-[#F1ECE2] selection:bg-[#D9C9A3] selection:text-[#0E1726] antialiased';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.body.className = 'bg-[#F8F5EE] text-[#121D30] selection:bg-[#D9C9A3] selection:text-[#0E1726] antialiased';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('achipics_theme', next);
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.vi[key] || key;
  };

  const deductCredits = (amount: number): boolean => {
    if (!user.isLoggedIn) {
      setActiveRoute('/auth');
      return false;
    }
    if (user.credits >= amount) {
      setUser((prev) => ({ ...prev, credits: prev.credits - amount }));
      apiDeductCredits(user.id, amount, `Sử dụng công cụ AI (${activeMainTool})`).catch(() => {});
      return true;
    }
    return false;
  };

  const addCredits = (amount: number) => {
    setUser((prev) => ({ ...prev, credits: prev.credits + amount }));
    apiAddCredits(user.id, amount, `Nạp thêm +${amount} Credits`).catch(() => {});
  };

  const addHistoryItem = (item: HistoryItem) => {
    setHistoryList((prev) => [item, ...prev]);
    apiSaveHistoryItem({ ...item, userId: user.id }).catch(() => {});
  };

  const toggleFavorite = (id: string) => {
    let nextState = true;
    setHistoryList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          nextState = !item.isFavorite;
          return { ...item, isFavorite: nextState };
        }
        return item;
      })
    );
    apiToggleFavoriteHistory(id, nextState).catch(() => {});
  };

  const deleteHistoryItem = (id: string) => {
    setHistoryList((prev) => prev.filter((item) => item.id !== id));
    apiDeleteHistoryItem(id).catch(() => {});
  };

  const markNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        theme,
        toggleTheme,
        setTheme,
        activeRoute,
        setActiveRoute,
        activeMainTool,
        setActiveMainTool,
        activeExtendedTool,
        setActiveExtendedTool,
        user,
        setUser,
        deductCredits,
        addCredits,
        historyList,
        addHistoryItem,
        toggleFavorite,
        deleteHistoryItem,
        notifications,
        markNotificationsRead,
        selectedPaymentPlan,
        setSelectedPaymentPlan,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
