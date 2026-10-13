import React from 'react';
import { X, Download, Share2, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title?: string;
}

export const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title = 'Bản Xem Chi Tiết 4K',
}) => {
  const [scale, setScale] = React.useState(1);

  if (!isOpen) return null;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `OPZEN_AI_RENDER_${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Top action bar */}
      <div className="flex items-center justify-between z-10 max-w-7xl mx-auto w-full">
        <div>
          <h3 className="text-white font-bold text-sm sm:text-base">{title}</h3>
          <span className="text-purple-400 text-xs">Phóng to xem từng chi tiết vật liệu & vân gỗ</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Thu nhỏ"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setScale((s) => Math.min(2.5, s + 0.25))}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Phóng to"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg gradient-purple text-white text-xs font-semibold shadow-lg hover:opacity-90 transition-opacity"
          >
            <Download className="w-4 h-4" />
            <span>Tải về</span>
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors ml-2"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Viewport */}
      <div className="flex-1 flex items-center justify-center overflow-auto p-4">
        <div
          className="transition-transform duration-200 ease-out origin-center max-w-full max-h-full"
          style={{ transform: `scale(${scale})` }}
        >
          <img
            src={imageUrl}
            alt={title}
            className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="text-center text-xs text-gray-400 pb-2">
        Nhấn ESC hoặc click nút đóng để quay lại workspace
      </div>
    </div>
  );
};
