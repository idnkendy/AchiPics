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
    message: 'Tài khoản của bạn đã được kích hoạt gói Pro với 1,250 Credits.',
    time: 'Hôm qua',
    isRead: true,
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('vi');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [activeRoute, setActiveRoute] = useState<string>('/');
  const [activeMainTool, setActiveMainTool] = useState<MainToolType>('render');
  const [activeExtendedTool, setActiveExtendedTool] = useState<ExtendedToolType | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState<string | null>('pro');

  const [user, setUser] = useState<UserProfileData>({
    id: 'user-opzen-01',
    name: 'KTS An Bình',
    email: 'khavyauflowteam@gmail.com',
    credits: 1250,
    plan: 'Pro',
    expiryDate: '15/12/2026',
    isLoggedIn: true,
  });

  const [historyList, setHistoryList] = useState<HistoryItem[]>(INITIAL_HISTORY);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Sync HTML title & body classes
  useEffect(() => {
    // If route is '/', homepage is strictly Deep Navy
    if (activeRoute === '/') {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-[#0E1726] text-[#F1ECE2] selection:bg-[#D9C9A3] selection:text-[#0E1726] antialiased';
    } else {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.body.className = 'bg-[#0E1726] text-[#F1ECE2] selection:bg-[#D9C9A3] selection:text-[#0E1726] antialiased';
      } else {
        document.documentElement.classList.remove('dark');
        document.body.className = 'bg-[#F6F0E2] text-[#0E1726] selection:bg-[#D9C9A3] selection:text-[#0E1726] antialiased';
      }
    }
  }, [theme, activeRoute]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.vi[key] || key;
  };

  const deductCredits = (amount: number): boolean => {
    if (user.credits >= amount) {
      setUser((prev) => ({ ...prev, credits: prev.credits - amount }));
      return true;
    }
    return false;
  };

  const addCredits = (amount: number) => {
    setUser((prev) => ({ ...prev, credits: prev.credits + amount }));
  };

  const addHistoryItem = (item: HistoryItem) => {
    setHistoryList((prev) => [item, ...prev]);
  };

  const toggleFavorite = (id: string) => {
    setHistoryList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isFavorite: !item.isFavorite } : item))
    );
  };

  const deleteHistoryItem = (id: string) => {
    setHistoryList((prev) => prev.filter((item) => item.id !== id));
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
