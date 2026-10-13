import React from 'react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveRoute, setActiveMainTool } = useApp();

  return (
    <footer className="bg-[#111B2D] border-t border-[#24304A] text-[#646E84] text-xs">
      <div className="max-w-[1100px] mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveRoute('/');
              }}
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#D9C9A3] flex items-center justify-center text-[#0E1726] font-extrabold text-[15px] tracking-tight group-hover:scale-105 transition-transform">
                A
              </div>
              <span className="text-lg font-bold text-[#F1ECE2] tracking-tight group-hover:text-[#D9C9A3] transition-colors">
                AchiPics
              </span>
            </div>
            <p className="text-xs text-[#646E84] leading-relaxed max-w-[280px]">
              Nền tảng AI chuyên biệt hỗ trợ Kiến trúc sư & Nhà thiết kế tạo ảnh render chất lượng cao.
            </p>

            {/* Socials */}
            <div className="flex gap-2 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#16213A] border border-[#24304A] flex items-center justify-center text-[#646E84] hover:text-[#F1ECE2] hover:border-[#D9C9A3]/40 transition-all"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#16213A] border border-[#24304A] flex items-center justify-center text-[#646E84] hover:text-[#F1ECE2] hover:border-[#D9C9A3]/40 transition-all"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="mailto:contact@achipics.com"
                className="w-9 h-9 rounded-full bg-[#16213A] border border-[#24304A] flex items-center justify-center text-[#646E84] hover:text-[#F1ECE2] hover:border-[#D9C9A3]/40 transition-all"
                aria-label="Email"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.573l8.073-6.08c1.618-1.214 3.927-.059 3.927 1.964z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Sản phẩm */}
          <div>
            <h3 className="text-xs font-semibold text-[#9AA3B5] uppercase tracking-[1px] mb-3.5">
              Sản phẩm
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setActiveMainTool('render');
                    setActiveRoute('/image');
                  }}
                  className="hover:text-[#F1ECE2] transition-colors cursor-pointer text-left"
                >
                  Render Kiến Trúc
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveMainTool('render');
                    setActiveRoute('/image');
                  }}
                  className="hover:text-[#F1ECE2] transition-colors cursor-pointer text-left"
                >
                  Render Nội Thất
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveMainTool('renovation');
                    setActiveRoute('/image');
                  }}
                  className="hover:text-[#F1ECE2] transition-colors cursor-pointer text-left"
                >
                  Cải Tạo Không Gian
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveMainTool('floorplan');
                    setActiveRoute('/image');
                  }}
                  className="hover:text-[#F1ECE2] transition-colors cursor-pointer text-left"
                >
                  Floor Plan 3D
                </button>
              </li>
            </ul>
          </div>

          {/* Tài nguyên */}
          <div>
            <h3 className="text-xs font-semibold text-[#9AA3B5] uppercase tracking-[1px] mb-3.5">
              Tài nguyên
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveRoute('/pricing')}
                  className="hover:text-[#F1ECE2] transition-colors cursor-pointer text-left"
                >
                  Bảng giá
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveMainTool('render');
                    setActiveRoute('/image');
                  }}
                  className="hover:text-[#F1ECE2] transition-colors cursor-pointer text-left"
                >
                  Hướng dẫn
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveRoute('/contacts')}
                  className="hover:text-[#F1ECE2] transition-colors cursor-pointer text-left"
                >
                  Blog & Cẩm nang
                </button>
              </li>
            </ul>
          </div>

          {/* Pháp lý */}
          <div>
            <h3 className="text-xs font-semibold text-[#9AA3B5] uppercase tracking-[1px] mb-3.5">
              Pháp lý
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveRoute('/terms-of-service')}
                  className="hover:text-[#F1ECE2] transition-colors cursor-pointer text-left"
                >
                  Điều khoản dịch vụ
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveRoute('/terms-of-service')}
                  className="hover:text-[#F1ECE2] transition-colors cursor-pointer text-left"
                >
                  Chính sách bảo mật
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveRoute('/contacts')}
                  className="hover:text-[#F1ECE2] transition-colors cursor-pointer text-left"
                >
                  Liên hệ
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="pt-6 border-t border-[#24304A] text-center">
          <p className="text-[#646E84] text-xs">
            © 2025 AchiPics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
