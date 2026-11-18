import React from 'react';
import { HomepageHeader } from '../layout/HomepageHeader';
import { Footer } from '../layout/Footer';
import { Sparkles } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0E1726] text-[#F1ECE2] flex flex-col font-sans selection:bg-[#D9C9A3] selection:text-[#0E1726]">
      <HomepageHeader />

      <main className="pt-32 pb-20 flex-1 max-w-4xl mx-auto px-4 w-full space-y-8 relative">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(217,201,163,0.05)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121D30] border border-[#24304A] text-xs font-semibold text-[#DDCDA8] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D9C9A3]" />
            <span>PHÁP LÝ & BẢO MẬT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif-display text-[#F1ECE2] tracking-tight">
            Điều Khoản Dịch Vụ & Bản Quyền OPZEN AI
          </h1>
          <p className="text-xs text-[#9AA3B5] mt-2">Cập nhật lần cuối: Năm 2026</p>
        </div>

        <div className="p-8 sm:p-10 rounded-2xl bg-[#121D30] border border-[#24304A] space-y-7 text-xs sm:text-sm text-[#9AA3B5] leading-relaxed shadow-xl relative z-10">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#F1ECE2]">1. Quyền Sở Hữu Thương Mại Hình Ảnh</h2>
            <p>
              Mọi tác phẩm, phối cảnh kiến trúc, mô hình 3D mặt bằng và hình ảnh cải tạo được sinh ra từ tài khoản của người dùng thuộc 100% quyền sở hữu thương mại của người dùng đó. Bạn có toàn quyền sử dụng để thuyết trình cho chủ đầu tư, đưa vào hồ sơ thiết kế, in ấn hoặc quảng bá bất động sản.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#F1ECE2]">2. Bảo Mật Bản Vẽ & Dữ Liệu Khách Hàng</h2>
            <p>
              OPZEN AI cam kết không chia sẻ, bán hoặc sử dụng các bản vẽ CAD, hình ảnh hiện trạng nội thất hoặc thông tin bí mật kinh doanh của bạn cho bên thứ ba. Dữ liệu xử lý tuân thủ tiêu chuẩn mã hoá bảo mật doanh nghiệp cao cấp.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#F1ECE2]">3. Chính Sách Credits & Nạp Tiền</h2>
            <p>
              Credits được sử dụng để chi trả cho các lượt tính toán và tạo ảnh. Credits không có giá trị quy đổi ngược lại tiền mặt, nhưng có thời hạn sử dụng dài hạn theo từng gói đăng ký (Starter 30 ngày, Pro 90 ngày, Ultra 180 ngày). Nếu bạn gặp lỗi gián đoạn từ hệ thống trong quá trình render, credits bị trừ sẽ được tự động hoàn trả.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#F1ECE2]">4. Trách Nhiệm Kỹ Thuật</h2>
            <p>
              Hình ảnh render do AI sinh ra mang tính chất phối cảnh concept ý tưởng và minh họa không gian trực quan. Bản vẽ thi công xây dựng thực tế cần được kiến trúc sư và kỹ sư kết cấu có chứng chỉ hành nghề thẩm định và phê duyệt theo quy chuẩn xây dựng hiện hành.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
