import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HomepageHeader } from '../layout/HomepageHeader';
import { Footer } from '../layout/Footer';
import { FileText, ShieldCheck, ArrowRight, ArrowLeft, ChevronDown, HelpCircle } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const { theme, setActiveRoute } = useApp();
  const isLight = theme === 'light';
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const termsFaqs = [
    {
      q: 'Chính sách hoàn tiền của AchiPics hoạt động như thế nào?',
      a: 'Áp dụng chính sách không hoàn tiền (no-refund) cho tất cả các gói dịch vụ đã mua (ngoại trừ lỗi kỹ thuật hệ thống không khắc phục được trong 72 giờ như mục 2).',
    },
    {
      q: 'Số Credits còn dư của tháng này có được cộng dồn sang tháng sau không?',
      a: 'Không. Credits hoạt động theo cơ chế "Dùng hoặc Mất" (Use-it-or-lose-it), hết chu kỳ sẽ reset và hủy bỏ Credits dư.',
    },
    {
      q: 'Tôi có quyền thương mại đối với các hình ảnh được tạo ra không?',
      a: 'Có. Bạn có toàn quyền sở hữu và sử dụng thương mại đối với hình ảnh do bạn tạo ra sau khi thanh toán đầy đủ, đồng thời tự chịu trách nhiệm về tính hợp pháp của nội dung.',
    },
    {
      q: 'Tôi có thể hủy gia hạn gói đăng ký (Cancel Subscription) bất cứ lúc nào không?',
      a: 'Chắc chắn rồi. Bạn có thể tắt "Tự động gia hạn" trong Cài đặt tài khoản và tiếp tục dùng phần Credits còn lại đến hết chu kỳ hiện tại.',
    },
    {
      q: 'Hình ảnh AI tạo ra có chính xác tuyệt đối để thi công không?',
      a: 'Không đảm bảo khả thi tuyệt đối về mặt kết cấu/kỹ thuật; cần tham vấn Kiến trúc sư/Kỹ sư trước khi thi công thực tế.',
    },
    {
      q: 'Nếu tôi dùng hết Credits trước khi hết tháng thì sao?',
      a: 'Bạn có thể mua thêm gói Credits nạp thêm (Top-up) hoặc nâng cấp (Upgrade) lên gói cao hơn.',
    },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col font-sans selection:bg-[#A3E635] selection:text-[#06080D] transition-colors ${
        isLight ? 'bg-[#F4F7FC] text-[#06080D]' : 'bg-[#06080D] text-[#F4F7FB]'
      }`}
    >
      <HomepageHeader />

      <main className="pt-32 pb-20 flex-1 max-w-4xl mx-auto px-4 sm:px-6 w-full space-y-10 relative">
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
                <FileText className={`w-3.5 h-3.5 ${isLight ? 'text-[#2563EB]' : 'text-[#A3E635]'}`} />
                <span>ĐIỀU KHOẢN SỬ DỤNG</span>
              </div>
            </div>

            <button
              onClick={() => setActiveRoute('/privacy-policy')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-colors cursor-pointer ${
                isLight
                  ? 'bg-[#FFFFFF] border-[#C7D6EE] text-[#475569] hover:text-[#1D4ED8] hover:border-[#2563EB]/60'
                  : 'bg-[#0D162B] border-[#1D3566] text-[#9BAAC6] hover:text-[#A3E635] hover:border-[#A3E635]/50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Xem Chính sách bảo mật</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div>
            <h1
              className={`text-3xl sm:text-4xl font-bold font-serif-display tracking-tight ${
                isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'
              }`}
            >
              CHÍNH SÁCH DỊCH VỤ VÀ ĐIỀU KHOẢN SỬ DỤNG
            </h1>
            <p className={`text-xs mt-2 ${isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}`}>
              Cập nhật lần cuối: Tháng 11/2026
            </p>
            <p className={`text-sm mt-3 leading-relaxed ${isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}`}>
              Chào mừng bạn đến với <strong className={isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}>AchiPics</strong>. Khi đăng ký tài khoản và mua gói dịch vụ, bạn đồng ý tuân thủ hoàn toàn các điều khoản dưới đây.
            </p>
          </div>
        </div>

        {/* Terms Content */}
        <div
          className={`p-6 sm:p-10 rounded-2xl border space-y-8 text-xs sm:text-sm leading-relaxed relative z-10 ${
            isLight
              ? 'bg-[#FFFFFF] border-[#C7D6EE] text-[#475569] shadow-sm'
              : 'bg-[#0D162B] border-[#1D3566] text-[#9BAAC6] shadow-xl'
          }`}
        >
          {/* 1 */}
          <section className="space-y-2.5">
            <h2 className={`text-base font-bold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
              1. Định nghĩa
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className={isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}>&ldquo;Dịch vụ&rdquo;:</strong> Là phần mềm AI hỗ trợ thiết kế kiến trúc, nội thất do chúng tôi cung cấp.
              </li>
              <li>
                <strong className={isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}>&ldquo;Credits&rdquo; (Điểm tín dụng):</strong> Là đơn vị tiền tệ trong ứng dụng được sử dụng để đổi lấy các tác vụ AI (ví dụ: render ảnh, tạo phương án thiết kế).
              </li>
              <li>
                <strong className={isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}>&ldquo;Gói đăng ký&rdquo; (Subscription):</strong> Là việc mua quyền truy cập và số lượng Credits nhất định theo chu kỳ (tháng/năm).
              </li>
            </ul>
          </section>

          {/* 2 */}
          <section className="space-y-2.5">
            <h2 className={`text-base font-bold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
              2. Chính sách Thanh toán và Hoàn tiền (No Refund Policy)
            </h2>
            <p>
              Đây là sản phẩm kỹ thuật số (Digital Product) và chi phí vận hành AI (Server/GPU) phát sinh ngay lập tức khi bạn sử dụng. Do đó, chúng tôi áp dụng chính sách <strong className={isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}>KHÔNG HOÀN TIỀN</strong> nghiêm ngặt:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className={isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}>Nguyên tắc chung:</strong> Tất cả các khoản thanh toán cho Gói đăng ký hoặc mua Credits lẻ đều là không hoàn lại (non-refundable) trong mọi trường hợp.
              </li>
              <li>
                <strong className={isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}>Xác nhận mua hàng:</strong> Khi bạn bấm nút thanh toán, bạn xác nhận rằng bạn đã hiểu rõ tính năng sản phẩm và đồng ý từ bỏ quyền yêu cầu hoàn tiền (chargeback) qua ngân hàng hoặc cổng thanh toán.
              </li>
              <li>
                <strong className={isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}>Ngoại lệ:</strong> Chúng tôi chỉ xem xét hoàn tiền trong trường hợp lỗi kỹ thuật nghiêm trọng xuất phát từ phía hệ thống của chúng tôi (ví dụ: bị trừ tiền nhưng không nhận được Credits) và lỗi này không thể khắc phục được trong vòng 72 giờ.
              </li>
            </ul>
          </section>

          {/* 3 */}
          <section className="space-y-2.5">
            <h2 className={`text-base font-bold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
              3. Quy định về Credits và Hạn sử dụng (Quan trọng)
            </h2>
            <p>
              Hệ thống Credits của chúng tôi được thiết kế để duy trì tài nguyên máy chủ ổn định. Bạn cần lưu ý kỹ về hạn sử dụng:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className={isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}>Cơ chế &ldquo;Dùng hoặc Mất&rdquo; (Use it or Lose it):</strong> Credits được cấp theo Gói đăng ký có thời hạn sử dụng tương ứng với chu kỳ của gói đó (ví dụ: Gói 1 tháng thì Credits có hạn 30 ngày).
              </li>
              <li>
                <strong className={isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}>Hết hạn:</strong> Khi Gói đăng ký của bạn hết hạn hoặc đến ngày gia hạn tiếp theo:
                <ul className="list-circle pl-5 mt-1.5 space-y-1">
                  <li>Toàn bộ số Credits chưa sử dụng (còn dư) của chu kỳ trước sẽ bị hủy bỏ và thu hồi về 0.</li>
                  <li>Số Credits dư này KHÔNG được cộng dồn (rollover) sang tháng tiếp theo.</li>
                  <li>Số Credits dư này KHÔNG được quy đổi thành tiền mặt hoặc chuyển nhượng cho tài khoản khác.</li>
                </ul>
              </li>
              <li>
                <strong className={isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}>Trách nhiệm người dùng:</strong> Bạn có trách nhiệm quản lý và sử dụng hết số Credits trong thời hạn hiệu lực. Chúng tôi không chịu trách nhiệm thông báo nhắc nhở về việc Credits sắp hết hạn.
              </li>
            </ul>
          </section>

          {/* 4 */}
          <section className="space-y-2.5">
            <h2 className={`text-base font-bold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
              4. Quyền Sở hữu Trí tuệ (Intellectual Property)
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className={isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}>Đầu ra (Output):</strong> Bạn sở hữu toàn quyền thương mại đối với các hình ảnh/thiết kế được tạo ra từ tài khoản của bạn sau khi đã thanh toán đầy đủ. Bạn có thể sử dụng chúng cho khách hàng, in ấn hoặc portfolio.
              </li>
              <li>
                <strong className={isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}>Dữ liệu hệ thống:</strong> Chúng tôi sở hữu thuật toán, mã nguồn và giao diện phần mềm.
              </li>
              <li>
                <strong className={isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}>Quyền sử dụng lại:</strong> Chúng tôi có quyền sử dụng các hình ảnh được tạo ra (nếu bạn sử dụng gói miễn phí hoặc chế độ công khai) để phục vụ mục đích quảng bá, marketing hoặc huấn luyện AI để cải thiện chất lượng dịch vụ. (Nếu bạn muốn bảo mật tuyệt đối, vui lòng mua gói Doanh nghiệp/Riêng tư).
              </li>
            </ul>
          </section>

          {/* 5 */}
          <section className="space-y-2.5">
            <h2 className={`text-base font-bold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
              5. Tuyên bố miễn trừ trách nhiệm về Chuyên môn (Disclaimer)
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className={isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}>AI là công cụ hỗ trợ:</strong> AchiPics là công cụ AI hỗ trợ sáng tạo ý tưởng (ideation) và diễn họa. Các kết quả đầu ra (hình ảnh, bản vẽ) không thay thế cho hồ sơ kỹ thuật thi công, kết cấu hoặc tư vấn của Kiến trúc sư/Kỹ sư có chứng chỉ hành nghề.
              </li>
              <li>
                <strong className={isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}>Tính chính xác:</strong> AI có thể tạo ra các chi tiết kiến trúc không khả thi về mặt vật lý hoặc xây dựng. Bạn hoàn toàn chịu trách nhiệm kiểm tra lại tính khả thi trước khi áp dụng vào thực tế. Chúng tôi không chịu trách nhiệm cho bất kỳ thiệt hại nào về công trình, chi phí thi công phát sinh do việc áp dụng trực tiếp hình ảnh AI vào xây dựng.
              </li>
            </ul>
          </section>

          {/* 6 */}
          <section className="space-y-2.5">
            <h2 className={`text-base font-bold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
              6. Chấm dứt dịch vụ
            </h2>
            <p>
              Chúng tôi có quyền khóa tài khoản của bạn vĩnh viễn mà không cần hoàn tiền nếu phát hiện:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Sử dụng thẻ tín dụng đánh cắp hoặc gian lận thanh toán.</li>
              <li>Chia sẻ tài khoản cho nhiều người dùng chung trái phép.</li>
              <li>Sử dụng AI để tạo ra các nội dung vi phạm pháp luật, đồi trụy hoặc thù địch.</li>
            </ul>
          </section>

          {/* 7 */}
          <section className="space-y-2.5">
            <h2 className={`text-base font-bold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
              7. Thay đổi điều khoản
            </h2>
            <p>
              Chúng tôi có quyền thay đổi giá cả và các điều khoản này bất cứ lúc nào. Các thay đổi sẽ được thông báo qua email hoặc ngay trên trang chủ. Việc bạn tiếp tục sử dụng dịch vụ sau khi thay đổi đồng nghĩa với việc bạn chấp nhận các điều khoản mới.
            </p>
          </section>
        </div>

        {/* FAQ in Terms Page */}
        <section className="relative z-10 space-y-5 pt-2">
          <div className="flex items-center gap-2.5">
            <HelpCircle className={`w-5 h-5 ${isLight ? 'text-[#2563EB]' : 'text-[#A3E635]'}`} />
            <h2 className={`text-xl sm:text-2xl font-bold font-serif-display ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
              Câu hỏi thường gặp (FAQ)
            </h2>
          </div>

          <div className="grid gap-2.5">
            {termsFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className={`p-5 sm:p-6 rounded-xl border transition-colors cursor-pointer ${
                    isLight
                      ? isOpen
                        ? 'bg-[#FFFFFF] border-[#2563EB]/60 shadow-sm'
                        : 'bg-[#FFFFFF] border-[#C7D6EE] hover:border-[#2563EB]/45'
                      : isOpen
                        ? 'bg-[#101E3A] border-[#A3E635]/45'
                        : 'bg-[#0D162B] border-[#1D3566] hover:border-[#2563EB]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className={`text-sm font-semibold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
                      {faq.q}
                    </h3>
                    <div
                      className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all border ${
                        isOpen
                          ? isLight
                            ? 'bg-[#2563EB] text-[#FFFFFF] border-[#2563EB] rotate-180'
                            : 'bg-[#A3E635] text-[#06080D] border-[#A3E635] rotate-180'
                          : isLight
                            ? 'bg-[#E4ECF9] border-[#C7D6EE] text-[#475569]'
                            : 'bg-[#06080D] border-[#1D3566] text-[#66789C]'
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  {isOpen && (
                    <div className={`pt-3.5 border-t mt-3.5 ${isLight ? 'border-[#DCE5F5]' : 'border-[#1D3566]'}`}>
                      <p className={`text-[13px] leading-[1.7] ${isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}`}>
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

