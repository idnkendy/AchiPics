import React, { useState } from 'react';
import { HomepageHeader } from '../layout/HomepageHeader';
import { Footer } from '../layout/Footer';
import { Mail, Phone, MapPin, Send, Check, Sparkles } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0E1726] text-[#F1ECE2] flex flex-col font-sans selection:bg-[#D9C9A3] selection:text-[#0E1726]">
      <HomepageHeader />

      <main className="pt-32 pb-20 flex-1 max-w-5xl mx-auto px-4 w-full relative">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(217,201,163,0.05)_0%,transparent_70%)] pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121D30] border border-[#24304A] text-xs font-semibold text-[#DDCDA8] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D9C9A3]" />
            <span>HỖ TRỢ 24/7</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif-display text-[#F1ECE2] tracking-tight">
            Đồng Hành Cùng KTS & Doanh Nghiệp
          </h1>
          <p className="text-xs sm:text-sm text-[#9AA3B5] mt-3 leading-relaxed">
            Đội ngũ chuyên gia kỹ thuật và kiến trúc sư của OPZEN AI luôn sẵn sàng hỗ trợ giải pháp render tối ưu nhất
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start relative z-10">
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-[#121D30] border border-[#24304A] flex items-start gap-4 hover:border-[#D9C9A3]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#16213A] border border-[#24304A] flex items-center justify-center text-[#D9C9A3] shrink-0 font-bold shadow-md">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#F1ECE2]">Hotline & Zalo Kỹ Thuật</h4>
                <p className="text-xs text-[#9AA3B5] mt-1">Hỗ trợ nhanh chóng qua kênh Zalo chính thức 24/7</p>
                <p className="text-xs font-bold text-[#DDCDA8] mt-2 font-mono">0988.889.999</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#121D30] border border-[#24304A] flex items-start gap-4 hover:border-[#D9C9A3]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#16213A] border border-[#24304A] flex items-center justify-center text-[#D9C9A3] shrink-0 font-bold shadow-md">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#F1ECE2]">Email Hợp Tác & Studio</h4>
                <p className="text-xs text-[#9AA3B5] mt-1">Báo giá gói doanh nghiệp & tích hợp API riêng</p>
                <p className="text-xs font-bold text-[#DDCDA8] mt-2">contact@opzenai.com</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#121D30] border border-[#24304A] flex items-start gap-4 hover:border-[#D9C9A3]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#16213A] border border-[#24304A] flex items-center justify-center text-[#D9C9A3] shrink-0 font-bold shadow-md">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#F1ECE2]">Trụ Sở Công Nghệ</h4>
                <p className="text-xs text-[#9AA3B5] mt-1 leading-relaxed">
                  Tòa nhà Innovation Hub, Khu Công Nghệ Cao, TP. Hồ Chí Minh
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#121D30] border border-[#24304A] shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#D9C9A3] text-[#0E1726] flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="text-lg font-bold font-serif-display text-[#F1ECE2]">Đã Gửi Thành Công!</h3>
                <p className="text-xs text-[#9AA3B5] max-w-xs mx-auto leading-relaxed">
                  Cảm ơn bạn đã liên hệ. Đội ngũ kỹ thuật OPZEN AI sẽ phản hồi qua email trong vòng 30 phút.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-sm font-bold text-[#F1ECE2] uppercase tracking-wider mb-2">
                  Gửi Yêu Cầu Hỗ Trợ
                </h3>

                <div>
                  <label className="text-xs font-medium text-[#CBD5E1] block mb-1">
                    Họ và Tên
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="KTS Hoàng Long"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0E1726] border border-[#24304A] rounded-xl text-xs text-[#F1ECE2] placeholder-[#646E84] focus:outline-none focus:border-[#D9C9A3]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#CBD5E1] block mb-1">
                    Địa chỉ Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="long.kts@studio.vn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0E1726] border border-[#24304A] rounded-xl text-xs text-[#F1ECE2] placeholder-[#646E84] focus:outline-none focus:border-[#D9C9A3]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#CBD5E1] block mb-1">
                    Nội dung lời nhắn
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tôi muốn tư vấn gói Studio và xuất hóa đơn VAT..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3.5 bg-[#0E1726] border border-[#24304A] rounded-xl text-xs text-[#F1ECE2] placeholder-[#646E84] focus:outline-none focus:border-[#D9C9A3]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#D9C9A3] hover:bg-[#EDE2C8] text-[#0E1726] font-bold text-xs shadow-md shadow-[#D9C9A3]/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4 text-[#0E1726]" />
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
