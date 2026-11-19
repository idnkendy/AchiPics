import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Coins,
  User,
  LogOut,
  Image as ImageIcon,
  Menu,
  X,
  CreditCard,
  ChevronDown,
  Sun,
  Moon,
} from 'lucide-react';

import { signOutSupabase } from '../../lib/supabase';

export const HomepageHeader: React.FC = () => {
  const {
    t,
    setActiveRoute,
    user,
    setUser,
    theme,
    toggleTheme,
  } = useApp();

  const isLight = theme === 'light';

  const [isScrolled, setIsScrolled] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[64px] transition-all duration-300 flex items-center px-6 ${
        isScrolled
          ? isLight
            ? 'bg-[#FDFBF7]/95 backdrop-blur-xl border-b border-[#E2D9C8] shadow-sm text-[#121D30]'
            : 'bg-[#0E1726]/90 backdrop-blur-xl border-b border-[#24304A] shadow-xl text-[#F1ECE2]'
          : isLight
            ? 'bg-transparent text-[#121D30]'
            : 'bg-transparent text-[#F1ECE2]'
      }`}
    >
      <div className="max-w-[1200px] w-full mx-auto flex items-center justify-between">
        {/* Left: Brand Logo (AchiPics) */}
        <div
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveRoute('/');
          }}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-[#D9C9A3] flex items-center justify-center text-[#0E1726] font-extrabold text-[15px] tracking-tight group-hover:scale-105 transition-transform shadow-xs">
            A
          </div>
          <span
            className={`text-[18px] font-bold tracking-tight transition-colors ${
              isLight
                ? 'text-[#121D30] group-hover:text-[#8E733D]'
                : 'text-[#F1ECE2] group-hover:text-[#D9C9A3]'
            }`}
          >
            AchiPics
          </span>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => setActiveRoute('/image')}
            className={`text-[14px] font-semibold tracking-[0.2px] transition-colors cursor-pointer flex items-center gap-1.5 ${
              isLight
                ? 'text-[#8E733D] hover:text-[#121D30]'
                : 'text-[#DDCDA8] hover:text-[#F1ECE2]'
            }`}
          >
            <span>Tạo ảnh</span>
          </button>
          <button
            onClick={() => setActiveRoute('/pricing')}
            className={`text-[13px] font-medium tracking-[0.2px] transition-colors cursor-pointer ${
              isLight
                ? 'text-[#57657E] hover:text-[#121D30]'
                : 'text-[#9AA3B5] hover:text-[#F1ECE2]'
            }`}
          >
            {t('navPricing')}
          </button>
          <a
            href="#contact"
            className={`text-[13px] font-medium tracking-[0.2px] transition-colors ${
              isLight
                ? 'text-[#57657E] hover:text-[#121D30]'
                : 'text-[#9AA3B5] hover:text-[#F1ECE2]'
            }`}
          >
            Liên hệ
          </a>
        </nav>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* User Logged in / Guest */}
          {user.isLoggedIn ? (
            <div className="flex items-center gap-3">
              {/* Credits badge */}
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors ${
                  isLight
                    ? 'bg-[#F0EAE0] border-[#E2D9C8] text-[#121D30]'
                    : 'bg-[#121D30] border-[#24304A] text-[#F1ECE2]'
                }`}
              >
                <Coins className="w-4 h-4 text-[#D9C9A3]" />
                <span className="text-xs font-bold tabular-nums">
                  {user.credits.toLocaleString()}
                </span>
                <button
                  onClick={() => setActiveRoute('/payment')}
                  className="px-2 py-0.5 text-[11px] font-bold text-[#0E1726] bg-[#D9C9A3] hover:bg-[#E4D5B2] rounded-full transition-colors cursor-pointer"
                >
                  {t('btnTopUp')}
                </button>
              </div>

              {/* White / Dark Mode Toggle next to credits */}
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

              {/* Avatar Dropdown with Chevron */}
              <div className="relative">
                <button
                  onClick={() => setIsAvatarOpen(!isAvatarOpen)}
                  className={`flex items-center gap-1.5 p-1 pl-1.5 pr-2 rounded-xl border transition-all cursor-pointer shadow-xs ${
                    isLight
                      ? 'bg-[#F0EAE0] hover:bg-[#E5DDCB] border-[#E2D9C8] text-[#121D30]'
                      : 'bg-[#121D30] hover:bg-[#1C2944] border-[#24304A] text-[#F1ECE2]'
                  }`}
                  aria-label="Tài khoản cá nhân"
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

                {isAvatarOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-64 border rounded-2xl shadow-2xl py-3 z-50 ${
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
                          isLight ? 'text-[#57657E]' : 'text-[#9AA3B5]'
                        }`}
                      >
                        {user.email}
                      </p>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className={isLight ? 'text-[#57657E]' : 'text-[#9AA3B5]'}>
                          {t('creditsText')}:
                        </span>
                        <span
                          className={`font-bold tabular-nums ${
                            isLight ? 'text-[#8E733D]' : 'text-[#D9C9A3]'
                          }`}
                        >
                          {user.credits.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs mt-1">
                        <span className={isLight ? 'text-[#57657E]' : 'text-[#9AA3B5]'}>
                          Gói:
                        </span>
                        <span
                          className={`font-bold ${
                            isLight ? 'text-[#8E733D]' : 'text-[#DDCDA8]'
                          }`}
                        >
                          {user.plan}
                        </span>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setActiveRoute('/profile');
                          setIsAvatarOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-4 py-2 text-xs transition-colors cursor-pointer ${
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
                        className={`w-full flex items-center gap-2 px-4 py-2 text-xs transition-colors cursor-pointer ${
                          isLight
                            ? 'text-[#475569] hover:bg-[#F4EFE6] hover:text-[#121D30]'
                            : 'text-[#9AA3B5] hover:bg-[#1C2944] hover:text-[#F1ECE2]'
                        }`}
                      >
                        <ImageIcon className="w-4 h-4 text-[#D9C9A3]" />
                        <span>{t('navHistory')}</span>
                      </button>
                      <button
                        onClick={() => {
                          setActiveRoute('/pricing');
                          setIsAvatarOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-4 py-2 text-xs transition-colors cursor-pointer ${
                          isLight
                            ? 'text-[#475569] hover:bg-[#F4EFE6] hover:text-[#121D30]'
                            : 'text-[#9AA3B5] hover:bg-[#1C2944] hover:text-[#F1ECE2]'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-[#D9C9A3]" />
                        <span>{t('navPricing')}</span>
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
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* White / Dark Mode Toggle Button for Guests */}
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
                className={`text-[13px] font-medium px-3.5 py-2 rounded-full transition-all cursor-pointer ${
                  isLight
                    ? 'text-[#57657E] hover:text-[#121D30] hover:bg-[#EFE8D8]'
                    : 'text-[#9AA3B5] hover:text-[#F1ECE2] hover:bg-[#1C2944]'
                }`}
              >
                Đăng nhập
              </button>
              <button
                onClick={() => setActiveRoute('/image')}
                className={`px-5 py-2 text-[13px] font-semibold rounded-full shadow-md transition-all cursor-pointer hover:opacity-90 ${
                  isLight
                    ? 'text-[#F8F5EE] bg-[#121D30] hover:bg-[#1C2944]'
                    : 'text-[#0E1726] bg-[#F1ECE2] hover:bg-[#EDE2C8]'
                }`}
              >
                Bắt đầu
              </button>
            </div>
          )}
        </div>

        {/* Mobile Controls: Theme Toggle + Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            title={isLight ? 'Chuyển sang Dark mode (Giao diện tối)' : 'Chuyển sang White mode (Giao diện sáng)'}
            aria-label={isLight ? 'Chuyển sang Dark mode' : 'Chuyển sang White mode'}
            className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-center ${
              isLight
                ? 'bg-[#F0EAE0] hover:bg-[#E5DDCB] border-[#E2D9C8] text-[#475569]'
                : 'bg-[#121D30] hover:bg-[#1C2944] border-[#24304A] text-[#D9C9A3]'
            }`}
          >
            {isLight ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setIsMobileMenu(!isMobileMenu)}
            className={`p-2 border rounded-lg cursor-pointer transition-colors ${
              isLight
                ? 'text-[#121D30] hover:bg-[#EFE8D8] bg-[#F0EAE0] border-[#E2D9C8]'
                : 'text-[#F1ECE2] hover:text-white bg-[#121D30] border-[#24304A]'
            }`}
            aria-label="Toggle navigation"
          >
            {isMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenu && (
        <div
          className={`md:hidden fixed inset-0 top-[64px] z-50 p-6 flex flex-col justify-between overflow-y-auto ${
            isLight ? 'bg-[#F8F5EE] text-[#121D30]' : 'bg-[#0E1726] text-[#F1ECE2]'
          }`}
        >
          <div className="flex flex-col gap-3">
            {/* Slot 1: Tạo ảnh */}
            <button
              onClick={() => {
                setActiveRoute('/image');
                setIsMobileMenu(false);
              }}
              className="text-left text-base font-bold text-[#0E1726] p-3.5 rounded-xl bg-[#D9C9A3] hover:bg-[#E4D5B2] flex items-center gap-3 transition-colors shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#0E1726]">auto_awesome</span>
              <span>Tạo ảnh</span>
            </button>

            {/* Slot 2: Bảng giá */}
            <button
              onClick={() => {
                setActiveRoute('/pricing');
                setIsMobileMenu(false);
              }}
              className={`text-left text-base font-semibold p-3.5 rounded-xl border flex items-center gap-3 transition-colors cursor-pointer ${
                isLight
                  ? 'text-[#121D30] bg-[#FFFFFF] hover:bg-[#F0EAE0] border-[#E2D9C8]'
                  : 'text-[#F1ECE2] bg-[#16213A] hover:bg-[#1C2944] border-[#24304A]'
              }`}
            >
              <span
                className={`material-symbols-outlined ${
                  isLight ? 'text-[#8E733D]' : 'text-[#DDCDA8]'
                }`}
              >
                payments
              </span>
              <span>{t('navPricing')}</span>
            </button>

            {/* Slot 3: Liên hệ */}
            <a
              href="#contact"
              onClick={() => setIsMobileMenu(false)}
              className={`text-base font-semibold p-3.5 rounded-xl border flex items-center gap-3 transition-colors cursor-pointer ${
                isLight
                  ? 'text-[#121D30] bg-[#FFFFFF] hover:bg-[#F0EAE0] border-[#E2D9C8]'
                  : 'text-[#F1ECE2] bg-[#16213A] hover:bg-[#1C2944] border-[#24304A]'
              }`}
            >
              <span
                className={`material-symbols-outlined ${
                  isLight ? 'text-[#8E733D]' : 'text-[#DDCDA8]'
                }`}
              >
                mail
              </span>
              <span>Liên hệ</span>
            </a>
          </div>

          <div
            className={`pt-6 border-t flex flex-col gap-3 ${
              isLight ? 'border-[#E2D9C8]' : 'border-[#24304A]'
            }`}
          >
            {user.isLoggedIn ? (
              <div className="flex flex-col gap-2">
                <div
                  className={`flex items-center justify-between p-3.5 rounded-xl border ${
                    isLight
                      ? 'bg-[#FFFFFF] border-[#E2D9C8]'
                      : 'bg-[#16213A] border-[#24304A]'
                  }`}
                >
                  <div>
                    <p
                      className={`text-sm font-bold ${
                        isLight ? 'text-[#121D30]' : 'text-[#F1ECE2]'
                      }`}
                    >
                      {user.name}
                    </p>
                    <p
                      className={`text-xs font-semibold ${
                        isLight ? 'text-[#8E733D]' : 'text-[#D9C9A3]'
                      }`}
                    >
                      {user.credits.toLocaleString()} Credits
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveRoute('/payment');
                      setIsMobileMenu(false);
                    }}
                    className="px-3.5 py-1.5 text-xs font-bold text-[#0E1726] bg-[#D9C9A3] rounded-full"
                  >
                    {t('btnTopUp')}
                  </button>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 text-sm font-semibold text-rose-500 border border-rose-500/30 rounded-xl"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setActiveRoute('/auth');
                    setIsMobileMenu(false);
                  }}
                  className={`w-full py-3.5 text-center text-sm font-semibold border rounded-xl ${
                    isLight
                      ? 'text-[#121D30] bg-[#FFFFFF] border-[#E2D9C8]'
                      : 'text-[#F1ECE2] bg-[#16213A] border-[#24304A]'
                  }`}
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => {
                    setActiveRoute('/image');
                    setIsMobileMenu(false);
                  }}
                  className={`w-full py-3.5 text-center text-sm font-bold rounded-xl ${
                    isLight
                      ? 'text-[#F8F5EE] bg-[#121D30]'
                      : 'text-[#0E1726] bg-[#F1ECE2]'
                  }`}
                >
                  Bắt đầu miễn phí
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
