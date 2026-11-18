import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HomepageHeader } from '../layout/HomepageHeader';
import { Footer } from '../layout/Footer';
import { Check, QrCode, ShieldCheck, ArrowLeft, Sparkles, Copy, CheckCheck } from 'lucide-react';

export const PaymentPage: React.FC = () => {
  const { selectedPaymentPlan, user, setUser, setActiveRoute } = useApp();
  const [copied, setCopied] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const planName =
    selectedPaymentPlan === 'starter'
      ? 'Starter'
      : selectedPaymentPlan === 'ultra'
      ? 'Ultra Enterprise'
      : 'Pro Studio';

  const planPrice =
    selectedPaymentPlan === 'starter'
      ? '299,000 VNĐ'
      : selectedPaymentPlan === 'ultra'
      ? '1,999,000 VNĐ'
      : '599,000 VNĐ';

  const planCredits =
    selectedPaymentPlan === 'starter' ? 3000 : selectedPaymentPlan === 'ultra' ? 25000 : 7000;

  const transferCode = `OPZEN ${user.id.toUpperCase()} ${planName.toUpperCase().replace(/\s+/g, '')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(transferCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = () => {
    setUser((prev) => ({
      ...prev,
      credits: prev.credits + planCredits,
      plan: planName as 'Starter' | 'Pro' | 'Ultra',
      expiryDate: '31/12/2026',
    }));
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#0E1726] text-[#F1ECE2] flex flex-col font-sans selection:bg-[#D9C9A3] selection:text-[#0E1726]">
      <HomepageHeader />

      <main className="pt-32 pb-20 flex-1 max-w-4xl mx-auto px-4 w-full relative">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse,rgba(217,201,163,0.05)_0%,transparent_70%)] pointer-events-none" />

        <button
          onClick={() => setActiveRoute('/pricing')}
          className="flex items-center gap-2 text-xs font-semibold text-[#9AA3B5] hover:text-[#F1ECE2] mb-6 cursor-pointer transition-colors relative z-10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Bảng giá</span>
        </button>

        {isSuccess ? (
          <div className="bg-[#121D30] border-2 border-[#D9C9A3] rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto shadow-2xl shadow-[#D9C9A3]/10 relative z-10">
            <div className="w-16 h-16 rounded-full bg-[#D9C9A3] text-[#0E1726] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#D9C9A3]/25">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h2 className="text-2xl font-bold font-serif-display text-[#F1ECE2] mb-2">Thanh Toán Thành Công!</h2>
            <p className="text-sm text-[#9AA3B5] mb-6 leading-relaxed">
              Bạn đã nạp thành công <strong className="text-[#DDCDA8] font-bold">{planCredits.toLocaleString()} Credits</strong> cho gói {planName}.
            </p>
            <div className="p-4 rounded-xl bg-[#0E1726] border border-[#24304A] mb-8 text-left space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#9AA3B5]">Tài khoản:</span>
                <span className="font-semibold text-[#F1ECE2]">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9AA3B5]">Số dư hiện tại:</span>
                <span className="font-bold text-[#DDCDA8]">{user.credits.toLocaleString()} Credits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9AA3B5]">Hạn sử dụng:</span>
                <span className="font-semibold text-[#F1ECE2]">31/12/2026</span>
              </div>
            </div>
            <button
              onClick={() => setActiveRoute('/image')}
              className="w-full py-3.5 rounded-xl bg-[#D9C9A3] hover:bg-[#EDE2C8] text-[#0E1726] font-bold text-sm shadow-lg shadow-[#D9C9A3]/20 cursor-pointer transition-all hover:scale-[1.01]"
            >
              Vào Không Gian Thiết Kế Ngay →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start relative z-10">
            {/* Left: Plan Summary */}
            <div className="bg-[#121D30] border border-[#24304A] rounded-2xl p-6 sm:p-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#DDCDA8]">
                  Xác nhận đơn hàng
                </span>
                <h2 className="text-2xl font-black font-serif-display text-[#F1ECE2] mt-1">Gói {planName}</h2>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-[#F1ECE2]">{planPrice}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0E1726] border border-[#24304A] space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#9AA3B5]">Số Credits nhận được:</span>
                  <span className="font-bold text-[#DDCDA8]">+{planCredits.toLocaleString()} Credits</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#9AA3B5]">Hạn dùng gói:</span>
                  <span className="font-semibold text-[#F1ECE2]">30 - 180 ngày</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#9AA3B5]">Hỗ trợ kỹ thuật:</span>
                  <span className="font-semibold text-emerald-400">24/7 Zalo / Hotline</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#9AA3B5]">Hóa đơn VAT:</span>
                  <span className="font-semibold text-[#F1ECE2]">Hỗ trợ xuất hóa đơn điện tử</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#24304A] flex items-center gap-2.5 text-xs text-[#9AA3B5]">
                <ShieldCheck className="w-5 h-5 text-[#D9C9A3] shrink-0" />
                <span>Kích hoạt tự động ngay sau khi ngân hàng báo Có</span>
              </div>
            </div>

            {/* Right: VietQR */}
            <div className="bg-[#121D30] border border-[#24304A] rounded-2xl p-6 sm:p-7 space-y-5 text-center">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#DDCDA8]">
                <QrCode className="w-4 h-4 text-[#D9C9A3]" />
                <span>Quét mã VietQR chuyển khoản 24/7</span>
              </div>

              {/* QR Image Frame */}
              <div className="w-52 h-52 mx-auto rounded-2xl p-3 bg-white border-4 border-[#D9C9A3]/50 shadow-xl flex flex-col items-center justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://opzen.ai/pay?amount=${planPrice}&code=${encodeURIComponent(transferCode)}`}
                  alt="VietQR Payment"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Transfer Details */}
              <div className="text-left bg-[#0E1726] p-4 rounded-xl border border-[#24304A] space-y-2.5 text-xs">
                <div>
                  <span className="text-[#9AA3B5] block text-[11px]">Ngân hàng nhận:</span>
                  <span className="font-bold text-[#F1ECE2]">MB Bank (Ngân hàng Quân Đội)</span>
                </div>
                <div>
                  <span className="text-[#9AA3B5] block text-[11px]">Số tài khoản:</span>
                  <span className="font-bold text-[#DDCDA8] font-mono text-sm tracking-wider">0988889999</span>
                </div>
                <div>
                  <span className="text-[#9AA3B5] block text-[11px]">Chủ tài khoản:</span>
                  <span className="font-bold text-[#F1ECE2] uppercase">CONG TY CONG NGHE OPZEN AI</span>
                </div>
                <div>
                  <span className="text-[#9AA3B5] block text-[11px]">Nội dung chuyển khoản (bắt buộc):</span>
                  <div className="flex items-center justify-between mt-1 p-2.5 rounded-lg bg-[#111B2D] border border-[#24304A]">
                    <span className="font-mono font-bold text-[#DDCDA8] text-xs select-all">{transferCode}</span>
                    <button
                      onClick={handleCopy}
                      className="text-xs text-[#9AA3B5] hover:text-[#F1ECE2] flex items-center gap-1 cursor-pointer transition-colors"
                      title="Sao chép mã"
                    >
                      {copied ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-medium">Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Sao chép</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirmPayment}
                className="w-full py-3.5 rounded-xl bg-[#D9C9A3] hover:bg-[#EDE2C8] text-[#0E1726] font-bold text-xs shadow-lg shadow-[#D9C9A3]/20 cursor-pointer flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <Sparkles className="w-4 h-4 text-[#0E1726]" />
                <span>Tôi Đã Chuyển Khoản Thành Công</span>
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
