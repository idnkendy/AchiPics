import React, { useState, useRef } from 'react';
import { ARCH_ASSETS } from '../../data/mockAssets';
import { StudioWorkspace, StudioViewportContext } from './StudioWorkspace';

import modeInteriorImg from '../../assets/images/mode_interior_1794987578425.jpg';
import modeArchImg from '../../assets/images/mode_architecture_1794987577559.jpg';
import renoFacadeImg from '../../assets/images/renovation_facade_1794989362282.jpg';
import modeLandscapeImg from '../../assets/images/mode_landscape_1794987579660.jpg';

export const ImageEditor: React.FC = () => {
  const [activeBrushTool, setActiveBrushTool] = useState<'brush' | 'eraser'>('brush');
  const [brushSize, setBrushSize] = useState<number>(36);
  const [viewportMode, setViewportMode] = useState<'mask' | 'compare'>('mask');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
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

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
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
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (activeBrushTool === 'brush') {
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

  const maskControls = (
    <div className="space-y-3 pb-3 border-b border-[#E2D9C8] dark:border-[#24304A]">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => {
            setActiveBrushTool('brush');
            setViewportMode('mask');
          }}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            activeBrushTool === 'brush'
              ? 'bg-[#D9C9A3] text-[#0E1726] border-[#D9C9A3] shadow-xs'
              : 'bg-[#FFFFFF] dark:bg-[#111B2D] border-[#E2D9C8] dark:border-[#24304A] text-[#57657E] dark:text-[#9AA3B5] hover:text-[#121D30] dark:hover:text-[#F1ECE2]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">brush</span>
          <span>Bút cọ (Mask)</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveBrushTool('eraser');
            setViewportMode('mask');
          }}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            activeBrushTool === 'eraser'
              ? 'bg-[#D9C9A3] text-[#0E1726] border-[#D9C9A3] shadow-xs'
              : 'bg-[#FFFFFF] dark:bg-[#111B2D] border-[#E2D9C8] dark:border-[#24304A] text-[#57657E] dark:text-[#9AA3B5] hover:text-[#121D30] dark:hover:text-[#F1ECE2]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">ink_eraser</span>
          <span>Tẩy xóa</span>
        </button>
      </div>

      <div>
        <div className="flex items-center justify-between text-[11px] mb-1">
          <span className="font-semibold text-[#57657E] dark:text-[#9AA3B5]">Kích thước cọ</span>
          <span className="font-bold text-[#8E733D] dark:text-[#DDCDA8] tabular-nums">
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
        type="button"
        onClick={handleClearMask}
        className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-[#57657E] dark:text-[#9AA3B5] hover:text-rose-500 bg-[#FFFFFF] dark:bg-[#111B2D] border border-[#E2D9C8] dark:border-[#24304A] rounded-xl transition-colors cursor-pointer"
      >
        <span className="material-symbols-outlined text-[15px]">restart_alt</span>
        <span>Xóa sạch vùng chọn mặt nạ</span>
      </button>
    </div>
  );

  const renderMaskOrCustomViewport = (ctx: StudioViewportContext) => {
    if (!ctx.uploadedImage) {
      return null;
    }

    // When results exist and user switched to Compare mode, let StudioWorkspace show BeforeAfterSlider
    if (ctx.generatedImages.length > 0 && viewportMode === 'compare') {
      return null;
    }

    return (
      <div className="w-full h-full relative flex items-center justify-center bg-[#FAF7F0] dark:bg-[#0E1726]">
        <img
          src={ctx.uploadedImage}
          alt="Ảnh nền vẽ Mask"
          className="w-full h-full object-contain pointer-events-none select-none"
        />
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
        <div className="absolute top-3 left-3 z-20 px-3 py-1.5 rounded-lg bg-[#0E1726]/80 backdrop-blur-md text-[#F1ECE2] text-xs font-semibold border border-[#D9C9A3]/30 pointer-events-none">
          Tô trực tiếp lên vùng cần chỉnh sửa trên ảnh
        </div>
      </div>
    );
  };

  const renderTopBarToggle = (ctx: StudioViewportContext) => {
    if (!ctx.uploadedImage || ctx.generatedImages.length === 0) return null;
    return (
      <div className="inline-flex items-center p-0.5 rounded-xl bg-[#FAF7F0] dark:bg-[#16213A] border border-[#E2D9C8] dark:border-[#24304A]">
        <button
          type="button"
          onClick={() => setViewportMode('compare')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
            viewportMode === 'compare'
              ? 'bg-[#D9C9A3] text-[#0E1726]'
              : 'text-[#57657E] dark:text-[#9AA3B5] hover:text-[#121D30] dark:hover:text-[#F1ECE2]'
          }`}
        >
          So sánh AI / GỐC
        </button>
        <button
          type="button"
          onClick={() => setViewportMode('mask')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
            viewportMode === 'mask'
              ? 'bg-[#D9C9A3] text-[#0E1726]'
              : 'text-[#57657E] dark:text-[#9AA3B5] hover:text-[#121D30] dark:hover:text-[#F1ECE2]'
          }`}
        >
          Vẽ Mask tiếp
        </button>
      </div>
    );
  };

  return (
    <StudioWorkspace
      toolId="editor"
      toolName="Chỉnh Sửa Ảnh AI Inpaint"
      dashboardTitle="Chọn chế độ Chỉnh Sửa Ảnh AI"
      dashboardSubtitle="Tô chọn vùng cần chỉnh sửa trực tiếp trên ảnh để thay đồ nội thất, xóa vật thể thừa hoặc đổi vật liệu bề mặt"
      modes={[
        {
          id: 'inpaint',
          title: 'Inpaint Thay thế',
          desc: 'Tô vùng chọn bất kỳ để thay đổi sofa, bàn trà, đèn thả hoặc đồ decor theo mô tả.',
          icon: 'brush',
          image: modeInteriorImg,
        },
        {
          id: 'remove',
          title: 'Xóa Vật thể thừa',
          desc: 'Tẩy sạch dây điện, xe cộ, người qua lại hay chi tiết vướng mắt giữ nguyên nền tự nhiên.',
          icon: 'auto_fix_off',
          image: modeArchImg,
        },
        {
          id: 'add',
          title: 'Thêm Chi tiết mới',
          desc: 'Bổ sung cây xanh, hồ bơi, đèn trang trí hoặc người sinh hoạt vào khung cảnh có sẵn.',
          icon: 'add_photo_alternate',
          image: modeLandscapeImg,
        },
        {
          id: 'material',
          title: 'Đổi Vật liệu bề mặt',
          desc: 'Tô lên mảng tường, sàn hoặc mái để chuyển đổi giữa gỗ, đá marble, bê tông hay gạch.',
          icon: 'texture',
          image: renoFacadeImg,
        },
      ]}
      uploadTitle="1. Tải ảnh cần chỉnh sửa"
      uploadDragText="Kéo thả ảnh vào đây để bắt đầu tô Mask"
      uploadFormatsText="Hoặc bấm icon ? để chọn ảnh mẫu thực hành ngay"
      samples={[
        { title: 'Phòng khách Japandi (Thay bàn trà)', image: modeInteriorImg },
        { title: 'Biệt thự hồ bơi (Thêm chi tiết)', image: modeArchImg },
        { title: 'Mặt tiền nhiệt đới (Đổi vật liệu)', image: renoFacadeImg },
        { title: 'Cảnh quan sân vườn (Xóa vật thể)', image: modeLandscapeImg },
      ]}
      promptTitle="2. Mô tả thay đổi vùng đã chọn (Inpaint Prompt)"
      promptPlaceholder="Ví dụ: Thay bàn trà mặt kính thành bàn trà tròn gỗ sồi tự nhiên kết hợp bình gốm tối giản..."
      defaultPrompt="Thay bàn trà hiện tại thành bàn trà tròn đá travertine phong cách Japandi, giữ nguyên ánh sáng nắng sớm và bóng đổ tự nhiên trên sàn gỗ"
      autoPromptsByMode={{
        inpaint: [
          'Thay thế bộ sofa hiện tại bằng sofa cong bọc vải boucle màu kem sữa, gối tựa vải lanh tự nhiên hài hòa với ánh sáng phòng',
          'Đổi chiếc đèn thả trần thành đèn chùm giấy thủ công phong cách Wabi-sabi ánh sáng vàng ấm 3000K',
        ],
        remove: [
          'Xóa bỏ hoàn toàn các vật thể thừa và dây điện trong vùng đã tô, tái tạo tự nhiên bề mặt tường, cây xanh và bầu trời liền mạch phía sau',
          'Làm sạch rác, biển quảng cáo và xe cộ ở tiền cảnh, giữ lại vỉa hè lát đá gọn gàng',
        ],
        add: [
          'Thêm cây bàng Singapore tán đẹp đặt trong chậu gốm thô ở góc phòng đã chọn, có bóng đổ mềm xuống sàn gỗ theo hướng nắng cửa sổ',
          'Bổ sung bộ bàn ghế cafe ngoài trời bằng gỗ teak và ô che nắng màu be trên thảm cỏ sân vườn',
        ],
        material: [
          'Đổi toàn bộ bề mặt tường đã tô sang đá travertine vân ngang tự nhiên kết hợp khe đèn LED hắt âm tinh tế',
          'Chuyển sàn lát gạch hiện tại sang sàn gỗ sồi xương cá hoàn thiện mờ tự nhiên',
        ],
      }}
      optionGroups={[
        {
          key: 'blendStrength',
          label: 'Độ hòa trộn biên',
          defaultValue: 'Mượt tự nhiên',
          options: [
            { value: 'Mượt tự nhiên', label: 'Mượt tự nhiên (Feather)' },
            { value: 'Khớp chính xác', label: 'Khớp sát viền Mask' },
            { value: 'Mở rộng ngữ cảnh', label: 'Hòa trộn sâu ngữ cảnh' },
          ],
        },
        {
          key: 'lightMatch',
          label: 'Đồng bộ ánh sáng',
          defaultValue: 'Giữ ánh sáng gốc',
          options: [
            { value: 'Giữ ánh sáng gốc', label: 'Giữ ánh sáng & bóng gốc' },
            { value: 'Tăng nổi khối 3D', label: 'Tăng nổi khối vật thể mới' },
          ],
        },
        {
          key: 'adherence',
          label: 'Độ bám vùng chọn',
          defaultValue: 'Chính xác cao',
          options: [
            { value: 'Chính xác cao', label: 'Chỉ sửa trong vùng tô' },
            { value: 'Linh hoạt xung quanh', label: 'Linh hoạt viền xung quanh' },
          ],
        },
        {
          key: 'detailStyle',
          label: 'Độ sắc nét chi tiết',
          defaultValue: 'Quang học 4K',
          options: [
            { value: 'Quang học 4K', label: 'Quang học Studio 4K' },
            { value: 'Tự nhiên như ảnh chụp', label: 'Ảnh chụp chân thực' },
          ],
        },
      ]}
      extraStepThreeTop={maskControls}
      resultPoolsByMode={{
        inpaint: [modeInteriorImg, ARCH_ASSETS.heroInterior, modeArchImg, renoFacadeImg],
        remove: [modeArchImg, modeLandscapeImg, renoFacadeImg, modeInteriorImg],
        add: [modeLandscapeImg, modeInteriorImg, modeArchImg, renoFacadeImg],
        material: [renoFacadeImg, modeInteriorImg, modeArchImg, ARCH_ASSETS.renovationAfter],
      }}
      comparatorBeforeLabel="SAU INPAINT"
      comparatorAfterLabel="ẢNH GỐC"
      emptyHintText="Tải ảnh lên ở Bước 1 (hoặc bấm ? chọn ảnh mẫu) để vẽ vùng Mask trực tiếp trên khung này, sau đó bấm BẮT ĐẦU RENDER."
      guideTitle="Hướng dẫn Chỉnh Sửa & Inpaint AI"
      guideSteps={[
        {
          title: 'Tải ảnh & tô Mask',
          desc: 'Tải ảnh lên rồi dùng bút cọ ở Bước 3 tô trực tiếp lên khu vực muốn thay thế, xóa bỏ hoặc đổi vật liệu.',
        },
        {
          title: 'Nhập mô tả thay thế',
          desc: 'Viết rõ chi tiết mới cần xuất hiện trong vùng chọn (hoặc dùng nút Tạo Prompt tự động).',
        },
        {
          title: 'So sánh & vẽ tiếp',
          desc: 'Sau khi render xong, bạn có thể kéo thanh So sánh AI / GỐC hoặc bấm Vẽ Mask tiếp ngay trên giao diện.',
        },
      ]}
      downloadPrefix="ACHIPICS_INPAINT"
      zoomTitle="Bản Xem Kết Quả Inpaint"
      renderCustomMainFrame={renderMaskOrCustomViewport}
      renderExtraTopBarLeft={renderTopBarToggle}
      onUploadedImageChange={(img) => {
        if (img) {
          setViewportMode('mask');
          handleClearMask();
        }
      }}
      onGenerationSuccess={() => {
        handleClearMask();
        setViewportMode('compare');
      }}
    />
  );
};
