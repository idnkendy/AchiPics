import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../i18n/translations';
import { signOutSupabase } from '../../lib/supabase';

export const AppHeader: React.FC = () => {
  const {
    t,
    language,
    setLanguage,
    setActiveRoute,
    user,
    setUser,
    theme,
    toggleTheme,
    setIsMobileMenuOpen,
    notifications,
    markNotificationsRead,
  } = useApp();

  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const avatarRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (avatarRef.current && !avatarRef.current.contains(target)) setIsAvatarOpen(false);
      if (notifRef.current && !notifRef.current.contains(target)) setIsNotifOpen(false);
      if (langRef.current && !langRef.current.contains(target)) setIsLangOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOutSupabase();
    setUser({
      id: '',
      name: 'Khách',
      email: '',
      phone: '',
      credits: 0,
      plan: 'Free',
      expiryDate: '',
      isLoggedIn: false,
    });
    setIsAvatarOpen(false);
    setActiveRoute('/');
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const activeLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-[64px] backdrop-blur-xl border-b px-4 sm:px-6 flex items-center justify-between transition-colors bg-[#FDFBF7]/95 dark:bg-[#0E1726]/95 border-[#E2D9C8] dark:border-[#24304A] text-[#121D30] dark:text-[#F1ECE2]">
      {/* Left: Mobile Toggle + Square Brand Logo + App Name */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-1.5 rounded-lg md:hidden cursor-pointer transition-colors text-[#57657E] dark:text-[#9AA3B5] hover:text-[#121D30] dark:hover:text-[#F1ECE2] hover:bg-[#EFE8D8] dark:hover:bg-[#16213A]"
          aria-label="Open Navigation"
        >
          <span className="material-symbols-outlined text-[22px] block">menu</span>
        </button>

        <button
          onClick={() => setActiveRoute('/')}
          className="flex items-center gap-2.5 cursor-pointer group select-none whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D9C9A3] to-[#EDE2C8] flex items-center justify-center text-[#0E1726] font-extrabold text-[15px] tracking-tight group-hover:scale-105 transition-transform shadow-sm">
            A
          </div>
          <span className="text-[17px] font-bold tracking-tight text-[#121D30] dark:text-[#F1ECE2] group-hover:text-[#8E733D] dark:group-hover:text-[#D9C9A3] transition-colors">
            AchiPics
          </span>
        </button>
      </div>

      {/* Right Controls: Credit Pill, Notifications, Theme Toggle, Language Dropdown, Circular Avatar */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        {/* Credit Pill */}
        {user.isLoggedIn && (
          <div className="flex items-center gap-2 pl-2.5 pr-1 py-1 rounded-full border transition-colors bg-[#F0EAE0] dark:bg-[#121D30] border-[#E2D9C8] dark:border-[#24304A] text-[#121D30] dark:text-[#F1ECE2]">
            <span className="material-symbols-outlined text-[16px] text-amber-500 dark:text-[#D9C9A3]">
              monetization_on
            </span>
            <span className="text-xs font-bold tabular-nums">
              {user.credits.toLocaleString()}
            </span>
            <button
              onClick={() => setActiveRoute('/payment')}
              className="px-2.5 py-1 text-[11px] font-bold text-[#0E1726] bg-gradient-to-r from-[#D9C9A3] to-[#EDE2C8] hover:opacity-90 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
            >
              {t('btnTopUp')}
            </button>
          </div>
        )}

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              const next = !isNotifOpen;
              setIsNotifOpen(next);
              if (next && unreadCount > 0) markNotificationsRead();
            }}
            className="relative w-9 h-9 rounded-full border flex items-center justify-center transition-colors cursor-pointer bg-[#F0EAE0] dark:bg-[#121D30] hover:bg-[#E5DDCB] dark:hover:bg-[#1C2944] border-[#E2D9C8] dark:border-[#24304A] text-[#57657E] dark:text-[#9AA3B5] hover:text-[#121D30] dark:hover:text-[#F1ECE2]"
            aria-label="Thông báo"
            title="Thông báo"
          >
            <span className="material-symbols-outlined text-[19px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-[#FDFBF7] dark:ring-[#0E1726]" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 border rounded-2xl shadow-2xl overflow-hidden z-50 bg-[#FFFFFF] dark:bg-[#121D30] border-[#E2D9C8] dark:border-[#24304A] text-[#121D30] dark:text-[#F1ECE2]">
              <div className="px-4 py-3 border-b border-[#E2D9C8] dark:border-[#24304A] flex items-center justify-between">
                <span className="text-xs font-bold">{t('tabNotifications')}</span>
                <span className="text-[11px] text-[#57657E] dark:text-[#9AA3B5]">
                  {notifications.length} mục
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-[#ECE5D8] dark:divide-[#24304A]">
                {notifications.map((item) => (
                  <div key={item.id} className="p-3.5 hover:bg-[#FAF7F0] dark:hover:bg-[#16213A] transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold">{item.title}</p>
                      <span className="text-[10px] text-[#8792A6] dark:text-[#646E84] whitespace-nowrap shrink-0">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#57657E] dark:text-[#9AA3B5] mt-1 leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Light / Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          title={theme === 'light' ? 'Chuyển sang Dark mode' : 'Chuyển sang Light mode'}
          aria-label={theme === 'light' ? 'Chuyển sang Dark mode' : 'Chuyển sang Light mode'}
          className="w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer bg-[#F0EAE0] dark:bg-[#121D30] hover:bg-[#E5DDCB] dark:hover:bg-[#1C2944] border-[#E2D9C8] dark:border-[#24304A] text-[#8E733D] dark:text-[#D9C9A3]"
        >
          <span className="material-symbols-outlined text-[19px]">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </button>

        {/* Language Selector Dropdown */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="h-9 px-2.5 rounded-full border flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer bg-[#F0EAE0] dark:bg-[#121D30] hover:bg-[#E5DDCB] dark:hover:bg-[#1C2944] border-[#E2D9C8] dark:border-[#24304A] text-[#121D30] dark:text-[#F1ECE2]"
            aria-label="Chọn ngôn ngữ"
          >
            <span className="text-sm leading-none">{activeLang.flag}</span>
            <span className="hidden sm:inline">{activeLang.short}</span>
            <span className="material-symbols-outlined text-[16px] text-[#57657E] dark:text-[#9AA3B5]">
              expand_more
            </span>
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-40 border rounded-2xl shadow-2xl p-1.5 z-50 bg-[#FFFFFF] dark:bg-[#121D30] border-[#E2D9C8] dark:border-[#24304A] text-[#121D30] dark:text-[#F1ECE2]">
              {LANGUAGES.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#D9C9A3]/20 text-[#8E733D] dark:text-[#D9C9A3] font-bold'
                        : 'hover:bg-[#F0EAE0] dark:hover:bg-[#1C2944]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                    {isSelected && (
                      <span className="material-symbols-outlined text-[15px]">check</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Circular Avatar or Login CTA */}
        {user.isLoggedIn ? (
          <div className="relative" ref={avatarRef}>
            <button
              onClick={() => setIsAvatarOpen(!isAvatarOpen)}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D9C9A3] to-[#EDE2C8] text-[#0E1726] font-extrabold text-xs flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-pointer ring-2 ring-[#E2D9C8] dark:ring-[#24304A]"
              aria-label="Tài khoản cá nhân"
              aria-expanded={isAvatarOpen}
            >
              {user.name.charAt(0).toUpperCase() || 'U'}
            </button>

            {isAvatarOpen && (
              <div className="absolute right-0 mt-2 w-64 border rounded-2xl shadow-2xl py-3 z-50 bg-[#FFFFFF] dark:bg-[#121D30] border-[#E2D9C8] dark:border-[#24304A] text-[#121D30] dark:text-[#F1ECE2]">
                <div className="px-4 py-2 border-b border-[#E2D9C8] dark:border-[#24304A]">
                  <p className="text-sm font-bold">{user.name}</p>
                  <p className="text-xs truncate text-[#57657E] dark:text-[#9AA3B5]">
                    {user.email || 'Chưa liên kết email'}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-[#57657E] dark:text-[#9AA3B5]">{t('creditsText')}:</span>
                    <span className="font-bold text-[#8E733D] dark:text-[#D9C9A3] tabular-nums">
                      {user.credits.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-1">
                    <span className="text-[#57657E] dark:text-[#9AA3B5]">Gói hiện tại:</span>
                    <span className="font-bold text-[#8E733D] dark:text-[#DDCDA8]">{user.plan}</span>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setActiveRoute('/profile');
                      setIsAvatarOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs transition-colors cursor-pointer text-[#57657E] dark:text-[#9AA3B5] hover:bg-[#FAF7F0] dark:hover:bg-[#1C2944] hover:text-[#121D30] dark:hover:text-[#F1ECE2]"
                  >
                    <span className="material-symbols-outlined text-[17px] text-[#8E733D] dark:text-[#D9C9A3]">
                      person
                    </span>
                    <span>{t('tabProfile')}</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveRoute('/history');
                      setIsAvatarOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs transition-colors cursor-pointer text-[#57657E] dark:text-[#9AA3B5] hover:bg-[#FAF7F0] dark:hover:bg-[#1C2944] hover:text-[#121D30] dark:hover:text-[#F1ECE2]"
                  >
                    <span className="material-symbols-outlined text-[17px] text-[#8E733D] dark:text-[#D9C9A3]">
                      photo_library
                    </span>
                    <span>{t('navHistory')}</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-[#E2D9C8] dark:border-[#24304A]">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-500 hover:bg-rose-500/10 cursor-pointer transition-colors"
                  >
                    <span className="material-symbols-outlined text-[17px]">logout</span>
                    <span>{t('logout')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setActiveRoute('/auth')}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D9C9A3] to-[#EDE2C8] hover:opacity-90 text-[#0E1726] text-xs font-bold transition-all cursor-pointer shadow-sm whitespace-nowrap shrink-0"
          >
            {t('btnLogin')}
          </button>
        )}
      </div>
    </header>
  );
};
