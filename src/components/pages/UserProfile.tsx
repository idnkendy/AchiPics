import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, CreditCard, History, Coins, Mail, Phone, ShieldCheck, Database, LogOut } from 'lucide-react';
import { signOutSupabase } from '../../lib/supabase';

export const UserProfile: React.FC = () => {
  const { user, setUser, setActiveRoute } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'transactions' | 'logs'>('profile');

  const transactions = [
    { id: 'TX-98214', date: '04/10/2026', plan: 'Gói Pro Monthly', amount: '499,000 đ', credits: '+1,250 cr' },
    { id: 'TX-97810', date: '15/09/2026', plan: 'Gói Starter', amount: '199,000 đ', credits: '+400 cr' },
  ];

  const logs = [
    { action: 'Render Villa 4K (2 ảnh)', time: '04/10/2026 09:12', cost: '-30 cr' },
    { action: 'Floor Plan 3D Isometric', time: '03/10/2026 15:40', cost: '-40 cr' },
    { action: 'Cải tạo mặt tiền Tropical', time: '02/10/2026 11:20', cost: '-45 cr' },
  ];

  const handleLogout = async () => {
    await signOutSupabase();
    setUser({
      id: 'guest',
      name: 'Khách',
      email: '',
      phone: '',
      credits: 0,
      plan: 'Free',
      expiryDate: '',
      isLoggedIn: false,
    });
    setActiveRoute('/');
  };

  if (!user.isLoggedIn) {
    return (
      <div className="min-h-[calc(100vh-116px)] bg-[#F8F5EE] dark:bg-[#0E1726] text-[#121D30] dark:text-[#F1ECE2] flex items-center justify-center p-6">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[#FFFFFF] dark:bg-[#121D30] border border-[#E2D9C8] dark:border-[#24304A] text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D9C9A3] to-[#EDE2C8] text-[#0E1726] flex items-center justify-center font-bold text-xl mx-auto shadow-md">
            <User className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold">Chưa đăng nhập</h2>
          <p className="text-xs text-[#57657E] dark:text-[#9AA3B5] leading-relaxed">
            Vui lòng đăng nhập tài khoản để xem thông tin hồ sơ, số dư credits và nhật ký sử dụng.
          </p>
          <button
            onClick={() => setActiveRoute('/auth')}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D9C9A3] to-[#EDE2C8] hover:opacity-95 text-[#0E1726] font-bold text-xs transition-opacity cursor-pointer shadow-md"
          >
            Đăng nhập ngay
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-116px)] bg-[#F8F5EE] dark:bg-[#0E1726] text-[#121D30] dark:text-[#F1ECE2] p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2D9C8] dark:border-[#24304A] pb-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-[#D9C9A3] text-[#0E1726] shadow-sm'
                  : 'text-[#57657E] dark:text-[#9AA3B5] hover:text-[#121D30] dark:hover:text-[#F1ECE2]'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Hồ Sơ Cá Nhân</span>
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'transactions'
                  ? 'bg-[#D9C9A3] text-[#0E1726] shadow-sm'
                  : 'text-[#57657E] dark:text-[#9AA3B5] hover:text-[#121D30] dark:hover:text-[#F1ECE2]'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Lịch Sử Giao Dịch</span>
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'logs'
                  ? 'bg-[#D9C9A3] text-[#0E1726] shadow-sm'
                  : 'text-[#57657E] dark:text-[#9AA3B5] hover:text-[#121D30] dark:hover:text-[#F1ECE2]'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Nhật Ký Sử Dụng</span>
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Đăng xuất</span>
          </button>
        </div>

        {/* Tab 1: Profile */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#121D30] border border-[#E2D9C8] dark:border-[#24304A] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D9C9A3] to-[#EDE2C8] text-[#0E1726] font-black text-2xl flex items-center justify-center shadow-md">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
                    <p className="text-xs text-[#57657E] dark:text-[#9AA3B5] flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      <span>{user.email || 'Chưa liên kết email'}</span>
                    </p>
                    {user.phone && (
                      <p className="text-xs text-[#57657E] dark:text-[#9AA3B5] flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{user.phone}</span>
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7F0] dark:bg-[#16213A] text-[#8E733D] dark:text-[#DDCDA8] text-[11px] font-bold border border-[#E2D9C8] dark:border-[#24304A]">
                      Gói: {user.plan}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold border border-emerald-500/30 flex items-center gap-1">
                      <Database className="w-3 h-3" />
                      <span>{user.provider === 'supabase' ? 'Supabase Auth' : 'Tài khoản hoạt động'}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F0] dark:bg-[#111B2D] border border-[#E2D9C8] dark:border-[#24304A] text-center sm:text-right min-w-[200px]">
                <span className="text-xs text-[#57657E] dark:text-[#9AA3B5] block mb-1">Số dư hiện có</span>
                <div className="flex items-center justify-center sm:justify-end gap-1.5 text-2xl font-black">
                  <Coins className="w-6 h-6 text-amber-500" />
                  <span className="tabular-nums">{user.credits.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => setActiveRoute('/pricing')}
                  className="mt-3 w-full py-2 px-4 rounded-lg bg-gradient-to-r from-[#D9C9A3] to-[#EDE2C8] hover:opacity-95 text-[#0E1726] text-xs font-bold shadow-sm cursor-pointer transition-opacity"
                >
                  Nạp thêm Credits
                </button>
              </div>
            </div>

            {/* Plan Info */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#121D30] border border-[#E2D9C8] dark:border-[#24304A] space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider">
                Chi Tiết Gói Dịch Vụ
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#FAF7F0] dark:bg-[#111B2D] border border-[#E2D9C8] dark:border-[#24304A]">
                  <span className="text-xs text-[#57657E] dark:text-[#9AA3B5] block">Tên gói</span>
                  <span className="text-base font-bold mt-1 block">ArchiPics {user.plan}</span>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF7F0] dark:bg-[#111B2D] border border-[#E2D9C8] dark:border-[#24304A]">
                  <span className="text-xs text-[#57657E] dark:text-[#9AA3B5] block">Hạn sử dụng</span>
                  <span className="text-base font-bold mt-1 block">{user.expiryDate || 'Vô thời hạn'}</span>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF7F0] dark:bg-[#111B2D] border border-[#E2D9C8] dark:border-[#24304A]">
                  <span className="text-xs text-[#57657E] dark:text-[#9AA3B5] block">Hàng đợi render</span>
                  <span className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Ưu tiên GPU Cao</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Transactions */}
        {activeTab === 'transactions' && (
          <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#121D30] border border-[#E2D9C8] dark:border-[#24304A] overflow-hidden">
            <div className="p-4 border-b border-[#E2D9C8] dark:border-[#24304A] flex items-center justify-between">
              <h3 className="text-sm font-bold">Lịch Sử Giao Dịch</h3>
              <span className="text-xs text-[#57657E] dark:text-[#9AA3B5]">{transactions.length} giao dịch gần đây</span>
            </div>
            <div className="divide-y divide-[#E2D9C8] dark:divide-[#24304A]">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold">{tx.plan}</span>
                    <div className="text-[11px] text-[#57657E] dark:text-[#9AA3B5] mt-0.5">
                      Mã: {tx.id} · Ngày: {tx.date}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold block">{tx.amount}</span>
                    <span className="text-[#8E733D] dark:text-[#DDCDA8] font-bold">{tx.credits}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Logs */}
        {activeTab === 'logs' && (
          <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#121D30] border border-[#E2D9C8] dark:border-[#24304A] overflow-hidden">
            <div className="p-4 border-b border-[#E2D9C8] dark:border-[#24304A] flex items-center justify-between">
              <h3 className="text-sm font-bold">Nhật Ký Sử Dụng Credits</h3>
              <span className="text-xs text-[#57657E] dark:text-[#9AA3B5]">Tự động hoàn credits khi lỗi</span>
            </div>
            <div className="divide-y divide-[#E2D9C8] dark:divide-[#24304A]">
              {logs.map((log, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium">{log.action}</span>
                    <span className="text-[11px] text-[#8792A6] dark:text-[#646E84] block mt-0.5">{log.time}</span>
                  </div>
                  <span className="font-bold text-rose-500">{log.cost}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
