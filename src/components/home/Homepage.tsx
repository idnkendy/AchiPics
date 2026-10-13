import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { HomepageHeader } from '../layout/HomepageHeader';
import { Footer } from '../layout/Footer';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import { ARCH_ASSETS } from '../../data/mockAssets';

export const Homepage: React.FC = () => {
  const { setActiveRoute, setActiveMainTool } = useApp();

  // 3D Carousel State
  const cImgs = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&q=80',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=80',
  ];

  const [ci, setCi] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCi((prev) => (prev + 1) % cImgs.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [cImgs.length]);

  const cNext = () => setCi((prev) => (prev + 1) % cImgs.length);
  const cPrev = () => setCi((prev) => (prev - 1 + cImgs.length) % cImgs.length);

  const getPosition = (index: number) => {
    const n = cImgs.length;
    const diff = (index - ci + n) % n;
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === n - 1) return 'left';
    return 'out';
  };

  // Services list matching user code
  const srvs = [
    {
      t: 'Render Kiến Trúc',
      ic: 'apartment',
      d: 'Tạo ảnh render ngoại thất chất lượng cao từ ảnh chụp hoặc bản vẽ',
      im: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80',
      tool: 'render',
    },
    {
      t: 'Render Nội Thất',
      ic: 'chair',
      d: 'Không gian nội thất 15+ phong cách thiết kế',
      im: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80',
      tool: 'render',
    },
    {
      t: 'Cải Tạo Không Gian',
      ic: 'home_work',
      d: 'Giữ kết cấu, thay đổi phong cách nội ngoại thất',
      im: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500&q=80',
      tool: 'renovation',
    },
    {
      t: 'Floor Plan 3D',
      ic: 'dashboard',
      d: 'Biến mặt bằng 2D thành render 3D thực tế',
      im: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=500&q=80',
      tool: 'floorplan',
    },
    {
      t: 'Poster BĐS',
      ic: 'campaign',
      d: 'Tạo poster marketing bất động sản chuyên nghiệp',
      im: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80',
      tool: 'render',
    },
    {
      t: 'Bản Vẽ Kỹ Thuật',
      ic: 'architecture',
      d: 'Tạo bản vẽ mặt bằng, mặt đứng, mặt cắt',
      im: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&q=80',
      tool: 'render',
    },
    {
      t: 'Phân Tích Ảnh',
      ic: 'analytics',
      d: 'AI phân tích phong cách, vật liệu, kết cấu',
      im: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=500&q=80',
      tool: 'render',
    },
    {
      t: 'Nâng Cấp 4K',
      ic: 'zoom_in',
      d: 'Tăng độ phân giải 2x-4x giữ nguyên chi tiết',
      im: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&q=80',
      tool: 'render',
    },
    {
      t: 'Thiết Kế Cảnh Quan',
      ic: 'park',
      d: 'Render sân vườn, landscape chuyên nghiệp',
      im: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500&q=80',
      tool: 'render',
    },
    {
      t: 'Quy Hoạch Đô Thị',
      ic: 'map',
      d: 'Phối cảnh tổng thể khu đô thị, quy hoạch',
      im: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&q=80',
      tool: 'render',
    },
  ];

  // FAQs
  const faqs = [
    {
      q: 'AchiPics là gì?',
      a: 'Nền tảng AI chuyên biệt cho kiến trúc sư & nhà thiết kế, giúp tạo ảnh render, chỉnh sửa ảnh và nhiều công cụ AI khác trong vài giây.',
    },
    {
      q: 'Cần cài phần mềm gì không?',
      a: 'Không. AchiPics chạy hoàn toàn trên trình duyệt web, không cần phần mềm hay máy tính cấu hình cao.',
    },
    {
      q: 'Thanh toán như thế nào?',
      a: 'Tại Việt Nam hỗ trợ chuyển khoản ngân hàng qua QR Code 24/7. Quốc tế hỗ trợ thanh toán thẻ Visa/Mastercard.',
    },
    {
      q: 'Credit là gì?',
      a: 'Credit là đơn vị sử dụng dịch vụ. Mỗi lần tạo ảnh tiêu tốn một lượng credit tương ứng. Mua thêm bất kỳ lúc nào.',
    },
    {
      q: 'Có hoàn tiền khi lỗi không?',
      a: 'Có. Nếu ảnh bị lỗi do hệ thống, credit được tự động hoàn lại tài khoản ngay lập tức.',
    },
    {
      q: 'Chất lượng ảnh đến đâu?',
      a: 'Hỗ trợ render lên đến 4K, sử dụng Gemini 2.0, GPT-Image — các model AI hàng đầu cho kết quả chân thực nhất.',
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#0E1726] text-[#F1ECE2] flex flex-col font-sans selection:bg-[#D9C9A3] selection:text-[#0E1726]">
      {/* ═══ HEADER ═══ */}
      <HomepageHeader />

      {/* ═══ HERO ═══ */}
      <section className="relative pt-[160px] px-6 pb-20 text-center overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,rgba(217,201,163,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-[1200px] mx-auto">
          {/* Heading */}
          <h1 className="max-w-[720px] mx-auto mb-5">
            <span className="block text-[13px] font-semibold text-[#DDCDA8] uppercase tracking-[3px] mb-4">
              AI cho kiến trúc sư
            </span>
            <span className="block font-serif-display text-[38px] sm:text-[54px] md:text-[64px] font-normal text-[#F1ECE2] leading-[1.1] tracking-[-1px]">
              Render ảnh kiến trúc<br />chất lượng cao trong giây
            </span>
          </h1>

          {/* Description */}
          <p className="text-base text-[#9AA3B5] max-w-[520px] mx-auto mb-10 leading-[1.7]">
            Nền tảng AI chuyên biệt giúp KTS & NTK tạo ảnh render ngoại thất, nội thất, cảnh quan — nhanh hơn 90% so với workflow truyền thống.
          </p>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => setActiveRoute('/image')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#F1ECE2] hover:bg-[#EDE2C8] text-[#0E1726] rounded-full text-sm font-semibold tracking-[-0.1px] transition-all hover:-translate-y-0.5 shadow-lg cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              <span>Bắt đầu thiết kế</span>
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('carousel');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent border border-[#2E3B58] hover:border-[#646E84] text-[#9AA3B5] hover:text-[#F1ECE2] rounded-full text-sm font-medium transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">play_circle</span>
              <span>Xem demo</span>
            </button>
          </div>

          {/* 3D Carousel */}
          <div className="relative max-w-[880px] mx-auto mt-14 h-[260px] sm:h-[380px] perspective-[1200px]" id="carousel">
            <div className="relative w-full h-full flex items-center justify-center">
              {cImgs.map((src, i) => {
                const pos = getPosition(i);
                let transformStyle = '';
                let zIndex = 1;
                let opacity = 0;
                let filter = 'none';

                if (pos === 'center') {
                  transformStyle = 'translateX(0) scale(1)';
                  zIndex = 3;
                  opacity = 1;
                } else if (pos === 'left') {
                  transformStyle = 'translateX(-38%) scale(0.78) rotateY(16deg)';
                  zIndex = 2;
                  opacity = 0.35;
                  filter = 'blur(1.5px)';
                } else if (pos === 'right') {
                  transformStyle = 'translateX(38%) scale(0.78) rotateY(-16deg)';
                  zIndex = 2;
                  opacity = 0.35;
                  filter = 'blur(1.5px)';
                } else {
                  transformStyle = 'scale(0.5)';
                  opacity = 0;
                }

                return (
                  <div
                    key={i}
                    onClick={() => {
                      if (pos === 'left') cPrev();
                      else if (pos === 'right') cNext();
                      else setActiveRoute('/image');
                    }}
                    style={{
                      transform: transformStyle,
                      zIndex,
                      opacity,
                      filter,
                      transition: 'all 0.65s cubic-bezier(0.4, 0, 0.15, 1)',
                    }}
                    className="absolute w-[78%] sm:w-[62%] aspect-16/10 rounded-2xl overflow-hidden border border-[#24304A] bg-[#16213A] shadow-2xl cursor-pointer"
                  >
                    <img src={src} alt={`Render ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                );
              })}
            </div>

            {/* Prev / Next buttons */}
            <button
              onClick={cPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#16213A] border border-[#24304A] hover:bg-[#1C2944] text-[#9AA3B5] hover:text-[#F1ECE2] flex items-center justify-center transition-all cursor-pointer shadow-md"
              aria-label="Previous"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button
              onClick={cNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#16213A] border border-[#24304A] hover:bg-[#1C2944] text-[#9AA3B5] hover:text-[#F1ECE2] flex items-center justify-center transition-all cursor-pointer shadow-md"
              aria-label="Next"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-8">
            {cImgs.map((_, i) => (
              <button
                key={i}
                onClick={() => setCi(i)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  ci === i ? 'w-6 bg-[#D9C9A3]' : 'w-1.5 bg-[#2E3B58]'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DIVIDER ═══ */}
      <div className="h-[1px] bg-[#24304A] max-w-[1200px] w-full mx-auto" />

      {/* ═══ STATS ═══ */}
      <section className="py-14 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="py-3">
            <div className="font-serif-display text-[32px] sm:text-[44px] text-[#F1ECE2] mb-1">
              100,000+
            </div>
            <div className="text-xs text-[#646E84] uppercase tracking-[2px] font-medium">
              Người dùng
            </div>
          </div>
          <div className="py-3">
            <div className="font-serif-display text-[32px] sm:text-[44px] text-[#F1ECE2] mb-1">
              10,000,000+
            </div>
            <div className="text-xs text-[#646E84] uppercase tracking-[2px] font-medium">
              Ảnh đã tạo
            </div>
          </div>
          <div className="py-3">
            <div className="font-serif-display text-[32px] sm:text-[44px] text-[#F1ECE2] mb-1">
              90%
            </div>
            <div className="text-xs text-[#646E84] uppercase tracking-[2px] font-medium">
              Tiết kiệm thời gian
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DIVIDER ═══ */}
      <div className="h-[1px] bg-[#24304A] max-w-[1200px] w-full mx-auto" />

      {/* ═══ SERVICES ═══ */}
      <section className="py-20 px-6" id="services">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <div className="text-[11px] font-semibold text-[#DDCDA8] uppercase tracking-[3px] mb-3">
              Dịch vụ nổi bật
            </div>
            <h2 className="font-serif-display text-[28px] sm:text-[38px] text-[#F1ECE2] mb-2 tracking-[-0.5px]">
              Bộ công cụ toàn diện
            </h2>
            <p className="text-[#9AA3B5] text-[15px] max-w-[480px] mx-auto">
              20+ công cụ AI chuyên biệt cho kiến trúc & thiết kế nội thất
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {srvs.map((s, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (s.tool === 'render' || s.tool === 'floorplan' || s.tool === 'renovation') {
                    setActiveMainTool(s.tool as any);
                  }
                  setActiveRoute('/image');
                }}
                className="group bg-[#16213A] rounded-2xl border border-[#24304A] hover:border-[#2E3B58] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col"
              >
                <div className="relative aspect-3/2 overflow-hidden bg-[#111B2D]">
                  <img
                    src={s.im}
                    alt={s.t}
                    className="w-full h-full object-cover brightness-[0.85] contrast-[1.05] group-hover:scale-106 group-hover:brightness-[0.95] transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-[#16213A] to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 w-8 h-8 rounded-lg bg-[rgba(217,201,163,0.1)] border border-[rgba(217,201,163,0.25)] flex items-center justify-center text-[#E4D5B2] group-hover:bg-[#D9C9A3] group-hover:text-[#0E1726] group-hover:border-[#D9C9A3] transition-all z-10">
                    <span className="material-symbols-outlined text-[18px]">{s.ic}</span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h3 className="text-sm font-semibold text-[#F1ECE2] mb-1 tracking-[-0.1px]">
                    {s.t}
                  </h3>
                  <p className="text-[12.5px] text-[#646E84] leading-[1.5] line-clamp-2">
                    {s.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="py-24 px-6" id="features">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-24">
          {/* Block 1: Render */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Visual Left */}
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-[#24304A] bg-[#16213A] group">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
                alt="AI Render"
                className="w-full h-full object-cover brightness-90 contrast-105 group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-black/65 backdrop-blur-md border border-white/10 rounded-full text-[11px] font-semibold text-white/80 z-10 tracking-[0.3px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DDCDA8] animate-subtle-pulse" />
                <span>AI Rendering Engine</span>
              </div>
            </div>

            {/* Text Right */}
            <div>
              <div className="text-[11px] font-semibold text-[#DDCDA8] uppercase tracking-[3px] mb-3">
                Render
              </div>
              <h2 className="font-serif-display text-[28px] sm:text-[36px] text-[#F1ECE2] mb-4 tracking-[-0.5px] leading-[1.15]">
                Biến mọi bản vẽ thành ảnh render studio
              </h2>
              <p className="text-[15px] text-[#9AA3B5] leading-[1.7] mb-6">
                Upload ảnh chụp hoặc bản vẽ, AI tạo hình ảnh render chất lượng 4K chỉ trong vài giây. Hỗ trợ 4 chế độ: Ngoại thất, Nội thất, Đô thị, Cảnh quan.
              </p>
              <ul className="space-y-2.5 mb-7">
                <li className="flex items-center gap-2.5 text-sm text-[#9AA3B5]">
                  <span className="material-symbols-outlined text-[#DDCDA8] text-[20px]">check_circle</span>
                  <span>Render 4K từ ảnh chụp, sketch, bản vẽ CAD</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-[#9AA3B5]">
                  <span className="material-symbols-outlined text-[#DDCDA8] text-[20px]">check_circle</span>
                  <span>15+ phong cách kiến trúc tùy chọn</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-[#9AA3B5]">
                  <span className="material-symbols-outlined text-[#DDCDA8] text-[20px]">check_circle</span>
                  <span>Đa góc nhìn & ánh sáng linh hoạt</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  setActiveMainTool('render');
                  setActiveRoute('/image');
                }}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#D9C9A3] hover:bg-[#EDE2C8] text-[#0E1726] rounded-lg text-[13px] font-semibold tracking-[-0.1px] transition-all cursor-pointer"
              >
                <span>Thử ngay →</span>
              </button>
            </div>
          </div>

          {/* Block 2: Cải tạo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Left */}
            <div>
              <div className="text-[11px] font-semibold text-[#DDCDA8] uppercase tracking-[3px] mb-3">
                Cải tạo
              </div>
              <h2 className="font-serif-display text-[28px] sm:text-[36px] text-[#F1ECE2] mb-4 tracking-[-0.5px] leading-[1.15]">
                Cải tạo không gian chỉ với một tấm ảnh
              </h2>
              <p className="text-[15px] text-[#9AA3B5] leading-[1.7] mb-6">
                Upload ảnh hiện trạng, AI tạo phương án cải tạo giữ nguyên kết cấu, thay đổi phong cách — cho cả nội thất, ngoại thất & cảnh quan.
              </p>
              <ul className="space-y-2.5 mb-7">
                <li className="flex items-center gap-2.5 text-sm text-[#9AA3B5]">
                  <span className="material-symbols-outlined text-[#DDCDA8] text-[20px]">check_circle</span>
                  <span>Giữ kết cấu gốc, biến đổi phong cách</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-[#9AA3B5]">
                  <span className="material-symbols-outlined text-[#DDCDA8] text-[20px]">check_circle</span>
                  <span>Nội thất, ngoại thất, cảnh quan</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-[#9AA3B5]">
                  <span className="material-symbols-outlined text-[#DDCDA8] text-[20px]">check_circle</span>
                  <span>So sánh trước / sau trực quan</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  setActiveMainTool('renovation');
                  setActiveRoute('/image');
                }}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-transparent border border-[#2E3B58] hover:border-[#646E84] text-[#9AA3B5] hover:text-[#F1ECE2] rounded-lg text-[13px] font-semibold transition-all cursor-pointer"
              >
                <span>Khám phá →</span>
              </button>
            </div>

            {/* Visual Right (Slider) */}
            <div className="relative">
              <BeforeAfterSlider
                beforeImage={ARCH_ASSETS.renovationBefore}
                afterImage={ARCH_ASSETS.renovationAfter}
                beforeLabel="Hiện trạng cũ"
                afterLabel="Cải tạo AI"
                className="aspect-4/3 rounded-2xl overflow-hidden border border-[#24304A] bg-[#16213A]"
              />
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-black/65 backdrop-blur-md border border-white/10 rounded-full text-[11px] font-semibold text-white/80 z-10 tracking-[0.3px] pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8a87c] animate-subtle-pulse" />
                <span>Smart Renovation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ USE CASES ═══ */}
      <section className="py-20 px-6 bg-[#111B2D] border-t border-b border-[#24304A]">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <div className="text-[11px] font-semibold text-[#DDCDA8] uppercase tracking-[3px] mb-3">
              Đối tượng
            </div>
            <h2 className="font-serif-display text-[28px] sm:text-[38px] text-[#F1ECE2] mb-2 tracking-[-0.5px]">
              Ai nên dùng AchiPics?
            </h2>
            <p className="text-[#9AA3B5] text-[15px]">
              Giải pháp cho mọi chuyên gia trong ngành xây dựng & thiết kế
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-8 sm:p-9 rounded-2xl bg-[#16213A] border border-[#24304A] hover:border-[rgba(217,201,163,0.25)] text-center transition-all">
              <div className="w-13 h-13 rounded-full bg-[#0E1726] flex items-center justify-center text-[#646E84] mx-auto mb-5">
                <span className="material-symbols-outlined text-[26px]">architecture</span>
              </div>
              <h3 className="text-base font-bold text-[#F1ECE2] mb-2 tracking-[-0.2px]">
                Kiến trúc sư
              </h3>
              <p className="text-[13px] text-[#646E84] leading-[1.6]">
                Tạo ảnh render nhanh cho khách hàng, thay thế quy trình render truyền thống mất nhiều ngày.
              </p>
            </div>

            <div className="p-8 sm:p-9 rounded-2xl bg-[#16213A] border border-[#24304A] hover:border-[rgba(217,201,163,0.25)] text-center transition-all">
              <div className="w-13 h-13 rounded-full bg-[#0E1726] flex items-center justify-center text-[#646E84] mx-auto mb-5">
                <span className="material-symbols-outlined text-[26px]">real_estate_agent</span>
              </div>
              <h3 className="text-base font-bold text-[#F1ECE2] mb-2 tracking-[-0.2px]">
                Bất động sản
              </h3>
              <p className="text-[13px] text-[#646E84] leading-[1.6]">
                Ảnh listing chuyên nghiệp, poster marketing, virtual staging cho phòng trống chưa có nội thất.
              </p>
            </div>

            <div className="p-8 sm:p-9 rounded-2xl bg-[#16213A] border border-[#24304A] hover:border-[rgba(217,201,163,0.25)] text-center transition-all">
              <div className="w-13 h-13 rounded-full bg-[#0E1726] flex items-center justify-center text-[#646E84] mx-auto mb-5">
                <span className="material-symbols-outlined text-[26px]">cottage</span>
              </div>
              <h3 className="text-base font-bold text-[#F1ECE2] mb-2 tracking-[-0.2px]">
                Chủ nhà
              </h3>
              <p className="text-[13px] text-[#646E84] leading-[1.6]">
                Hình dung trước không gian cải tạo, thử phong cách nội thất trước khi thi công thực tế.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className="py-24 px-6 relative overflow-hidden" id="about">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div>
            <h2 className="font-serif-display text-[28px] sm:text-[38px] text-[#F1ECE2] leading-[1.2] mb-5 tracking-[-0.5px]">
              Về AchiPics —<br />
              <span className="text-[#DDCDA8]">AI cho Kiến trúc</span>
            </h2>
            <p className="text-[#9AA3B5] text-[15px] leading-[1.7] mb-3">
              AchiPics là nền tảng AI chuyên biệt cho ngành kiến trúc & thiết kế. Ứng dụng các mô hình AI mới nhất để giúp hàng nghìn KTS tạo ảnh render chuyên nghiệp trong vài giây.
            </p>
            <p className="text-[#9AA3B5] text-[15px] leading-[1.7] mb-6">
              Sứ mệnh: dân chủ hóa công nghệ render, giúp mọi kiến trúc sư — từ sinh viên đến chuyên gia — đều tạo được hình ảnh chất lượng studio.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-7">
              <div className="p-4 rounded-xl bg-[#16213A] border border-[#24304A] hover:border-[rgba(217,201,163,0.25)] transition-colors">
                <h4 className="text-sm font-semibold text-[#F1ECE2] mb-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#DDCDA8] text-[18px]">psychology</span>
                  <span>AI tiên tiến</span>
                </h4>
                <p className="text-xs text-[#646E84]">Gemini 2.0, GPT & các model AI mới nhất</p>
              </div>

              <div className="p-4 rounded-xl bg-[#16213A] border border-[#24304A] hover:border-[rgba(217,201,163,0.25)] transition-colors">
                <h4 className="text-sm font-semibold text-[#F1ECE2] mb-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#DDCDA8] text-[18px]">speed</span>
                  <span>Siêu tốc</span>
                </h4>
                <p className="text-xs text-[#646E84]">Render 4K trong 5–15 giây, nhanh hơn 90%</p>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-[#16213A] p-7 rounded-2xl border border-[#24304A]">
              <h3 className="text-[17px] font-bold text-[#F1ECE2] pb-3.5 border-b border-[#24304A] mb-4.5">
                Tại sao chọn AchiPics?
              </h3>
              <ul className="space-y-3.5">
                <li className="flex gap-3">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-[rgba(217,201,163,0.1)] flex items-center justify-center mt-0.5">
                    <span className="material-symbols-outlined text-[#DDCDA8] text-[14px] font-bold">check</span>
                  </div>
                  <div>
                    <h4 className="text-[#F1ECE2] font-medium text-sm">Chuyên biệt cho Kiến trúc</h4>
                    <p className="text-[#646E84] text-xs mt-0.5">Tối ưu riêng cho ngành kiến trúc & thiết kế, không phải AI tổng hợp</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-[rgba(217,201,163,0.1)] flex items-center justify-center mt-0.5">
                    <span className="material-symbols-outlined text-[#DDCDA8] text-[14px] font-bold">check</span>
                  </div>
                  <div>
                    <h4 className="text-[#F1ECE2] font-medium text-sm">20+ công cụ chuyên dụng</h4>
                    <p className="text-[#646E84] text-xs mt-0.5">Render, Floor Plan, Renovation, ViewSync, Upscale, Poster...</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-[rgba(217,201,163,0.1)] flex items-center justify-center mt-0.5">
                    <span className="material-symbols-outlined text-[#DDCDA8] text-[14px] font-bold">check</span>
                  </div>
                  <div>
                    <h4 className="text-[#F1ECE2] font-medium text-sm">Đa ngôn ngữ</h4>
                    <p className="text-[#646E84] text-xs mt-0.5">7 ngôn ngữ: Việt, Anh, Hindi, Ả Rập, Farsi, Indonesia, Thổ Nhĩ Kỳ</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-[rgba(217,201,163,0.1)] flex items-center justify-center mt-0.5">
                    <span className="material-symbols-outlined text-[#DDCDA8] text-[14px] font-bold">check</span>
                  </div>
                  <div>
                    <h4 className="text-[#F1ECE2] font-medium text-sm">Bảo mật & đáng tin cậy</h4>
                    <p className="text-[#646E84] text-xs mt-0.5">Mã hóa end-to-end, hạ tầng Cloudflare toàn cầu</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-[#16213A] p-5 rounded-2xl border border-[#24304A] mt-4">
              <h4 className="text-[10px] font-semibold text-[#646E84] uppercase tracking-[2px] mb-3">
                Từ khoá
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {[
                  '#ai_render',
                  '#kiến_trúc',
                  '#nội_thất',
                  '#cảnh_quan',
                  '#floor_plan',
                  '#renovation',
                  '#upscale_4k',
                  '#staging',
                  '#moodboard',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#0E1726] rounded-full text-[11px] text-[#646E84] border border-[#24304A] hover:text-[#F1ECE2] hover:border-[rgba(217,201,163,0.25)] transition-all cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section className="py-20 px-6" id="contact">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <div className="text-[11px] font-semibold text-[#DDCDA8] uppercase tracking-[3px] mb-3">
              Liên hệ
            </div>
            <h2 className="font-serif-display text-[28px] sm:text-[38px] text-[#F1ECE2] mb-2 tracking-[-0.5px]">
              Kết nối với chúng tôi
            </h2>
            <p className="text-[#9AA3B5] text-[15px]">Luôn sẵn sàng hỗ trợ bạn</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Zalo */}
            <a
              href="https://zalo.me"
              target="_blank"
              rel="noreferrer"
              className="p-7 rounded-2xl bg-[#16213A] border border-[#24304A] hover:border-[rgba(217,201,163,0.25)] hover:-translate-y-1 transition-all flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-[rgba(0,104,255,0.08)] flex items-center justify-center p-3 mb-4 group-hover:scale-108 transition-transform">
                <div className="w-full h-full bg-[#0068FF] rounded-md flex items-center justify-center text-white text-[11px] font-extrabold">
                  Zalo
                </div>
              </div>
              <h3 className="text-[15px] font-semibold text-[#F1ECE2] group-hover:text-[#DDCDA8] mb-1.5 transition-colors">
                Zalo
              </h3>
              <p className="text-xs text-[#646E84] mb-5 leading-[1.5] flex-grow">
                Chat trực tiếp để được hỗ trợ nhanh nhất
              </p>
              <span className="px-4.5 py-1.5 rounded-full border border-[#24304A] text-[11px] font-semibold text-[#646E84] group-hover:bg-[#D9C9A3] group-hover:text-[#0E1726] group-hover:border-[#D9C9A3] transition-all">
                Kết nối →
              </span>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="p-7 rounded-2xl bg-[#16213A] border border-[#24304A] hover:border-[rgba(217,201,163,0.25)] hover:-translate-y-1 transition-all flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-[#1C2944] flex items-center justify-center p-3 mb-4 group-hover:scale-108 transition-transform">
                <svg viewBox="0 0 24 24" fill="#1877F2" className="w-8 h-8">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <h3 className="text-[15px] font-semibold text-[#F1ECE2] group-hover:text-[#DDCDA8] mb-1.5 transition-colors">
                Facebook
              </h3>
              <p className="text-xs text-[#646E84] mb-5 leading-[1.5] flex-grow">
                Cập nhật tính năng mới & tips
              </p>
              <span className="px-4.5 py-1.5 rounded-full border border-[#24304A] text-[11px] font-semibold text-[#646E84] group-hover:bg-[#D9C9A3] group-hover:text-[#0E1726] group-hover:border-[#D9C9A3] transition-all">
                Kết nối →
              </span>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="p-7 rounded-2xl bg-[#16213A] border border-[#24304A] hover:border-[rgba(217,201,163,0.25)] hover:-translate-y-1 transition-all flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-[#1C2944] flex items-center justify-center p-3 mb-4 group-hover:scale-108 transition-transform">
                <svg viewBox="0 0 24 24" fill="#FF0000" className="w-8 h-8">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
              <h3 className="text-[15px] font-semibold text-[#F1ECE2] group-hover:text-[#DDCDA8] mb-1.5 transition-colors">
                YouTube
              </h3>
              <p className="text-xs text-[#646E84] mb-5 leading-[1.5] flex-grow">
                Hướng dẫn & demo tính năng
              </p>
              <span className="px-4.5 py-1.5 rounded-full border border-[#24304A] text-[11px] font-semibold text-[#646E84] group-hover:bg-[#D9C9A3] group-hover:text-[#0E1726] group-hover:border-[#D9C9A3] transition-all">
                Kết nối →
              </span>
            </a>

            {/* Email */}
            <a
              href="mailto:contact@achipics.com"
              className="p-7 rounded-2xl bg-[#16213A] border border-[#24304A] hover:border-[rgba(217,201,163,0.25)] hover:-translate-y-1 transition-all flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-[#1C2944] flex items-center justify-center p-3 mb-4 group-hover:scale-108 transition-transform">
                <svg viewBox="0 0 24 24" fill="#EA4335" className="w-8 h-8">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.573l8.073-6.08c1.618-1.214 3.927-.059 3.927 1.964z" />
                </svg>
              </div>
              <h3 className="text-[15px] font-semibold text-[#F1ECE2] group-hover:text-[#DDCDA8] mb-1.5 transition-colors">
                Email
              </h3>
              <p className="text-xs text-[#646E84] mb-5 leading-[1.5] flex-grow">
                Gửi yêu cầu hỗ trợ kỹ thuật
              </p>
              <span className="px-4.5 py-1.5 rounded-full border border-[#24304A] text-[11px] font-semibold text-[#646E84] group-hover:bg-[#D9C9A3] group-hover:text-[#0E1726] group-hover:border-[#D9C9A3] transition-all">
                Kết nối →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-20 px-6">
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-10">
            <div className="text-[11px] font-semibold text-[#DDCDA8] uppercase tracking-[3px] mb-3">
              FAQ
            </div>
            <h2 className="font-serif-display text-[28px] sm:text-[38px] text-[#F1ECE2] tracking-[-0.5px]">
              Câu hỏi thường gặp
            </h2>
          </div>

          <div className="grid gap-2">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className={`p-5 sm:p-6 bg-[#16213A] rounded-xl border transition-colors cursor-pointer ${
                    isOpen ? 'border-[rgba(217,201,163,0.25)]' : 'border-[#24304A] hover:border-[rgba(217,201,163,0.25)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm font-semibold text-[#F1ECE2]">{faq.q}</h3>
                    <div
                      className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        isOpen
                          ? 'bg-[#D9C9A3] text-[#0E1726] border border-[#D9C9A3] rotate-180'
                          : 'bg-[#0E1726] border border-[#24304A] text-[#646E84]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">expand_more</span>
                    </div>
                  </div>
                  {isOpen && (
                    <div className="pt-3.5 border-t border-[#24304A] mt-3.5">
                      <p className="text-[13px] text-[#9AA3B5] leading-[1.7]">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 px-6">
        <div className="max-w-[800px] mx-auto bg-[#16213A] border border-[#24304A] rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[2px] bg-gradient-to-r from-transparent via-[#D9C9A3] to-transparent pointer-events-none" />
          <h2 className="font-serif-display text-[28px] sm:text-[40px] text-[#F1ECE2] mb-4 tracking-[-0.5px]">
            Sẵn sàng bắt đầu?
          </h2>
          <p className="text-[15px] text-[#9AA3B5] max-w-[420px] mx-auto mb-8 leading-[1.6]">
            Tham gia cùng 100,000+ kiến trúc sư đang dùng AchiPics để tạo những thiết kế ấn tượng.
          </p>
          <button
            onClick={() => setActiveRoute('/image')}
            className="inline-flex items-center gap-2 px-9 py-3.5 bg-[#D9C9A3] hover:bg-[#EDE2C8] text-[#0E1726] rounded-lg text-sm font-semibold tracking-[-0.1px] transition-all hover:-translate-y-0.5 shadow-lg cursor-pointer"
          >
            <span>Dùng thử miễn phí →</span>
          </button>
          <div className="mt-3.5 text-xs text-[#646E84]">
            Không cần thẻ tín dụng · Bắt đầu ngay
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <Footer />
    </div>
  );
};
