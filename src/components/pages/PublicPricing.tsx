import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HomepageHeader } from '../layout/HomepageHeader';
import { Footer } from '../layout/Footer';
import { PricingPlan } from '../../types';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap, Receipt, Headphones, ChevronDown } from 'lucide-react';

export const PublicPricing: React.FC = () => {
  const { t, setActiveRoute, user, setSelectedPaymentPlan, theme } = useApp();
  const isLight = theme === 'light';
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans: PricingPlan[] = [
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
        'Hạn dùng 180 ngày theo chu kỳ gói',
        'Băng thông GPU chuyên dụng siêu tốc',
        'Hỗ trợ tối đa 5 KTS / thiết bị dùng chung',
        'Hỗ trợ xuất hóa đơn VAT điện tử công ty',
        'Kỹ sư kiến trúc hỗ trợ tinh chỉnh prompt riêng',
      ],
    },
  ];

  const faqs = [
    {
      q: 'Credits được tính như thế nào khi render ảnh?',
      a: 'Mỗi lần tạo ảnh tiêu chuẩn tiêu hao khoảng 25-30 Credits tùy vào chế độ phân giải (Full HD hoặc 4K Cinematic) và mức độ can thiệp AI.',
    },
    {
      q: 'Credits chưa dùng hết có bị mất khi hết hạn không?',
      a: 'Có. Credits hoạt động theo cơ chế "Dùng hoặc Mất" (Use-it-or-lose-it): khi gói đăng ký hết hạn hoặc sang chu kỳ gia hạn mới, số Credits còn dư chưa sử dụng sẽ bị hủy bỏ về 0 và không được cộng dồn.',
    },
    {
      q: 'Văn phòng của tôi có được xuất hóa đơn VAT điện tử không?',
      a: 'Có. AchiPics hỗ trợ xuất hóa đơn điện tử VAT đầy đủ theo thông tin doanh nghiệp, công ty kiến trúc xây dựng của bạn ngay sau khi thanh toán.',
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
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors ${
        isLight
          ? 'bg-[#F4F7FC] text-[#06080D] selection:bg-[#2563EB] selection:text-[#FFFFFF]'
          : 'bg-[#06080D] text-[#F4F7FB] selection:bg-[#A3E635] selection:text-[#06080D]'
      }`}
    >
      <HomepageHeader />

      <main className="pt-32 pb-24 flex-1 relative overflow-hidden">
        {/* Ambient Cobalt + Lime Radial Glows */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none ${
            isLight
              ? 'bg-[radial-gradient(ellipse,rgba(37,99,235,0.08)_0%,transparent_70%)]'
              : 'bg-[radial-gradient(ellipse,rgba(37,99,235,0.18)_0%,rgba(163,230,53,0.05)_40%,transparent_72%)]'
          }`}
        />
        <div
          className={`absolute top-[600px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none ${
            isLight
              ? 'bg-[radial-gradient(ellipse,rgba(37,99,235,0.04)_0%,transparent_70%)]'
              : 'bg-[radial-gradient(ellipse,rgba(37,99,235,0.10)_0%,transparent_70%)]'
          }`}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold mb-4 shadow-sm ${
                isLight
                  ? 'bg-[#FFFFFF] border-[#C7D6EE] text-[#1D4ED8]'
                  : 'bg-[#0D162B] border-[#1D3566] text-[#A3E635]'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isLight ? 'text-[#2563EB]' : 'text-[#A3E635]'}`} />
              <span>BẢNG GIÁ DỊCH VỤ</span>
            </div>
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-bold font-serif-display tracking-tight ${
                isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'
              }`}
            >
              {t('pricingTitle')}
            </h1>
            <p
              className={`text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed ${
                isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'
              }`}
            >
              {t('pricingSubtitle')}
            </p>
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
                      ? isLight
                        ? 'bg-[#FFFFFF] border-2 border-[#2563EB] shadow-2xl shadow-[#2563EB]/15 md:-translate-y-2 z-10'
                        : 'bg-[#101E3A] border-2 border-[#A3E635] shadow-2xl shadow-[#A3E635]/10 md:-translate-y-2 z-10'
                      : isLight
                        ? 'bg-[#FFFFFF] border border-[#C7D6EE] hover:border-[#2563EB]/60 shadow-sm'
                        : 'bg-[#0D162B] border border-[#1D3566] hover:border-[#2563EB] hover:bg-[#101E3A]/85'
                  }`}
                >
                  {plan.isHot && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#A3E635] text-[#06080D] text-[11px] font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#06080D]" />
                      <span>{t('hotBadge')}</span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className={`text-xl font-bold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
                        {plan.name}
                      </h3>
                      {plan.discountBadge && (
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                            isLight
                              ? 'bg-[#E4ECF9] text-[#1D4ED8] border-[#C7D6EE]'
                              : 'bg-[#2563EB]/20 text-[#60A5FA] border-[#2563EB]/40'
                          }`}
                        >
                          {plan.discountBadge}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex items-baseline gap-2">
                      <span
                        className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                          isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'
                        }`}
                      >
                        {plan.price}
                      </span>
                      <span className={`text-xs font-medium ${isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}`}>
                        {plan.period}
                      </span>
                    </div>

                    {plan.originalPrice && (
                      <p className={`text-xs line-through mt-1 ${isLight ? 'text-[#64748B]' : 'text-[#66789C]'}`}>
                        Giá gốc: {plan.originalPrice}
                      </p>
                    )}

                    <div
                      className={`my-5 p-3.5 rounded-xl border flex items-center justify-between text-xs ${
                        isLight
                          ? 'bg-[#EAF0FA] border-[#C7D6EE]'
                          : 'bg-[#06080D] border-[#1D3566]'
                      }`}
                    >
                      <span className={isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}>Dung lượng Credits:</span>
                      <span
                        className={`font-bold flex items-center gap-1.5 ${
                          isLight ? 'text-[#1D4ED8]' : 'text-[#A3E635]'
                        }`}
                      >
                        <Zap className={`w-3.5 h-3.5 ${isLight ? 'text-[#2563EB]' : 'text-[#A3E635]'}`} />
                        {plan.credits}
                      </span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feat, idx) => (
                        <li
                          key={idx}
                          className={`flex items-start gap-2.5 text-xs leading-relaxed ${
                            isLight ? 'text-[#334155]' : 'text-[#CBD5E1]'
                          }`}
                        >
                          <Check
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isLight ? 'text-[#2563EB]' : 'text-[#A3E635]'
                            }`}
                          />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    {isCurrent ? (
                      <div
                        className={`w-full py-3.5 rounded-xl text-center text-xs font-bold border ${
                          isLight
                            ? 'bg-[#EAF0FA] text-[#1D4ED8] border-[#2563EB]/40'
                            : 'bg-[#06080D] text-[#A3E635] border-[#A3E635]/40'
                        }`}
                      >
                        {t('currentPlan')}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleSelectPlan(plan.id)}
                        className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          plan.isHot
                            ? 'bg-[#A3E635] hover:bg-[#BEF264] text-[#06080D] shadow-lg shadow-[#A3E635]/20 hover:scale-[1.01]'
                            : isLight
                              ? 'bg-[#2563EB] hover:bg-[#1D4ED8] text-[#FFFFFF] shadow-sm'
                              : 'bg-[#101E3A] hover:bg-[#162952] border border-[#1D3566] hover:border-[#2563EB] text-[#F4F7FB]'
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
            {[
              {
                icon: Zap,
                title: 'Kích Hoạt Tức Thì',
                desc: 'Cộng Credits vào tài khoản tự động trong 30 giây sau giao dịch.',
              },
              {
                icon: Receipt,
                title: 'Hóa Đơn VAT Điện Tử',
                desc: 'Hỗ trợ xuất hóa đơn đỏ hợp lệ cho doanh nghiệp & văn phòng.',
              },
              {
                icon: ShieldCheck,
                title: 'Bảo Mật & Riêng Tư',
                desc: 'Toàn bộ file thiết kế và hình ảnh dự án được mã hóa bảo mật.',
              },
              {
                icon: Headphones,
                title: 'Hỗ Trợ Kỹ Thuật 24/7',
                desc: 'Đội ngũ chuyên viên KTS hỗ trợ tối ưu prompt qua Hotline/Zalo.',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex items-start gap-3 transition-colors ${
                    isLight
                      ? 'bg-[#FFFFFF] border-[#C7D6EE]'
                      : 'bg-[#0D162B] border-[#1D3566]'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${
                      isLight
                        ? 'bg-[#E4ECF9] border-[#C7D6EE] text-[#2563EB]'
                        : 'bg-[#101E3A] border-[#1D3566] text-[#A3E635]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
                      {item.title}
                    </h4>
                    <p className={`text-[11px] mt-0.5 leading-snug ${isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FAQ Section */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2
                className={`text-xl sm:text-2xl font-bold font-serif-display ${
                  isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'
                }`}
              >
                Câu Hỏi Thường Gặp
              </h2>
              <p className={`text-xs sm:text-sm mt-1 ${isLight ? 'text-[#475569]' : 'text-[#9BAAC6]'}`}>
                Giải đáp nhanh các thắc mắc về thanh toán và quyền lợi sử dụng
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className={`rounded-xl border overflow-hidden transition-all ${
                      isLight
                        ? 'bg-[#FFFFFF] border-[#C7D6EE]'
                        : 'bg-[#0D162B] border-[#1D3566]'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className={`w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer transition-colors ${
                        isLight ? 'hover:bg-[#EAF0FA]/60' : 'hover:bg-[#101E3A]/60'
                      }`}
                    >
                      <span className={`text-xs sm:text-sm font-semibold ${isLight ? 'text-[#06080D]' : 'text-[#F4F7FB]'}`}>
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                          isLight ? 'text-[#2563EB]' : 'text-[#A3E635]'
                        } ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div
                        className={`px-4 pb-4 pt-2 text-xs leading-relaxed border-t ${
                          isLight
                            ? 'text-[#475569] border-[#DCE5F5]'
                            : 'text-[#9BAAC6] border-[#1D3566]/60'
                        }`}
                      >
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
