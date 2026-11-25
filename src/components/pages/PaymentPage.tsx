import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HomepageHeader } from '../layout/HomepageHeader';
import { Footer } from '../layout/Footer';
import { Check, QrCode, ShieldCheck, ArrowLeft, Sparkles, Copy, CheckCheck } from 'lucide-react';

export const PaymentPage: React.FC = () => {
  const { selectedPaymentPlan, user, setUser, setActiveRoute, theme } = useApp();
  const isLight = theme === 'light';
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

  const transferCode = `ACHIPICS ${(user.id || 'USER').toUpperCase()} ${planName.toUpperCase().replace(/\s+/g, '')}`;

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
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors ${
        isLight
          ? 'bg-[#F4F7FC] text-[#06080D] selection:bg-[#2563EB] selection:text-[#FFFFFF]'
          : 'bg-[#06080D] text-[#F4F7FB] selection:bg-[#A3E635] selection:text-[#06080D]'
      }`}
    >
      <HomepageHeader />

      <main className="pt-32 pb-20 flex-1 max-w-4xl mx-auto px-4 w-full relative">
        {/* Subtle Ambient Radial Glow */}
        <div
          className={`absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none ${
            isLight
              ? 'bg-[radial-gradient(ellipse,rgba(37,99,235,0.07)_0%,transparent_70%)]'
              : 'bg-[radial-gradient(ellipse,rgba(37,99,235,0.16)_0%,rgba(163,230,53,0.04)_45%,transparent_70%)]'
          }`}
        />

        <button
          onClick={() => setActiveRoute('/pricing')}
          className={`flex items-center gap-2 text-xs font-semibold mb-6 cursor-pointer transition-colors relative z-10 ${
            isLight
              ? 'text-[#475569] hover:text-[#1D4ED8]'
              : 'text-[#9BAAC6] hover:text-[#A3E635]'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Bảng giá</span>
        </button>

        {isSuccess ? (
          <div
            className={`border-2 rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto shadow-2xl relative z-10 ${
              isLight
                ? 'bg-[#FFFFFF] border-[#2563EB] shadow-[#2563EB]/10'
                : 'bg-[#0D162B] border-[#A3E635] shadow-[#A3E635]/10'
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-[#A3E635] text-[#06080D] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#A3E635]/25">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h2
              className={`text-2xl font-bold font-serif-display mb-2 ${
                isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'
              }`}
            >
              Thanh Toán Thành Công!
            </h2>
            <p className={`text-sm mb-6 leading-relaxed ${isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}`}>
              Bạn đã nạp thành công{' '}
              <strong className={`font-bold ${isLight ? 'text-[#1D4ED8]' : 'text-[#A3E635]'}`}>
                {planCredits.toLocaleString()} Credits
              </strong>{' '}
              cho gói {planName}.
            </p>
            <div
              className={`p-4 rounded-xl border mb-8 text-left space-y-2.5 text-xs ${
                isLight ? 'bg-[#EAF0FA] border-[#C7D6EE]' : 'bg-[#06080D] border-[#1D3566]'
              }`}
            >
              <div className="flex justify-between">
                <span className={isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}>Tài khoản:</span>
                <span className={`font-semibold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
                  {user.email || user.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}>Số dư hiện tại:</span>
                <span className={`font-bold ${isLight ? 'text-[#1D4ED8]' : 'text-[#A3E635]'}`}>
                  {user.credits.toLocaleString()} Credits
                </span>
              </div>
              <div className="flex justify-between">
                <span className={isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}>Hạn sử dụng:</span>
                <span className={`font-semibold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
                  31/12/2026
                </span>
              </div>
            </div>
            <button
              onClick={() => setActiveRoute('/image')}
              className="w-full py-3.5 rounded-xl bg-[#A3E635] hover:bg-[#BEF264] text-[#06080D] font-bold text-sm shadow-lg shadow-[#A3E635]/20 cursor-pointer transition-all hover:scale-[1.01]"
            >
              Vào Không Gian Thiết Kế Ngay →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start relative z-10">
            {/* Left: Plan Summary */}
            <div
              className={`border rounded-2xl p-6 sm:p-7 space-y-6 ${
                isLight ? 'bg-[#FFFFFF] border-[#C7D6EE] shadow-sm' : 'bg-[#0D162B] border-[#1D3566]'
              }`}
            >
              <div>
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    isLight ? 'text-[#2563EB]' : 'text-[#60A5FA]'
                  }`}
                >
                  Xác nhận đơn hàng
                </span>
                <h2
                  className={`text-2xl font-black font-serif-display mt-1 ${
                    isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'
                  }`}
                >
                  Gói {planName}
                </h2>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className={`text-3xl font-extrabold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
                    {planPrice}
                  </span>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border space-y-2.5 text-xs ${
                  isLight ? 'bg-[#EAF0FA] border-[#C7D6EE]' : 'bg-[#06080D] border-[#1D3566]'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}>Số Credits nhận được:</span>
                  <span className={`font-bold ${isLight ? 'text-[#1D4ED8]' : 'text-[#A3E635]'}`}>
                    +{planCredits.toLocaleString()} Credits
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}>Hạn dùng gói:</span>
                  <span className={`font-semibold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
                    30 - 180 ngày
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}>Hỗ trợ kỹ thuật:</span>
                  <span className={`font-semibold ${isLight ? 'text-[#15803D]' : 'text-[#A3E635]'}`}>
                    24/7 Zalo / Hotline
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}>Hóa đơn VAT:</span>
                  <span className={`font-semibold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
                    Hỗ trợ xuất hóa đơn điện tử
                  </span>
                </div>
              </div>

              <div
                className={`pt-2 border-t flex items-center gap-2.5 text-xs ${
                  isLight ? 'border-[#C7D6EE] text-[#475569]' : 'border-[#1D3566] text-[#9BAAC6]'
                }`}
              >
                <ShieldCheck className={`w-5 h-5 shrink-0 ${isLight ? 'text-[#2563EB]' : 'text-[#A3E635]'}`} />
                <span>Kích hoạt tự động ngay sau khi ngân hàng báo Có</span>
              </div>
            </div>

            {/* Right: VietQR */}
            <div
              className={`border rounded-2xl p-6 sm:p-7 space-y-5 text-center ${
                isLight ? 'bg-[#FFFFFF] border-[#C7D6EE] shadow-sm' : 'bg-[#0D162B] border-[#1D3566]'
              }`}
            >
              <div
                className={`flex items-center justify-center gap-2 text-xs font-bold ${
                  isLight ? 'text-[#1D4ED8]' : 'text-[#A3E635]'
                }`}
              >
                <QrCode className={`w-4 h-4 ${isLight ? 'text-[#2563EB]' : 'text-[#A3E635]'}`} />
                <span>Quét mã VietQR chuyển khoản 24/7</span>
              </div>

              {/* QR Image Frame */}
              <div
                className={`w-52 h-52 mx-auto rounded-2xl p-3 bg-white border-4 shadow-xl flex flex-col items-center justify-center ${
                  isLight ? 'border-[#2563EB]/40' : 'border-[#A3E635]/60'
                }`}
              >
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://achipics.ai/pay?amount=${planPrice}&code=${encodeURIComponent(transferCode)}`}
                  alt="VietQR Payment"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Transfer Details */}
              <div
                className={`text-left p-4 rounded-xl border space-y-2.5 text-xs ${
                  isLight ? 'bg-[#EAF0FA] border-[#C7D6EE]' : 'bg-[#06080D] border-[#1D3566]'
                }`}
              >
                <div>
                  <span className={`block text-[11px] ${isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}`}>
                    Ngân hàng nhận:
                  </span>
                  <span className={`font-bold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
                    MB Bank (Ngân hàng Quân Đội)
                  </span>
                </div>
                <div>
                  <span className={`block text-[11px] ${isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}`}>
                    Số tài khoản:
                  </span>
                  <span
                    className={`font-bold font-mono text-sm tracking-wider ${
                      isLight ? 'text-[#1D4ED8]' : 'text-[#A3E635]'
                    }`}
                  >
                    0988889999
                  </span>
                </div>
                <div>
                  <span className={`block text-[11px] ${isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}`}>
                    Chủ tài khoản:
                  </span>
                  <span className={`font-bold uppercase ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
                    CONG TY CONG NGHE ACHIPICS AI
                  </span>
                </div>
                <div>
                  <span className={`block text-[11px] ${isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}`}>
                    Nội dung chuyển khoản (bắt buộc):
                  </span>
                  <div
                    className={`flex items-center justify-between mt-1 p-2.5 rounded-lg border ${
                      isLight ? 'bg-[#FFFFFF] border-[#C7D6EE]' : 'bg-[#0A101E] border-[#1D3566]'
                    }`}
                  >
                    <span
                      className={`font-mono font-bold text-xs select-all ${
                        isLight ? 'text-[#1D4ED8]' : 'text-[#A3E635]'
                      }`}
                    >
                      {transferCode}
                    </span>
                    <button
                      onClick={handleCopy}
                      className={`text-xs flex items-center gap-1 cursor-pointer transition-colors ${
                        isLight
                          ? 'text-[#475569] hover:text-[#06080D]'
                          : 'text-[#9BAAC6] hover:text-[#F4F7FB]'
                      }`}
                      title="Sao chép mã"
                    >
                      {copied ? (
                        <>
                          <CheckCheck className={`w-3.5 h-3.5 ${isLight ? 'text-[#15803D]' : 'text-[#A3E635]'}`} />
                          <span className={`font-medium ${isLight ? 'text-[#15803D]' : 'text-[#A3E635]'}`}>
                            Đã chép
                          </span>
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
                className="w-full py-3.5 rounded-xl bg-[#A3E635] hover:bg-[#BEF264] text-[#06080D] font-bold text-xs shadow-lg shadow-[#A3E635]/20 cursor-pointer flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <Sparkles className="w-4 h-4 text-[#06080D]" />
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
