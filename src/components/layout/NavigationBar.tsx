import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MainToolType, ExtendedToolType } from '../../types';
import {
  Home,
  Sparkles,
  Layers,
  RefreshCw,
  Eye,
  Edit3,
  ChevronDown,
  History,
  X,
  Wand2,
  Sliders,
  Type,
  Maximize2,
  FileText,
  Search,
  CheckCircle,
} from 'lucide-react';

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
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isExtendedDropdownOpen, setIsExtendedDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 8) {
          setIsVisible(false); // scroll down -> hide
        } else if (lastScrollY - currentScrollY > 8) {
          setIsVisible(true); // scroll up -> show
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const mainTools: { id: MainToolType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'render', label: t('navRender'), icon: Sparkles },
    { id: 'floorplan', label: t('navFloorPlan'), icon: Layers },
    { id: 'renovation', label: t('navRenovation'), icon: RefreshCw },
    { id: 'viewsync', label: t('navViewSync'), icon: Eye },
    { id: 'editor', label: t('navEditor'), icon: Edit3 },
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
        className={`fixed top-[64px] left-0 right-0 z-30 h-[48px] bg-[#0E1726]/95 backdrop-blur-xl border-b border-[#24304A] transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-[1200px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          {/* Left: Home Button */}
          <button
            onClick={() => setActiveRoute('/')}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#9AA3B5] hover:text-[#F1ECE2] bg-[#121D30] hover:bg-[#1C2944] border border-[#24304A] transition-all cursor-pointer shadow-xs"
            title="Về Trang Chủ"
            aria-label="Home"
          >
            <Home className="w-4 h-4" />
          </button>

          {/* Center: Main Pill Navigation Container */}
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-full bg-[#121D30] border border-[#24304A] shadow-inner">
            {mainTools.map((tool, idx) => {
              const Icon = tool.icon;
              const isActive = activeMainTool === tool.id && !activeExtendedTool && activeRoute === '/image';
              return (
                <React.Fragment key={tool.id}>
                  {idx > 0 && (
                    <span className="w-px h-3.5 bg-[#24304A] my-auto mx-0.5" />
                  )}
                  <button
                    onClick={() => handleToolSelect(tool.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1 text-xs transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#D9C9A3] text-[#0E1726] font-bold rounded-full shadow-sm'
                        : 'text-[#9AA3B5] hover:text-[#F1ECE2] rounded-full hover:bg-[#1C2944]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden md:inline whitespace-nowrap">{tool.label}</span>
                  </button>
                </React.Fragment>
              );
            })}

            {/* Separator before Extended Dropdown */}
            <span className="w-px h-3.5 bg-[#24304A] my-auto mx-0.5" />

            {/* Mở rộng Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setIsExtendedDropdownOpen(!isExtendedDropdownOpen)}
                className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full transition-all cursor-pointer ${
                  activeExtendedTool
                    ? 'bg-[#D9C9A3] text-[#0E1726] font-bold shadow-sm'
                    : 'text-[#9AA3B5] hover:text-[#F1ECE2] hover:bg-[#1C2944]'
                }`}
              >
                <span>{activeExtendedTool ? `Mở rộng: ${activeExtendedTool}` : t('navExtended')}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExtendedDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Extended Tools Menu Dropdown */}
              {isExtendedDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 bg-[#121D30] border border-[#24304A] rounded-2xl shadow-2xl p-2 z-50">
                  <div className="px-3 py-1.5 border-b border-[#24304A] mb-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#DDCDA8]">
                      Công cụ mở rộng AI (13 công cụ)
                    </p>
                  </div>
                  <div className="max-h-80 overflow-y-auto space-y-0.5">
                    <button
                      onClick={() => {
                        setActiveRoute('/image');
                        setActiveExtendedTool('rerender');
                        setIsExtendedDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left rounded-lg hover:bg-[#1C2944] text-[#F1ECE2] cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-[#DDCDA8]" />
                      <span>ReRender Phối Cảnh</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveRoute('/image');
                        setActiveExtendedTool('watermark-cleanup');
                        setIsExtendedDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left rounded-lg hover:bg-[#1C2944] text-[#F1ECE2] cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#DDCDA8]" />
                      <span>Watermark Cleanup</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveRoute('/image');
                        setActiveExtendedTool('text-to-image');
                        setIsExtendedDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left rounded-lg hover:bg-[#1C2944] text-[#F1ECE2] cursor-pointer"
                    >
                      <Type className="w-3.5 h-3.5 text-[#DDCDA8]" />
                      <span>Text to Image (Prompt)</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveRoute('/image');
                        setActiveExtendedTool('image-to-image');
                        setIsExtendedDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left rounded-lg hover:bg-[#1C2944] text-[#F1ECE2] cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5 text-[#DDCDA8]" />
                      <span>Image to Image Render</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveRoute('/image');
                        setActiveExtendedTool('upscale');
                        setIsExtendedDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left rounded-lg hover:bg-[#1C2944] text-[#F1ECE2] cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-[#DDCDA8]" />
                      <span>Upscale 4K Siêu Nét</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveRoute('/image');
                        setActiveExtendedTool('relighting');
                        setIsExtendedDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left rounded-lg hover:bg-[#1C2944] text-[#F1ECE2] cursor-pointer"
                    >
                      <Sliders className="w-3.5 h-3.5 text-[#DDCDA8]" />
                      <span>Thay Đổi Ánh Sáng</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveRoute('/image');
                        setActiveExtendedTool('inpaint');
                        setIsExtendedDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left rounded-lg hover:bg-[#1C2944] text-[#F1ECE2] cursor-pointer"
                    >
                      <Wand2 className="w-3.5 h-3.5 text-[#DDCDA8]" />
                      <span>Inpainting Thay Đổi Vật Thể</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: History Gallery Button */}
          <button
            onClick={() => setActiveRoute('/history')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-full border transition-all cursor-pointer ${
              activeRoute === '/history'
                ? 'bg-[#D9C9A3] text-[#0E1726] font-bold border-[#D9C9A3]'
                : 'text-[#9AA3B5] hover:text-[#F1ECE2] bg-[#121D30] hover:bg-[#1C2944] border-[#24304A]'
            }`}
            title="Lịch Sử Tạo Ảnh"
          >
            <History className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-medium">{t('navHistory')}</span>
          </button>
        </div>
      </div>

      {/* Mobile Tools Drawer (when hamburger clicked) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end">
          <div className="bg-[#121D30] border-t border-[#24304A] rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#24304A]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#D9C9A3] flex items-center justify-center text-[#0E1726] font-bold text-xs">
                  A
                </div>
                <h3 className="text-base font-bold text-[#F1ECE2]">Công Cụ AchiPics</h3>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-full text-[#9AA3B5] hover:text-[#F1ECE2] hover:bg-[#1C2944]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main tools */}
            <div className="space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#DDCDA8] px-2 mb-2">
                Công cụ chính
              </p>
              {mainTools.map((tool) => {
                const Icon = tool.icon;
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
                        ? 'bg-[#D9C9A3] text-[#0E1726] font-bold shadow-md'
                        : 'text-[#9AA3B5] hover:bg-[#16213A] hover:text-[#F1ECE2]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{tool.label}</span>
                    </div>
                    {isActive && <CheckCircle className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>

            {/* Quick links */}
            <div className="pt-3 border-t border-[#24304A] space-y-2">
              <button
                onClick={() => {
                  setActiveRoute('/history');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#16213A] text-[#F1ECE2] text-sm font-medium"
              >
                <History className="w-4 h-4 text-[#DDCDA8]" />
                <span>{t('navHistory')}</span>
              </button>
              <button
                onClick={() => {
                  setActiveRoute('/pricing');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#16213A] text-[#F1ECE2] text-sm font-medium"
              >
                <Sparkles className="w-4 h-4 text-[#DDCDA8]" />
                <span>{t('navPricing')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
