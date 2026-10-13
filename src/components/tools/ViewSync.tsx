import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ARCH_ASSETS } from '../../data/mockAssets';
import {
  Eye,
  Camera,
  Upload,
  Sparkles,
  Download,
  RefreshCw,
  Sliders,
  Layers,
} from 'lucide-react';

export const ViewSync: React.FC = () => {
  const { deductCredits, addHistoryItem } = useApp();

  const [mode, setMode] = useState<'sync' | 'creative' | 'batch'>('sync');
  const [sourceAngle, setSourceAngle] = useState('Góc chính diện (Front View)');
  const [targetAngle, setTargetAngle] = useState('Góc 45 độ từ bên hông (Side 45°)');
  const [uploadedBase, setUploadedBase] = useState<string | null>(ARCH_ASSETS.heroVilla);
  const [isGenerating, setIsGenerating] = useState(false);

  const [syncedViews, setSyncedViews] = useState<{ angle: string; image: string }[]>([
    { angle: 'Góc Chính Diện (Front)', image: ARCH_ASSETS.heroVilla },
    { angle: 'Góc Nghiêng 45° Bên Phải', image: ARCH_ASSETS.heroInterior },
    { angle: 'Góc Nhìn Từ Trên Cao (Bird Eye)', image: ARCH_ASSETS.landscapeUrban },
    { angle: 'Phối Cảnh Ban Đêm Có Đèn', image: ARCH_ASSETS.renovationAfter },
  ]);

  const handleGenerate = () => {
    if (!deductCredits(50)) {
      alert('Không đủ Credits. Vui lòng nạp thêm!');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      addHistoryItem({
        id: `vs-${Date.now()}`,
        tool: 'ViewSync',
        prompt: `Đồng bộ góc nhìn ${sourceAngle} sang ${targetAngle}`,
        resultImage: syncedViews[0].image,
        createdAt: new Date().toLocaleString(),
        isFavorite: false,
        aspectRatio: '16:9',
        cost: 50,
      });
    }, 2200);
  };

  return (
    <div className="h-[calc(100vh-112px)] overflow-hidden flex flex-col lg:flex-row bg-[#0E1726]">
      {/* LEFT PANEL */}
      <div className="w-full lg:w-[460px] h-full overflow-y-auto border-r border-[#24304A] bg-[#121D30] p-5 space-y-6 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Camera className="w-4 h-4 text-[#DDCDA8]" />
            <h2 className="text-base font-bold text-[#F1ECE2]">
              ViewSync — Đồng Bộ Đa Góc Nhìn
            </h2>
          </div>
          <p className="text-xs text-[#9AA3B5]">
            Giữ nguyên 100% hình khối kiến trúc và vật liệu khi xoay camera sang các góc nhìn khác nhau
          </p>
        </div>

        {/* 3 Modes: Sync / Creative / Batch */}
        <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-[#111B2D] border border-[#24304A]">
          <button
            onClick={() => setMode('sync')}
            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'sync' ? 'bg-[#D9C9A3] text-[#0E1726] shadow-xs' : 'text-[#9AA3B5] hover:text-[#F1ECE2]'
            }`}
          >
            Đồng bộ (Sync)
          </button>
          <button
            onClick={() => setMode('creative')}
            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'creative' ? 'bg-[#D9C9A3] text-[#0E1726] shadow-xs' : 'text-[#9AA3B5] hover:text-[#F1ECE2]'
            }`}
          >
            Sáng tạo góc
          </button>
          <button
            onClick={() => setMode('batch')}
            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'batch' ? 'bg-[#D9C9A3] text-[#0E1726] shadow-xs' : 'text-[#9AA3B5] hover:text-[#F1ECE2]'
            }`}
          >
            Batch 4 góc
          </button>
        </div>

        {/* Base Image */}
        <div>
          <label className="text-xs font-bold text-[#F1ECE2] block mb-2">
            Ảnh kiến trúc chuẩn (Góc neo giữ)
          </label>
          <div className="relative rounded-xl overflow-hidden border border-[#D9C9A3]/40 aspect-video bg-[#111B2D]">
            <img src={uploadedBase || ARCH_ASSETS.heroVilla} alt="Base View" className="w-full h-full object-cover" />
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px]">
              Góc chuẩn gốc
            </span>
          </div>
        </div>

        {/* Angle Selectors */}
        <div className="space-y-4 pt-2 border-t border-[#24304A]">
          <div>
            <label className="text-xs font-semibold text-[#9AA3B5] block mb-1.5">
              Góc máy nguồn hiện tại
            </label>
            <select
              value={sourceAngle}
              onChange={(e) => setSourceAngle(e.target.value)}
              className="w-full text-xs bg-[#111B2D] border border-[#24304A] rounded-xl px-3 py-2 text-[#F1ECE2] focus:outline-none focus:border-[#D9C9A3] cursor-pointer"
            >
              <option value="Góc chính diện (Front View)">Góc chính diện (Front View)</option>
              <option value="Góc nghiêng 45 độ bên trái (Left 45°)">Góc nghiêng 45° bên trái</option>
              <option value="Góc nghiêng 45 độ bên phải (Right 45°)">Góc nghiêng 45° bên phải</option>
              <option value="Góc mắt chim từ trên cao (Bird Eye View)">Góc mắt chim từ trên cao (Bird Eye View)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#9AA3B5] block mb-1.5">
              Góc máy đích muốn AI sinh ra
            </label>
            <select
              value={targetAngle}
              onChange={(e) => setTargetAngle(e.target.value)}
              className="w-full text-xs bg-[#111B2D] border border-[#24304A] rounded-xl px-3 py-2 text-[#F1ECE2] focus:outline-none focus:border-[#D9C9A3] cursor-pointer"
            >
              <option value="Góc 45 độ từ bên hông (Side 45°)">Góc 45° từ bên hông (Side 45°)</option>
              <option value="Góc cận cảnh chi tiết sảnh vào">Góc cận cảnh chi tiết sảnh vào (Close-up)</option>
              <option value="Góc ngước từ dưới sân lên (Worm Eye)">Góc ngước từ dưới sân lên (Worm Eye)</option>
              <option value="Phối cảnh ban đêm thắp đèn nội thất">Phối cảnh ban đêm thắp đèn nội thất</option>
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[#9AA3B5]">Chi phí đồng bộ:</span>
            <span className="font-extrabold text-[#DDCDA8]">50 Credits</span>
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
                <span>Đang đồng bộ góc nhìn...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Khởi Tạo Góc Nhìn Mới</span>
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
              <h3 className="text-sm font-bold text-[#F1ECE2]">Bộ Ảnh Đa Góc Nhìn Đồng Bộ Nhất Quán</h3>
              <p className="text-xs text-[#9AA3B5]">Đảm bảo 100% hình khối kiến trúc không bị biến dạng</p>
            </div>
            <button
              onClick={() => alert('Đã chuẩn bị tệp tải xuống tất cả góc nhìn!')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D9C9A3] hover:bg-[#E4D5B2] text-[#0E1726] text-xs font-bold transition-all shadow-md shadow-[#D9C9A3]/20 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải Toàn Bộ 4K</span>
            </button>
          </div>

          {/* Grid of Views */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {syncedViews.map((item, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl overflow-hidden border border-[#24304A] bg-[#121D30] aspect-16/10 shadow-lg group hover:border-[#D9C9A3]/50 transition-colors"
              >
                <img src={item.image} alt={item.angle} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#F1ECE2]">{item.angle}</span>
                  <a
                    href={item.image}
                    download={`SYNC_VIEW_${idx + 1}.png`}
                    className="p-1.5 rounded-lg bg-[#D9C9A3] hover:bg-[#E4D5B2] text-[#0E1726] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
