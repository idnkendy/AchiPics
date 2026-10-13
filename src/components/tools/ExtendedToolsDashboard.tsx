import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExtendedToolType } from '../../types';
import { ARCH_ASSETS } from '../../data/mockAssets';
import {
  Wand2,
  Type,
  Edit3,
  Maximize2,
  FileText,
  Layers,
  Search,
  Sliders,
  Sparkles,
  RefreshCw,
  Palette,
  Compass,
  ArrowLeft,
  Upload,
  Download,
} from 'lucide-react';

interface ExtendedToolCardInfo {
  id: ExtendedToolType;
  title: string;
  desc: string;
  badge: string;
  image: string;
}

const EXTENDED_TOOLS: ExtendedToolCardInfo[] = [
  {
    id: 'rerender',
    title: 'ReRender Phối Cảnh',
    desc: 'Render lại ảnh cũ với phong cách, thời tiết hoặc góc sáng hoàn toàn mới.',
    badge: 'Phổ biến',
    image: ARCH_ASSETS.heroVilla,
  },
  {
    id: 'watermark-cleanup',
    title: 'Xóa Watermark & Logo',
    desc: 'Tự động phát hiện và tẩy sạch mọi watermark, chữ ký, logo bản quyền.',
    badge: 'AI Vision',
    image: ARCH_ASSETS.heroInterior,
  },
  {
    id: 'text-to-image',
    title: 'Text to Image Chuyên Sâu',
    desc: 'Tạo ảnh kiến trúc chỉ từ mô tả văn bản tiếng Việt hoặc tiếng Anh.',
    badge: 'Neural AI',
    image: ARCH_ASSETS.landscapeUrban,
  },
  {
    id: 'edit-by-note',
    title: 'Chỉnh Sửa Theo Ghi Chú',
    desc: 'Viết ghi chú trực tiếp lên các điểm cần sửa trên ảnh để AI thực thi.',
    badge: 'Interactive',
    image: ARCH_ASSETS.heroInterior,
  },
  {
    id: 'upscale',
    title: 'Upscale Độ Phân Giải 4K',
    desc: 'Tăng chi tiết ảnh render lên 2K, 4K siêu nét, phục vụ in ấn brochure khổ lớn.',
    badge: '4K Ultra',
    image: ARCH_ASSETS.heroVilla,
  },
  {
    id: 'real-estate-poster',
    title: 'Poster Bất Động Sản',
    desc: 'Tự động bố cục ảnh, thông số diện tích và tiêu đề quảng bá dự án sang trọng.',
    badge: 'Marketing',
    image: ARCH_ASSETS.renovationAfter,
  },
  {
    id: 'drawing-generator',
    title: 'Bản Vẽ Kỹ Thuật CAD',
    desc: 'Tự động bóc tách mặt đứng, bản vẽ nét kỹ thuật 2D từ ảnh phối cảnh 3D.',
    badge: 'Kỹ Thuật',
    image: ARCH_ASSETS.floorPlan3D,
  },
  {
    id: 'image-analysis',
    title: 'Phân Tích Thông Số Ảnh',
    desc: 'Phân tích bảng màu vật liệu, phong cách thiết kế, hướng sáng và tỷ lệ công trình.',
    badge: 'Chuyên Gia',
    image: ARCH_ASSETS.landscapeUrban,
  },
  {
    id: 'watermark-tool',
    title: 'Chèn Bản Quyền & Logo',
    desc: 'Đóng dấu bản quyền chữ ký hoặc logo công ty kiến trúc trước khi gửi khách.',
    badge: 'Bảo Vệ',
    image: ARCH_ASSETS.heroInterior,
  },
  {
    id: 'prompt-suggester',
    title: 'Gợi Ý Prompt Chuyên Sâu',
    desc: 'Tạo ra câu prompt kiến trúc chuẩn xác với từ vựng chuyên ngành KTS.',
    badge: 'Trợ Thủ',
    image: ARCH_ASSETS.heroVilla,
  },
  {
    id: 'material-change',
    title: 'Đổi Vật Liệu Bề Mặt',
    desc: 'Thay đổi gạch, đá hoa cương, kính hay gỗ trên bề mặt công trình tức thì.',
    badge: 'Vật Liệu',
    image: ARCH_ASSETS.renovationBefore,
  },
  {
    id: 'relighting',
    title: 'Thay Đổi Ánh Sáng',
    desc: 'Chuyển đổi ánh sáng giữa ban ngày, hoàng hôn rực rỡ và ban đêm đèn ấm.',
    badge: 'Ánh Sáng',
    image: ARCH_ASSETS.heroVilla,
  },
  {
    id: 'sketch-to-render',
    title: 'Phác Thảo Tay Sang 3D',
    desc: 'Biến nét vẽ phác bằng bút chì, bút kim trên giấy thành ảnh render 3D thực tế.',
    badge: 'Sáng Tạo',
    image: ARCH_ASSETS.floorPlan3D,
  },
];

export const ExtendedToolsDashboard: React.FC = () => {
  const {
    activeExtendedTool,
    setActiveExtendedTool,
    deductCredits,
    addHistoryItem,
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputImage, setOutputImage] = useState<string | null>(null);

  const currentToolInfo = EXTENDED_TOOLS.find((t) => t.id === activeExtendedTool);

  const handleRunTool = () => {
    if (!deductCredits(20)) {
      alert('Không đủ Credits. Vui lòng nạp thêm!');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOutputImage(ARCH_ASSETS.heroVilla);
      addHistoryItem({
        id: `ext-${Date.now()}`,
        tool: activeExtendedTool || 'extended',
        toolName: currentToolInfo?.title,
        prompt: inputVal || currentToolInfo?.title || '',
        resultImage: ARCH_ASSETS.heroVilla,
        createdAt: new Date().toLocaleString(),
        isFavorite: false,
        aspectRatio: '16:9',
        cost: 20,
      });
      alert(`Đã hoàn tất xử lý bằng công cụ: ${currentToolInfo?.title}!`);
    }, 2000);
  };

  // If a specific extended tool is clicked, render its dedicated workspace!
  if (activeExtendedTool) {
    return (
      <div className="h-[calc(100vh-112px)] overflow-y-auto p-4 sm:p-8 bg-[#0E1726]">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Back button */}
          <button
            onClick={() => setActiveExtendedTool(null)}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#DDCDA8] hover:text-[#F1ECE2] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Quay lại Dashboard Công Cụ Mở Rộng</span>
          </button>

          {/* Tool Card Header */}
          <div className="p-6 rounded-2xl bg-[#121D30] border border-[#24304A] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D9C9A3] text-[#0E1726] mb-2 inline-block">
                {currentToolInfo?.badge}
              </span>
              <h2 className="text-xl font-extrabold text-[#F1ECE2]">
                {currentToolInfo?.title}
              </h2>
              <p className="text-xs text-[#9AA3B5] mt-1">
                {currentToolInfo?.desc}
              </p>
            </div>
            <div className="text-xs font-bold text-[#DDCDA8] bg-[#16213A] px-3 py-1.5 rounded-xl border border-[#24304A]">
              Chi phí: 20 Credits
            </div>
          </div>

          {/* Interactive Tool Workspace */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Controls */}
            <div className="p-5 rounded-2xl bg-[#121D30] border border-[#24304A] space-y-4">
              <label className="text-xs font-bold text-[#F1ECE2] block">
                Tải ảnh hoặc thiết lập thông số
              </label>

              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#24304A] hover:border-[#D9C9A3] rounded-xl cursor-pointer bg-[#111B2D]/60 hover:bg-[#111B2D] transition-colors">
                <Upload className="w-6 h-6 text-[#DDCDA8] mb-2" />
                <span className="text-xs font-semibold text-[#F1ECE2]">
                  Tải ảnh để công cụ xử lý
                </span>
                <input type="file" className="hidden" />
              </label>

              <div>
                <label className="text-xs font-semibold text-[#9AA3B5] block mb-1">
                  Yêu cầu / Ghi chú bổ sung
                </label>
                <textarea
                  rows={3}
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Nhập thông tin tùy biến cho công cụ này..."
                  className="w-full p-2.5 text-xs bg-[#111B2D] border border-[#24304A] text-[#F1ECE2] rounded-xl focus:outline-none focus:border-[#D9C9A3]"
                />
              </div>

              <button
                onClick={handleRunTool}
                disabled={isProcessing}
                className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isProcessing
                    ? 'bg-[#1C2944] text-[#646E84] cursor-not-allowed'
                    : 'bg-[#D9C9A3] hover:bg-[#E4D5B2] text-[#0E1726] shadow-md shadow-[#D9C9A3]/20 hover:scale-[1.01]'
                }`}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#0E1726]" />
                    <span>Đang xử lý thuật toán AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>THỰC THI CÔNG CỤ</span>
                  </>
                )}
              </button>
            </div>

            {/* Output Preview */}
            <div className="p-5 rounded-2xl bg-[#121D30] border border-[#24304A] flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#F1ECE2] mb-3">
                  Kết Quả Đầu Ra
                </h4>
                <div className="relative aspect-video rounded-xl overflow-hidden border border-[#24304A] bg-[#111B2D]">
                  <img
                    src={outputImage || currentToolInfo?.image || ARCH_ASSETS.heroVilla}
                    alt="Output Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-white">
                    Kết quả 4K
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#24304A] flex items-center justify-between">
                <span className="text-[11px] text-[#9AA3B5]">Trạng thái: Hoàn tất</span>
                <a
                  href={outputImage || currentToolInfo?.image}
                  download="OUTPUT.png"
                  className="px-3 py-1.5 rounded-lg bg-[#D9C9A3] hover:bg-[#E4D5B2] text-[#0E1726] text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải ảnh</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, render the 13 Extended Tools Dashboard Grid!
  return (
    <div className="h-[calc(100vh-112px)] overflow-y-auto p-4 sm:p-8 bg-[#0E1726]">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#DDCDA8] bg-[#121D30] border border-[#24304A] px-3 py-1 rounded-full">
            Bộ Sưu Tập Công Cụ Mở Rộng
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F1ECE2] tracking-tight mt-3">
            Hệ Thống 13 Công Cụ Kiến Trúc Chuyên Sâu
          </h2>
          <p className="text-xs sm:text-sm text-[#9AA3B5] mt-2">
            Khám phá thêm các tính năng AI hỗ trợ từng công đoạn thiết kế, thuyết trình và quảng bá bất động sản
          </p>
        </div>

        {/* 13 Cards Grid (4 cols on xl, 3 on lg, 2 on sm, 1 on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {EXTENDED_TOOLS.map((tool) => (
            <div
              key={tool.id}
              onClick={() => setActiveExtendedTool(tool.id)}
              className="group bg-[#16213A] rounded-2xl border border-[#24304A] hover:border-[#D9C9A3]/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#D9C9A3]/10 cursor-pointer flex flex-col"
            >
              {/* Thumbnail with overlay badge */}
              <div className="relative aspect-video overflow-hidden bg-[#111B2D]">
                <img
                  src={tool.image}
                  alt={tool.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                />
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D9C9A3] text-[#0E1726] shadow-xs">
                  {tool.badge}
                </span>
              </div>

              {/* Description */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#F1ECE2] group-hover:text-[#D9C9A3] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-[11px] text-[#9AA3B5] mt-1.5 line-clamp-2 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-[#24304A] flex items-center justify-between text-[11px] font-bold text-[#DDCDA8] group-hover:text-[#F1ECE2]">
                  <span>Mở công cụ</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
