import React, { useState } from 'react';
import { HomepageHeader } from '../layout/HomepageHeader';
import { Footer } from '../layout/Footer';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';

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
    <div className="min-h-screen bg-[#121212] text-white flex flex-col font-sans selection:bg-[#7f13ec] selection:text-white">
      <HomepageHeader />

      <main className="pt-32 pb-20 flex-1 max-w-5xl mx-auto px-4 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[3px] text-purple-400 mb-2 inline-block px-3 py-1 rounded-full bg-[#7f13ec]/10 border border-[#7f13ec]/30">
            Hỗ Trợ 24/7
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Đồng Hành Cùng KTS & Doanh Nghiệp
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            Đội ngũ chuyên gia kỹ thuật và kiến trúc sư của OPZEN AI luôn sẵn sàng hỗ trợ giải pháp render tối ưu nhất
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-[#191919] border border-[#302839] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7f13ec] to-[#9d4edd] flex items-center justify-center text-white shrink-0 font-bold shadow-md">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Hotline & Zalo Kỹ Thuật</h4>
                <p className="text-xs text-gray-400 mt-1">Hỗ trợ nhanh chóng qua kênh Zalo chính thức 24/7</p>
                <p className="text-xs font-bold text-purple-400 mt-2">0988.889.999</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#191919] border border-[#302839] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7f13ec] to-[#9d4edd] flex items-center justify-center text-white shrink-0 font-bold shadow-md">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Email Hợp Tác & Studio</h4>
                <p className="text-xs text-gray-400 mt-1">Báo giá gói doanh nghiệp & tích hợp API riêng</p>
                <p className="text-xs font-bold text-purple-400 mt-2">contact@opzenai.com</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#191919] border border-[#302839] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7f13ec] to-[#9d4edd] flex items-center justify-center text-white shrink-0 font-bold shadow-md">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Trụ Sở Công Nghệ</h4>
                <p className="text-xs text-gray-400 mt-1">
                  Tòa nhà Innovation Hub, Khu Công Nghệ Cao, TP. Hồ Chí Minh
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#191919] border border-[#302839] shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#7f13ec] to-[#9d4edd] text-white flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Đã Gửi Thành Công!</h3>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                  Cảm ơn bạn đã liên hệ. Đội ngũ kỹ thuật OPZEN AI sẽ phản hồi qua email trong vòng 30 phút.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Gửi Yêu Cầu Hỗ Trợ
                </h3>

                <div>
                  <label className="text-xs font-medium text-gray-300 block mb-1">
                    Họ và Tên
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="KTS Hoàng Long"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#242424] border border-[#302839] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#7f13ec]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-300 block mb-1">
                    Địa chỉ Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="long.kts@studio.vn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#242424] border border-[#302839] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#7f13ec]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-300 block mb-1">
                    Nội dung lời nhắn
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tôi muốn tư vấn gói Studio 10 người và xuất hóa đơn VAT..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3.5 bg-[#242424] border border-[#302839] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#7f13ec]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7f13ec] to-[#9d4edd] hover:opacity-95 text-white font-bold text-xs shadow-md shadow-[#7f13ec]/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4" />
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
