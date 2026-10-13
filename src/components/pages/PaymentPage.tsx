import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HomepageHeader } from '../layout/HomepageHeader';
import { Footer } from '../layout/Footer';
import { Check, QrCode, ShieldCheck, ArrowLeft, Sparkles, Copy } from 'lucide-react';

export const PaymentPage: React.FC = () => {
  const { selectedPaymentPlan, user, setUser, setActiveRoute } = useApp();
  const [copied, setCopied] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const planName =
    selectedPaymentPlan === 'starter'
      ? 'Starter'
      : selectedPaymentPlan === 'ultra'
      ? 'Ultra Studio'
      : 'Pro';

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
    <div className="min-h-screen bg-[#121212] text-white flex flex-col font-sans selection:bg-[#7f13ec] selection:text-white">
      <HomepageHeader />

      <main className="pt-32 pb-20 flex-1 max-w-4xl mx-auto px-4 w-full">
        <button
          onClick={() => setActiveRoute('/pricing')}
          className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Bảng giá</span>
        </button>

        {isSuccess ? (
          <div className="bg-[#191919] border border-[#7f13ec] rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto shadow-2xl shadow-[#7f13ec]/20">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#7f13ec] to-[#9d4edd] text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#7f13ec]/40">
              <Check className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Thanh Toán Thành Công!</h2>
            <p className="text-sm text-gray-400 mb-6">
              Bạn đã nạp thành công <strong className="text-purple-400 font-bold">{planCredits.toLocaleString()} Credits</strong> cho gói {planName}.
            </p>
            <div className="p-4 rounded-xl bg-[#242424] border border-[#302839] mb-8 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Tài khoản:</span>
                <span className="font-semibold text-white">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Số dư hiện tại:</span>
                <span className="font-bold text-purple-400">{user.credits.toLocaleString()} Credits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Hạn sử dụng:</span>
                <span className="font-semibold text-white">31/12/2026</span>
              </div>
            </div>
            <button
              onClick={() => setActiveRoute('/image')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#7f13ec] to-[#9d4edd] hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-[#7f13ec]/35 cursor-pointer"
            >
              Vào Không Gian Thiết Kế Ngay →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Plan Summary */}
            <div className="bg-[#191919] border border-[#302839] rounded-2xl p-6 sm:p-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                  Xác nhận đơn hàng
                </span>
                <h2 className="text-2xl font-black text-white mt-1">Gói {planName}</h2>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">{planPrice}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#242424] border border-[#302839] space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Số Credits nhận được:</span>
                  <span className="font-bold text-purple-400">+{planCredits.toLocaleString()} Credits</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Hạn dùng gói:</span>
                  <span className="font-semibold text-white">30 - 180 ngày</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Hỗ trợ kỹ thuật:</span>
                  <span className="font-semibold text-emerald-400">24/7 Zalo / Hotline</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#302839] flex items-center gap-2.5 text-xs text-gray-400">
                <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0" />
                <span>Kích hoạt tự động ngay sau khi ngân hàng báo Có</span>
              </div>
            </div>

            {/* Right: VietQR */}
            <div className="bg-[#191919] border border-[#302839] rounded-2xl p-6 sm:p-7 space-y-5 text-center">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-purple-400">
                <QrCode className="w-4 h-4" />
                <span>Quét mã VietQR chuyển khoản 24/7</span>
              </div>

              {/* QR Image Placeholder */}
              <div className="w-52 h-52 mx-auto rounded-2xl p-3 bg-white border-4 border-[#7f13ec]/40 shadow-xl flex flex-col items-center justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://opzen.ai/pay?amount=${planPrice}&code=${encodeURIComponent(transferCode)}`}
                  alt="VietQR Payment"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Transfer Details */}
              <div className="text-left bg-[#242424] p-4 rounded-xl border border-[#302839] space-y-2 text-xs">
                <div>
                  <span className="text-gray-400 block text-[11px]">Ngân hàng nhận:</span>
                  <span className="font-bold text-white">MB Bank (Quân Đội)</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Số tài khoản:</span>
                  <span className="font-bold text-purple-400 font-mono text-sm">0988889999</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Chủ tài khoản:</span>
                  <span className="font-bold text-white uppercase">CONG TY CONG NGHE OPZEN AI</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Nội dung chuyển khoản (bắt buộc):</span>
                  <div className="flex items-center justify-between mt-1 p-2 rounded bg-black/50 border border-[#302839]">
                    <span className="font-mono font-bold text-purple-300 text-xs">{transferCode}</span>
                    <button
                      onClick={handleCopy}
                      className="text-xs text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? 'Đã sao chép' : 'Sao chép'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Sim Button */}
              <button
                onClick={handleConfirmPayment}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#7f13ec] to-[#9d4edd] hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-[#7f13ec]/35 cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
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
