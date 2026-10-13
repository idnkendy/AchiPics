import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ARCH_ASSETS } from '../../data/mockAssets';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import {
  RefreshCw,
  Upload,
  Sparkles,
  Download,
  Home,
  Sliders,
  Sun,
  X,
} from 'lucide-react';

export const Renovation: React.FC = () => {
  const { deductCredits, addHistoryItem } = useApp();

  const [subTab, setSubTab] = useState<'facade' | 'living' | 'kitchen' | 'bath'>('facade');
  const [renovationLevel, setRenovationLevel] = useState('Đổi Mới Hoàn Toàn (Chỉ Giữ Kết Cấu)');
  const [targetStyle, setTargetStyle] = useState('Hiện Đại Nhiệt Đới (Tropical Modern)');
  const [materialOption, setMaterialOption] = useState('Lam gỗ nhựa ngoài trời + Đá ong xám');
  const [uploadedOld, setUploadedOld] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string>(ARCH_ASSETS.renovationAfter);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setUploadedOld(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    if (!deductCredits(45)) {
      alert('Không đủ Credits. Vui lòng nạp thêm!');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setResultImage(ARCH_ASSETS.renovationAfter);
      addHistoryItem({
        id: `reno-${Date.now()}`,
        tool: 'Renovation',
        prompt: `Cải tạo ${subTab} sang phong cách ${targetStyle}, vật liệu ${materialOption}`,
        resultImage: ARCH_ASSETS.renovationAfter,
        originalImage: uploadedOld || undefined,
        createdAt: new Date().toLocaleString(),
        isFavorite: false,
        aspectRatio: '16:9',
        cost: 45,
      });
    }, 2200);
  };

  return (
    <div className="h-[calc(100vh-112px)] overflow-hidden flex flex-col lg:flex-row bg-[#0E1726]">
      {/* LEFT PANEL */}
      <div className="w-full lg:w-[460px] h-full overflow-y-auto border-r border-[#24304A] bg-[#121D30] p-5 space-y-6 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <RefreshCw className="w-4 h-4 text-[#DDCDA8]" />
            <h2 className="text-base font-bold text-[#F1ECE2]">
              Cải Tạo Không Gian & Mặt Tiền AI
            </h2>
          </div>
          <p className="text-xs text-[#9AA3B5]">
            Giữ nguyên kết cấu dầm cột chịu lực gốc, tái thiết toàn bộ vật liệu, ban công và màu sơn hiện đại
          </p>
        </div>

        {/* 4 Tabs */}
        <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-[#111B2D] border border-[#24304A]">
          <button
            onClick={() => setSubTab('facade')}
            className={`py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
              subTab === 'facade'
                ? 'bg-[#D9C9A3] text-[#0E1726] shadow-sm'
                : 'text-[#9AA3B5] hover:text-[#F1ECE2]'
            }`}
          >
            Mặt Tiền
          </button>
          <button
            onClick={() => setSubTab('living')}
            className={`py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
              subTab === 'living'
                ? 'bg-[#D9C9A3] text-[#0E1726] shadow-sm'
                : 'text-[#9AA3B5] hover:text-[#F1ECE2]'
            }`}
          >
            Phòng Khách
          </button>
          <button
            onClick={() => setSubTab('kitchen')}
            className={`py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
              subTab === 'kitchen'
                ? 'bg-[#D9C9A3] text-[#0E1726] shadow-sm'
                : 'text-[#9AA3B5] hover:text-[#F1ECE2]'
            }`}
          >
            Phòng Bếp
          </button>
          <button
            onClick={() => setSubTab('bath')}
            className={`py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
              subTab === 'bath'
                ? 'bg-[#D9C9A3] text-[#0E1726] shadow-sm'
                : 'text-[#9AA3B5] hover:text-[#F1ECE2]'
            }`}
          >
            Sân Vườn
          </button>
        </div>

        {/* Upload Existing Photo */}
        <div>
          <label className="text-xs font-semibold text-[#F1ECE2] block mb-2">
            1. Tải ảnh hiện trạng công trình cần cải tạo
          </label>
          {uploadedOld ? (
            <div className="relative rounded-xl overflow-hidden border border-[#D9C9A3]/40 aspect-video bg-[#111B2D]">
              <img src={uploadedOld} alt="Old status preview" className="w-full h-full object-cover" />
              <button
                onClick={() => setUploadedOld(null)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/80 text-white hover:text-rose-400 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#24304A] hover:border-[#D9C9A3] rounded-2xl bg-[#111B2D]/60 hover:bg-[#111B2D] transition-all cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-[#D9C9A3] text-[#0E1726] flex items-center justify-center mb-2 shadow-sm font-bold">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-[#F1ECE2]">Kéo thả ảnh hiện trạng nhà cũ vào đây</p>
              <p className="text-[10px] text-[#646E84] mt-1">Ảnh chụp thực tế từ điện thoại hoặc flycam</p>
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            </label>
          )}
        </div>

        {/* Configurations */}
        <div className="space-y-4 pt-2 border-t border-[#24304A]">
          <div>
            <label className="text-xs font-medium text-[#9AA3B5] block mb-1.5">
              2. Mức độ can thiệp cải tạo
            </label>
            <select
              value={renovationLevel}
              onChange={(e) => setRenovationLevel(e.target.value)}
              className="w-full text-xs font-medium bg-[#111B2D] border border-[#24304A] text-[#F1ECE2] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#D9C9A3]"
            >
              <option value="Đổi Mới Hoàn Toàn (Chỉ Giữ Kết Cấu)">Đổi Mới Hoàn Toàn (Chỉ Giữ Khung Bê Tông Cốt Thép)</option>
              <option value="Cải Tạo Nhẹ (Màu Sơn & Cây Xanh)">Cải Tạo Nhẹ (Giữ Cửa, Sơn Lại Tường & Thêm Cây)</option>
              <option value="Mở Rộng Không Gian Kính">Thay Tường Bê Tông Bằng Hệ Kính Tràn Viền</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-[#9AA3B5] block mb-1.5">
              3. Định hướng phong cách mới
            </label>
            <select
              value={targetStyle}
              onChange={(e) => setTargetStyle(e.target.value)}
              className="w-full text-xs font-medium bg-[#111B2D] border border-[#24304A] text-[#F1ECE2] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#D9C9A3]"
            >
              <option value="Hiện Đại Nhiệt Đới (Tropical Modern)">Hiện Đại Nhiệt Đới (Tropical Modern & Vườn Treo)</option>
              <option value="Indochine Heritage">Đông Dương Sang Trọng (Indochine Heritage)</option>
              <option value="Modern Luxury Minimalist">Tối Giản Hiện Đại (Luxury Minimalist)</option>
              <option value="Industrial Cafe Vibe">Công Nghiệp Cafe (Gạch Trần & Thép Đen)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-[#9AA3B5] block mb-1.5">
              4. Vật liệu chủ đạo mặt đứng
            </label>
            <select
              value={materialOption}
              onChange={(e) => setMaterialOption(e.target.value)}
              className="w-full text-xs font-medium bg-[#111B2D] border border-[#24304A] text-[#F1ECE2] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#D9C9A3]"
            >
              <option value="Lam gỗ nhựa ngoài trời + Đá ong xám">Lam Gỗ Nhựa Ngoài Trời + Ốp Đá Ong Xám Tự Nhiên</option>
              <option value="Sơn hiệu ứng bê tông mài + Kính màu khói">Sơn Hiệu Ứng Bê Tông Mài + Hệ Kính Low-E</option>
              <option value="Gạch thông gió bánh ú trắng + Kim loại đen">Gạch Thông Gió Mỹ Thuật + Thép Hộp Sơn Tĩnh Điện</option>
            </select>
          </div>
        </div>

        {/* Generate Action */}
        <div className="pt-3">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[#9AA3B5]">Chi phí thực hiện</span>
            <span className="font-extrabold text-[#DDCDA8]">45 Credits</span>
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
                <span>Đang phân tích hiện trạng & cải tạo...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Khởi Tạo Phương Án Cải Tạo</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* RIGHT PANEL - SLIDER DISPLAY */}
      <div className="flex-1 h-full overflow-y-auto p-4 sm:p-6 flex flex-col justify-between bg-[#0E1726]">
        <div className="max-w-4xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between border-b border-[#24304A] pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#F1ECE2]">So Sánh Trực Quan Trước / Sau Cải Tạo</h3>
              <p className="text-xs text-[#9AA3B5]">Kéo thanh trượt để cảm nhận sự chuyển mình của công trình</p>
            </div>
            <a
              href={resultImage}
              download="RENOVATION_RENDER.png"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D9C9A3] hover:bg-[#E4D5B2] text-[#0E1726] text-xs font-bold transition-all shadow-md shadow-[#D9C9A3]/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải Ảnh 4K</span>
            </a>
          </div>

          {/* Interactive Slider */}
          <div className="pt-2">
            <BeforeAfterSlider
              beforeImage={uploadedOld || ARCH_ASSETS.renovationBefore}
              afterImage={resultImage}
              beforeLabel="Hiện Trạng Cũ"
              afterLabel="Phương Án Cải Tạo AI"
              className="aspect-16/10 rounded-2xl overflow-hidden border border-[#24304A] shadow-2xl"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-[#16213A] border border-[#24304A]">
              <h4 className="text-xs font-bold text-[#9AA3B5] uppercase tracking-wider mb-1">
                Hiện Trạng Cũ
              </h4>
              <p className="text-xs text-[#F1ECE2]">
                Tường sơn cũ xuống cấp, rêu mốc, lan can sắt gỉ sét, thiếu ánh sáng tự nhiên.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#16213A] border border-[#D9C9A3]/40 shadow-sm">
              <h4 className="text-xs font-bold text-[#DDCDA8] uppercase tracking-wider mb-1">
                Phương Án Cải Tạo AI
              </h4>
              <p className="text-xs text-[#F1ECE2]">
                Ốp tấm lam gỗ Conwood chịu nước, kính tràn viền hộp low-E và ban công cây xanh nhiệt đới.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
