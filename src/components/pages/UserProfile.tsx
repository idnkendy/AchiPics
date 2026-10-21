import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, CreditCard, History, Coins, Mail, Sparkles, ShieldCheck, Database, LogOut } from 'lucide-react';
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
      credits: 0,
      plan: 'Free',
      expiryDate: '',
      isLoggedIn: false,
    });
    setActiveRoute('/');
  };

  return (
    <div className="min-h-[calc(100vh-112px)] bg-[#0E1726] text-[#F1ECE2] p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-[#24304A] pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-[#D9C9A3] text-[#0E1726] shadow-sm'
                  : 'text-[#9AA3B5] hover:text-[#F1ECE2]'
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
                  : 'text-[#9AA3B5] hover:text-[#F1ECE2]'
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
                  : 'text-[#9AA3B5] hover:text-[#F1ECE2]'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Nhật Ký Sử Dụng</span>
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Đăng xuất</span>
          </button>
        </div>

        {/* Tab 1: Profile */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#121D30] border border-[#24304A] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#D9C9A3] text-[#0E1726] font-black text-2xl flex items-center justify-center shadow-lg shadow-[#D9C9A3]/20">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#F1ECE2]">{user.name}</h2>
                  <p className="text-xs text-[#9AA3B5] flex items-center gap-1.5 mt-0.5">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{user.email || 'Chưa liên kết email'}</span>
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#16213A] text-[#DDCDA8] text-[11px] font-bold border border-[#24304A]">
                      Gói: {user.plan}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/40 text-emerald-300 text-[11px] font-semibold border border-emerald-500/30 flex items-center gap-1">
                      <Database className="w-3 h-3" />
                      <span>{user.provider === 'supabase' ? 'Supabase Auth' : 'Tài khoản hoạt động'}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#111B2D] border border-[#24304A] text-center sm:text-right min-w-[200px]">
                <span className="text-xs text-[#9AA3B5] block mb-1">Số dư hiện có</span>
                <div className="flex items-center justify-center sm:justify-end gap-1.5 text-2xl font-black text-[#F1ECE2]">
                  <Coins className="w-6 h-6 text-[#DDCDA8]" />
                  <span className="tabular-nums">{user.credits.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => setActiveRoute('/pricing')}
                  className="mt-3 w-full py-2 px-4 rounded-lg bg-[#D9C9A3] hover:bg-[#E4D5B2] text-[#0E1726] text-xs font-bold shadow-md shadow-[#D9C9A3]/20 cursor-pointer transition-colors"
                >
                  Nạp thêm Credits
                </button>
              </div>
            </div>

            {/* Plan Info */}
            <div className="p-6 rounded-2xl bg-[#121D30] border border-[#24304A] space-y-4">
              <h3 className="text-sm font-bold text-[#F1ECE2] uppercase tracking-wider">
                Chi Tiết Gói Dịch Vụ
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#111B2D] border border-[#24304A]">
                  <span className="text-xs text-[#9AA3B5] block">Tên gói</span>
                  <span className="text-base font-bold text-[#F1ECE2] mt-1 block">ArchiPics {user.plan}</span>
                </div>
                <div className="p-4 rounded-xl bg-[#111B2D] border border-[#24304A]">
                  <span className="text-xs text-[#9AA3B5] block">Hạn sử dụng</span>
                  <span className="text-base font-bold text-[#F1ECE2] mt-1 block">{user.expiryDate || 'Vô thời hạn'}</span>
                </div>
                <div className="p-4 rounded-xl bg-[#111B2D] border border-[#24304A]">
                  <span className="text-xs text-[#9AA3B5] block">Hàng đợi render</span>
                  <span className="text-base font-bold text-emerald-400 mt-1 block flex items-center gap-1">
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
          <div className="rounded-2xl bg-[#121D30] border border-[#24304A] overflow-hidden">
            <div className="p-4 border-b border-[#24304A] flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#F1ECE2]">Lịch Sử Giao Dịch</h3>
              <span className="text-xs text-[#9AA3B5]">{transactions.length} giao dịch gần đây</span>
            </div>
            <div className="divide-y divide-[#24304A]">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#F1ECE2]">{tx.plan}</span>
                    <div className="text-[11px] text-[#9AA3B5] mt-0.5">
                      Mã: {tx.id} · Ngày: {tx.date}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#F1ECE2] block">{tx.amount}</span>
                    <span className="text-[#DDCDA8] font-bold">{tx.credits}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Logs */}
        {activeTab === 'logs' && (
          <div className="rounded-2xl bg-[#121D30] border border-[#24304A] overflow-hidden">
            <div className="p-4 border-b border-[#24304A] flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#F1ECE2]">Nhật Ký Sử Dụng Credits</h3>
              <span className="text-xs text-[#9AA3B5]">Tự động hoàn credits khi lỗi</span>
            </div>
            <div className="divide-y divide-[#24304A]">
              {logs.map((log, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-[#F1ECE2]">{log.action}</span>
                    <span className="text-[11px] text-[#646E84] block mt-0.5">{log.time}</span>
                  </div>
                  <span className="font-bold text-rose-400">{log.cost}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
