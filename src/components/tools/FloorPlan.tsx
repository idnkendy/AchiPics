import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ARCH_ASSETS } from '../../data/mockAssets';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import {
  Layers,
  Upload,
  Sparkles,
  Download,
  Building,
  Armchair,
  MapPin,
  Trees,
  RefreshCw,
  X,
} from 'lucide-react';

export const FloorPlan: React.FC = () => {
  const { deductCredits, addHistoryItem } = useApp();

  const [subTab, setSubTab] = useState<'arch' | 'interior' | 'urban' | 'landscape'>('arch');
  const [planType, setPlanType] = useState('Isometric 3D Cắt Lớp');
  const [flooring, setFlooring] = useState('Sàn gỗ sồi tự nhiên');
  const [wallStyle, setWallStyle] = useState('Tường trắng tối giản 200mm');
  const [lighting, setLighting] = useState('Ánh sáng ban ngày mềm mại');
  const [uploadedPlan, setUploadedPlan] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string>(ARCH_ASSETS.floorPlan3D);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setUploadedPlan(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    if (!deductCredits(40)) {
      alert('Không đủ Credits. Vui lòng nạp thêm!');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setResultImage(ARCH_ASSETS.floorPlan3D);
      addHistoryItem({
        id: `fp-${Date.now()}`,
        tool: 'FloorPlan',
        prompt: `Mặt bằng 3D phân khu ${subTab}: ${planType}, vật liệu ${flooring}`,
        resultImage: ARCH_ASSETS.floorPlan3D,
        originalImage: uploadedPlan || undefined,
        createdAt: new Date().toLocaleString(),
        isFavorite: false,
        aspectRatio: '4:3',
        cost: 40,
      });
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-112px)] overflow-hidden flex flex-col lg:flex-row bg-[#0E1726]">
      {/* LEFT CONTROLS */}
      <div className="w-full lg:w-[460px] h-full overflow-y-auto border-r border-[#24304A] bg-[#121D30] p-5 space-y-6 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-[#DDCDA8]" />
            <h2 className="text-base font-bold text-[#F1ECE2]">
              Chuyển Đổi Mặt Bằng 2D Sang 3D
            </h2>
          </div>
          <p className="text-xs text-[#9AA3B5]">
            Biến bản vẽ CAD, PDF mặt bằng kiến trúc thành phối cảnh 3D có nội thất chân thực
          </p>
        </div>

        {/* 4 Sub-Tabs */}
        <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-[#111B2D] border border-[#24304A]">
          <button
            onClick={() => setSubTab('arch')}
            className={`py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
              subTab === 'arch'
                ? 'bg-[#D9C9A3] text-[#0E1726] shadow-sm'
                : 'text-[#9AA3B5] hover:text-[#F1ECE2]'
            }`}
          >
            Kiến Trúc
          </button>
          <button
            onClick={() => setSubTab('interior')}
            className={`py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
              subTab === 'interior'
                ? 'bg-[#D9C9A3] text-[#0E1726] shadow-sm'
                : 'text-[#9AA3B5] hover:text-[#F1ECE2]'
            }`}
          >
            Nội Thất
          </button>
          <button
            onClick={() => setSubTab('urban')}
            className={`py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
              subTab === 'urban'
                ? 'bg-[#D9C9A3] text-[#0E1726] shadow-sm'
                : 'text-[#9AA3B5] hover:text-[#F1ECE2]'
            }`}
          >
            Quy Hoạch
          </button>
          <button
            onClick={() => setSubTab('landscape')}
            className={`py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
              subTab === 'landscape'
                ? 'bg-[#D9C9A3] text-[#0E1726] shadow-sm'
                : 'text-[#9AA3B5] hover:text-[#F1ECE2]'
            }`}
          >
            Cảnh Quan
          </button>
        </div>

        {/* Upload Box */}
        <div>
          <label className="text-xs font-semibold text-[#F1ECE2] block mb-2">
            1. Tải lên ảnh mặt bằng 2D (CAD / PDF / Vẽ tay)
          </label>
          {uploadedPlan ? (
            <div className="relative rounded-xl overflow-hidden border border-[#D9C9A3]/40 aspect-video bg-[#111B2D]">
              <img src={uploadedPlan} alt="Floor plan preview" className="w-full h-full object-contain" />
              <button
                onClick={() => setUploadedPlan(null)}
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
              <p className="text-xs font-semibold text-[#F1ECE2]">Bấm hoặc kéo thả mặt bằng vào đây</p>
              <p className="text-[10px] text-[#646E84] mt-1">Hỗ trợ PNG, JPG, CAD export, độ phân giải cao</p>
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            </label>
          )}
        </div>

        {/* Options */}
        <div className="space-y-4 pt-2 border-t border-[#24304A]">
          <div>
            <label className="text-xs font-medium text-[#9AA3B5] block mb-1.5">
              2. Kiểu phối cảnh 3D
            </label>
            <select
              value={planType}
              onChange={(e) => setPlanType(e.target.value)}
              className="w-full text-xs font-medium bg-[#111B2D] border border-[#24304A] text-[#F1ECE2] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#D9C9A3]"
            >
              <option value="Isometric 3D Cắt Lớp">Isometric 3D Cắt Lớp (Góc nhìn từ trên chéo 45°)</option>
              <option value="Perspective Phối Cảnh">Perspective Phối Cảnh Góc Rộng (Góc nhìn người đi)</option>
              <option value="Top-Down 3D View">Top-down 3D View (Mặt bằng từ trên nhìn thẳng có bóng đổ)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-[#9AA3B5] block mb-1.5">
              3. Loại sàn chính
            </label>
            <select
              value={flooring}
              onChange={(e) => setFlooring(e.target.value)}
              className="w-full text-xs font-medium bg-[#111B2D] border border-[#24304A] text-[#F1ECE2] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#D9C9A3]"
            >
              <option value="Sàn gỗ sồi tự nhiên">Sàn Gỗ Sồi Tự Nhiên (Light Oak Wood)</option>
              <option value="Gạch vân mây Calacatta">Gạch Đá Cẩm Thạch Vân Mây (Calacatta Marble)</option>
              <option value="Bê tông mài Terrazzo">Bê Tông Mài Terrazzo Hiện Đại</option>
              <option value="Gỗ công nghiệp màu hạt dẻ">Gỗ Óc Chó Sang Trọng (Walnut)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-[#9AA3B5] block mb-1.5">
              4. Chiều cao & kiểu tường
            </label>
            <select
              value={wallStyle}
              onChange={(e) => setWallStyle(e.target.value)}
              className="w-full text-xs font-medium bg-[#111B2D] border border-[#24304A] text-[#F1ECE2] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#D9C9A3]"
            >
              <option value="Tường trắng tối giản 200mm">Tường cắt lửng cao 1.2m hiển thị đồ đạc</option>
              <option value="Tường kính tràn viền trong suốt">Tường kính phân vùng trong suốt</option>
              <option value="Tường hoàn chỉnh có trần mở">Tường đầy đủ trần mở không gian</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-[#9AA3B5] block mb-1.5">
              5. Ánh sáng nội thất
            </label>
            <select
              value={lighting}
              onChange={(e) => setLighting(e.target.value)}
              className="w-full text-xs font-medium bg-[#111B2D] border border-[#24304A] text-[#F1ECE2] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#D9C9A3]"
            >
              <option value="Ánh sáng ban ngày mềm mại">Ban ngày tự nhiên (Soft Daylight)</option>
              <option value="Đèn trần & Led hắt ấm áp">Đèn trần ấm & dải led hắt khe (3000K)</option>
              <option value="Hoàng hôn chiều rọi qua cửa kính">Ánh hoàng hôn rọi xiên qua cửa sổ</option>
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-3">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[#9AA3B5]">Chi phí thực hiện</span>
            <span className="font-extrabold text-[#DDCDA8]">40 Credits</span>
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
                <span>Đang phân tích & dựng 3D...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Khởi Tạo 3D Floor Plan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* RIGHT DISPLAY */}
      <div className="flex-1 h-full overflow-y-auto p-4 sm:p-6 flex flex-col justify-between bg-[#0E1726]">
        <div className="max-w-4xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between border-b border-[#24304A] pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#F1ECE2]">Kết Quả Phối Cảnh 3D Mặt Bằng</h3>
              <p className="text-xs text-[#9AA3B5]">AI tự động phân bổ đồ nội thất, sàn và ánh sáng</p>
            </div>
            <a
              href={resultImage}
              download="3D_FLOORPLAN.png"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D9C9A3] hover:bg-[#E4D5B2] text-[#0E1726] text-xs font-bold transition-all shadow-md shadow-[#D9C9A3]/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải Ảnh 4K</span>
            </a>
          </div>

          {/* Main Visual */}
          <div className="rounded-2xl overflow-hidden border border-[#24304A] bg-[#121D30] aspect-4/3 shadow-2xl relative">
            <img
              src={resultImage}
              alt="3D Floor Plan Output"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#0E1726]/85 backdrop-blur-md text-[#F1ECE2] text-xs font-bold border border-[#24304A]">
              3D Isometric View · 4K Master
            </div>
          </div>

          {/* Before / After Slider */}
          <div className="pt-4 border-t border-[#24304A]">
            <h4 className="text-xs font-bold text-[#F1ECE2] uppercase tracking-wider mb-3">
              So Sánh Mặt Bằng 2D Gốc vs 3D Hoàn Thiện
            </h4>
            <BeforeAfterSlider
              beforeImage={uploadedPlan || ARCH_ASSETS.renovationBefore}
              afterImage={resultImage}
              beforeLabel="Bản vẽ 2D gốc"
              afterLabel="Mặt bằng 3D hoàn thiện"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
