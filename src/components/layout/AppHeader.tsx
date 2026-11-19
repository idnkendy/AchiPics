import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Coins,
  User,
  LogOut,
  Image as ImageIcon,
  Menu,
  ChevronDown,
  Sun,
  Moon,
} from 'lucide-react';

import { signOutSupabase } from '../../lib/supabase';

export const AppHeader: React.FC = () => {
  const {
    t,
    setActiveRoute,
    user,
    setUser,
    theme,
    toggleTheme,
    setIsMobileMenuOpen,
  } = useApp();

  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

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

  const isLight = theme === 'light';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 h-[64px] backdrop-blur-xl border-b px-4 sm:px-6 flex items-center justify-between transition-colors ${
        isLight
          ? 'bg-[#FDFBF7]/95 border-[#E2D9C8] text-[#121D30]'
          : 'bg-[#0E1726]/95 border-[#24304A] text-[#F1ECE2]'
      }`}
    >
      {/* Left: Mobile Toggle & Brand Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className={`p-1.5 rounded-lg md:hidden cursor-pointer transition-colors ${
            isLight
              ? 'text-[#57657E] hover:text-[#121D30] hover:bg-[#EFE8D8]'
              : 'text-[#9AA3B5] hover:text-[#F1ECE2] hover:bg-[#16213A]'
          }`}
          aria-label="Open Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div
          onClick={() => setActiveRoute('/')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-[#D9C9A3] flex items-center justify-center text-[#0E1726] font-extrabold text-[15px] tracking-tight group-hover:scale-105 transition-transform shadow-xs">
            A
          </div>
          <span
            className={`text-[17px] font-bold tracking-tight transition-colors ${
              isLight
                ? 'text-[#121D30] group-hover:text-[#9C8C66]'
                : 'text-[#F1ECE2] group-hover:text-[#D9C9A3]'
            }`}
          >
            AchiPics
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {user.isLoggedIn ? (
          <>
            {/* Credits Badge */}
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-colors ${
                isLight
                  ? 'bg-[#F0EAE0] border-[#E2D9C8] text-[#121D30]'
                  : 'bg-[#121D30] border-[#24304A] text-[#F1ECE2]'
              }`}
            >
              <Coins className="w-3.5 h-3.5 text-[#D9C9A3]" />
              <span className="text-xs font-bold tabular-nums">
                {user.credits.toLocaleString()}
              </span>
              <button
                onClick={() => setActiveRoute('/payment')}
                className="px-2 py-0.5 text-[10px] font-bold text-[#0E1726] bg-[#D9C9A3] hover:bg-[#EDE2C8] rounded-full transition-colors cursor-pointer"
              >
                {t('btnTopUp')}
              </button>
            </div>

            {/* White / Dark Mode Toggle Button (Next to credits) */}
            <button
              onClick={toggleTheme}
              title={isLight ? 'Chuyển sang Dark mode (Giao diện tối)' : 'Chuyển sang White mode (Giao diện sáng)'}
              aria-label={isLight ? 'Chuyển sang Dark mode' : 'Chuyển sang White mode'}
              className={`p-2 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                isLight
                  ? 'bg-[#F0EAE0] hover:bg-[#E5DDCB] border-[#E2D9C8] text-[#B45309]'
                  : 'bg-[#121D30] hover:bg-[#1C2944] border-[#24304A] text-[#D9C9A3]'
              }`}
            >
              {isLight ? (
                <Moon className="w-4 h-4 text-[#475569] transition-transform hover:-rotate-12" />
              ) : (
                <Sun className="w-4 h-4 text-[#D9C9A3] transition-transform hover:rotate-45" />
              )}
            </button>

            {/* User Profile Trigger with Chevron Down */}
            <div className="relative">
              <button
                onClick={() => setIsAvatarOpen(!isAvatarOpen)}
                className={`flex items-center gap-1.5 p-1 pl-1.5 pr-2 rounded-xl border transition-all cursor-pointer shadow-xs ${
                  isLight
                    ? 'bg-[#F0EAE0] hover:bg-[#E5DDCB] border-[#E2D9C8] text-[#121D30]'
                    : 'bg-[#121D30] hover:bg-[#1C2944] border-[#24304A] text-[#F1ECE2]'
                }`}
                aria-label="Tài khoản cá nhân"
                aria-expanded={isAvatarOpen}
              >
                <div className="w-7 h-7 rounded-lg bg-[#D9C9A3] flex items-center justify-center text-[#0E1726] font-bold text-xs shadow-xs">
                  {user.name.charAt(0).toUpperCase() || 'U'}
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isLight ? 'text-[#64748B]' : 'text-[#9AA3B5]'
                  } ${isAvatarOpen ? 'rotate-180 text-[#D9C9A3]' : ''}`}
                />
              </button>

              {/* Profile Dropdown Menu */}
              {isAvatarOpen && (
                <div
                  className={`absolute right-0 mt-2 w-64 border rounded-2xl shadow-2xl py-3 z-50 transition-all ${
                    isLight
                      ? 'bg-[#FFFFFF] border-[#E2D9C8] text-[#121D30]'
                      : 'bg-[#121D30] border-[#24304A] text-[#F1ECE2]'
                  }`}
                >
                  <div
                    className={`px-4 py-2 border-b ${
                      isLight ? 'border-[#E2D9C8]' : 'border-[#24304A]'
                    }`}
                  >
                    <p className="text-sm font-bold">{user.name}</p>
                    <p
                      className={`text-xs truncate ${
                        isLight ? 'text-[#64748B]' : 'text-[#9AA3B5]'
                      }`}
                    >
                      {user.email || 'Chưa liên kết email'}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className={isLight ? 'text-[#64748B]' : 'text-[#9AA3B5]'}>
                        {t('creditsText')}:
                      </span>
                      <span className="font-bold text-[#D9C9A3] tabular-nums">
                        {user.credits.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className={isLight ? 'text-[#64748B]' : 'text-[#9AA3B5]'}>
                        Gói hiện tại:
                      </span>
                      <span className="font-bold text-[#DDCDA8]">{user.plan}</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setActiveRoute('/profile');
                        setIsAvatarOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-4 py-2 text-xs transition-colors cursor-pointer ${
                        isLight
                          ? 'text-[#475569] hover:bg-[#F4EFE6] hover:text-[#121D30]'
                          : 'text-[#9AA3B5] hover:bg-[#1C2944] hover:text-[#F1ECE2]'
                      }`}
                    >
                      <User className="w-4 h-4 text-[#D9C9A3]" />
                      <span>{t('tabProfile')}</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveRoute('/history');
                        setIsAvatarOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-4 py-2 text-xs transition-colors cursor-pointer ${
                        isLight
                          ? 'text-[#475569] hover:bg-[#F4EFE6] hover:text-[#121D30]'
                          : 'text-[#9AA3B5] hover:bg-[#1C2944] hover:text-[#F1ECE2]'
                      }`}
                    >
                      <ImageIcon className="w-4 h-4 text-[#D9C9A3]" />
                      <span>{t('navHistory')}</span>
                    </button>

                    {/* Quick Mode Toggle in Profile Menu */}
                    <button
                      onClick={() => {
                        toggleTheme();
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2 text-xs transition-colors cursor-pointer ${
                        isLight
                          ? 'text-[#475569] hover:bg-[#F4EFE6] hover:text-[#121D30]'
                          : 'text-[#9AA3B5] hover:bg-[#1C2944] hover:text-[#F1ECE2]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {isLight ? (
                          <Moon className="w-4 h-4 text-[#475569]" />
                        ) : (
                          <Sun className="w-4 h-4 text-[#D9C9A3]" />
                        )}
                        <span>Giao diện: {isLight ? 'White mode (Sáng)' : 'Dark mode (Tối)'}</span>
                      </div>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#D9C9A3]/20 text-[#D9C9A3]">
                        {isLight ? 'Bật Dark' : 'Bật White'}
                      </span>
                    </button>
                  </div>

                  <div
                    className={`pt-1 border-t ${
                      isLight ? 'border-[#E2D9C8]' : 'border-[#24304A]'
                    }`}
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-500 hover:bg-rose-500/10 cursor-pointer transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t('logout')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            {/* White / Dark Mode Toggle Button for Guests too */}
            <button
              onClick={toggleTheme}
              title={isLight ? 'Chuyển sang Dark mode (Giao diện tối)' : 'Chuyển sang White mode (Giao diện sáng)'}
              aria-label={isLight ? 'Chuyển sang Dark mode' : 'Chuyển sang White mode'}
              className={`p-2 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                isLight
                  ? 'bg-[#F0EAE0] hover:bg-[#E5DDCB] border-[#E2D9C8] text-[#B45309]'
                  : 'bg-[#121D30] hover:bg-[#1C2944] border-[#24304A] text-[#D9C9A3]'
              }`}
            >
              {isLight ? (
                <Moon className="w-4 h-4 text-[#475569]" />
              ) : (
                <Sun className="w-4 h-4 text-[#D9C9A3]" />
              )}
            </button>

            <button
              onClick={() => setActiveRoute('/auth')}
              className="px-4 py-1.5 rounded-full bg-[#D9C9A3] hover:bg-[#E4D5B2] text-[#0E1726] text-xs font-bold transition-all cursor-pointer shadow-md"
            >
              Đăng nhập
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
