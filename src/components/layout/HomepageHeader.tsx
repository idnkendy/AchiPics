import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../i18n/translations';
import {
  ChevronDown,
  Coins,
  User,
  LogOut,
  Image as ImageIcon,
  Menu,
  X,
  CreditCard,
} from 'lucide-react';

export const HomepageHeader: React.FC = () => {
  const {
    t,
    language,
    setLanguage,
    setActiveRoute,
    user,
    setUser,
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const handleLogout = () => {
    setUser((prev) => ({ ...prev, isLoggedIn: false }));
    setIsAvatarOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[64px] transition-all duration-300 flex items-center px-6 ${
        isScrolled
          ? 'bg-[#0E1726]/90 backdrop-blur-xl border-b border-[#24304A] shadow-xl'
          : 'bg-transparent'
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
          <div className="w-8 h-8 rounded-lg bg-[#D9C9A3] flex items-center justify-center text-[#0E1726] font-extrabold text-[15px] tracking-tight group-hover:scale-105 transition-transform">
            A
          </div>
          <span className="text-[18px] font-bold text-[#F1ECE2] tracking-tight group-hover:text-[#D9C9A3] transition-colors">
            AchiPics
          </span>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => setActiveRoute('/image')}
            className="text-[14px] font-semibold text-[#DDCDA8] hover:text-[#F1ECE2] tracking-[0.2px] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Tạo ảnh</span>
          </button>
          <button
            onClick={() => setActiveRoute('/pricing')}
            className="text-[13px] font-medium text-[#9AA3B5] hover:text-[#F1ECE2] tracking-[0.2px] transition-colors cursor-pointer"
          >
            {t('navPricing')}
          </button>
          <a
            href="#contact"
            className="text-[13px] font-medium text-[#9AA3B5] hover:text-[#F1ECE2] tracking-[0.2px] transition-colors"
          >
            Liên hệ
          </a>
        </nav>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121D30] border border-[#24304A] text-xs text-[#9AA3B5] hover:text-[#F1ECE2] hover:border-[#D9C9A3]/40 transition-colors cursor-pointer"
            >
              <span>{currentLangObj.flag}</span>
              <span className="font-medium">{currentLangObj.name}</span>
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
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left hover:bg-[#1C2944] transition-colors cursor-pointer ${
                      language === lang.code ? 'text-[#D9C9A3] font-bold bg-[#16213A]' : 'text-[#9AA3B5]'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Logged in / Guest */}
          {user.isLoggedIn ? (
            <div className="flex items-center gap-3">
              {/* Credits badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121D30] border border-[#24304A]">
                <Coins className="w-4 h-4 text-[#D9C9A3]" />
                <span className="text-xs font-bold text-[#F1ECE2] tabular-nums">
                  {user.credits.toLocaleString()}
                </span>
                <button
                  onClick={() => setActiveRoute('/payment')}
                  className="px-2 py-0.5 text-[11px] font-bold text-[#0E1726] bg-[#D9C9A3] hover:bg-[#E4D5B2] rounded-full transition-colors cursor-pointer"
                >
                  {t('btnTopUp')}
                </button>
              </div>

              {/* Avatar Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsAvatarOpen(!isAvatarOpen)}
                  className="w-8 h-8 rounded-lg bg-[#D9C9A3] flex items-center justify-center text-[#0E1726] font-bold text-sm shadow-md hover:ring-2 hover:ring-[#E4D5B2] transition-all cursor-pointer"
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
                        <span className="font-bold text-[#D9C9A3] tabular-nums">{user.credits.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs mt-1">
                        <span className="text-[#9AA3B5]">Gói:</span>
                        <span className="font-bold text-[#DDCDA8]">{user.plan}</span>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setActiveRoute('/profile');
                          setIsAvatarOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-[#9AA3B5] hover:bg-[#1C2944] hover:text-[#F1ECE2]"
                      >
                        <User className="w-4 h-4 text-[#9AA3B5]" />
                        <span>{t('tabProfile')}</span>
                      </button>
                      <button
                        onClick={() => {
                          setActiveRoute('/history');
                          setIsAvatarOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-[#9AA3B5] hover:bg-[#1C2944] hover:text-[#F1ECE2]"
                      >
                        <ImageIcon className="w-4 h-4 text-[#9AA3B5]" />
                        <span>{t('navHistory')}</span>
                      </button>
                      <button
                        onClick={() => {
                          setActiveRoute('/pricing');
                          setIsAvatarOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-[#9AA3B5] hover:bg-[#1C2944] hover:text-[#F1ECE2]"
                      >
                        <CreditCard className="w-4 h-4 text-[#9AA3B5]" />
                        <span>{t('navPricing')}</span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-[#24304A]">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-400 hover:bg-rose-950/30"
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
              <button
                onClick={() => setActiveRoute('/auth')}
                className="text-[13px] font-medium text-[#9AA3B5] hover:text-[#F1ECE2] px-3.5 py-2 rounded-full hover:bg-[#1C2944] transition-all cursor-pointer"
              >
                Đăng nhập
              </button>
              <button
                onClick={() => setActiveRoute('/image')}
                className="px-5 py-2 text-[13px] font-semibold text-[#0E1726] bg-[#F1ECE2] hover:bg-[#EDE2C8] rounded-full shadow-md transition-all cursor-pointer hover:opacity-90"
              >
                Bắt đầu
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setIsMobileMenu(!isMobileMenu)}
            className="p-2 text-[#F1ECE2] hover:text-white bg-[#121D30] border border-[#24304A] rounded-lg cursor-pointer"
            aria-label="Toggle navigation"
          >
            {isMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenu && (
        <div className="md:hidden fixed inset-0 top-[64px] bg-[#0E1726] z-50 p-6 flex flex-col justify-between overflow-y-auto">
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
              className="text-left text-base font-semibold text-[#F1ECE2] p-3.5 rounded-xl bg-[#16213A] hover:bg-[#1C2944] border border-[#24304A] flex items-center gap-3 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#DDCDA8]">payments</span>
              <span>{t('navPricing')}</span>
            </button>

            {/* Slot 3: Liên hệ */}
            <a
              href="#contact"
              onClick={() => setIsMobileMenu(false)}
              className="text-base font-semibold text-[#F1ECE2] p-3.5 rounded-xl bg-[#16213A] hover:bg-[#1C2944] border border-[#24304A] flex items-center gap-3 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#DDCDA8]">mail</span>
              <span>Liên hệ</span>
            </a>
          </div>

          <div className="pt-6 border-t border-[#24304A] flex flex-col gap-3">
            {user.isLoggedIn ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#16213A] border border-[#24304A]">
                  <div>
                    <p className="text-sm font-bold text-[#F1ECE2]">{user.name}</p>
                    <p className="text-xs text-[#D9C9A3] font-semibold">{user.credits.toLocaleString()} Credits</p>
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
                  className="w-full py-3 text-sm font-semibold text-rose-400 border border-rose-900/50 rounded-xl"
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
                  className="w-full py-3.5 text-center text-sm font-semibold text-[#F1ECE2] bg-[#16213A] border border-[#24304A] rounded-xl"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => {
                    setActiveRoute('/image');
                    setIsMobileMenu(false);
                  }}
                  className="w-full py-3.5 text-center text-sm font-bold text-[#0E1726] bg-[#F1ECE2] rounded-xl"
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
