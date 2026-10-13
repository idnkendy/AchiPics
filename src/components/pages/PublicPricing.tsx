import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HomepageHeader } from '../layout/HomepageHeader';
import { Footer } from '../layout/Footer';
import { PricingPlan } from '../../types';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

export const PublicPricing: React.FC = () => {
  const { t, language, setActiveRoute, user, setSelectedPaymentPlan } = useApp();
  const [currencyMode, setCurrencyMode] = useState<'VN' | 'GLOBAL'>(language === 'vi' ? 'VN' : 'GLOBAL');

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
        'Mở khóa toàn bộ 18 công cụ AI',
        'Độ phân giải Full HD & 2K',
        'Hỗ trợ kỹ thuật 24/7 qua Zalo',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '599,000đ',
      originalPrice: '700,000đ',
      period: '/3 tháng',
      credits: '7,000 Credits',
      creditsNumber: 7000,
      isHot: true,
      discountBadge: '-15%',
      features: [
        '7,000 Credits tạo ảnh (~250 lần render)',
        'Hạn dùng 90 ngày',
        'Ưu tiên hàng đợi GPU tốc độ cao',
        'Xuất ảnh siêu nét 4K Cinematic',
        'Đầy đủ công cụ ViewSync & Cải tạo',
        'Tặng kèm 13 công cụ mở rộng',
      ],
    },
    {
      id: 'ultra',
      name: 'Ultra Studio',
      price: '1,999,000đ',
      originalPrice: '2,500,000đ',
      period: '/6 tháng',
      credits: '25,000 Credits',
      creditsNumber: 25000,
      discountBadge: '-20%',
      features: [
        '25,000 Credits tạo ảnh (~850 lần render)',
        'Hạn dùng 180 ngày',
        'Băng thông GPU chuyên dụng siêu tốc',
        'Hỗ trợ tối đa 5 người dùng chung',
        'Xuất file không giới hạn Watermark',
        'Kỹ sư hỗ trợ tinh chỉnh prompt riêng',
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
      features: ['1,000 Fast Credits', '7-Day Access', 'All Core Tools', 'Standard Priority'],
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
        '4,000 Fast Credits',
        '30-Day Unrestricted Access',
        'Ultra 4K Resolution Export',
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
      discountBadge: '-33%',
      features: [
        '35,000 Fast Credits',
        '365-Day Dedicated Access',
        'Dedicated Fast Queue',
        'Multi-seat Team Sharing',
        'API & Bulk Export Access',
      ],
    },
  ];

  const plans = currencyMode === 'VN' ? vnPlans : globalPlans;

  const handleSelectPlan = (planId: string) => {
    setSelectedPaymentPlan(planId);
    setActiveRoute('/payment');
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col font-sans selection:bg-[#7f13ec] selection:text-white">
      <HomepageHeader />

      <main className="pt-32 pb-24 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[3px] text-purple-400 mb-2 inline-block px-3 py-1 rounded-full bg-[#7f13ec]/10 border border-[#7f13ec]/30">
              Bảng Giá Linh Hoạt
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mt-2">
              {t('pricingTitle')}
            </h1>
            <p className="text-gray-400 text-sm sm:text-base mt-2">
              {t('pricingSubtitle')}
            </p>

            {/* Currency switcher toggle */}
            <div className="mt-6 inline-flex items-center p-1 rounded-full bg-[#191919] border border-[#302839]">
              <button
                onClick={() => setCurrencyMode('VN')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  currencyMode === 'VN'
                    ? 'bg-gradient-to-r from-[#7f13ec] to-[#9d4edd] text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🇻🇳 Gói Việt Nam (VNĐ)
              </button>
              <button
                onClick={() => setCurrencyMode('GLOBAL')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  currencyMode === 'GLOBAL'
                    ? 'bg-gradient-to-r from-[#7f13ec] to-[#9d4edd] text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🌐 Global Plans (USD)
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
            {plans.map((plan) => {
              const isCurrent = user.isLoggedIn && user.plan.toLowerCase() === plan.id.toLowerCase();
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 ${
                    plan.isHot
                      ? 'bg-[#191919] border-2 border-[#7f13ec] shadow-2xl shadow-[#7f13ec]/20 scale-102 z-10'
                      : 'bg-[#191919] border border-[#302839] hover:border-[#7f13ec]/60'
                  }`}
                >
                  {plan.isHot && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#7f13ec] to-[#9d4edd] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t('hotBadge')}</span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                      {plan.discountBadge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#7f13ec]/20 text-purple-300 text-[11px] font-bold border border-[#7f13ec]/40">
                          {plan.discountBadge}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-white">
                        {plan.price}
                      </span>
                      <span className="text-xs text-gray-400">{plan.period}</span>
                    </div>

                    {plan.originalPrice && (
                      <p className="text-xs text-gray-500 line-through mt-0.5">
                        Giá gốc: {plan.originalPrice}
                      </p>
                    )}

                    <div className="my-5 p-3 rounded-xl bg-[#242424] border border-[#302839] flex items-center justify-between text-xs">
                      <span className="text-gray-400">Dung lượng:</span>
                      <span className="font-extrabold text-purple-400">{plan.credits}</span>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                          <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    {isCurrent ? (
                      <div className="w-full py-3 rounded-xl bg-[#242424] text-center text-xs font-bold text-purple-300 border border-[#7f13ec]">
                        {t('currentPlanBadge')}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleSelectPlan(plan.id)}
                        className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          plan.isHot
                            ? 'bg-gradient-to-r from-[#7f13ec] to-[#9d4edd] hover:opacity-95 text-white shadow-lg shadow-[#7f13ec]/35 hover:scale-[1.02]'
                            : 'bg-[#242424] hover:bg-[#7f13ec]/20 border border-[#302839] hover:border-[#7f13ec] text-white'
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

          {/* Guarantee / FAQ snippet */}
          <div className="mt-16 text-center text-xs text-gray-500 max-w-xl mx-auto space-y-1">
            <p>🔒 Thanh toán bảo mật qua cổng VietQR ngân hàng hoặc Stripe Quốc tế.</p>
            <p>Hỗ trợ xuất hóa đơn VAT điện tử cho doanh nghiệp & văn phòng kiến trúc.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
