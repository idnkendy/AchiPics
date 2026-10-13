import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RenderMode } from '../../types';
import { ARCH_ASSETS } from '../../data/mockAssets';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import { ImageZoomModal } from '../common/ImageZoomModal';
import {
  Building2,
  Armchair,
  MapPin,
  Trees,
  Upload,
  X,
  Plus,
  Sparkles,
  Download,
  Bookmark,
  RefreshCw,
  Maximize2,
  Wand2,
} from 'lucide-react';

const MODE_CARDS: {
  id: RenderMode;
  titleKey: string;
  descKey: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
}[] = [
  {
    id: 'architecture',
    titleKey: 'modeArchitecture',
    descKey: 'modeArchitectureDesc',
    icon: Building2,
    image: ARCH_ASSETS.heroVilla,
  },
  {
    id: 'interior',
    titleKey: 'modeInterior',
    descKey: 'modeInteriorDesc',
    icon: Armchair,
    image: ARCH_ASSETS.heroInterior,
  },
  {
    id: 'urban',
    titleKey: 'modeUrban',
    descKey: 'modeUrbanDesc',
    icon: MapPin,
    image: ARCH_ASSETS.landscapeUrban,
  },
  {
    id: 'landscape',
    titleKey: 'modeLandscape',
    descKey: 'modeLandscapeDesc',
    icon: Trees,
    image: ARCH_ASSETS.landscapeUrban,
  },
];

export const ImageGenerator: React.FC = () => {
  const { t, deductCredits, addHistoryItem, setActiveMainTool } = useApp();

  const [selectedMode, setSelectedMode] = useState<RenderMode | null>(null);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [refImages, setRefImages] = useState<string[]>([]);
  const [style, setStyle] = useState('Modern Minimalist');
  const [buildingType, setBuildingType] = useState('Biệt Thự Đơn Lập');
  const [lighting, setLighting] = useState('Hoàng hôn ấm áp (Golden Hour)');
  const [weather, setWeather] = useState('Trời trong xanh quang đãng');
  const [context, setContext] = useState('Khu đô thị sinh thái ven hồ');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [resolution, setResolution] = useState('2K');
  const [aiModel, setAiModel] = useState('Architectural Neural V2');
  const [imageCount, setImageCount] = useState<number>(2);
  const [hasWatermark, setHasWatermark] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>(
    'Biệt thự hiện đại 3 tầng, cấu trúc cantilever vươn dài, tường ốp gỗ sồi thermo và kính tràn viền, bể bơi vô cực phản chiếu ánh đèn hoàng hôn, cảnh quan nhiệt đới tối giản'
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'results' | 'guide'>('results');
  const [generatedImages, setGeneratedImages] = useState<string[]>([
    ARCH_ASSETS.heroVilla,
    ARCH_ASSETS.heroInterior,
  ]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAutoPrompt = () => {
    const prompts = [
      'Biệt thự hiện đại 3 tầng, hệ lam nhôm chắn nắng vân gỗ, cửa kính hộp low-E kịch trần, hồ bơi tràn bờ với gạch mosaic ngọc bích, ánh hoàng hôn vàng cam phản xạ trên mặt nước, render quang học chân thực 8k',
      'Phòng khách phong cách Japandi đương đại, tường hiệu ứng bê tông mài vi sợi, sofa cong bọc vải boucle tự nhiên, bàn trà travertine, ánh sáng khuếch tán từ giếng trời rọi vào mảng cây xanh',
      'Tòa nhà phức hợp thương mại 25 tầng, đường nét uốn lượn sinh học biophilic, vườn treo trên các tầng cao, quảng trường công cộng lát đá granite xám, người đi bộ sống động, trời chiều hoàng hôn',
    ];
    const picked = prompts[Math.floor(Math.random() * prompts.length)];
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
  };

  const handleRefUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && refImages.length < 3) {
      const reader = new FileReader();
      reader.onload = () => {
        setRefImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    const cost = imageCount * 15;
    const success = deductCredits(cost);
    if (!success) {
      alert('Bạn không đủ credits! Vui lòng nạp thêm để tiếp tục.');
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const newImages = [
        ARCH_ASSETS.heroVilla,
        ARCH_ASSETS.heroInterior,
        ARCH_ASSETS.renovationAfter,
        ARCH_ASSETS.landscapeUrban,
      ].slice(0, imageCount);

      setGeneratedImages(newImages);
      setSelectedResultIndex(0);
      setActiveTab('results');

      addHistoryItem({
        id: `gen-${Date.now()}`,
        tool: 'render',
        toolName: 'Tạo Ảnh Kiến Trúc AI',
        prompt,
        resultImage: newImages[0],
        originalImage: uploadedImage || undefined,
        createdAt: new Date().toLocaleString(),
        isFavorite: false,
        aspectRatio,
        style,
        cost,
      });
    }, 2200);
  };

  // 1. Mode Selection Dashboard (When no mode picked yet)
  if (!selectedMode) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[3px] text-[#DDCDA8] mb-2 inline-block px-3.5 py-1 rounded-full bg-[#121D30] border border-[#24304A]">
            Bước 1 / 2
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F1ECE2] tracking-tight mt-3">
            {t('modeSelectTitle')}
          </h2>
          <p className="text-sm text-[#9AA3B5] mt-2.5">
            Chọn không gian bạn muốn kiến tạo để hệ thống kích hoạt bộ thông số và phong cách tối ưu nhất
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MODE_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => setSelectedMode(card.id)}
                className="group relative rounded-2xl overflow-hidden border border-[#24304A] hover:border-[#D9C9A3]/50 bg-[#16213A] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#D9C9A3]/10 cursor-pointer flex flex-col"
              >
                <div className="relative aspect-video sm:aspect-4/3 overflow-hidden bg-[#111B2D]">
                  <img
                    src={card.image}
                    alt={t(card.titleKey)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 contrast-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16213A] via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 w-9 h-9 rounded-xl bg-[#D9C9A3] text-[#0E1726] flex items-center justify-center shadow-md font-bold group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#F1ECE2] group-hover:text-[#D9C9A3] transition-colors">
                      {t(card.titleKey)}
                    </h3>
                    <p className="text-xs text-[#9AA3B5] mt-2 leading-relaxed line-clamp-2">
                      {t(card.descKey)}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#24304A] flex items-center justify-between text-xs text-[#DDCDA8] font-semibold group-hover:text-[#F1ECE2]">
                    <span>Chọn chế độ này</span>
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. Tool Interface: 2 Columns
  return (
    <div className="h-[calc(100vh-112px)] overflow-hidden flex flex-col lg:flex-row bg-[#0E1726]">
      {/* LEFT PANEL */}
      <div className="w-full lg:w-[460px] xl:w-[490px] h-full overflow-y-auto border-r border-[#24304A] bg-[#121D30] p-5 space-y-6 shrink-0">
        {/* Mode Selector Dropdown Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#24304A]">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#DDCDA8]">
              Chế độ Tạo ảnh hiện tại
            </label>
            <div className="relative mt-1">
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value as RenderMode)}
                className="w-full text-xs font-bold text-[#F1ECE2] bg-[#111B2D] border border-[#24304A] rounded-xl px-3 py-2 cursor-pointer focus:outline-none focus:border-[#D9C9A3]"
              >
                <option value="architecture">🏢 Kiến trúc Ngoại thất</option>
                <option value="interior">🪑 Nội thất Không gian</option>
                <option value="urban">🗺️ Quy hoạch Đô thị</option>
                <option value="landscape">🌳 Cảnh quan Sân vườn</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => setSelectedMode(null)}
            className="text-xs text-[#9AA3B5] hover:text-[#F1ECE2] cursor-pointer"
          >
            Đổi giao diện
          </button>
        </div>

        {/* 1. Image Upload */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-[#F1ECE2] flex items-center gap-1.5">
              <span>📷 {t('uploadImage')}</span>
              <span className="text-[10px] text-[#646E84]">(Tùy chọn)</span>
            </label>
            {uploadedImage && (
              <button
                onClick={() => setUploadedImage(null)}
                className="text-[11px] text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3 h-3" />
                <span>Xóa ảnh</span>
              </button>
            )}
          </div>

          {uploadedImage ? (
            <div className="relative rounded-xl overflow-hidden border border-[#D9C9A3]/40 aspect-video bg-[#111B2D]">
              <img
                src={uploadedImage}
                alt="Source preview"
                className="w-full h-full object-contain"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[10px] text-white">
                Ảnh nguồn
              </div>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#24304A] hover:border-[#D9C9A3] rounded-2xl bg-[#111B2D]/60 hover:bg-[#111B2D] transition-all cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-[#D9C9A3] text-[#0E1726] flex items-center justify-center mb-2 shadow-sm font-bold">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-[#F1ECE2] text-center">
                {t('dragDropText')}
              </p>
              <p className="text-[11px] text-[#646E84] mt-1">
                {t('supportFormats')}
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* 2. Reference Images */}
        <div>
          <label className="text-xs font-semibold text-[#F1ECE2] block mb-2">
            📎 {t('referenceImages')}
          </label>
          <div className="grid grid-cols-4 gap-2">
            {refImages.map((ref, idx) => (
              <div
                key={idx}
                className="relative aspect-square rounded-xl overflow-hidden border border-[#24304A] bg-[#111B2D] group"
              >
                <img src={ref} alt={`Ref ${idx}`} className="w-full h-full object-cover" />
                <button
                  onClick={() => setRefImages((prev) => prev.filter((_, i) => i !== idx))}
                  className="absolute top-1 right-1 p-1 bg-black/80 rounded-full text-white hover:text-rose-400 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            {refImages.length < 3 && (
              <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-[#24304A] rounded-xl hover:border-[#D9C9A3] cursor-pointer bg-[#111B2D]/60 text-[#9AA3B5] hover:text-[#DDCDA8] transition-colors">
                <Plus className="w-5 h-5" />
                <span className="text-[10px] font-semibold mt-1">Thêm</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleRefUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* 3. Style & Architecture Options */}
        <div className="space-y-4 pt-2 border-t border-[#24304A]">
          <div>
            <label className="text-xs font-medium text-[#9AA3B5] block mb-1.5">
              🎨 {t('styleLabel')}
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full text-xs font-medium bg-[#111B2D] border border-[#24304A] text-[#F1ECE2] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#D9C9A3] cursor-pointer"
            >
              <option value="Modern Minimalist">Hiện đại Tối giản (Modern Minimalist)</option>
              <option value="Japandi">Japandi (Zen & Gỗ sồi tự nhiên)</option>
              <option value="Scandinavian">Bắc Âu (Scandinavian)</option>
              <option value="Indochine">Đông Dương (Indochine Heritage)</option>
              <option value="Industrial">Công nghiệp (Industrial Loft)</option>
              <option value="Neoclassical">Tân Cổ Điển (Neoclassical)</option>
              <option value="Tropical Modern">Nhiệt đới Hiện đại (Tropical Modern)</option>
              <option value="Brutalism">Bê tông thô mộc (Brutalism)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-[#9AA3B5] block mb-1.5">
              🏠 {t('buildingTypeLabel')}
            </label>
            <select
              value={buildingType}
              onChange={(e) => setBuildingType(e.target.value)}
              className="w-full text-xs font-medium bg-[#111B2D] border border-[#24304A] text-[#F1ECE2] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#D9C9A3] cursor-pointer"
            >
              <option value="Biệt Thự Đơn Lập">Biệt thự Đơn lập (Luxury Villa)</option>
              <option value="Nhà Phố Mặt Tiền">Nhà phố / Shophouse</option>
              <option value="Căn Hộ Penthouse">Căn hộ Penthouse</option>
              <option value="Tòa Nhà Văn Phòng">Tòa nhà Văn phòng / Thương mại</option>
              <option value="Quán Cafe / Nhà Hàng">Nhà hàng / Cafe / Showroom</option>
              <option value="Khu Nghỉ Dưỡng Resort">Khu Nghỉ Dưỡng / Bungalow</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-[#9AA3B5] block mb-1.5">
                🌤️ {t('lightingLabel')}
              </label>
              <select
                value={lighting}
                onChange={(e) => setLighting(e.target.value)}
                className="w-full text-xs font-medium bg-[#111B2D] border border-[#24304A] text-[#F1ECE2] rounded-xl px-3 py-2.5 cursor-pointer focus:outline-none focus:border-[#D9C9A3]"
              >
                <option value="Hoàng hôn ấm áp (Golden Hour)">Hoàng hôn (Golden Hour)</option>
                <option value="Ánh sáng ban ngày tự nhiên">Nắng sớm trong trẻo</option>
                <option value="Đèn ấm ban đêm (Night Lights)">Ban đêm đèn ấm</option>
                <option value="Trời râm mát khuếch tán">Ánh sáng khuếch tán</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-[#9AA3B5] block mb-1.5">
                🌧️ {t('weatherLabel')}
              </label>
              <select
                value={weather}
                onChange={(e) => setWeather(e.target.value)}
                className="w-full text-xs font-medium bg-[#111B2D] border border-[#24304A] text-[#F1ECE2] rounded-xl px-3 py-2.5 cursor-pointer focus:outline-none focus:border-[#D9C9A3]"
              >
                <option value="Trời trong xanh quang đãng">Trời quang mây</option>
                <option value="Mưa nhẹ mặt đường ướt phản chiếu">Mưa ướt phản chiếu</option>
                <option value="Sương mù sớm mơ màng">Sương mù ban mai</option>
                <option value="Nắng hè rực rỡ">Nắng hè nhiệt đới</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-[#9AA3B5] block mb-1.5">
                📏 {t('aspectRatioLabel')}
              </label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full text-xs font-medium bg-[#111B2D] border border-[#24304A] text-[#F1ECE2] rounded-xl px-3 py-2.5 cursor-pointer focus:outline-none focus:border-[#D9C9A3]"
              >
                <option value="16:9">16:9 (Phối cảnh ngang)</option>
                <option value="4:3">4:3 (Tiêu chuẩn)</option>
                <option value="1:1">1:1 (Vuông Instagram)</option>
                <option value="9:16">9:16 (Dọc TikTok/Reels)</option>
                <option value="3:4">3:4 (Chân dung)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-[#9AA3B5] block mb-1.5">
                📐 {t('resolutionLabel')}
              </label>
              <select
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                className="w-full text-xs font-medium bg-[#111B2D] border border-[#24304A] text-[#F1ECE2] rounded-xl px-3 py-2.5 cursor-pointer focus:outline-none focus:border-[#D9C9A3]"
              >
                <option value="Standard">Standard (1080p)</option>
                <option value="1K">1K (1440p)</option>
                <option value="2K">2K Ultra HD</option>
                <option value="4K">4K Studio Master</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-[#9AA3B5] block mb-1.5">
                🤖 Mô hình AI
              </label>
              <select
                value={aiModel}
                onChange={(e) => setAiModel(e.target.value)}
                className="w-full text-xs font-medium bg-[#111B2D] border border-[#24304A] text-[#F1ECE2] rounded-xl px-3 py-2.5 cursor-pointer focus:outline-none focus:border-[#D9C9A3]"
              >
                <option value="Architectural Neural V2">Architectural Neural V2</option>
                <option value="Studio Photoreal Pro">Studio Photoreal Pro</option>
                <option value="AchiRender 4.0 Ultra">AchiRender 4.0 Ultra</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-[#9AA3B5] block mb-1.5">
                💧 {t('watermarkLabel')}
              </label>
              <button
                type="button"
                onClick={() => setHasWatermark(!hasWatermark)}
                className={`w-full py-2.5 px-3 text-xs font-medium rounded-xl border transition-colors cursor-pointer ${
                  hasWatermark
                    ? 'bg-[#D9C9A3]/15 border-[#D9C9A3] text-[#DDCDA8] font-bold'
                    : 'bg-[#111B2D] border-[#24304A] text-[#9AA3B5]'
                }`}
              >
                {hasWatermark ? 'Có Watermark' : 'Không có'}
              </button>
            </div>
          </div>

          {/* Batch Count */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-[#9AA3B5]">
                🔢 {t('imageCountLabel')}
              </label>
              <span className="text-[11px] text-[#DDCDA8] font-bold">
                {imageCount} ảnh ({imageCount * 15} cr)
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setImageCount(num)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    imageCount === num
                      ? 'bg-[#D9C9A3] text-[#0E1726] border-[#D9C9A3] shadow-sm'
                      : 'bg-[#111B2D] border-[#24304A] text-[#9AA3B5] hover:text-[#F1ECE2] hover:bg-[#16213A]'
                  }`}
                >
                  {num} ảnh
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Prompt Textarea */}
        <div className="pt-2 border-t border-[#24304A]">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-[#F1ECE2]">
              ✏️ Mô tả Prompt
            </label>
            <button
              onClick={handleAutoPrompt}
              className="text-[11px] font-bold text-[#DDCDA8] hover:text-[#F1ECE2] flex items-center gap-1 cursor-pointer"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>{t('autoPromptBtn')}</span>
            </button>
          </div>

          <textarea
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t('promptPlaceholder')}
            className="w-full p-3 text-xs leading-relaxed bg-[#111B2D] border border-[#24304A] text-[#F1ECE2] rounded-xl focus:outline-none focus:border-[#D9C9A3] resize-y placeholder:text-[#646E84]"
          />
        </div>

        {/* 5. Generate Action Button */}
        <div className="pt-2 pb-6">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[#9AA3B5]">{t('costLabel')}</span>
            <span className="font-extrabold text-[#DDCDA8] tabular-nums">
              {imageCount * 15} Credits
            </span>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isGenerating
                ? 'bg-[#1C2944] text-[#646E84] cursor-not-allowed'
                : 'bg-[#D9C9A3] hover:bg-[#E4D5B2] text-[#0E1726] shadow-lg shadow-[#D9C9A3]/20 hover:scale-[1.01]'
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#0E1726]" />
                <span>{t('generatingBtn')}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{t('generateBtn')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* RIGHT PANEL (Result Display) */}
      <div className="flex-1 h-full overflow-y-auto p-4 sm:p-6 flex flex-col justify-between bg-[#0E1726]">
        <div className="max-w-4xl mx-auto w-full space-y-6">
          {/* Top Tabs */}
          <div className="flex items-center justify-between border-b border-[#24304A] pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('results')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'results'
                    ? 'bg-[#D9C9A3] text-[#0E1726] shadow-sm'
                    : 'text-[#9AA3B5] hover:text-[#F1ECE2]'
                }`}
              >
                {t('tabResults')}
              </button>
              <button
                onClick={() => setActiveTab('guide')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'guide'
                    ? 'bg-[#D9C9A3] text-[#0E1726] shadow-sm'
                    : 'text-[#9AA3B5] hover:text-[#F1ECE2]'
                }`}
              >
                {t('tabGuide')}
              </button>
            </div>

            <div className="text-[11px] text-[#9AA3B5] font-medium">
              Độ phân giải: <strong className="text-[#DDCDA8]">{resolution}</strong>
            </div>
          </div>

          {/* Tab Content: Guide */}
          {activeTab === 'guide' ? (
            <div className="bg-[#121D30] rounded-2xl border border-[#24304A] p-6 space-y-6">
              <h3 className="text-xl font-bold text-[#F1ECE2]">
                Hướng Dẫn Sử Dụng Tạo Ảnh Kiến Trúc
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#16213A] border border-[#24304A]">
                  <span className="w-7 h-7 rounded-lg bg-[#D9C9A3] text-[#0E1726] flex items-center justify-center font-bold text-xs mb-3">
                    1
                  </span>
                  <h4 className="text-xs font-bold text-[#F1ECE2]">Tải ảnh hoặc phác thảo</h4>
                  <p className="text-[11px] text-[#9AA3B5] mt-1.5 leading-relaxed">
                    Bạn có thể upload bản vẽ tay phác thảo, phối cảnh 3D thô (SketchUp/Revit) hoặc ảnh chụp hiện trạng công trình.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#16213A] border border-[#24304A]">
                  <span className="w-7 h-7 rounded-lg bg-[#D9C9A3] text-[#0E1726] flex items-center justify-center font-bold text-xs mb-3">
                    2
                  </span>
                  <h4 className="text-xs font-bold text-[#F1ECE2]">Chọn vật liệu & ánh sáng</h4>
                  <p className="text-[11px] text-[#9AA3B5] mt-1.5 leading-relaxed">
                    Tùy chọn phong cách Modern, Japandi, Indochine và các điều kiện thời tiết thực tế như hoàng hôn hay ban mai.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#16213A] border border-[#24304A]">
                  <span className="w-7 h-7 rounded-lg bg-[#D9C9A3] text-[#0E1726] flex items-center justify-center font-bold text-xs mb-3">
                    3
                  </span>
                  <h4 className="text-xs font-bold text-[#F1ECE2]">Xuất 4K & so sánh</h4>
                  <p className="text-[11px] text-[#9AA3B5] mt-1.5 leading-relaxed">
                    Xem ảnh kết quả siêu thực, kéo thanh trượt Before/After so sánh và tải ảnh về thuyết trình trực tiếp cho chủ đầu tư.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Tab Content: Results */
            <div className="space-y-6">
              {/* Main Result Image Display */}
              <div className="relative rounded-2xl overflow-hidden border border-[#24304A] bg-[#121D30] aspect-16/10 shadow-2xl group">
                <img
                  src={generatedImages[selectedResultIndex] || ARCH_ASSETS.heroVilla}
                  alt="Render output"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#0E1726]/85 backdrop-blur-md text-[#F1ECE2] text-[11px] font-bold border border-[#24304A]">
                    {resolution} Ultra HD
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#D9C9A3] text-[#0E1726] text-[11px] font-bold shadow-xs">
                    Kiến Trúc AI
                  </span>
                </div>

                <button
                  onClick={() => setIsZoomOpen(true)}
                  className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-[#121D30]/85 hover:bg-[#16213A] text-[#F1ECE2] backdrop-blur-md border border-[#24304A] hover:scale-105 transition-all cursor-pointer shadow-md"
                  title="Phóng to xem chi tiết"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnails */}
              {generatedImages.length > 1 && (
                <div className="flex items-center gap-3">
                  {generatedImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedResultIndex(idx)}
                      className={`relative w-20 sm:w-24 aspect-16/10 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedResultIndex === idx
                          ? 'border-[#D9C9A3] scale-105 shadow-md'
                          : 'border-[#24304A] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 right-1 text-[9px] font-bold px-1 rounded bg-[#0E1726]/85 text-[#F1ECE2]">
                        #{idx + 1}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
                <a
                  href={generatedImages[selectedResultIndex]}
                  download="ACHIPICS_AI_RENDER.png"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D9C9A3] hover:bg-[#E4D5B2] text-[#0E1726] text-xs font-bold shadow-md shadow-[#D9C9A3]/20 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t('btnDownload')}</span>
                </a>

                <button
                  onClick={() => alert('Đã chuẩn bị tệp nén ZIP cho toàn bộ bộ ảnh!')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#121D30] hover:bg-[#16213A] border border-[#24304A] text-[#F1ECE2] text-xs font-medium transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#9AA3B5]" />
                  <span>{t('btnDownloadAll')}</span>
                </button>

                <button
                  onClick={() => setActiveMainTool('viewsync')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#121D30] hover:bg-[#16213A] border border-[#24304A] hover:border-[#D9C9A3]/40 text-[#DDCDA8] text-xs font-medium transition-colors cursor-pointer"
                >
                  <span>→ Gửi sang ViewSync</span>
                </button>

                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    isFavorite
                      ? 'bg-[#D9C9A3] border-[#D9C9A3] text-[#0E1726]'
                      : 'bg-[#121D30] border-[#24304A] text-[#9AA3B5] hover:text-[#F1ECE2] hover:bg-[#16213A]'
                  }`}
                  title={t('btnFavorite')}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              {/* Before / After Comparator */}
              <div className="pt-6 border-t border-[#24304A]">
                <h4 className="text-xs font-bold text-[#F1ECE2] uppercase tracking-wider mb-3">
                  {t('beforeAfterTitle')}
                </h4>
                <BeforeAfterSlider
                  beforeImage={uploadedImage || ARCH_ASSETS.renovationBefore}
                  afterImage={generatedImages[selectedResultIndex]}
                  beforeLabel={uploadedImage ? 'Ảnh Gốc Tải Lên' : 'Hiện Trạng Phác Thảo'}
                  afterLabel="Kết Quả Tạo Ảnh AI"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <ImageZoomModal
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        imageUrl={generatedImages[selectedResultIndex] || ARCH_ASSETS.heroVilla}
        title="Bản Xem Phối Cảnh Chi Tiết 4K"
      />
    </div>
  );
};
