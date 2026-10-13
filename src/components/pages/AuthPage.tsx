import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Mail, Lock, User as UserIcon, Sparkles } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { setActiveRoute, setUser } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleGoogleLogin = () => {
    setUser({
      id: 'google-user-01',
      name: 'KTS Minh Trí',
      email: 'minhtri.architect@gmail.com',
      credits: 1250,
      plan: 'Pro',
      expiryDate: '15/12/2026',
      isLoggedIn: true,
    });
    setActiveRoute('/image');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: `user-${Date.now()}`,
      name: name || 'KTS An Bình',
      email: email || 'khavyauflowteam@gmail.com',
      credits: 1250,
      plan: 'Pro',
      expiryDate: '15/12/2026',
      isLoggedIn: true,
    });
    setActiveRoute('/image');
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center p-4 font-sans relative selection:bg-[#7f13ec] selection:text-white">
      {/* Ambient purple background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#7f13ec]/20 blur-[120px] pointer-events-none rounded-full" />

      <button
        onClick={() => setActiveRoute('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>← Về trang chủ</span>
      </button>

      <div className="w-full max-w-md p-8 sm:p-9 rounded-3xl bg-[#191919] border border-[#302839] shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#7f13ec] via-[#9d4edd] to-[#c084fc] flex items-center justify-center text-white shadow-lg shadow-[#7f13ec]/40 mx-auto mb-3">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          <div className="flex items-center justify-center gap-1">
            <span className="text-2xl font-extrabold tracking-tight text-white">OPZEN</span>
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[#9d4edd] to-[#ec4899] bg-clip-text text-transparent">AI</span>
          </div>
          <p className="text-xs text-gray-400 mt-1.5">
            {isRegister ? 'Tạo tài khoản mới để nhận 100 credits trải nghiệm' : 'Đăng nhập vào không gian sáng tạo kiến trúc'}
          </p>
        </div>

        {/* Google OAuth Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-gray-100 text-slate-900 font-bold text-xs flex items-center justify-center gap-3 shadow-md hover:scale-[1.01] transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.04h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.04c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.25v3.13C3.25 21.36 7.35 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.27 14.25c-.25-.72-.38-1.49-.38-2.25s.13-1.53.38-2.25V6.62H1.25C.45 8.24 0 10.06 0 12s.45 3.76 1.25 5.38l4.02-3.13z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.25 2.64 1.25 6.62l4.02 3.13c.95-2.85 3.6-4.96 6.73-4.96z"
            />
          </svg>
          <span>Đăng nhập với Google</span>
        </button>

        <div className="flex items-center gap-3 my-5">
          <span className="flex-1 h-px bg-[#302839]" />
          <span className="text-[11px] text-gray-500 uppercase tracking-wider">Hoặc qua Email</span>
          <span className="flex-1 h-px bg-[#302839]" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isRegister && (
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">
                Họ và Tên
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="KTS Nguyễn Văn A"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#242424] border border-[#302839] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#7f13ec]"
                />
                <UserIcon className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">
              Email công việc
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-[#242424] border border-[#302839] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#7f13ec]"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-[#242424] border border-[#302839] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#7f13ec]"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#7f13ec] to-[#9d4edd] hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-[#7f13ec]/35 transition-all cursor-pointer mt-2"
          >
            {isRegister ? 'Đăng Ký Tài Khoản Mới' : 'Đăng Nhập'}
          </button>
        </form>

        {/* Toggle Register / Login */}
        <div className="mt-6 text-center text-xs text-gray-400">
          {isRegister ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="ml-1.5 text-purple-400 hover:text-purple-300 font-bold underline cursor-pointer"
          >
            {isRegister ? 'Đăng nhập ngay' : 'Đăng ký nhận quà'}
          </button>
        </div>
      </div>
    </div>
  );
};
