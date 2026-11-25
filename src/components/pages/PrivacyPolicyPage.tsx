import React from 'react';
import { useApp } from '../../context/AppContext';
import { HomepageHeader } from '../layout/HomepageHeader';
import { Footer } from '../layout/Footer';
import { ShieldCheck, FileText, ArrowRight, ArrowLeft } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { theme, setActiveRoute } = useApp();
  const isLight = theme === 'light';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans selection:bg-[#A3E635] selection:text-[#06080D] transition-colors ${
        isLight ? 'bg-[#F4F7FC] text-[#06080D]' : 'bg-[#06080D] text-[#F4F7FB]'
      }`}
    >
      <HomepageHeader />

      <main className="pt-32 pb-20 flex-1 max-w-4xl mx-auto px-4 sm:px-6 w-full space-y-8 relative">
        {/* Subtle Ambient Radial Glow */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none ${
            isLight
              ? 'bg-[radial-gradient(ellipse,rgba(37,99,235,0.12)_0%,transparent_70%)]'
              : 'bg-[radial-gradient(ellipse,rgba(37,99,235,0.16)_0%,transparent_70%)]'
          }`}
        />

        {/* Header */}
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setActiveRoute('/')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-colors cursor-pointer ${
                  isLight
                    ? 'bg-[#FFFFFF] border-[#C7D6EE] text-[#475569] hover:text-[#1D4ED8] hover:border-[#2563EB]/60'
                    : 'bg-[#0D162B] border-[#1D3566] text-[#9BAAC6] hover:text-[#A3E635] hover:border-[#A3E635]/50'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Về trang chủ</span>
              </button>

              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold shadow-sm ${
                  isLight
                    ? 'bg-[#FFFFFF] border-[#C7D6EE] text-[#1D4ED8]'
                    : 'bg-[#0D162B] border-[#1D3566] text-[#A3E635]'
                }`}
              >
                <ShieldCheck className={`w-3.5 h-3.5 ${isLight ? 'text-[#2563EB]' : 'text-[#A3E635]'}`} />
                <span>CHÍNH SÁCH BẢO MẬT</span>
              </div>
            </div>

            <button
              onClick={() => setActiveRoute('/terms-of-service')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-colors cursor-pointer ${
                isLight
                  ? 'bg-[#FFFFFF] border-[#C7D6EE] text-[#475569] hover:text-[#1D4ED8] hover:border-[#2563EB]/60'
                  : 'bg-[#0D162B] border-[#1D3566] text-[#9BAAC6] hover:text-[#A3E635] hover:border-[#A3E635]/50'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Xem Điều khoản dịch vụ</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div>
            <h1
              className={`text-3xl sm:text-4xl font-bold font-serif-display tracking-tight ${
                isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'
              }`}
            >
              CHÍNH SÁCH BẢO MẬT THÔNG TIN
            </h1>
            <p className={`text-xs mt-2 ${isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}`}>
              Cập nhật lần cuối: Tháng 11/2026
            </p>
            <p className={`text-sm mt-3 leading-relaxed ${isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}`}>
              Tại <strong className={isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}>AchiPics</strong>, chúng tôi tôn trọng và cam kết bảo vệ quyền riêng tư, thông tin cá nhân cũng như dữ liệu thiết kế kiến trúc của bạn khi sử dụng nền tảng.
            </p>
          </div>
        </div>

        {/* Policy Body */}
        <div
          className={`p-6 sm:p-10 rounded-2xl border space-y-7 text-xs sm:text-sm leading-relaxed relative z-10 ${
            isLight
              ? 'bg-[#FFFFFF] border-[#C7D6EE] text-[#475569] shadow-sm'
              : 'bg-[#0D162B] border-[#1D3566] text-[#9BAAC6] shadow-xl'
          }`}
        >
          <section className="space-y-2.5">
            <h2 className={`text-base font-bold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
              1. Thông tin chúng tôi thu thập
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className={isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}>Thông tin tài khoản:</strong> Họ tên, địa chỉ email, số điện thoại (nếu có) và ảnh đại diện khi bạn đăng ký hoặc đăng nhập thông qua Email hoặc Google OAuth.
              </li>
              <li>
                <strong className={isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}>Thông tin giao dịch & Credits:</strong> Lịch sử mua gói dịch vụ, nạp Credits và lịch sử tiêu hao Credits cho từng tác vụ AI (chúng tôi không lưu trữ trực tiếp số thẻ ngân hàng của bạn).
              </li>
              <li>
                <strong className={isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}>Dữ liệu thiết kế tải lên:</strong> Hình ảnh hiện trạng, bản vẽ mặt bằng 2D, ảnh tham chiếu, mô tả văn bản (prompt) và kết quả ảnh render được tạo ra trong phiên làm việc của bạn.
              </li>
              <li>
                <strong className={isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}>Thông tin kỹ thuật:</strong> Địa chỉ IP, loại trình duyệt, hệ điều hành và nhật ký lỗi hệ thống nhằm đảm bảo ổn định và chống gian lận.
              </li>
            </ul>
          </section>

          <section className="space-y-2.5">
            <h2 className={`text-base font-bold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
              2. Mục đích sử dụng thông tin
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Vận hành các mô hình AI để xử lý yêu cầu render kiến trúc, nội thất, cải tạo và quy hoạch từ dữ liệu bạn cung cấp.</li>
              <li>Quản lý tài khoản, xác thực đăng nhập, theo dõi số dư Credits và thời hạn Gói đăng ký.</li>
              <li>Hỗ trợ kỹ thuật, xử lý sự cố (như hoàn trả hoặc đối soát giao dịch khi phát sinh lỗi hệ thống theo Điều khoản dịch vụ).</li>
              <li>Phát hiện, ngăn chặn hành vi gian lận thanh toán, lạm dụng hệ thống hoặc vi phạm pháp luật.</li>
              <li>Gửi thông báo quan trọng liên quan đến tài khoản, bảo mật hoặc thay đổi chính sách/điều khoản.</li>
            </ul>
          </section>

          <section className="space-y-2.5">
            <h2 className={`text-base font-bold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
              3. Quyền riêng tư đối với hình ảnh & bản vẽ
            </h2>
            <p>
              Dữ liệu hình ảnh và bản vẽ bạn tải lên chỉ được truyền qua kết nối mã hóa để thực hiện tác vụ render AI và lưu vào lịch sử tài khoản của chính bạn.
            </p>
            <p>
              AchiPics <strong className={isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}>không bán</strong> bản vẽ, hồ sơ thiết kế hay dữ liệu khách hàng cho bên thứ ba. Theo quy định tại Điều khoản sử dụng, đối với người dùng gói miễn phí hoặc chế độ công khai, hình ảnh đầu ra có thể được dùng để quảng bá hoặc cải thiện chất lượng AI; các gói Doanh nghiệp/Riêng tư được áp dụng chế độ bảo mật riêng biệt.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className={`text-base font-bold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
              4. Chia sẻ thông tin với bên thứ ba
            </h2>
            <p>
              Chúng tôi chỉ chia sẻ thông tin ở mức tối thiểu cần thiết với các đối tác hạ tầng kỹ thuật đáng tin cậy để vận hành dịch vụ (nhà cung cấp hạ tầng máy chủ/AI, xác thực tài khoản và cổng thanh toán), hoặc khi có yêu cầu hợp pháp từ cơ quan nhà nước có thẩm quyền.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className={`text-base font-bold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
              5. Cookie & Bộ nhớ trình duyệt
            </h2>
            <p>
              AchiPics sử dụng Cookie và <code className={`px-1.5 py-0.5 rounded font-mono text-[11px] ${isLight ? 'bg-[#E4ECF9] text-[#1D4ED8]' : 'bg-[#101E3A] text-[#A3E635]'}`}>localStorage</code> để duy trì phiên đăng nhập an toàn, ghi nhớ tùy chọn giao diện (Dark mode / Light mode) và ngôn ngữ hiển thị. Bạn có thể xóa hoặc tắt Cookie bất kỳ lúc nào trong cài đặt trình duyệt.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className={`text-base font-bold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
              6. Lưu trữ & Quyền của bạn
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Bạn có quyền xem, cập nhật thông tin cá nhân trong phần Hồ sơ tài khoản.</li>
              <li>Bạn có quyền xóa các ảnh đã lưu trong mục Lịch sử tạo ảnh bất cứ lúc nào.</li>
              <li>Bạn có thể yêu cầu xuất hoặc xóa vĩnh viễn tài khoản và dữ liệu cá nhân bằng cách liên hệ trực tiếp với chúng tôi qua email hỗ trợ.</li>
            </ul>
          </section>

          <section className="space-y-2.5">
            <h2 className={`text-base font-bold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
              7. Liên hệ về Bảo mật
            </h2>
            <p>
              Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào liên quan đến Chính sách bảo mật và dữ liệu cá nhân, vui lòng liên hệ với đội ngũ AchiPics qua email:{' '}
              <a
                href="mailto:truongvohaiaune@gmail.com"
                className={`font-semibold underline ${isLight ? 'text-[#1D4ED8]' : 'text-[#A3E635]'}`}
              >
                truongvohaiaune@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
