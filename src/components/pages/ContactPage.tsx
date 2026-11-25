import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HomepageHeader } from '../layout/HomepageHeader';
import { Footer } from '../layout/Footer';
import { Mail, Phone, MapPin, Send, Check, Sparkles } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { theme } = useApp();
  const isLight = theme === 'light';
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors ${
        isLight
          ? 'bg-[#F4F7FC] text-[#06080D] selection:bg-[#2563EB] selection:text-[#FFFFFF]'
          : 'bg-[#06080D] text-[#F4F7FB] selection:bg-[#A3E635] selection:text-[#06080D]'
      }`}
    >
      <HomepageHeader />

      <main className="pt-32 pb-20 flex-1 max-w-5xl mx-auto px-4 w-full relative">
        {/* Ambient Radial Glow */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none ${
            isLight
              ? 'bg-[radial-gradient(ellipse,rgba(37,99,235,0.08)_0%,transparent_70%)]'
              : 'bg-[radial-gradient(ellipse,rgba(37,99,235,0.18)_0%,rgba(163,230,53,0.05)_45%,transparent_70%)]'
          }`}
        />

        <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold mb-4 shadow-sm ${
              isLight
                ? 'bg-[#FFFFFF] border-[#C7D6EE] text-[#1D4ED8]'
                : 'bg-[#0D162B] border-[#1D3566] text-[#A3E635]'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isLight ? 'text-[#2563EB]' : 'text-[#A3E635]'}`} />
            <span>HỖ TRỢ 24/7</span>
          </div>
          <h1
            className={`text-3xl sm:text-4xl font-bold font-serif-display tracking-tight ${
              isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'
            }`}
          >
            Đồng Hành Cùng KTS & Doanh Nghiệp
          </h1>
          <p className={`text-xs sm:text-sm mt-3 leading-relaxed ${isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}`}>
            Đội ngũ chuyên gia kỹ thuật và kiến trúc sư của AchiPics luôn sẵn sàng hỗ trợ giải pháp render tối ưu nhất
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start relative z-10">
          <div className="space-y-4">
            <div
              className={`p-6 rounded-2xl border flex items-start gap-4 transition-colors ${
                isLight
                  ? 'bg-[#FFFFFF] border-[#C7D6EE] hover:border-[#2563EB]'
                  : 'bg-[#0D162B] border-[#1D3566] hover:border-[#2563EB]'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 font-bold shadow-md ${
                  isLight
                    ? 'bg-[#E4ECF9] border-[#C7D6EE] text-[#2563EB]'
                    : 'bg-[#101E3A] border-[#1D3566] text-[#A3E635]'
                }`}
              >
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className={`text-sm font-bold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
                  Hotline & Zalo Kỹ Thuật
                </h4>
                <p className={`text-xs mt-1 ${isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}`}>
                  Hỗ trợ nhanh chóng qua kênh Zalo chính thức 24/7
                </p>
                <a
                  href="https://zaloapp.com/qr/p/e9xrusoaxxo7"
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-block text-xs font-bold hover:underline mt-2 ${
                    isLight ? 'text-[#1D4ED8]' : 'text-[#A3E635]'
                  }`}
                >
                  Kết nối Zalo →
                </a>
              </div>
            </div>

            <div
              className={`p-6 rounded-2xl border flex items-start gap-4 transition-colors ${
                isLight
                  ? 'bg-[#FFFFFF] border-[#C7D6EE] hover:border-[#2563EB]'
                  : 'bg-[#0D162B] border-[#1D3566] hover:border-[#2563EB]'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 font-bold shadow-md ${
                  isLight
                    ? 'bg-[#E4ECF9] border-[#C7D6EE] text-[#2563EB]'
                    : 'bg-[#101E3A] border-[#1D3566] text-[#A3E635]'
                }`}
              >
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className={`text-sm font-bold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
                  Email Hợp Tác & Studio
                </h4>
                <p className={`text-xs mt-1 ${isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}`}>
                  Báo giá gói doanh nghiệp & tích hợp API riêng
                </p>
                <a
                  href="mailto:truongvohaiaune@gmail.com"
                  className={`inline-block text-xs font-bold hover:underline mt-2 ${
                    isLight ? 'text-[#1D4ED8]' : 'text-[#A3E635]'
                  }`}
                >
                  truongvohaiaune@gmail.com
                </a>
              </div>
            </div>

            <div
              className={`p-6 rounded-2xl border flex items-start gap-4 transition-colors ${
                isLight
                  ? 'bg-[#FFFFFF] border-[#C7D6EE] hover:border-[#2563EB]'
                  : 'bg-[#0D162B] border-[#1D3566] hover:border-[#2563EB]'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 font-bold shadow-md ${
                  isLight
                    ? 'bg-[#E4ECF9] border-[#C7D6EE] text-[#2563EB]'
                    : 'bg-[#101E3A] border-[#1D3566] text-[#A3E635]'
                }`}
              >
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className={`text-sm font-bold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
                  Trụ Sở Công Nghệ
                </h4>
                <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}`}>
                  Tòa nhà Innovation Hub, Khu Công Nghệ Cao, TP. Hồ Chí Minh
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            className={`p-6 sm:p-7 rounded-2xl border shadow-xl ${
              isLight ? 'bg-[#FFFFFF] border-[#C7D6EE]' : 'bg-[#0D162B] border-[#1D3566]'
            }`}
          >
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#A3E635] text-[#06080D] flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3
                  className={`text-lg font-bold font-serif-display ${
                    isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'
                  }`}
                >
                  Đã Gửi Thành Công!
                </h3>
                <p className={`text-xs max-w-xs mx-auto leading-relaxed ${isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}`}>
                  Cảm ơn bạn đã liên hệ. Đội ngũ kỹ thuật AchiPics sẽ phản hồi qua email trong vòng 30 phút.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className={`text-sm font-bold uppercase tracking-wider mb-2 ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
                  Gửi Yêu Cầu Hỗ Trợ
                </h3>

                <div>
                  <label className={`text-xs font-medium block mb-1 ${isLight ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
                    Họ và Tên
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="KTS Hoàng Long"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-3.5 py-2.5 border rounded-xl text-xs focus:outline-none ${
                      isLight
                        ? 'bg-[#EAF0FA] border-[#C7D6EE] text-[#06080D] placeholder-[#64748B] focus:border-[#2563EB]'
                        : 'bg-[#06080D] border-[#1D3566] text-[#F4F7FB] placeholder-[#66789C] focus:border-[#2563EB]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`text-xs font-medium block mb-1 ${isLight ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
                    Địa chỉ Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="long.kts@studio.vn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-3.5 py-2.5 border rounded-xl text-xs focus:outline-none ${
                      isLight
                        ? 'bg-[#EAF0FA] border-[#C7D6EE] text-[#06080D] placeholder-[#64748B] focus:border-[#2563EB]'
                        : 'bg-[#06080D] border-[#1D3566] text-[#F4F7FB] placeholder-[#66789C] focus:border-[#2563EB]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`text-xs font-medium block mb-1 ${isLight ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
                    Nội dung lời nhắn
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tôi muốn tư vấn gói Studio và xuất hóa đơn VAT..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`w-full p-3.5 border rounded-xl text-xs focus:outline-none ${
                      isLight
                        ? 'bg-[#EAF0FA] border-[#C7D6EE] text-[#06080D] placeholder-[#64748B] focus:border-[#2563EB]'
                        : 'bg-[#06080D] border-[#1D3566] text-[#F4F7FB] placeholder-[#66789C] focus:border-[#2563EB]'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#A3E635] hover:bg-[#BEF264] text-[#06080D] font-bold text-xs shadow-md shadow-[#A3E635]/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4 text-[#06080D]" />
                  <span>Gửi Tin Nhắn Đi</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
