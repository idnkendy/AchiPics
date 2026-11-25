import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { MainToolType } from '../../types';

export const NavigationBar: React.FC = () => {
  const {
    t,
    activeRoute,
    setActiveRoute,
    activeMainTool,
    setActiveMainTool,
    activeExtendedTool,
    setActiveExtendedTool,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  } = useApp();

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const [isExtendedDropdownOpen, setIsExtendedDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollYRef.current && currentScrollY - lastScrollYRef.current > 8) {
          setIsVisible(false);
        } else if (lastScrollYRef.current - currentScrollY > 8) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsExtendedDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const mainTools: { id: MainToolType; label: string; icon: string }[] = [
    { id: 'render', label: t('navRender'), icon: 'auto_awesome' },
    { id: 'floorplan', label: t('navFloorPlan'), icon: 'layers' },
    { id: 'renovation', label: t('navRenovation'), icon: 'autorenew' },
    { id: 'viewsync', label: t('navViewSync'), icon: 'visibility' },
    { id: 'editor', label: t('navEditor'), icon: 'edit' },
  ];

  const extendedMenuItems = [
    { id: 'rerender' as const, label: 'ReRender Phối Cảnh', icon: 'refresh' },
    { id: 'text-to-image' as const, label: 'Text to Image (Prompt)', icon: 'text_fields' },
    { id: 'image-to-image' as const, label: 'Image to Image Render', icon: 'layers' },
    { id: 'upscale' as const, label: 'Upscale 4K Siêu Nét', icon: 'zoom_in' },
    { id: 'relighting' as const, label: 'Thay Đổi Ánh Sáng', icon: 'wb_sunny' },
    { id: 'inpaint' as const, label: 'Inpainting Thay Đổi Vật Thể', icon: 'brush' },
  ];

  const handleToolSelect = (toolId: MainToolType) => {
    setActiveMainTool(toolId);
    setActiveExtendedTool(null);
    if (activeRoute !== '/image') {
      setActiveRoute('/image');
    }
    setIsExtendedDropdownOpen(false);
  };

  return (
    <>
      <div
        className={`fixed top-[64px] left-0 right-0 z-30 h-[52px] transition-transform duration-300 pointer-events-none ${
          isVisible ? 'translate-y-0' : '-translate-y-[120%]'
        }`}
      >
        <div className="max-w-[1920px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          {/* Left: Circular Home Button */}
          <button
            onClick={() => setActiveRoute('/')}
            className="pointer-events-auto w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all cursor-pointer shadow-sm bg-[#FFFFFF]/90 dark:bg-[#121D30]/90 hover:bg-[#F0EAE0] dark:hover:bg-[#1C2944] border-[#E2D9C8] dark:border-[#24304A] text-[#57657E] dark:text-[#9AA3B5] hover:text-[#121D30] dark:hover:text-[#F1ECE2]"
            title="Về Trang Chủ"
            aria-label="Home"
          >
            <span className="material-symbols-outlined text-[19px]">home</span>
          </button>

          {/* Center: Floating Pill Navigation Container */}
          <div className="pointer-events-auto hidden sm:flex items-center gap-0.5 p-1 rounded-full backdrop-blur-md border shadow-md bg-[#FFFFFF]/90 dark:bg-[#121D30]/90 border-[#E2D9C8] dark:border-[#24304A]">
            {mainTools.map((tool, idx) => {
              const isActive = activeMainTool === tool.id && !activeExtendedTool && activeRoute === '/image';
              return (
                <React.Fragment key={tool.id}>
                  {idx > 0 && (
                    <span className="w-px h-3.5 my-auto mx-0.5 bg-[#E2D9C8] dark:bg-[#24304A]" />
                  )}
                  <button
                    onClick={() => handleToolSelect(tool.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#D9C9A3] to-[#EDE2C8] text-[#0E1726] font-bold shadow-xs'
                        : 'text-[#57657E] dark:text-[#9AA3B5] hover:text-[#121D30] dark:hover:text-[#F1ECE2] hover:bg-[#F0EAE0] dark:hover:bg-[#1C2944] font-medium'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">{tool.icon}</span>
                    <span className="hidden md:inline">{tool.label}</span>
                  </button>
                </React.Fragment>
              );
            })}

            <span className="w-px h-3.5 my-auto mx-0.5 bg-[#E2D9C8] dark:bg-[#24304A]" />

            {/* Extended Tools Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsExtendedDropdownOpen(!isExtendedDropdownOpen)}
                className={`flex items-center gap-1 px-3.5 py-1.5 text-xs rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeExtendedTool
                    ? 'bg-gradient-to-r from-[#D9C9A3] to-[#EDE2C8] text-[#0E1726] font-bold shadow-xs'
                    : 'text-[#57657E] dark:text-[#9AA3B5] hover:text-[#121D30] dark:hover:text-[#F1ECE2] hover:bg-[#F0EAE0] dark:hover:bg-[#1C2944] font-medium'
                }`}
              >
                <span>{t('navExtended')}</span>
                <span
                  className={`material-symbols-outlined text-[16px] transition-transform ${
                    isExtendedDropdownOpen ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>

              {isExtendedDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 border rounded-2xl shadow-2xl p-2 z-50 bg-[#FFFFFF] dark:bg-[#121D30] border-[#E2D9C8] dark:border-[#24304A] text-[#121D30] dark:text-[#F1ECE2]">
                  <div className="px-3 py-1.5 border-b border-[#E2D9C8] dark:border-[#24304A] mb-1">
                    <p className="text-[11px] font-bold text-[#8E733D] dark:text-[#DDCDA8]">
                      Công cụ mở rộng AI
                    </p>
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-0.5">
                    {extendedMenuItems.map((ext) => (
                      <button
                        key={ext.id}
                        onClick={() => {
                          setActiveRoute('/image');
                          setActiveExtendedTool(ext.id);
                          setIsExtendedDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left rounded-xl hover:bg-[#F0EAE0] dark:hover:bg-[#1C2944] transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px] text-[#8E733D] dark:text-[#DDCDA8]">
                          {ext.icon}
                        </span>
                        <span>{ext.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Pill History */}
          <button
            onClick={() => setActiveRoute('/history')}
            className={`pointer-events-auto flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-full backdrop-blur-md border transition-all cursor-pointer shadow-sm whitespace-nowrap shrink-0 ${
              activeRoute === '/history'
                ? 'bg-gradient-to-r from-[#D9C9A3] to-[#EDE2C8] text-[#0E1726] font-bold border-[#D9C9A3]'
                : 'bg-[#FFFFFF]/90 dark:bg-[#121D30]/90 hover:bg-[#F0EAE0] dark:hover:bg-[#1C2944] border-[#E2D9C8] dark:border-[#24304A] text-[#57657E] dark:text-[#9AA3B5] hover:text-[#121D30] dark:hover:text-[#F1ECE2] font-medium'
            }`}
            title="Lịch Sử Tạo Ảnh"
          >
            <span className="material-symbols-outlined text-[16px]">history</span>
            <span className="hidden sm:inline">{t('navHistory')}</span>
          </button>
        </div>
      </div>

      {/* Mobile Tools Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex flex-col justify-end">
          <div className="bg-[#FFFFFF] dark:bg-[#121D30] border-t border-[#E2D9C8] dark:border-[#24304A] rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto space-y-6 text-[#121D30] dark:text-[#F1ECE2]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2D9C8] dark:border-[#24304A]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#D9C9A3] to-[#EDE2C8] flex items-center justify-center text-[#0E1726] font-bold text-xs">
                  A
                </div>
                <h3 className="text-base font-bold">Công Cụ AchiPics</h3>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-full text-[#57657E] dark:text-[#9AA3B5] hover:bg-[#F0EAE0] dark:hover:bg-[#1C2944]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-1">
              <p className="text-[11px] font-bold text-[#8E733D] dark:text-[#DDCDA8] px-2 mb-2">
                Công cụ chính
              </p>
              {mainTools.map((tool) => {
                const isActive = activeMainTool === tool.id && !activeExtendedTool && activeRoute === '/image';
                return (
                  <button
                    key={tool.id}
                    onClick={() => {
                      handleToolSelect(tool.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#D9C9A3] to-[#EDE2C8] text-[#0E1726] font-bold shadow-sm'
                        : 'text-[#57657E] dark:text-[#9AA3B5] hover:bg-[#F0EAE0] dark:hover:bg-[#16213A]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[18px]">{tool.icon}</span>
                      <span>{tool.label}</span>
                    </div>
                    {isActive && (
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#E2D9C8] dark:border-[#24304A] space-y-2">
              <button
                onClick={() => {
                  setActiveRoute('/history');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#F0EAE0] dark:bg-[#16213A] text-sm font-medium"
              >
                <span className="material-symbols-outlined text-[18px] text-[#8E733D] dark:text-[#DDCDA8]">
                  history
                </span>
                <span>{t('navHistory')}</span>
              </button>
              <button
                onClick={() => {
                  setActiveRoute('/pricing');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#F0EAE0] dark:bg-[#16213A] text-sm font-medium"
              >
                <span className="material-symbols-outlined text-[18px] text-[#8E733D] dark:text-[#DDCDA8]">
                  payments
                </span>
                <span>{t('navPricing')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
