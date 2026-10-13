import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ImageZoomModal } from '../common/ImageZoomModal';
import {
  Search,
  Bookmark,
  Download,
  Trash2,
  Sparkles,
  Calendar,
  Layers,
} from 'lucide-react';

export const HistoryPanel: React.FC = () => {
  const { historyList, toggleFavorite, deleteHistoryItem, setActiveRoute } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedToolFilter, setSelectedToolFilter] = useState('ALL');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [selectedPreviewImage, setSelectedPreviewImage] = useState<string | null>(null);

  const filteredItems = historyList.filter((item) => {
    const matchesSearch = item.prompt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTool =
      selectedToolFilter === 'ALL' || item.tool.toLowerCase().includes(selectedToolFilter.toLowerCase());
    const matchesFav = !onlyFavorites || item.isFavorite;
    return matchesSearch && matchesTool && matchesFav;
  });

  return (
    <div className="h-[calc(100vh-104px)] overflow-y-auto p-4 sm:p-8 bg-[#121212]">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#302839]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Lịch Sử Tạo Ảnh Kiến Trúc
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Quản lý và tải lại toàn bộ các phối cảnh bạn đã thực hiện cùng OPZEN AI
            </p>
          </div>

          <button
            onClick={() => setActiveRoute('/image')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#7f13ec] to-[#9d4edd] hover:opacity-95 text-white text-xs font-bold shadow-md shadow-[#7f13ec]/30 cursor-pointer"
          >
            <span>Tạo ảnh mới</span>
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Tìm kiếm theo từ khóa prompt, vật liệu, phong cách..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#191919] border border-[#302839] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7f13ec]"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedToolFilter}
              onChange={(e) => setSelectedToolFilter(e.target.value)}
              className="text-xs bg-[#191919] border border-[#302839] text-white rounded-xl px-3 py-2 cursor-pointer focus:outline-none focus:border-[#7f13ec]"
            >
              <option value="ALL">Tất cả công cụ</option>
              <option value="render">Render Phối Cảnh</option>
              <option value="FloorPlan">Floor Plan 3D</option>
              <option value="Renovation">Cải Tạo Không Gian</option>
              <option value="ViewSync">ViewSync</option>
            </select>

            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border transition-colors cursor-pointer ${
                onlyFavorites
                  ? 'bg-gradient-to-r from-[#7f13ec] to-[#9d4edd] border-transparent text-white'
                  : 'bg-[#191919] border-[#302839] text-gray-400 hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Yêu thích ({historyList.filter((h) => h.isFavorite).length})</span>
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center bg-[#191919] rounded-2xl border border-[#302839]">
            <Sparkles className="w-10 h-10 text-purple-400/40 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">Chưa tìm thấy ảnh render nào</h3>
            <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
              Hãy thử tìm kiếm với từ khóa khác hoặc bấm Tạo ảnh mới để khởi động dự án tiếp theo.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden bg-[#191919] border border-[#302839] hover:border-[#7f13ec] transition-all flex flex-col justify-between"
              >
                {/* Thumbnail */}
                <div
                  onClick={() => setSelectedPreviewImage(item.resultImage)}
                  className="relative aspect-4/3 overflow-hidden bg-black cursor-pointer"
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
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/75 text-[10px] text-purple-400 font-bold">
                    -{item.cost || 30} cr
                  </span>
                </div>

                {/* Info & Prompt */}
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                    {item.prompt}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-[#302839] flex items-center justify-between text-[11px] text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-purple-400" />
                      <span>{item.createdAt.split(' ')[0]}</span>
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleFavorite(item.id)}
                        className={`p-1.5 rounded-lg hover:bg-white/10 ${
                          item.isFavorite ? 'text-purple-400' : 'text-gray-400'
                        }`}
                        title="Yêu thích"
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>

                      <a
                        href={item.resultImage}
                        download={`OPZEN_${item.id}.png`}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
                        title="Tải về"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => deleteHistoryItem(item.id)}
                        className="p-1.5 rounded-lg hover:bg-rose-950/40 text-gray-400 hover:text-rose-400"
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
