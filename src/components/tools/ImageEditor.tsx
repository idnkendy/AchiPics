import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { ARCH_ASSETS } from '../../data/mockAssets';
import {
  Paintbrush,
  Eraser,
  Sparkles,
  Download,
  RotateCcw,
  RefreshCw,
  Edit3,
} from 'lucide-react';

export const ImageEditor: React.FC = () => {
  const { deductCredits, addHistoryItem } = useApp();

  const [activeTool, setActiveTool] = useState<'brush' | 'eraser'>('brush');
  const [brushSize, setBrushSize] = useState<number>(36);
  const [inpaintPrompt, setInpaintPrompt] = useState('Thay bàn trà mặt kính thành bàn trà tròn gỗ sồi tự nhiên phong cách Japandi');
  const [isGenerating, setIsGenerating] = useState(false);
  const [baseImage, setBaseImage] = useState<string>(ARCH_ASSETS.heroInterior);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.beginPath();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.lineWidth = brushSize;
    if (activeTool === 'brush') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = 'rgba(217, 201, 163, 0.65)';
    } else {
      ctx.globalCompositeOperation = 'destination-out';
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleClearMask = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleInpaint = () => {
    if (!deductCredits(25)) {
      alert('Không đủ Credits. Vui lòng nạp thêm!');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      handleClearMask();
      setBaseImage(ARCH_ASSETS.heroInterior);
      addHistoryItem({
        id: `editor-${Date.now()}`,
        tool: 'Editor Inpaint',
        prompt: inpaintPrompt,
        resultImage: ARCH_ASSETS.heroInterior,
        createdAt: new Date().toLocaleString(),
        isFavorite: false,
        aspectRatio: '16:9',
        cost: 25,
      });
      alert('Đã hoàn tất chỉnh sửa vùng chọn bằng AI Inpaint!');
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-112px)] overflow-hidden flex flex-col lg:flex-row bg-[#0E1726]">
      {/* LEFT CONTROLS */}
      <div className="w-full lg:w-[420px] h-full overflow-y-auto border-r border-[#24304A] bg-[#121D30] p-5 space-y-6 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Edit3 className="w-4 h-4 text-[#DDCDA8]" />
            <h2 className="text-base font-bold text-[#F1ECE2]">
              AI Inpaint & Brush Editor
            </h2>
          </div>
          <p className="text-xs text-[#9AA3B5]">
            Tô chọn vùng cần chỉnh sửa trực tiếp trên ảnh và yêu cầu AI thay đổi chi tiết
          </p>
        </div>

        {/* Brush & Eraser selection */}
        <div>
          <label className="text-xs font-bold text-[#F1ECE2] block mb-2">
            Công cụ vẽ mặt nạ (Mask)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveTool('brush')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                activeTool === 'brush'
                  ? 'bg-[#D9C9A3] text-[#0E1726] border-[#D9C9A3] shadow-sm'
                  : 'bg-[#111B2D] border-[#24304A] text-[#9AA3B5] hover:text-[#F1ECE2]'
              }`}
            >
              <Paintbrush className="w-4 h-4" />
              <span>Bút cọ (Brush)</span>
            </button>
            <button
              onClick={() => setActiveTool('eraser')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                activeTool === 'eraser'
                  ? 'bg-[#D9C9A3] text-[#0E1726] border-[#D9C9A3] shadow-sm'
                  : 'bg-[#111B2D] border-[#24304A] text-[#9AA3B5] hover:text-[#F1ECE2]'
              }`}
            >
              <Eraser className="w-4 h-4" />
              <span>Tẩy xóa (Eraser)</span>
            </button>
          </div>
        </div>

        {/* Brush Size Slider */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-[#9AA3B5]">Kích thước cọ</span>
            <span className="font-bold text-[#DDCDA8] tabular-nums">
              {brushSize}px
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-full accent-[#D9C9A3] cursor-pointer"
          />
        </div>

        <button
          onClick={handleClearMask}
          className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-[#9AA3B5] hover:text-rose-400 bg-[#111B2D] border border-[#24304A] rounded-xl transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Xóa sạch vùng chọn mặt nạ</span>
        </button>

        {/* Prompt */}
        <div className="pt-2 border-t border-[#24304A]">
          <label className="text-xs font-bold text-[#F1ECE2] block mb-1.5">
            Yêu cầu thay đổi vùng đã chọn (Inpaint Prompt)
          </label>
          <textarea
            rows={3}
            value={inpaintPrompt}
            onChange={(e) => setInpaintPrompt(e.target.value)}
            className="w-full p-3 text-xs leading-relaxed bg-[#111B2D] border border-[#24304A] text-[#F1ECE2] rounded-xl focus:outline-none focus:border-[#D9C9A3]"
          />
        </div>

        {/* Action Button */}
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[#9AA3B5]">Chi phí Inpaint:</span>
            <span className="font-extrabold text-[#DDCDA8]">25 Credits</span>
          </div>
          <button
            onClick={handleInpaint}
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
                <span>Đang xử lý Inpaint AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>CHẠY INPAINT VÙNG CHỌN</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* RIGHT CANVAS VIEWPORT */}
      <div className="flex-1 h-full overflow-hidden flex flex-col items-center justify-center p-6 bg-[#0E1726]">
        <div className="relative max-w-4xl w-full aspect-16/10 rounded-2xl overflow-hidden border-2 border-[#24304A] shadow-2xl bg-black">
          {/* Base image */}
          <img
            src={baseImage}
            alt="Canvas background"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          />

          {/* Interactive Mask Canvas Layer */}
          <canvas
            ref={canvasRef}
            width={1200}
            height={675}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
            className="absolute inset-0 w-full h-full cursor-crosshair z-10"
          />

          {/* Overlay Tip */}
          <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-md bg-[#0E1726]/85 backdrop-blur-md text-[#F1ECE2] text-xs font-semibold border border-[#24304A]">
            Dùng chuột/ngón tay tô màu lên vùng cần thay thế
          </div>
        </div>
      </div>
    </div>
  );
};
