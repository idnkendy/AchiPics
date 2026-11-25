import React from 'react';
import { useApp } from '../../context/AppContext';
import { ExtendedToolType } from '../../types';
import { StudioWorkspace, StudioModeCard } from './StudioWorkspace';

import modeArchImg from '../../assets/images/mode_architecture_1794987577559.jpg';
import modeInteriorImg from '../../assets/images/mode_interior_1794987578425.jpg';
import modeUrbanImg from '../../assets/images/mode_urban_1794987578552.jpg';
import modeLandscapeImg from '../../assets/images/mode_landscape_1794987579660.jpg';
import floorplanIsoImg from '../../assets/images/floorplan_iso_1794989299592.jpg';
import renoFacadeImg from '../../assets/images/renovation_facade_1794989362282.jpg';

interface ExtendedToolCardInfo {
  id: ExtendedToolType;
  title: string;
  desc: string;
  badge: string;
  icon: string;
  image: string;
}

const EXTENDED_TOOLS: ExtendedToolCardInfo[] = [
  {
    id: 'rerender',
    title: 'ReRender Phối Cảnh',
    desc: 'Render lại ảnh cũ với phong cách, thời tiết hoặc góc sáng hoàn toàn mới.',
    badge: 'Phổ biến',
    icon: 'refresh',
    image: modeArchImg,
  },
  {
    id: 'text-to-image',
    title: 'Text to Image Chuyên Sâu',
    desc: 'Tạo ảnh kiến trúc chỉ từ mô tả văn bản tiếng Việt hoặc tiếng Anh.',
    badge: 'Neural AI',
    icon: 'text_fields',
    image: modeUrbanImg,
  },
  {
    id: 'edit-by-note',
    title: 'Chỉnh Sửa Theo Ghi Chú',
    desc: 'Viết ghi chú trực tiếp lên các điểm cần sửa trên ảnh để AI thực thi.',
    badge: 'Interactive',
    icon: 'edit_note',
    image: modeInteriorImg,
  },
  {
    id: 'upscale',
    title: 'Upscale Độ Phân Giải 4K',
    desc: 'Tăng chi tiết ảnh render lên 2K, 4K siêu nét, phục vụ in ấn brochure khổ lớn.',
    badge: '4K Ultra',
    icon: 'zoom_in',
    image: renoFacadeImg,
  },
  {
    id: 'real-estate-poster',
    title: 'Poster Bất Động Sản',
    desc: 'Tự động bố cục ảnh, thông số diện tích và tiêu đề quảng bá dự án sang trọng.',
    badge: 'Marketing',
    icon: 'campaign',
    image: modeArchImg,
  },
  {
    id: 'drawing-generator',
    title: 'Bản Vẽ Kỹ Thuật CAD',
    desc: 'Tự động bóc tách mặt đứng, bản vẽ nét kỹ thuật 2D từ ảnh phối cảnh 3D.',
    badge: 'Kỹ Thuật',
    icon: 'architecture',
    image: floorplanIsoImg,
  },
  {
    id: 'image-analysis',
    title: 'Phân Tích Thông Số Ảnh',
    desc: 'Phân tích bảng màu vật liệu, phong cách thiết kế, hướng sáng và tỷ lệ công trình.',
    badge: 'Chuyên Gia',
    icon: 'analytics',
    image: modeUrbanImg,
  },
  {
    id: 'prompt-suggester',
    title: 'Gợi Ý Prompt Chuyên Sâu',
    desc: 'Tạo ra câu prompt kiến trúc chuẩn xác với từ vựng chuyên ngành KTS.',
    badge: 'Trợ Thủ',
    icon: 'auto_fix_high',
    image: modeInteriorImg,
  },
  {
    id: 'material-change',
    title: 'Đổi Vật Liệu Bề Mặt',
    desc: 'Thay đổi gạch, đá hoa cương, kính hay gỗ trên bề mặt công trình tức thì.',
    badge: 'Vật Liệu',
    icon: 'texture',
    image: renoFacadeImg,
  },
  {
    id: 'relighting',
    title: 'Thay Đổi Ánh Sáng',
    desc: 'Chuyển đổi ánh sáng giữa ban ngày, hoàng hôn rực rỡ và ban đêm đèn ấm.',
    badge: 'Ánh Sáng',
    icon: 'wb_sunny',
    image: modeLandscapeImg,
  },
  {
    id: 'sketch-to-render',
    title: 'Phác Thảo Tay Sang 3D',
    desc: 'Biến nét vẽ phác bằng bút chì, bút kim trên giấy thành ảnh render 3D thực tế.',
    badge: 'Sáng Tạo',
    icon: 'draw',
    image: floorplanIsoImg,
  },
  {
    id: 'image-to-image',
    title: 'Image to Image Render',
    desc: 'Chuyển ảnh chụp mô hình thô hoặc SketchUp thành phối cảnh kiến trúc hoàn thiện.',
    badge: '3D Studio',
    icon: 'layers',
    image: modeArchImg,
  },
];

export const ExtendedToolsDashboard: React.FC = () => {
  const { activeExtendedTool, setActiveExtendedTool } = useApp();

  // If a specific extended tool is active, open it inside the unified StudioWorkspace!
  if (activeExtendedTool) {
    const modeCards: StudioModeCard[] = EXTENDED_TOOLS.map((item) => ({
      id: item.id,
      title: item.title,
      desc: item.desc,
      icon: item.icon,
      image: item.image,
    }));

    const autoPromptsByMode: Record<string, string[]> = {};
    const resultPoolsByMode: Record<string, string[]> = {};

    EXTENDED_TOOLS.forEach((item) => {
      autoPromptsByMode[item.id] = [
        `${item.title}: tối ưu ánh sáng tự nhiên, sắc nét vật liệu gỗ sồi, đá travertine và kính low-E chuẩn studio kiến trúc 4K`,
        `Áp dụng ${item.title} theo phong cách hiện đại tối giản, cân bằng tương phản sáng tối và chi tiết cảnh quan xanh`,
      ];
      resultPoolsByMode[item.id] = [
        item.image,
        modeArchImg,
        modeInteriorImg,
        renoFacadeImg,
      ];
    });

    const activeToolMeta = EXTENDED_TOOLS.find((t) => t.id === activeExtendedTool) || EXTENDED_TOOLS[0];

    return (
      <StudioWorkspace
        toolId={activeToolMeta.id}
        toolName={activeToolMeta.title}
        dashboardTitle="Công cụ Mở rộng AI"
        dashboardSubtitle="Chọn công cụ chuyên sâu cho từng bước thiết kế và diễn họa"
        modes={modeCards}
        initialMode={activeToolMeta.id}
        onModeChange={(modeId) => {
          if (modeId) setActiveExtendedTool(modeId as ExtendedToolType);
        }}
        onBackFromWorkspace={() => setActiveExtendedTool(null)}
        samples={[
          { title: 'Biệt thự hồ bơi hiện đại', image: modeArchImg },
          { title: 'Nội thất phòng khách Japandi', image: modeInteriorImg },
          { title: 'Mặt tiền cải tạo nhiệt đới', image: renoFacadeImg },
          { title: 'Mặt bằng 3D Isometric', image: floorplanIsoImg },
        ]}
        defaultPrompt={`${activeToolMeta.title}: giữ nguyên cấu trúc hình khối công trình, tăng cường độ nét vật liệu bề mặt và ánh sáng giờ vàng tự nhiên`}
        autoPromptsByMode={autoPromptsByMode}
        optionGroups={[
          {
            key: 'intensity',
            label: 'Cường độ xử lý AI',
            defaultValue: 'Cân bằng (70%)',
            options: [
              { value: 'Nhẹ nhàng (40%)', label: 'Nhẹ nhàng (40%)' },
              { value: 'Cân bằng (70%)', label: 'Cân bằng (70%)' },
              { value: 'Tối đa (95%)', label: 'Tối đa (95%)' },
            ],
          },
          {
            key: 'style',
            label: 'Định hướng thẩm mỹ',
            defaultValue: 'Hiện đại tối giản',
            options: [
              { value: 'Hiện đại tối giản', label: 'Hiện đại tối giản' },
              { value: 'Nhiệt đới sang trọng', label: 'Nhiệt đới sang trọng' },
              { value: 'Japandi ấm áp', label: 'Japandi ấm áp' },
            ],
          },
          {
            key: 'lighting',
            label: 'Ánh sáng',
            defaultValue: 'Giữ ánh sáng gốc',
            options: [
              { value: 'Giữ ánh sáng gốc', label: 'Giữ ánh sáng gốc' },
              { value: 'Hoàng hôn ấm', label: 'Hoàng hôn ấm áp' },
              { value: 'Ban ngày trong trẻo', label: 'Ban ngày trong trẻo' },
            ],
          },
          {
            key: 'detail',
            label: 'Độ chi tiết vật liệu',
            defaultValue: 'Studio siêu nét',
            options: [
              { value: 'Studio siêu nét', label: 'Studio siêu nét' },
              { value: 'Tự nhiên mềm mại', label: 'Tự nhiên mềm mại' },
            ],
          },
        ]}
        resultPoolsByMode={resultPoolsByMode}
        comparatorBeforeLabel="AI XỬ LÝ"
        comparatorAfterLabel="ẢNH GỐC"
        emptyHintText="Tải ảnh đầu vào ở Bước 1, điều chỉnh thông số và bấm BẮT ĐẦU RENDER để thực thi công cụ mở rộng."
        guideTitle={`Hướng dẫn ${activeToolMeta.title}`}
        guideSteps={[
          {
            title: 'Tải ảnh đầu vào',
            desc: 'Chọn ảnh phối cảnh, bản vẽ hoặc ảnh chụp cần xử lý bằng công cụ AI chuyên sâu.',
          },
          {
            title: 'Thiết lập thông số',
            desc: 'Nhập yêu cầu bổ sung, chọn cường độ AI, model và độ phân giải 1K–4K.',
          },
          {
            title: 'So sánh & tải kết quả',
            desc: 'Xem nhanh nhiều biến thể ở dải thumbnail và kéo thanh so sánh trước khi tải về.',
          },
        ]}
        downloadPrefix={`ACHIPICS_${activeToolMeta.id.toUpperCase()}`}
        zoomTitle={`Kết Quả — ${activeToolMeta.title}`}
      />
    );
  }

  // Otherwise, render the Extended Tools Dashboard Grid!
  return (
    <div className="min-h-[calc(100vh-116px)] p-4 sm:p-8 bg-[#F8F5EE] dark:bg-[#0E1726]">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[3px] text-[#8E733D] dark:text-[#DDCDA8] mb-2">
            AchiPics Studio
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121D30] dark:text-[#F1ECE2] tracking-tight">
            Hệ Thống Công Cụ Kiến Trúc Chuyên Sâu
          </h2>
          <p className="text-xs sm:text-sm text-[#57657E] dark:text-[#9AA3B5] mt-2.5">
            Khám phá thêm các công cụ AI hỗ trợ từng công đoạn thiết kế, thuyết trình và quảng bá bất động sản
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {EXTENDED_TOOLS.map((tool) => (
            <button
              key={tool.id}
              type="button"
              onClick={() => setActiveExtendedTool(tool.id)}
              className="group relative h-80 rounded-3xl overflow-hidden border border-[#E2D9C8] dark:border-[#24304A] hover:border-[#D9C9A3] text-left cursor-pointer shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={tool.image}
                alt={tool.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/15" />

              <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D9C9A3] text-[#0E1726] shadow-xs">
                {tool.badge}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">{tool.icon}</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{tool.title}</h3>
                  <p className="text-xs text-white/80 mt-1 leading-relaxed line-clamp-2">
                    {tool.desc}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D9C9A3] group-hover:gap-2.5 transition-all pt-0.5">
                  <span>Bắt đầu ngay</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
