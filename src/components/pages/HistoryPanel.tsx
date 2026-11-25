import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Search, Download, Trash2, Bookmark, Calendar } from 'lucide-react';
import { ImageZoomModal } from '../common/ImageZoomModal';

export const HistoryPanel: React.FC = () => {
  const { historyList, toggleFavorite, deleteHistoryItem, setActiveRoute } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedToolFilter, setSelectedToolFilter] = useState<string>('ALL');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [selectedPreviewImage, setSelectedPreviewImage] = useState<string | null>(null);

  const filteredItems = historyList.filter((item) => {
    const matchesSearch =
      item.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tool.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTool = selectedToolFilter === 'ALL' || item.tool === selectedToolFilter;
    const matchesFavorite = !onlyFavorites || item.isFavorite;

    return matchesSearch && matchesTool && matchesFavorite;
  });

  return (
    <div className="min-h-[calc(100vh-116px)] overflow-y-auto p-4 sm:p-8 bg-[#F8F5EE] dark:bg-[#0E1726] text-[#121D30] dark:text-[#F1ECE2]">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E2D9C8] dark:border-[#24304A]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif-display text-[#121D30] dark:text-[#F1ECE2]">
              Lịch Sử Tạo Ảnh Kiến Trúc
            </h1>
            <p className="text-xs text-[#57657E] dark:text-[#9AA3B5] mt-1">
              Quản lý và tải lại toàn bộ các phối cảnh bạn đã thực hiện cùng AchiPics
            </p>
          </div>

          <button
            onClick={() => setActiveRoute('/image')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D9C9A3] to-[#EDE2C8] hover:opacity-95 text-[#0E1726] text-xs font-bold shadow-md cursor-pointer transition-all"
          >
            <span>Tạo ảnh mới</span>
            <Sparkles className="w-3.5 h-3.5 text-[#0E1726]" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-[#57657E] dark:text-[#9AA3B5] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Tìm kiếm theo từ khóa prompt, vật liệu, phong cách..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#FFFFFF] dark:bg-[#121D30] border border-[#E2D9C8] dark:border-[#24304A] rounded-xl text-[#121D30] dark:text-[#F1ECE2] placeholder-[#8792A6] dark:placeholder-[#646E84] focus:outline-none focus:border-[#D9C9A3]"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedToolFilter}
              onChange={(e) => setSelectedToolFilter(e.target.value)}
              className="text-xs bg-[#FFFFFF] dark:bg-[#121D30] border border-[#E2D9C8] dark:border-[#24304A] text-[#121D30] dark:text-[#F1ECE2] rounded-xl px-3 py-2 cursor-pointer focus:outline-none focus:border-[#D9C9A3]"
            >
              <option value="ALL">Tất cả công cụ</option>
              <option value="render">Render Phối Cảnh</option>
              <option value="FloorPlan">Floor Plan 3D</option>
              <option value="Renovation">Cải Tạo Không Gian</option>
              <option value="ViewSync">ViewSync</option>
            </select>

            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                onlyFavorites
                  ? 'bg-[#D9C9A3] text-[#0E1726] border-[#D9C9A3]'
                  : 'bg-[#FFFFFF] dark:bg-[#121D30] border-[#E2D9C8] dark:border-[#24304A] text-[#57657E] dark:text-[#9AA3B5] hover:text-[#121D30] dark:hover:text-[#F1ECE2]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Yêu thích ({historyList.filter((h) => h.isFavorite).length})</span>
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center bg-[#FFFFFF] dark:bg-[#121D30] rounded-2xl border border-[#E2D9C8] dark:border-[#24304A]">
            <Sparkles className="w-10 h-10 text-[#D9C9A3]/50 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#121D30] dark:text-[#F1ECE2]">
              Chưa tìm thấy ảnh render nào
            </h3>
            <p className="text-xs text-[#57657E] dark:text-[#9AA3B5] mt-1 max-w-sm mx-auto">
              Hãy thử tìm kiếm với từ khóa khác hoặc bấm Tạo ảnh mới để khởi động dự án tiếp theo.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden bg-[#FFFFFF] dark:bg-[#121D30] border border-[#E2D9C8] dark:border-[#24304A] hover:border-[#D9C9A3] transition-all flex flex-col justify-between shadow-xs"
              >
                {/* Thumbnail */}
                <div
                  onClick={() => setSelectedPreviewImage(item.resultImage)}
                  className="relative aspect-4/3 overflow-hidden bg-[#111B2D] cursor-pointer"
                >
                  <img
                    src={item.resultImage}
                    alt={item.prompt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[10px] font-bold text-white border border-white/20">
                    {item.tool}
                  </span>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/75 text-[10px] text-[#DDCDA8] font-bold">
                    -{item.cost || 30} cr
                  </span>
                </div>

                {/* Info & Prompt */}
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-[#57657E] dark:text-[#CBD5E1] line-clamp-2 leading-relaxed">
                    {item.prompt}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-[#E2D9C8] dark:border-[#24304A] flex items-center justify-between text-[11px] text-[#57657E] dark:text-[#9AA3B5]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#8E733D] dark:text-[#D9C9A3]" />
                      <span>{item.createdAt.split(' ')[0]}</span>
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleFavorite(item.id)}
                        className={`p-1.5 rounded-lg hover:bg-[#F0EAE0] dark:hover:bg-white/10 cursor-pointer ${
                          item.isFavorite ? 'text-[#8E733D] dark:text-[#DDCDA8]' : 'text-[#57657E] dark:text-[#9AA3B5]'
                        }`}
                        title="Yêu thích"
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>

                      <a
                        href={item.resultImage}
                        download={`ACHIPICS_${item.id}.png`}
                        className="p-1.5 rounded-lg hover:bg-[#F0EAE0] dark:hover:bg-white/10 text-[#57657E] dark:text-[#9AA3B5] hover:text-[#121D30] dark:hover:text-[#F1ECE2]"
                        title="Tải về"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => deleteHistoryItem(item.id)}
                        className="p-1.5 rounded-lg hover:bg-rose-500/10 text-[#57657E] dark:text-[#9AA3B5] hover:text-rose-500 cursor-pointer"
                        title="Xóa"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ImageZoomModal
        isOpen={!!selectedPreviewImage}
        onClose={() => setSelectedPreviewImage(null)}
        imageUrl={selectedPreviewImage || ''}
        title="Xem Lại Phối Cảnh Lịch Sử"
      />
    </div>
  );
};
