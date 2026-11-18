import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HomepageHeader } from '../layout/HomepageHeader';
import { Footer } from '../layout/Footer';
import { PricingPlan } from '../../types';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap, Receipt, Headphones, ChevronDown } from 'lucide-react';

export const PublicPricing: React.FC = () => {
  const { t, language, setActiveRoute, user, setSelectedPaymentPlan } = useApp();
  const [currencyMode, setCurrencyMode] = useState<'VN' | 'GLOBAL'>(language === 'vi' ? 'VN' : 'GLOBAL');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const vnPlans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: '299,000đ',
      period: '/tháng',
      credits: '3,000 Credits',
      creditsNumber: 3000,
      features: [
        '3,000 Credits tạo ảnh (~100 lần render)',
        'Hạn dùng 30 ngày',
        'Mở khóa toàn bộ 18 công cụ AI kiến trúc',
        'Độ phân giải Full HD & 2K tiêu chuẩn',
        'Không gắn Watermark bản quyền',
        'Hỗ trợ kỹ thuật 24/7 qua Zalo',
      ],
    },
    {
      id: 'pro',
      name: 'Pro Studio',
      price: '599,000đ',
      originalPrice: '700,000đ',
      period: '/3 tháng',
      credits: '7,000 Credits',
      creditsNumber: 7000,
      isHot: true,
      discountBadge: 'Tiết kiệm 15%',
      features: [
        '7,000 Credits tạo ảnh (~250 lần render)',
        'Hạn dùng dài hạn 90 ngày',
        'Ưu tiên hàng đợi GPU tốc độ cao (3-5s)',
        'Xuất ảnh siêu nét 4K Cinematic',
        'Đầy đủ công cụ ViewSync & Cải tạo nội ngoại thất',
        'Tặng kèm 13 công cụ mở rộng KTS chuyên sâu',
      ],
    },
    {
      id: 'ultra',
      name: 'Ultra Enterprise',
      price: '1,999,000đ',
      originalPrice: '2,500,000đ',
      period: '/6 tháng',
      credits: '25,000 Credits',
      creditsNumber: 25000,
      discountBadge: 'Tiết kiệm 20%',
      features: [
        '25,000 Credits tạo ảnh (~850 lần render)',
        'Hạn dùng 180 ngày (cộng dồn khi gia hạn)',
        'Băng thông GPU chuyên dụng siêu tốc',
        'Hỗ trợ tối đa 5 KTS / thiết bị dùng chung',
        'Hỗ trợ xuất hóa đơn VAT điện tử công ty',
        'Kỹ sư kiến trúc hỗ trợ tinh chỉnh prompt riêng',
      ],
    },
  ];

  const globalPlans: PricingPlan[] = [
    {
      id: 'weekly',
      name: 'Weekly Pass',
      price: '$9.99',
      period: '/week',
      credits: '1,000 Credits',
      creditsNumber: 1000,
      features: [
        '1,000 Fast Credits (~35 renders)',
        '7-Day Unrestricted Access',
        'All 18+ Core AI Architectural Tools',
        'Full HD Resolution Export',
        'Standard GPU Processing Queue',
      ],
    },
    {
      id: 'monthly-pro',
      name: 'Monthly Pro',
      price: '$29.99',
      originalPrice: '$39.99',
      period: '/month',
      credits: '4,000 Credits',
      creditsNumber: 4000,
      isHot: true,
      discountBadge: 'Save 25%',
      features: [
        '4,000 Fast Credits (~140 renders)',
        '30-Day Dedicated Access',
        'Ultra 4K Cinematic Resolution Export',
        'All 18+ Extended AI Architecture Tools',
        'Priority GPU Queue (3-second generation)',
      ],
    },
    {
      id: 'annual-studio',
      name: 'Annual Studio',
      price: '$199.99',
      originalPrice: '$299.99',
      period: '/year',
      credits: '35,000 Credits',
      creditsNumber: 35000,
      discountBadge: 'Save 33%',
      features: [
        '35,000 Fast Credits (~1,200 renders)',
        '365-Day Dedicated Access',
        'Dedicated GPU Dedicated Fast Queue',
        'Multi-seat Team Sharing (up to 5 seats)',
        'Priority 24/7 VIP Engineering Support',
      ],
    },
  ];

  const plans = currencyMode === 'VN' ? vnPlans : globalPlans;

  const faqs = [
    {
      q: 'Credits được tính như thế nào khi render ảnh?',
      a: 'Mỗi lần tạo ảnh tiêu chuẩn tiêu hao khoảng 25-30 Credits tùy vào chế độ phân giải (Full HD hoặc 4K Cinematic) và mức độ can thiệp AI.',
    },
    {
      q: 'Credits chưa dùng hết có bị mất khi hết hạn không?',
      a: 'Khi bạn gia hạn hoặc mua gói mới trước khi hết hạn, toàn bộ số Credits còn lại sẽ được tự động cộng dồn và gia hạn theo thời hạn của gói mới nhất.',
    },
    {
      q: 'Văn phòng của tôi có được xuất hóa đơn VAT điện tử không?',
      a: 'Có. OPZEN AI hỗ trợ xuất hóa đơn điện tử VAT đầy đủ theo thông tin doanh nghiệp, công ty kiến trúc xây dựng của bạn ngay sau khi thanh toán.',
    },
    {
      q: 'Tôi có thể dùng chung một tài khoản trên nhiều máy tính không?',
      a: 'Gói Ultra Enterprise hỗ trợ đăng nhập và làm việc đồng thời tối đa 5 người dùng/thiết bị trong văn phòng.',
    },
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPaymentPlan(planId);
    setActiveRoute('/payment');
  };

  return (
    <div className="min-h-screen bg-[#0E1726] text-[#F1ECE2] flex flex-col font-sans selection:bg-[#D9C9A3] selection:text-[#0E1726]">
      <HomepageHeader />

      <main className="pt-32 pb-24 flex-1 relative overflow-hidden">
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse,rgba(217,201,163,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-[600px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(217,201,163,0.03)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121D30] border border-[#24304A] text-xs font-semibold text-[#DDCDA8] mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D9C9A3]" />
              <span>BẢNG GIÁ DỊCH VỤ</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-display text-[#F1ECE2] tracking-tight">
              {t('pricingTitle')}
            </h1>
            <p className="text-[#9AA3B5] text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
              {t('pricingSubtitle')}
            </p>

            {/* Currency switcher toggle */}
            <div className="mt-8 inline-flex items-center p-1 rounded-full bg-[#121D30] border border-[#24304A] shadow-inner">
              <button
                onClick={() => setCurrencyMode('VN')}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  currencyMode === 'VN'
                    ? 'bg-[#D9C9A3] text-[#0E1726] font-bold shadow-sm'
                    : 'text-[#9AA3B5] hover:text-[#F1ECE2]'
                }`}
              >
                🇻🇳 Gói Việt Nam (VNĐ)
              </button>
              <button
                onClick={() => setCurrencyMode('GLOBAL')}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  currencyMode === 'GLOBAL'
                    ? 'bg-[#D9C9A3] text-[#0E1726] font-bold shadow-sm'
                    : 'text-[#9AA3B5] hover:text-[#F1ECE2]'
                }`}
              >
                🌐 Global Plans (USD)
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto">
            {plans.map((plan) => {
              const isCurrent = user.isLoggedIn && user.plan.toLowerCase() === plan.id.toLowerCase();
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 ${
                    plan.isHot
                      ? 'bg-[#16213A] border-2 border-[#D9C9A3] shadow-2xl shadow-[#D9C9A3]/10 md:-translate-y-2 z-10'
                      : 'bg-[#121D30] border border-[#24304A] hover:border-[#D9C9A3]/50 hover:bg-[#16213A]/70'
                  }`}
                >
                  {plan.isHot && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#D9C9A3] text-[#0E1726] text-[11px] font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#0E1726]" />
                      <span>{t('hotBadge')}</span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-[#F1ECE2]">{plan.name}</h3>
                      {plan.discountBadge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#D9C9A3]/15 text-[#DDCDA8] text-[11px] font-bold border border-[#D9C9A3]/30">
                          {plan.discountBadge}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#F1ECE2] tracking-tight">
                        {plan.price}
                      </span>
                      <span className="text-xs text-[#9AA3B5] font-medium">{plan.period}</span>
                    </div>

                    {plan.originalPrice && (
                      <p className="text-xs text-[#646E84] line-through mt-1">
                        Giá gốc: {plan.originalPrice}
                      </p>
                    )}

                    <div className="my-5 p-3.5 rounded-xl bg-[#0E1726] border border-[#24304A] flex items-center justify-between text-xs">
                      <span className="text-[#9AA3B5]">Dung lượng Credits:</span>
                      <span className="font-bold text-[#DDCDA8] flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#D9C9A3]" />
                        {plan.credits}
                      </span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-[#CBD5E1] leading-relaxed">
                          <Check className="w-4 h-4 text-[#D9C9A3] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    {isCurrent ? (
                      <div className="w-full py-3.5 rounded-xl bg-[#0E1726] text-center text-xs font-bold text-[#DDCDA8] border border-[#D9C9A3]/40">
                        {t('currentPlan')}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleSelectPlan(plan.id)}
                        className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          plan.isHot
                            ? 'bg-[#D9C9A3] hover:bg-[#EDE2C8] text-[#0E1726] shadow-lg shadow-[#D9C9A3]/20 hover:scale-[1.01]'
                            : 'bg-[#16213A] hover:bg-[#1C2944] border border-[#24304A] hover:border-[#D9C9A3]/60 text-[#F1ECE2]'
                        }`}
                      >
                        <span>{t('btnSelectPlan')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust & Guarantee Grid */}
          <div className="mt-16 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#121D30] border border-[#24304A] flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#16213A] border border-[#24304A] flex items-center justify-center text-[#D9C9A3] shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#F1ECE2]">Kích Hoạt Tức Thì</h4>
                <p className="text-[11px] text-[#9AA3B5] mt-0.5 leading-snug">
                  Cộng Credits vào tài khoản tự động trong 30 giây sau giao dịch.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#121D30] border border-[#24304A] flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#16213A] border border-[#24304A] flex items-center justify-center text-[#D9C9A3] shrink-0">
                <Receipt className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#F1ECE2]">Hóa Đơn VAT Điện Tử</h4>
                <p className="text-[11px] text-[#9AA3B5] mt-0.5 leading-snug">
                  Hỗ trợ xuất hóa đơn đỏ hợp lệ cho doanh nghiệp & văn phòng.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#121D30] border border-[#24304A] flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#16213A] border border-[#24304A] flex items-center justify-center text-[#D9C9A3] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#F1ECE2]">Bảo Mật & Riêng Tư</h4>
                <p className="text-[11px] text-[#9AA3B5] mt-0.5 leading-snug">
                  Toàn bộ file thiết kế và hình ảnh dự án được mã hóa bảo mật.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#121D30] border border-[#24304A] flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#16213A] border border-[#24304A] flex items-center justify-center text-[#D9C9A3] shrink-0">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#F1ECE2]">Hỗ Trợ Kỹ Thuật 24/7</h4>
                <p className="text-[11px] text-[#9AA3B5] mt-0.5 leading-snug">
                  Đội ngũ chuyên viên KTS hỗ trợ tối ưu prompt qua Hotline/Zalo.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-bold font-serif-display text-[#F1ECE2]">
                Câu Hỏi Thường Gặp
              </h2>
              <p className="text-xs sm:text-sm text-[#9AA3B5] mt-1">
                Giải đáp nhanh các thắc mắc về thanh toán và quyền lợi sử dụng
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-xl bg-[#121D30] border border-[#24304A] overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#16213A]/50 transition-colors"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-[#F1ECE2]">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#DDCDA8] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-[#9AA3B5] leading-relaxed border-t border-[#24304A]/60">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
