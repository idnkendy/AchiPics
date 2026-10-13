import React from 'react';
import { HomepageHeader } from '../layout/HomepageHeader';
import { Footer } from '../layout/Footer';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col font-sans selection:bg-[#7f13ec] selection:text-white">
      <HomepageHeader />

      <main className="pt-32 pb-20 flex-1 max-w-4xl mx-auto px-4 w-full space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-[3px] text-purple-400 mb-2 inline-block px-3 py-1 rounded-full bg-[#7f13ec]/10 border border-[#7f13ec]/30">
            Pháp Lý & Bảo Mật
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Điều Khoản Dịch Vụ & Bản Quyền OPZEN AI
          </h1>
          <p className="text-xs text-gray-500 mt-2">Cập nhật lần cuối: Năm 2026</p>
        </div>

        <div className="p-8 rounded-3xl bg-[#191919] border border-[#302839] space-y-6 text-xs sm:text-sm text-gray-300 leading-relaxed shadow-xl">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Quyền Sở Hữu Thương Mại Hình Ảnh</h2>
            <p>
              Mọi tác phẩm, phối cảnh kiến trúc, mô hình 3D mặt bằng và hình ảnh cải tạo được sinh ra từ tài khoản của người dùng thuộc 100% quyền sở hữu thương mại của người dùng đó. Bạn có toàn quyền sử dụng để thuyết trình cho chủ đầu tư, đưa vào hồ sơ thiết kế, in ấn hoặc quảng bá bất động sản.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. Bảo Mật Bản Vẽ & Dữ Liệu Khách Hàng</h2>
            <p>
              OPZEN AI cam kết không chia sẻ, bán hoặc sử dụng các bản vẽ CAD, hình ảnh hiện trạng nội thất hoặc thông tin bí mật kinh doanh của bạn cho bên thứ ba. Dữ liệu xử lý qua mô hình Gemini 2.0 tuân thủ tiêu chuẩn mã hoá bảo mật doanh nghiệp cao cấp.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Chính Sách Credits & Nạp Tiền</h2>
            <p>
              Credits được sử dụng để chi trả cho các lượt tính toán và tạo ảnh. Credits không có giá trị quy đổi ngược lại tiền mặt, nhưng có thời hạn sử dụng dài hạn theo từng gói đăng ký (Starter 30 ngày, Pro 90 ngày, Ultra 180 ngày). Nếu bạn gặp lỗi gián đoạn từ hệ thống trong quá trình render, credits bị trừ sẽ được tự động hoàn trả.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Trách Nhiệm Kỹ Thuật</h2>
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
