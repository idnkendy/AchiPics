import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, CreditCard, History, Coins, Mail, Sparkles, ShieldCheck } from 'lucide-react';

export const UserProfile: React.FC = () => {
  const { user, setActiveRoute } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'transactions' | 'logs'>('profile');

  const transactions = [
    {
      id: 'TXN-9021',
      date: '02/10/2026',
      plan: 'Gói Pro (3 Tháng)',
      amount: '599,000 VNĐ',
      credits: '+7,000 Credits',
      status: 'Thành công',
    },
    {
      id: 'TXN-8742',
      date: '15/09/2026',
      plan: 'Gói Starter (1 Tháng)',
      amount: '299,000 VNĐ',
      credits: '+3,000 Credits',
      status: 'Thành công',
    },
  ];

  const logs = [
    { time: '04/10/2026 07:45', action: 'Render Biệt Thự Twilight', cost: '-30 cr' },
    { time: '03/10/2026 16:20', action: 'Render Phòng Khách Japandi', cost: '-30 cr' },
    { time: '02/10/2026 11:15', action: 'Dựng Floor Plan 3D Căn Hộ', cost: '-40 cr' },
    { time: '01/10/2026 14:30', action: 'Cải Tạo Mặt Tiền Nhà Phố', cost: '-45 cr' },
  ];

  return (
    <div className="h-[calc(100vh-104px)] overflow-y-auto p-4 sm:p-8 bg-[#121212]">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Tabs */}
        <div className="flex items-center gap-2 border-b border-[#302839] pb-3">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-[#7f13ec] to-[#9d4edd] text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Hồ Sơ Cá Nhân</span>
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'transactions'
                ? 'bg-gradient-to-r from-[#7f13ec] to-[#9d4edd] text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Lịch Sử Giao Dịch</span>
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'logs'
                ? 'bg-gradient-to-r from-[#7f13ec] to-[#9d4edd] text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Nhật Ký Sử Dụng</span>
          </button>
        </div>

        {/* Tab 1: Profile */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#191919] border border-[#302839] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#7f13ec] to-[#9d4edd] text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-[#7f13ec]/40">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{user.name}</h2>
                  <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{user.email}</span>
                  </p>
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-[#7f13ec]/20 text-purple-300 text-[11px] font-bold border border-[#7f13ec]/40">
                    Gói Hội Viên: {user.plan}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#242424] border border-[#302839] text-center sm:text-right min-w-[200px]">
                <span className="text-xs text-gray-400 block mb-1">Số dư hiện có</span>
                <div className="flex items-center justify-center sm:justify-end gap-1.5 text-2xl font-black text-white">
                  <Coins className="w-6 h-6 text-purple-400" />
                  <span className="tabular-nums">{user.credits.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => setActiveRoute('/pricing')}
                  className="mt-3 w-full py-2 px-4 rounded-lg bg-gradient-to-r from-[#7f13ec] to-[#9d4edd] hover:opacity-95 text-white text-xs font-bold shadow-md shadow-[#7f13ec]/30 cursor-pointer"
                >
                  Nạp thêm Credits
                </button>
              </div>
            </div>

            {/* Plan Info */}
            <div className="p-6 rounded-2xl bg-[#191919] border border-[#302839] space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Chi Tiết Gói Dịch Vụ
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#242424] border border-[#302839]">
                  <span className="text-xs text-gray-400 block">Tên gói</span>
                  <span className="text-base font-bold text-white mt-1 block">OPZEN AI {user.plan}</span>
                </div>
                <div className="p-4 rounded-xl bg-[#242424] border border-[#302839]">
                  <span className="text-xs text-gray-400 block">Hạn sử dụng</span>
                  <span className="text-base font-bold text-white mt-1 block">{user.expiryDate}</span>
                </div>
                <div className="p-4 rounded-xl bg-[#242424] border border-[#302839]">
                  <span className="text-xs text-gray-400 block">Hàng đợi render</span>
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
          <div className="rounded-2xl bg-[#191919] border border-[#302839] overflow-hidden">
            <div className="p-4 border-b border-[#302839] flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Lịch Sử Giao Dịch</h3>
              <span className="text-xs text-gray-400">{transactions.length} giao dịch gần đây</span>
            </div>
            <div className="divide-y divide-[#302839]">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white">{tx.plan}</span>
                    <div className="text-[11px] text-gray-400 mt-0.5">
                      Mã: {tx.id} · Ngày: {tx.date}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-white block">{tx.amount}</span>
                    <span className="text-purple-400 font-bold">{tx.credits}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Logs */}
        {activeTab === 'logs' && (
          <div className="rounded-2xl bg-[#191919] border border-[#302839] overflow-hidden">
            <div className="p-4 border-b border-[#302839] flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Nhật Ký Sử Dụng Credits</h3>
              <span className="text-xs text-gray-400">Tự động hoàn credits khi lỗi</span>
            </div>
            <div className="divide-y divide-[#302839]">
              {logs.map((log, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-white">{log.action}</span>
                    <span className="text-[11px] text-gray-500 block mt-0.5">{log.time}</span>
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
