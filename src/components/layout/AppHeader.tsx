import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../i18n/translations';
import {
  Coins,
  Bell,
  ChevronDown,
  User,
  LogOut,
  Image as ImageIcon,
  Menu,
  Check,
} from 'lucide-react';

export const AppHeader: React.FC = () => {
  const {
    t,
    language,
    setLanguage,
    setActiveRoute,
    user,
    setUser,
    notifications,
    markNotificationsRead,
    setIsMobileMenuOpen,
  } = useApp();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const currentLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleLogout = () => {
    setUser((prev) => ({ ...prev, isLoggedIn: false }));
    setIsAvatarOpen(false);
    setActiveRoute('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-[64px] bg-[#0E1726]/95 backdrop-blur-xl border-b border-[#24304A] px-4 sm:px-6 flex items-center justify-between transition-colors">
      {/* Left: Mobile Toggle & Brand Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-1.5 text-[#9AA3B5] hover:text-[#F1ECE2] rounded-lg md:hidden cursor-pointer"
          aria-label="Open Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div
          onClick={() => setActiveRoute('/')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-[#D9C9A3] flex items-center justify-center text-[#0E1726] font-extrabold text-[15px] tracking-tight group-hover:scale-105 transition-transform">
            A
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[17px] font-bold text-[#F1ECE2] group-hover:text-[#D9C9A3] transition-colors">
              AchiPics
            </span>
            <span className="hidden sm:inline-block text-[10px] font-semibold text-[#DDCDA8] bg-[#121D30] px-2 py-0.5 rounded-full border border-[#24304A]">
              Tạo ảnh
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Credits Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#121D30] border border-[#24304A]">
          <Coins className="w-3.5 h-3.5 text-[#D9C9A3]" />
          <span className="text-xs font-bold text-[#F1ECE2] tabular-nums">
            {user.credits.toLocaleString()}
          </span>
          <button
            onClick={() => setActiveRoute('/payment')}
            className="px-2 py-0.5 text-[10px] font-bold text-[#0E1726] bg-[#D9C9A3] hover:bg-[#EDE2C8] rounded-full transition-colors cursor-pointer"
          >
            {t('btnTopUp')}
          </button>
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              if (!isNotifOpen) markNotificationsRead();
            }}
            className="relative p-2 text-[#9AA3B5] hover:text-[#F1ECE2] rounded-full hover:bg-[#16213A] transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D9C9A3] animate-pulse" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-[#121D30] border border-[#24304A] rounded-2xl shadow-2xl py-3 z-50">
              <div className="px-4 py-2 border-b border-[#24304A] flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#DDCDA8]">
                  {t('tabNotifications')}
                </span>
                <span className="text-[10px] text-[#646E84]">
                  {notifications.length} thông báo
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-[#24304A]/60">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 text-xs transition-colors hover:bg-[#16213A] ${
                      !notif.isRead ? 'bg-[#16213A]/50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-[#F1ECE2]">{notif.title}</p>
                      <span className="text-[10px] text-[#646E84] shrink-0">
                        {notif.time}
                      </span>
                    </div>
                    <p className="text-[#9AA3B5] text-[11px] mt-1 leading-snug">
                      {notif.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Language Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#121D30] border border-[#24304A] text-xs text-[#9AA3B5] hover:text-[#F1ECE2] hover:border-[#D9C9A3]/40 transition-colors cursor-pointer"
            aria-label="Language Selector"
          >
            <span>{currentLangObj.flag}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#9AA3B5]" />
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-[#121D30] border border-[#24304A] rounded-xl shadow-2xl py-2 z-50">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsLangOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-[#1C2944] transition-colors cursor-pointer ${
                    language === lang.code
                      ? 'text-[#D9C9A3] font-bold bg-[#16213A]'
                      : 'text-[#9AA3B5]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                  {language === lang.code && <Check className="w-3.5 h-3.5 text-[#D9C9A3]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="relative">
          <button
            onClick={() => setIsAvatarOpen(!isAvatarOpen)}
            className="w-8 h-8 rounded-lg bg-[#D9C9A3] flex items-center justify-center text-[#0E1726] font-bold text-xs shadow-md hover:ring-2 hover:ring-[#EDE2C8] transition-all cursor-pointer"
            aria-label="User Profile"
          >
            {user.name.charAt(0)}
          </button>

          {isAvatarOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-[#121D30] border border-[#24304A] rounded-2xl shadow-2xl py-3 z-50">
              <div className="px-4 py-2 border-b border-[#24304A]">
                <p className="text-sm font-bold text-[#F1ECE2]">{user.name}</p>
                <p className="text-xs text-[#9AA3B5] truncate">{user.email}</p>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-[#9AA3B5]">{t('creditsText')}:</span>
                  <span className="font-bold text-[#D9C9A3] tabular-nums">
                    {user.credits.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-[#9AA3B5]">Gói hiện tại:</span>
                  <span className="font-bold text-[#DDCDA8]">{user.plan}</span>
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setActiveRoute('/profile');
                    setIsAvatarOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-[#9AA3B5] hover:bg-[#1C2944] hover:text-[#F1ECE2] cursor-pointer"
                >
                  <User className="w-4 h-4 text-[#9AA3B5]" />
                  <span>{t('tabProfile')}</span>
                </button>
                <button
                  onClick={() => {
                    setActiveRoute('/history');
                    setIsAvatarOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-[#9AA3B5] hover:bg-[#1C2944] hover:text-[#F1ECE2] cursor-pointer"
                >
                  <ImageIcon className="w-4 h-4 text-[#9AA3B5]" />
                  <span>{t('navHistory')}</span>
                </button>
              </div>

              <div className="pt-1 border-t border-[#24304A]">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-400 hover:bg-rose-950/30 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t('logout')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
