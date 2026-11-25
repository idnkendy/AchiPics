import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import { ImageZoomModal } from '../common/ImageZoomModal';

export interface StudioModeCard {
  id: string;
  title: string;
  desc: string;
  icon: string;
  image: string;
}

export interface StudioSampleItem {
  title: string;
  image: string;
}

export interface StudioOptionItem {
  value: string;
  label: string;
}

export interface StudioOptionGroup {
  key: string;
  label: string;
  defaultValue: string;
  options: StudioOptionItem[];
}

export interface StudioGuideStep {
  title: string;
  desc: string;
}

export type StudioModelType = 'nano-banana' | 'gpt-2';
export type StudioResolutionKey = 'Standard' | '1K' | '2K' | '4K' | 'Cơ bản' | 'Cao cấp';

interface OptionSelectorProps {
  label: string;
  value: string;
  options: StudioOptionItem[];
  onChange: (value: string) => void;
}

export const OptionSelector: React.FC<OptionSelectorProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const currentOption = options.find((o) => o.value === value) || options[0];

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full rounded-lg border px-3 py-2 text-left flex items-center justify-between gap-2 transition-colors cursor-pointer bg-[#FFFFFF] dark:bg-[#111B2D] border-[#E2D9C8] dark:border-[#24304A] hover:border-[#D9C9A3]"
      >
        <div className="min-w-0 flex-1">
          <span className="block text-[10px] font-medium text-[#57657E] dark:text-[#9AA3B5] truncate">
            {label}
          </span>
          <span className="block text-xs font-semibold text-[#121D30] dark:text-[#F1ECE2] truncate mt-0.5">
            {currentOption?.label || value}
          </span>
        </div>
        <span className="w-6 h-6 rounded-full bg-[#F0EAE0] dark:bg-[#16213A] border border-[#E2D9C8] dark:border-[#24304A] flex items-center justify-center shrink-0 text-[#57657E] dark:text-[#9AA3B5]">
          <span
            className={`material-symbols-outlined text-[15px] transition-transform duration-150 ${
              isOpen ? 'rotate-180' : ''
            }`}
          >
            expand_more
          </span>
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1.5 rounded-2xl shadow-2xl border p-1.5 z-40 max-h-56 overflow-y-auto bg-[#FFFFFF] dark:bg-[#121D30] border-[#E2D9C8] dark:border-[#24304A]">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#D9C9A3]/20 text-[#8E733D] dark:text-[#D9C9A3] font-semibold'
                    : 'text-[#121D30] dark:text-[#F1ECE2] hover:bg-[#F0EAE0] dark:hover:bg-[#1C2944]'
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && (
                  <span className="material-symbols-outlined text-[16px] text-[#8E733D] dark:text-[#D9C9A3] shrink-0">
                    check_circle
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const NANO_BANANA_TIERS: {
  key: StudioResolutionKey;
  badge: string;
  name: string;
  desc: string;
  cost: number;
}[] = [
  { key: 'Standard', badge: 'Nhanh', name: 'Standard', desc: 'Xem nhanh bố cục và khối', cost: 10 },
  { key: '1K', badge: 'Chi tiết', name: '1K', desc: 'Cân bằng tốc độ và độ nét', cost: 15 },
  { key: '2K', badge: 'Sắc nét', name: '2K', desc: 'Chuẩn trình bày chủ đầu tư', cost: 25 },
  { key: '4K', badge: 'Siêu thực', name: '4K', desc: 'Chất lượng studio in ấn', cost: 40 },
];

const GPT2_TIERS: {
  key: StudioResolutionKey;
  badge: string;
  name: string;
  desc: string;
  cost: number;
}[] = [
  { key: 'Cơ bản', badge: 'Nhanh', name: 'Cơ bản', desc: 'Kết xuất ổn định, tiết kiệm xu', cost: 15 },
  { key: 'Cao cấp', badge: 'Studio', name: 'Cao cấp', desc: 'Chi tiết vật liệu & ánh sáng sâu', cost: 40 },
];

const ASPECT_RATIOS = ['1:1', '4:3', '3:4', '16:9', '9:16'];

export interface StudioViewportContext {
  selectedMode: string;
  uploadedImage: string | null;
  currentResultImage: string;
  generatedImages: string[];
  isGenerating: boolean;
  openSampleModal: () => void;
  openGuideModal: () => void;
}

export interface StudioToolConfig {
  toolId: string;
  toolName: string;
  studioEyebrow?: string;
  dashboardTitle: string;
  dashboardSubtitle: string;
  modes: StudioModeCard[];
  initialMode?: string | null;
  onModeChange?: (modeId: string | null) => void;
  onBackFromWorkspace?: () => void;
  uploadTitle?: string;
  uploadDragText?: string;
  uploadFormatsText?: string;
  samples: StudioSampleItem[];
  promptTitle?: string;
  promptPlaceholder?: string;
  defaultPrompt: string;
  autoPromptsByMode: Record<string, string[]>;
  optionGroups: StudioOptionGroup[];
  resultPoolsByMode: Record<string, string[]>;
  comparatorBeforeLabel?: string;
  comparatorAfterLabel?: string;
  emptyHintText: string;
  guideTitle: string;
  guideSteps: [StudioGuideStep, StudioGuideStep, StudioGuideStep];
  downloadPrefix: string;
  zoomTitle?: string;
  extraStepThreeTop?: React.ReactNode;
  renderCustomMainFrame?: (ctx: StudioViewportContext) => React.ReactNode | null;
  renderExtraTopBarLeft?: (ctx: StudioViewportContext) => React.ReactNode;
  onGenerationSuccess?: () => void;
  onUploadedImageChange?: (img: string | null) => void;
}

export const StudioWorkspace: React.FC<StudioToolConfig> = ({
  toolId,
  toolName,
  studioEyebrow = 'AchiPics Studio',
  dashboardTitle,
  dashboardSubtitle,
  modes,
  initialMode = null,
  onModeChange,
  onBackFromWorkspace,
  uploadTitle,
  uploadDragText,
  uploadFormatsText,
  samples,
  promptTitle = '2. Mô tả Prompt',
  promptPlaceholder,
  defaultPrompt,
  autoPromptsByMode,
  optionGroups,
  resultPoolsByMode,
  comparatorBeforeLabel = 'AI',
  comparatorAfterLabel = 'GỐC',
  emptyHintText,
  guideTitle,
  guideSteps,
  downloadPrefix,
  zoomTitle = 'Bản Xem Phối Cảnh Chi Tiết',
  extraStepThreeTop,
  renderCustomMainFrame,
  renderExtraTopBarLeft,
  onGenerationSuccess,
  onUploadedImageChange,
}) => {
  const { t, deductCredits, addHistoryItem, addCredits } = useApp();

  const [selectedMode, setSelectedModeState] = useState<string | null>(initialMode);
  const [isModeDropdownOpen, setIsModeDropdownOpen] = useState(false);
  const modeDropdownRef = useRef<HTMLDivElement>(null);

  const [uploadedImage, setUploadedImageState] = useState<string | null>(null);
  const [refImages, setRefImages] = useState<string[]>([]);
  const sourceInputRef = useRef<HTMLInputElement>(null);

  const [optionValues, setOptionValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    optionGroups.forEach((g) => {
      initial[g.key] = g.defaultValue;
    });
    return initial;
  });

  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [aiModel, setAiModel] = useState<StudioModelType>('nano-banana');
  const [resolution, setResolution] = useState<StudioResolutionKey>('2K');
  const [imageCount, setImageCount] = useState<number>(2);
  const [prompt, setPrompt] = useState<string>(defaultPrompt);

  const [isGenerating, setIsGenerating] = useState(false);
  const [batchDone, setBatchDone] = useState(0);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    setSelectedModeState(initialMode);
  }, [initialMode]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (modeDropdownRef.current && !modeDropdownRef.current.contains(e.target as Node)) {
        setIsModeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      timersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const setSelectedMode = (next: string | null) => {
    setSelectedModeState(next);
    onModeChange?.(next);
  };

  const setUploadedImage = (img: string | null) => {
    setUploadedImageState(img);
    onUploadedImageChange?.(img);
  };

  const currentTiers = aiModel === 'nano-banana' ? NANO_BANANA_TIERS : GPT2_TIERS;
  const activeTier = currentTiers.find((tier) => tier.key === resolution) || currentTiers[0];
  const totalCost = activeTier.cost * imageCount;

  const handleModelSwitch = (nextModel: StudioModelType) => {
    setAiModel(nextModel);
    if (nextModel === 'nano-banana') {
      setResolution('2K');
    } else {
      setResolution('Cơ bản');
    }
  };

  const handleAutoPrompt = () => {
    const fallbackList = Object.values(autoPromptsByMode)[0] || [defaultPrompt];
    const list = autoPromptsByMode[selectedMode || modes[0]?.id || ''] || fallbackList;
    const picked = list[Math.floor(Math.random() * list.length)];
    setPrompt(picked);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const handleRefUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remaining = 5 - refImages.length;
    files.slice(0, remaining).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setRefImages((prev) => (prev.length < 5 ? [...prev, reader.result as string] : prev));
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedPrompt(true);
      window.setTimeout(() => setCopiedPrompt(false), 1800);
    } catch {
      // Ignore clipboard error
    }
  };

  const handleGenerate = () => {
    setStatusNotice(null);
    const success = deductCredits(totalCost);
    if (!success) {
      setStatusNotice('Số dư Credits không đủ hoặc chưa đăng nhập. Vui lòng kiểm tra lại.');
      return;
    }

    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];

    const fallbackPool = Object.values(resultPoolsByMode)[0] || [];
    const pool = resultPoolsByMode[selectedMode || modes[0]?.id || ''] || fallbackPool;

    setIsGenerating(true);
    setBatchDone(0);
    setGeneratedImages([]);
    setSelectedResultIndex(0);
    setIsFavorite(false);

    for (let i = 0; i < imageCount; i++) {
      const tId = window.setTimeout(() => {
        const nextImg = pool[i % pool.length];
        setGeneratedImages((prev) => [...prev, nextImg]);
        setBatchDone(i + 1);

        if (i === imageCount - 1) {
          setIsGenerating(false);
          onGenerationSuccess?.();
          addHistoryItem({
            id: `${toolId}-${Date.now()}`,
            tool: toolId,
            toolName,
            prompt,
            resultImage: pool[0],
            originalImage: uploadedImage || undefined,
            createdAt: new Date().toLocaleString(),
            isFavorite: false,
            aspectRatio,
            style: optionValues[optionGroups[0]?.key || 'style'],
            cost: totalCost,
          });
        }
      }, 900 * (i + 1));

      timersRef.current.push(tId);
    }
  };

  const handleQuickDemoCredits = () => {
    addCredits(totalCost);
    setStatusNotice(null);
  };

  const activeModeMeta = modes.find((m) => m.id === selectedMode) || modes[0];
  const currentResultImage = generatedImages[selectedResultIndex] || '';

  // 1. Mode Selection Dashboard (When no mode picked yet)
  if (!selectedMode) {
    return (
      <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-[3px] text-[#8E733D] dark:text-[#DDCDA8] mb-2">
            {studioEyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121D30] dark:text-[#F1ECE2] tracking-tight">
            {dashboardTitle}
          </h2>
          <p className="text-sm text-[#57657E] dark:text-[#9AA3B5] mt-2.5 leading-relaxed">
            {dashboardSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modes.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => setSelectedMode(card.id)}
              className="group relative h-80 md:h-88 rounded-3xl overflow-hidden border border-[#E2D9C8] dark:border-[#24304A] hover:border-[#D9C9A3] text-left cursor-pointer shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/15" />

              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">{card.icon}</span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{card.title}</h3>
                  <p className="text-xs text-white/80 mt-1.5 leading-relaxed line-clamp-2">
                    {card.desc}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D9C9A3] group-hover:gap-2.5 transition-all pt-1">
                  <span>Bắt đầu ngay</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const viewportCtx: StudioViewportContext = {
    selectedMode,
    uploadedImage,
    currentResultImage,
    generatedImages,
    isGenerating,
    openSampleModal: () => setIsSampleModalOpen(true),
    openGuideModal: () => setIsGuideModalOpen(true),
  };

  const customMainFrame = renderCustomMainFrame ? renderCustomMainFrame(viewportCtx) : null;

  // 2. Split Workspace (Layout 2 Independent Fixed-Height Cards)
  return (
    <div className="max-w-[1920px] mx-auto w-full flex flex-col lg:flex-row gap-6 lg:gap-8 px-4 pt-6 pb-6">
      {/* LEFT COLUMN (Sidebar with internal scroll + Sticky Footer CTA) */}
      <aside className="w-full lg:w-[40%] lg:sticky lg:top-[128px] lg:h-[calc(100vh-152px)] rounded-2xl border shadow-sm bg-[#FFFFFF] dark:bg-[#121D30] border-[#E2D9C8] dark:border-[#24304A] flex flex-col overflow-hidden">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Header Sidebar: Back pill + Highlighted Mode Switcher Card */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => {
                if (onBackFromWorkspace) {
                  onBackFromWorkspace();
                } else {
                  setSelectedMode(null);
                }
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer bg-[#F0EAE0] dark:bg-[#16213A] hover:bg-[#E5DDCB] dark:hover:bg-[#1C2944] border-[#E2D9C8] dark:border-[#24304A] text-[#121D30] dark:text-[#F1ECE2]"
            >
              <span className="material-symbols-outlined text-[15px]">arrow_back</span>
              <span>Quay lại</span>
            </button>

            <div className="relative" ref={modeDropdownRef}>
              <button
                type="button"
                onClick={() => setIsModeDropdownOpen((prev) => !prev)}
                className="w-full p-3 rounded-2xl bg-[#D9C9A3]/10 border border-[#D9C9A3]/30 hover:border-[#D9C9A3]/60 flex items-center justify-between gap-3 transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D9C9A3] to-[#EDE2C8] text-[#0E1726] flex items-center justify-center shrink-0 shadow-xs">
                    <span className="material-symbols-outlined text-[20px]">
                      {activeModeMeta?.icon || 'auto_awesome'}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-medium text-[#8E733D] dark:text-[#DDCDA8]">
                      Bấm để chuyển chế độ
                    </span>
                    <span className="block text-sm font-bold text-[#121D30] dark:text-[#F1ECE2] truncate">
                      {activeModeMeta?.title}
                    </span>
                  </div>
                </div>
                <span
                  className={`material-symbols-outlined text-[20px] text-[#8E733D] dark:text-[#DDCDA8] transition-transform ${
                    isModeDropdownOpen ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>

              {isModeDropdownOpen && (
                <div className="absolute left-0 right-0 mt-2 rounded-2xl shadow-2xl border p-1.5 z-40 max-h-72 overflow-y-auto bg-[#FFFFFF] dark:bg-[#121D30] border-[#E2D9C8] dark:border-[#24304A]">
                  {modes.map((card) => {
                    const isSelected = card.id === selectedMode;
                    return (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => {
                          setSelectedMode(card.id);
                          setIsModeDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#D9C9A3]/20 text-[#8E733D] dark:text-[#D9C9A3] font-bold'
                            : 'text-[#121D30] dark:text-[#F1ECE2] hover:bg-[#F0EAE0] dark:hover:bg-[#1C2944]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-[18px]">{card.icon}</span>
                          <span>{card.title}</span>
                        </div>
                        {isSelected && (
                          <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Step Card 1: Upload Image */}
          <div className="rounded-2xl bg-[#F0EAE0]/60 dark:bg-black/20 p-4 border border-[#E2D9C8] dark:border-[#24304A]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-[#121D30] dark:text-[#F1ECE2]">
                {uploadTitle || `1. ${t('uploadImage')}`}
              </h3>
              <button
                type="button"
                onClick={() => setIsSampleModalOpen(true)}
                className="w-6 h-6 rounded-full border border-[#E2D9C8] dark:border-[#24304A] bg-[#FFFFFF] dark:bg-[#16213A] text-[#57657E] dark:text-[#9AA3B5] hover:text-[#121D30] dark:hover:text-[#F1ECE2] flex items-center justify-center transition-colors cursor-pointer"
                title="Chọn ảnh mẫu"
                aria-label="Chọn ảnh mẫu"
              >
                <span className="material-symbols-outlined text-[14px]">question_mark</span>
              </button>
            </div>

            <input
              ref={sourceInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {uploadedImage ? (
              <div className="relative max-w-[240px] aspect-video rounded-2xl border-2 border-[#D9C9A3] overflow-hidden bg-[#111B2D] group">
                <img
                  src={uploadedImage}
                  alt="Ảnh gốc"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                  <button
                    type="button"
                    onClick={() => sourceInputRef.current?.click()}
                    className="px-2.5 py-1.5 rounded-lg bg-[#D9C9A3] text-[#0E1726] text-[11px] font-bold hover:bg-[#EDE2C8] cursor-pointer"
                  >
                    Thay đổi
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadedImage(null)}
                    className="px-2.5 py-1.5 rounded-lg bg-rose-600 text-white text-[11px] font-bold hover:bg-rose-500 cursor-pointer"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => sourceInputRef.current?.click()}
                className="w-full flex flex-col items-center justify-center p-5 border-2 border-dashed border-[#D5C9B4] dark:border-[#2E3B58] hover:border-[#D9C9A3] rounded-xl bg-[#FFFFFF]/80 dark:bg-[#111B2D]/70 hover:bg-[#FFFFFF] dark:hover:bg-[#111B2D] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[28px] text-[#8E733D] dark:text-[#D9C9A3] mb-1.5">
                  cloud_upload
                </span>
                <p className="text-xs font-semibold text-[#121D30] dark:text-[#F1ECE2]">
                  {uploadDragText || t('dragDropText')}
                </p>
                <p className="text-[11px] text-[#8792A6] dark:text-[#646E84] mt-0.5">
                  {uploadFormatsText || t('supportFormats')}
                </p>
              </button>
            )}
          </div>

          {/* Step Card 2: Prompt Description */}
          <div className="rounded-2xl bg-[#F0EAE0]/60 dark:bg-black/20 p-4 border border-[#E2D9C8] dark:border-[#24304A]">
            <h3 className="text-xs font-bold text-[#121D30] dark:text-[#F1ECE2] mb-2.5">
              {promptTitle}
            </h3>

            <div className="relative">
              <textarea
                rows={6}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={promptPlaceholder || t('promptPlaceholder')}
                className="w-full p-3 pr-10 pb-9 text-xs leading-relaxed rounded-xl border bg-[#FFFFFF] dark:bg-[#111B2D] border-[#E2D9C8] dark:border-[#24304A] text-[#121D30] dark:text-[#F1ECE2] placeholder:text-[#8792A6] dark:placeholder:text-[#646E84] focus:outline-none focus:border-[#D9C9A3] resize-none"
              />
              <button
                type="button"
                onClick={() => setIsPromptModalOpen(true)}
                className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-lg border border-[#E2D9C8] dark:border-[#24304A] bg-[#F0EAE0] dark:bg-[#16213A] text-[#57657E] dark:text-[#9AA3B5] hover:text-[#121D30] dark:hover:text-[#F1ECE2] flex items-center justify-center transition-colors cursor-pointer"
                title="Mở rộng khung soạn Prompt"
                aria-label="Phóng to khung soạn Prompt"
              >
                <span className="material-symbols-outlined text-[16px]">open_in_full</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleAutoPrompt}
              className="w-full mt-2.5 py-2.5 px-4 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">auto_fix_high</span>
              <span>{t('autoPromptBtn')}</span>
            </button>
          </div>

          {/* Step Card 3: Detailed Options */}
          <div className="rounded-2xl bg-[#F0EAE0]/60 dark:bg-black/20 p-4 border border-[#E2D9C8] dark:border-[#24304A] space-y-3">
            <h3 className="text-xs font-bold text-[#121D30] dark:text-[#F1ECE2]">
              3. Tùy chọn chi tiết
            </h3>

            {extraStepThreeTop}

            <div className="grid grid-cols-2 gap-2.5">
              {optionGroups.map((group) => (
                <OptionSelector
                  key={group.key}
                  label={group.label}
                  value={optionValues[group.key] || group.defaultValue}
                  onChange={(val) =>
                    setOptionValues((prev) => ({
                      ...prev,
                      [group.key]: val,
                    }))
                  }
                  options={group.options}
                />
              ))}
            </div>
          </div>

          {/* Step Card 4: Output Configuration */}
          <div className="rounded-2xl bg-[#F0EAE0]/60 dark:bg-black/20 p-4 border border-[#E2D9C8] dark:border-[#24304A] space-y-4">
            <h3 className="text-xs font-bold text-[#121D30] dark:text-[#F1ECE2]">
              Cấu hình đầu ra
            </h3>

            {/* Reference Images (max 5, locked on Standard) */}
            <div>
              <label className="text-[11px] font-semibold text-[#57657E] dark:text-[#9AA3B5] block mb-2">
                {t('referenceImages')}
              </label>

              {resolution === 'Standard' ? (
                <button
                  type="button"
                  onClick={() => setResolution('1K')}
                  className="w-full h-20 rounded-xl border border-dashed border-[#D5C9B4] dark:border-[#2E3B58] bg-[#FFFFFF]/70 dark:bg-[#111B2D]/70 hover:border-[#D9C9A3] px-4 flex items-center justify-center gap-3 text-left transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[24px] text-amber-500 shrink-0">
                    lock
                  </span>
                  <div className="text-[11px] leading-snug text-[#57657E] dark:text-[#9AA3B5]">
                    <span className="font-bold text-[#121D30] dark:text-[#F1ECE2] block">
                      Ảnh tham chiếu đang khóa ở chế độ Standard
                    </span>
                    <span>Bấm để nâng lên 1K / 2K / 4K và mở khóa tối đa 5 ảnh</span>
                  </div>
                </button>
              ) : (
                <div className="grid grid-cols-5 gap-2">
                  {refImages.map((ref, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square rounded-xl overflow-hidden border border-[#E2D9C8] dark:border-[#24304A] bg-[#111B2D] group"
                    >
                      <img src={ref} alt={`Tham chiếu ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setRefImages((prev) => prev.filter((_, i) => i !== idx))}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/80 text-white hover:text-rose-400 flex items-center justify-center cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[13px]">close</span>
                      </button>
                    </div>
                  ))}

                  {refImages.length < 5 && (
                    <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-[#D5C9B4] dark:border-[#2E3B58] hover:border-[#D9C9A3] rounded-xl cursor-pointer bg-[#FFFFFF]/70 dark:bg-[#111B2D]/70 text-[#57657E] dark:text-[#9AA3B5] hover:text-[#121D30] dark:hover:text-[#F1ECE2] transition-colors">
                      <span className="material-symbols-outlined text-[18px]">add</span>
                      <span className="text-[10px] font-semibold mt-0.5">Thêm</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleRefUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              )}
            </div>

            {/* AspectRatioSelector (5 horizontal segmented buttons) */}
            <div>
              <label className="text-[11px] font-semibold text-[#57657E] dark:text-[#9AA3B5] block mb-2">
                {t('aspectRatioLabel')}
              </label>
              <div className="rounded-xl p-1.5 bg-[#FFFFFF] dark:bg-[#111B2D] border border-[#E2D9C8] dark:border-[#24304A] grid grid-cols-5 gap-1">
                {ASPECT_RATIOS.map((ratio) => {
                  const isActive = aspectRatio === ratio;
                  return (
                    <button
                      key={ratio}
                      type="button"
                      onClick={() => setAspectRatio(ratio)}
                      className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer tabular-nums ${
                        isActive
                          ? 'bg-[#D9C9A3] text-[#0E1726] shadow-xs'
                          : 'text-[#57657E] dark:text-[#9AA3B5] hover:text-[#121D30] dark:hover:text-[#F1ECE2] hover:bg-[#F0EAE0] dark:hover:bg-[#16213A]'
                      }`}
                    >
                      {ratio}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ModelSelector + ResolutionSelector */}
            <div>
              <label className="text-[11px] font-semibold text-[#57657E] dark:text-[#9AA3B5] block mb-2">
                Chọn Model & Độ phân giải
              </label>

              {/* 2 Segmented Model Tabs */}
              <div className="rounded-xl p-1 bg-[#FFFFFF] dark:bg-[#111B2D] border border-[#E2D9C8] dark:border-[#24304A] grid grid-cols-2 gap-1 mb-2.5">
                <button
                  type="button"
                  onClick={() => handleModelSwitch('nano-banana')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    aiModel === 'nano-banana'
                      ? 'bg-[#D9C9A3] text-[#0E1726] shadow-xs'
                      : 'text-[#57657E] dark:text-[#9AA3B5] hover:text-[#121D30] dark:hover:text-[#F1ECE2]'
                  }`}
                >
                  Nano Banana
                </button>
                <button
                  type="button"
                  onClick={() => handleModelSwitch('gpt-2')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    aiModel === 'gpt-2'
                      ? 'bg-[#D9C9A3] text-[#0E1726] shadow-xs'
                      : 'text-[#57657E] dark:text-[#9AA3B5] hover:text-[#121D30] dark:hover:text-[#F1ECE2]'
                  }`}
                >
                  GPT 2
                </button>
              </div>

              {/* Resolution Cards */}
              <div className="grid grid-cols-2 gap-2.5">
                {currentTiers.map((tier) => {
                  const isActive = resolution === tier.key;
                  return (
                    <button
                      key={tier.key}
                      type="button"
                      onClick={() => setResolution(tier.key)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                        isActive
                          ? 'bg-[#D9C9A3]/15 border-[#D9C9A3] shadow-xs'
                          : 'bg-[#FFFFFF] dark:bg-[#111B2D] border-[#E2D9C8] dark:border-[#24304A] hover:border-[#D9C9A3]/60'
                      }`}
                    >
                      <div className="w-full">
                        <div className="flex items-center justify-between gap-1.5">
                          <span className="text-xs font-bold text-[#121D30] dark:text-[#F1ECE2]">
                            {tier.name}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isActive
                                ? 'bg-[#D9C9A3] text-[#0E1726]'
                                : 'bg-[#F0EAE0] dark:bg-[#16213A] text-[#57657E] dark:text-[#9AA3B5]'
                            }`}
                          >
                            {tier.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#57657E] dark:text-[#9AA3B5] mt-1 line-clamp-1">
                          {tier.desc}
                        </p>
                      </div>

                      <div className="inline-flex items-center gap-1 self-start px-2 py-0.5 rounded-full bg-[#F0EAE0] dark:bg-[#16213A] border border-[#E2D9C8] dark:border-[#24304A] text-[11px] font-bold text-[#8E733D] dark:text-[#D9C9A3] tabular-nums">
                        <span className="material-symbols-outlined text-[13px] text-amber-500">
                          monetization_on
                        </span>
                        <span>{tier.cost}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Image Count 4-column segmented bar */}
            <div>
              <label className="text-[11px] font-semibold text-[#57657E] dark:text-[#9AA3B5] block mb-2">
                {t('imageCountLabel')}
              </label>
              <div className="rounded-xl p-1 bg-[#FFFFFF] dark:bg-[#111B2D] border border-[#E2D9C8] dark:border-[#24304A] grid grid-cols-4 gap-1">
                {[1, 2, 3, 4].map((num) => {
                  const isActive = imageCount === num;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setImageCount(num)}
                      className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer tabular-nums ${
                        isActive
                          ? 'bg-[#D9C9A3] text-[#0E1726] shadow-xs'
                          : 'text-[#57657E] dark:text-[#9AA3B5] hover:text-[#121D30] dark:hover:text-[#F1ECE2] hover:bg-[#F0EAE0] dark:hover:bg-[#16213A]'
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {statusNotice && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-600 dark:text-rose-300 flex items-center justify-between gap-2">
              <span>{statusNotice}</span>
              <button
                type="button"
                onClick={handleQuickDemoCredits}
                className="px-2.5 py-1 rounded-lg bg-[#D9C9A3] text-[#0E1726] font-bold whitespace-nowrap cursor-pointer"
              >
                + Nạp nhanh
              </button>
            </div>
          )}
        </div>

        {/* Sticky Footer CTA */}
        <div className="p-4 border-t border-[#E2D9C8] dark:border-[#24304A] bg-[#FFFFFF] dark:bg-[#121D30] shrink-0">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`w-full py-3.5 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isGenerating
                ? 'bg-[#F0EAE0] dark:bg-[#1C2944] text-[#8792A6] dark:text-[#646E84] cursor-not-allowed'
                : 'bg-gradient-to-r from-[#D9C9A3] to-[#EDE2C8] hover:opacity-95 text-[#0E1726] shadow-md'
            }`}
          >
            {isGenerating ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  progress_activity
                </span>
                <span>{t('generatingBtn')}</span>
              </>
            ) : (
              <>
                <span>{t('generateBtn')}</span>
                <span className="opacity-40">|</span>
                <span className="tabular-nums">{totalCost}</span>
                <span className="material-symbols-outlined text-[18px] text-amber-600">
                  monetization_on
                </span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* RIGHT COLUMN (Single Unified Result Viewport) */}
      <section className="flex-1 lg:sticky lg:top-[128px] lg:h-[calc(100vh-152px)] min-h-[540px] rounded-2xl border shadow-sm bg-[#FFFFFF] dark:bg-[#121D30] border-[#E2D9C8] dark:border-[#24304A] flex flex-col overflow-hidden relative">
        {/* Main Result Area */}
        <div className="flex-1 relative p-3 sm:p-4 flex flex-col overflow-hidden">
          {customMainFrame ? (
            <div className="flex-1 flex flex-col gap-3 overflow-hidden">
              {/* Top Bar */}
              <div className="flex items-center justify-between gap-2 shrink-0">
                <div className="flex items-center gap-2">
                  {isGenerating && (
                    <div className="px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-2 border border-white/15">
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-[#D9C9A3] border-t-transparent animate-spin" />
                      <span className="tabular-nums">
                        Đang xử lý ({batchDone}/{imageCount})...
                      </span>
                    </div>
                  )}
                  {renderExtraTopBarLeft?.(viewportCtx)}
                </div>

                {generatedImages.length > 0 && (
                  <div className="flex items-center gap-2">
                    <a
                      href={currentResultImage}
                      download={`${downloadPrefix}_${selectedResultIndex + 1}.png`}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF7F0] dark:bg-[#16213A] hover:bg-[#D9C9A3] hover:text-[#0E1726] border border-[#E2D9C8] dark:border-[#24304A] text-xs font-bold text-[#121D30] dark:text-[#F1ECE2] shadow-xs transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">download</span>
                      <span className="hidden sm:inline">{t('btnDownload')}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setIsZoomOpen(true)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF7F0] dark:bg-[#16213A] hover:bg-[#D9C9A3] hover:text-[#0E1726] border border-[#E2D9C8] dark:border-[#24304A] text-xs font-bold text-[#121D30] dark:text-[#F1ECE2] shadow-xs transition-colors cursor-pointer"
                      title="Phóng to"
                    >
                      <span className="material-symbols-outlined text-[16px]">zoom_in</span>
                      <span className="hidden sm:inline">Phóng to</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsFavorite((prev) => !prev)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold shadow-xs transition-colors cursor-pointer ${
                        isFavorite
                          ? 'bg-[#D9C9A3] border-[#D9C9A3] text-[#0E1726]'
                          : 'bg-[#FAF7F0] dark:bg-[#16213A] border-[#E2D9C8] dark:border-[#24304A] text-[#121D30] dark:text-[#F1ECE2] hover:bg-[#D9C9A3] hover:text-[#0E1726]'
                      }`}
                      title={t('btnFavorite')}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {isFavorite ? 'favorite' : 'favorite_border'}
                      </span>
                      <span className="hidden sm:inline">{t('btnFavorite')}</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="flex-1 rounded-2xl overflow-hidden bg-[#FAF7F0] dark:bg-[#0E1726] border border-[#E2D9C8] dark:border-[#24304A] relative">
                {customMainFrame}
                {isGenerating && generatedImages.length === 0 && (
                  <div className="absolute inset-0 z-20 backdrop-blur-sm bg-[#F8F5EE]/75 dark:bg-[#0E1726]/75 flex flex-col items-center justify-center gap-3">
                    <div className="w-11 h-11 rounded-full border-3 border-[#D9C9A3] border-t-transparent animate-spin" />
                    <p className="text-sm font-bold text-[#121D30] dark:text-[#F1ECE2]">
                      Đang xử lý (0/{imageCount})...
                    </p>
                    <p className="text-xs text-[#57657E] dark:text-[#9AA3B5]">
                      Hệ thống đang xử lý chi tiết, vật liệu và ánh sáng AI
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : generatedImages.length === 0 ? (
            <div className="flex-1 rounded-2xl border border-dashed border-[#E2D9C8] dark:border-[#24304A] bg-[#FAF7F0] dark:bg-[#0E1726]/60 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
              <button
                type="button"
                onClick={() => setIsGuideModalOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D9C9A3] to-[#EDE2C8] hover:opacity-95 text-[#0E1726] font-bold text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">menu_book</span>
                <span>{t('tabGuide')}</span>
              </button>
              <p className="text-xs text-[#57657E] dark:text-[#9AA3B5] mt-3 max-w-sm leading-relaxed">
                {emptyHintText}
              </p>

              {/* First-image generating blur overlay */}
              {isGenerating && (
                <div className="absolute inset-0 z-20 backdrop-blur-sm bg-[#F8F5EE]/75 dark:bg-[#0E1726]/75 flex flex-col items-center justify-center gap-3">
                  <div className="w-11 h-11 rounded-full border-3 border-[#D9C9A3] border-t-transparent animate-spin" />
                  <p className="text-sm font-bold text-[#121D30] dark:text-[#F1ECE2]">
                    Đang xử lý (0/{imageCount})...
                  </p>
                  <p className="text-xs text-[#57657E] dark:text-[#9AA3B5]">
                    Hệ thống đang dựng ánh sáng, vật liệu và phối cảnh AI
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-3 overflow-hidden">
              {/* Top Bar: Batch Progress / Extra Left + Action Row (Right) */}
              <div className="flex items-center justify-between gap-2 shrink-0">
                <div className="flex items-center gap-2">
                  {isGenerating && (
                    <div className="px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-2 border border-white/15">
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-[#D9C9A3] border-t-transparent animate-spin" />
                      <span className="tabular-nums">
                        Đang xử lý ({batchDone}/{imageCount})...
                      </span>
                    </div>
                  )}
                  {renderExtraTopBarLeft?.(viewportCtx)}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={currentResultImage}
                    download={`${downloadPrefix}_${selectedResultIndex + 1}.png`}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF7F0] dark:bg-[#16213A] hover:bg-[#D9C9A3] hover:text-[#0E1726] border border-[#E2D9C8] dark:border-[#24304A] text-xs font-bold text-[#121D30] dark:text-[#F1ECE2] shadow-xs transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span className="hidden sm:inline">{t('btnDownload')}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsZoomOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF7F0] dark:bg-[#16213A] hover:bg-[#D9C9A3] hover:text-[#0E1726] border border-[#E2D9C8] dark:border-[#24304A] text-xs font-bold text-[#121D30] dark:text-[#F1ECE2] shadow-xs transition-colors cursor-pointer"
                    title="Phóng to"
                  >
                    <span className="material-symbols-outlined text-[16px]">zoom_in</span>
                    <span className="hidden sm:inline">Phóng to</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsFavorite((prev) => !prev)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold shadow-xs transition-colors cursor-pointer ${
                      isFavorite
                        ? 'bg-[#D9C9A3] border-[#D9C9A3] text-[#0E1726]'
                        : 'bg-[#FAF7F0] dark:bg-[#16213A] border-[#E2D9C8] dark:border-[#24304A] text-[#121D30] dark:text-[#F1ECE2] hover:bg-[#D9C9A3] hover:text-[#0E1726]'
                    }`}
                    title={t('btnFavorite')}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isFavorite ? 'favorite' : 'favorite_border'}
                    </span>
                    <span className="hidden sm:inline">{t('btnFavorite')}</span>
                  </button>
                </div>
              </div>

              {/* Unified Image Frame */}
              <div className="flex-1 rounded-2xl overflow-hidden bg-[#FAF7F0] dark:bg-[#0E1726] border border-[#E2D9C8] dark:border-[#24304A] relative">
                {uploadedImage ? (
                  <BeforeAfterSlider
                    beforeImage={currentResultImage}
                    afterImage={uploadedImage}
                    beforeLabel={comparatorBeforeLabel}
                    afterLabel={comparatorAfterLabel}
                    className="h-full w-full rounded-none border-0"
                  />
                ) : (
                  <img
                    src={currentResultImage}
                    alt="Kết quả render AI"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
            </div>
          )}

          {/* Floating Circular Help Button (bottom-right of viewport) */}
          <button
            type="button"
            onClick={() => setIsGuideModalOpen(true)}
            className="absolute bottom-6 right-6 z-30 w-14 h-14 rounded-full bg-gradient-to-br from-[#D9C9A3] to-[#EDE2C8] text-[#0E1726] shadow-xl flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
            title="Hướng dẫn sử dụng"
            aria-label="Hướng dẫn sử dụng"
          >
            <span className="material-symbols-outlined text-[26px]">help</span>
          </button>
        </div>

        {/* Fixed Bottom Thumbnail Strip */}
        {(generatedImages.length > 0 || isGenerating) && (
          <div className="border-t border-[#E2D9C8] dark:border-[#24304A] p-2.5 bg-[#FAF7F0] dark:bg-[#111B2D] shrink-0">
            <div className="flex items-center justify-center gap-2.5 overflow-x-auto py-0.5">
              {generatedImages.map((img, idx) => {
                const isSelected = selectedResultIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedResultIndex(idx)}
                    className={`w-16 md:w-20 aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      isSelected
                        ? 'border-[#D9C9A3] scale-105 shadow-md'
                        : 'border-[#E2D9C8] dark:border-[#24304A] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Kết quả ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                );
              })}

              {isGenerating &&
                Array.from({ length: Math.max(0, imageCount - generatedImages.length) }).map(
                  (_, sIdx) => (
                    <div
                      key={`skel-${sIdx}`}
                      className="w-16 md:w-20 aspect-square rounded-lg border-2 border-dashed border-[#D9C9A3]/60 skeleton-shimmer bg-[#D9C9A3]/10 flex items-center justify-center shrink-0"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#8E733D] dark:text-[#D9C9A3] animate-pulse">
                        image
                      </span>
                    </div>
                  )
                )}
            </div>
          </div>
        )}
      </section>

      {/* Zoom Modal */}
      <ImageZoomModal
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        imageUrl={currentResultImage}
        title={zoomTitle}
      />

      {/* Sample Image Modal */}
      {isSampleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-2xl w-full rounded-2xl border shadow-2xl overflow-hidden bg-[#FFFFFF] dark:bg-[#121D30] border-[#E2D9C8] dark:border-[#24304A] text-[#121D30] dark:text-[#F1ECE2]">
            <div className="px-5 py-4 border-b border-[#E2D9C8] dark:border-[#24304A] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">Thư viện ảnh mẫu đầu vào</h3>
                <p className="text-xs text-[#57657E] dark:text-[#9AA3B5] mt-0.5">
                  Chọn nhanh một ảnh mẫu để thử nghiệm tính năng giữ khối & so sánh Before/After
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsSampleModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[#F0EAE0] dark:hover:bg-[#1C2944] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-5 grid grid-cols-2 gap-3">
              {samples.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setUploadedImage(sample.image);
                    setIsSampleModalOpen(false);
                  }}
                  className="group rounded-xl overflow-hidden border border-[#E2D9C8] dark:border-[#24304A] hover:border-[#D9C9A3] text-left cursor-pointer transition-all"
                >
                  <div className="aspect-video overflow-hidden bg-[#111B2D]">
                    <img
                      src={sample.image}
                      alt={sample.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-2.5 text-xs font-semibold truncate">{sample.title}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Expanded Prompt Modal */}
      {isPromptModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-3xl w-full rounded-2xl border shadow-2xl overflow-hidden bg-[#FFFFFF] dark:bg-[#121D30] border-[#E2D9C8] dark:border-[#24304A] text-[#121D30] dark:text-[#F1ECE2]">
            <div className="px-5 py-4 border-b border-[#E2D9C8] dark:border-[#24304A] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#8E733D] dark:text-[#D9C9A3]">
                  edit_note
                </span>
                <h3 className="text-sm font-bold">Trình soạn thảo Prompt mở rộng</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPromptModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[#F0EAE0] dark:hover:bg-[#1C2944] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-5 space-y-3">
              <textarea
                rows={10}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={promptPlaceholder || t('promptPlaceholder')}
                className="w-full p-4 text-sm leading-relaxed rounded-xl border bg-[#FAF7F0] dark:bg-[#111B2D] border-[#E2D9C8] dark:border-[#24304A] text-[#121D30] dark:text-[#F1ECE2] focus:outline-none focus:border-[#D9C9A3]"
              />

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <span className="text-xs text-[#57657E] dark:text-[#9AA3B5] tabular-nums">
                  {prompt.length} ký tự
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPrompt('')}
                    className="px-3 py-2 rounded-lg border border-[#E2D9C8] dark:border-[#24304A] text-xs font-semibold text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                  >
                    Xóa tất cả
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyPrompt}
                    className="px-3 py-2 rounded-lg border border-[#E2D9C8] dark:border-[#24304A] bg-[#F0EAE0] dark:bg-[#16213A] text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">content_copy</span>
                    <span>{copiedPrompt ? 'Đã copy' : 'Copy'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPromptModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#D9C9A3] to-[#EDE2C8] text-[#0E1726] text-xs font-bold cursor-pointer"
                  >
                    Xong
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Guide Modal */}
      {isGuideModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-2xl w-full rounded-2xl border shadow-2xl overflow-hidden bg-[#FFFFFF] dark:bg-[#121D30] border-[#E2D9C8] dark:border-[#24304A] text-[#121D30] dark:text-[#F1ECE2]">
            <div className="px-5 py-4 border-b border-[#E2D9C8] dark:border-[#24304A] flex items-center justify-between">
              <h3 className="text-base font-bold">{guideTitle}</h3>
              <button
                type="button"
                onClick={() => setIsGuideModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[#F0EAE0] dark:hover:bg-[#1C2944] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {guideSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#FAF7F0] dark:bg-[#16213A] border border-[#E2D9C8] dark:border-[#24304A]"
                >
                  <span className="w-7 h-7 rounded-lg bg-[#D9C9A3] text-[#0E1726] flex items-center justify-center font-bold text-xs mb-3">
                    {idx + 1}
                  </span>
                  <h4 className="text-xs font-bold">{step.title}</h4>
                  <p className="text-[11px] text-[#57657E] dark:text-[#9AA3B5] mt-1.5 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
