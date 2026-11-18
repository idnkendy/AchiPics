import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Mail,
  Lock,
  User as UserIcon,
  Phone,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithOAuth,
  getSupabaseConfig,
} from '../../lib/supabase';

export const AuthPage: React.FC = () => {
  const { setActiveRoute, setUser } = useApp();

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Submit Handler for Email & Password or Register
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      if (authMode === 'register') {
        const data = await signUpWithEmail(email, password, name, phone);
        if (data.session) {
          setUser({
            id: data.user?.id || `user-${Date.now()}`,
            name: name || 'KTS ArchiPics',
            email: email,
            phone: phone,
            credits: 60,
            plan: 'Free',
            expiryDate: 'Không giới hạn',
            isLoggedIn: true,
            provider: 'supabase',
          });
          setActiveRoute('/image');
        } else {
          setSuccessMsg('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản trước khi đăng nhập.');
        }
      } else {
        const data = await signInWithEmail(email, password);
        if (data.user) {
          setUser({
            id: data.user.id,
            name: data.user.user_metadata?.full_name || email.split('@')[0] || 'KTS ArchiPics',
            email: data.user.email || email,
            phone: data.user.user_metadata?.phone || '',
            avatarUrl: data.user.user_metadata?.avatar_url,
            credits: 60,
            plan: 'Free',
            expiryDate: 'Không giới hạn',
            isLoggedIn: true,
            provider: 'supabase',
          });
          setActiveRoute('/image');
        }
      }
    } catch (err: any) {
      console.error('Supabase Auth error:', err);
      let message = err.message || 'Đăng nhập không thành công.';
      if (message.includes('Invalid login credentials')) {
        message = 'Email hoặc mật khẩu không chính xác.';
      } else if (message.includes('Email not confirmed')) {
        message = 'Email của bạn chưa được xác nhận. Vui lòng kiểm tra hộp thư.';
      } else if (message.includes('Password should be')) {
        message = 'Mật khẩu phải có độ dài ít nhất 6 ký tự.';
      } else if (message.includes('User already registered')) {
        message = 'Email này đã được đăng ký tài khoản. Vui lòng chuyển sang Đăng nhập.';
      }
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  // OAuth Google
  const handleGoogleOAuth = async () => {
    setErrorMsg(null);
    const cfg = getSupabaseConfig();
    if (!cfg.isConfigured) {
      setErrorMsg('Vui lòng kiểm tra cấu hình Supabase đã nhập tại back-end (api/index.js).');
      return;
    }
    try {
      await signInWithOAuth('google');
    } catch (err: any) {
      setErrorMsg(err.message || 'Lỗi xác thực Google qua Supabase');
    }
  };

  return (
    <div className="min-h-screen bg-[#0E1726] text-[#F1ECE2] flex flex-col items-center justify-center p-4 font-sans relative selection:bg-[#D9C9A3] selection:text-[#0E1726]">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(217,201,163,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Bar: Back button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={() => setActiveRoute('/')}
          className="flex items-center gap-2 text-xs font-semibold text-[#9AA3B5] hover:text-[#F1ECE2] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Về trang chủ</span>
        </button>
      </div>

      <div className="w-full max-w-md my-12 relative z-10">
        {/* Main Auth Card */}
        <div className="p-8 sm:p-9 rounded-3xl bg-[#121D30] border border-[#24304A] shadow-2xl relative">
          {/* Logo & Header */}
          <div className="text-center mb-6">
            <div className="w-11 h-11 rounded-xl bg-[#D9C9A3] flex items-center justify-center text-[#0E1726] font-extrabold text-xl shadow-md mx-auto mb-3">
              A
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#F1ECE2]">
              ArchiPics
            </h1>
            <p className="text-xs text-[#9AA3B5] mt-1.5">
              Nền tảng AI hàng đầu hỗ trợ KTS & NTK kiến tạo không gian
            </p>
          </div>

          {/* Auth Mode Tabs: Login & Register only */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-[#111B2D] border border-[#24304A] rounded-xl mb-5">
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                authMode === 'login'
                  ? 'bg-[#D9C9A3] text-[#0E1726] font-bold shadow-xs'
                  : 'text-[#9AA3B5] hover:text-[#F1ECE2]'
              }`}
            >
              Đăng nhập
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('register');
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                authMode === 'register'
                  ? 'bg-[#D9C9A3] text-[#0E1726] font-bold shadow-xs'
                  : 'text-[#9AA3B5] hover:text-[#F1ECE2]'
              }`}
            >
              Đăng ký
            </button>
          </div>

          {/* Social OAuth: Google Button only */}
          <div className="mb-5">
            <button
              type="button"
              onClick={handleGoogleOAuth}
              className="w-full py-2.5 px-3 rounded-xl bg-[#16213A] hover:bg-[#1C2944] border border-[#24304A] hover:border-[#D9C9A3]/40 text-[#F1ECE2] text-xs font-medium flex items-center justify-center gap-2.5 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
              <span>Tiếp tục với Google</span>
            </button>
          </div>

          <div className="flex items-center gap-3 my-4">
            <span className="flex-1 h-px bg-[#24304A]" />
            <span className="text-[11px] text-[#646E84] uppercase tracking-wider">
              Hoặc với Email & Mật khẩu
            </span>
            <span className="flex-1 h-px bg-[#24304A]" />
          </div>

          {/* Feedback messages */}
          {errorMsg && (
            <div className="p-3 mb-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 mb-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authMode === 'register' && (
              <>
                <div>
                  <label className="text-xs font-semibold text-[#9AA3B5] block mb-1">
                    Họ và Tên
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="KTS Nguyễn Văn A"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-[#111B2D] border border-[#24304A] rounded-xl text-xs text-[#F1ECE2] placeholder-[#646E84] focus:outline-none focus:border-[#D9C9A3]"
                    />
                    <UserIcon className="w-4 h-4 text-[#646E84] absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#9AA3B5] block mb-1">
                    Số điện thoại
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="0901234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-[#111B2D] border border-[#24304A] rounded-xl text-xs text-[#F1ECE2] placeholder-[#646E84] focus:outline-none focus:border-[#D9C9A3]"
                    />
                    <Phone className="w-4 h-4 text-[#646E84] absolute left-3 top-3" />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="text-xs font-semibold text-[#9AA3B5] block mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#111B2D] border border-[#24304A] rounded-xl text-xs text-[#F1ECE2] placeholder-[#646E84] focus:outline-none focus:border-[#D9C9A3]"
                />
                <Mail className="w-4 h-4 text-[#646E84] absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#9AA3B5] block mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="Tối thiểu 6 ký tự"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#111B2D] border border-[#24304A] rounded-xl text-xs text-[#F1ECE2] placeholder-[#646E84] focus:outline-none focus:border-[#D9C9A3]"
                />
                <Lock className="w-4 h-4 text-[#646E84] absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-[#D9C9A3] hover:bg-[#E4D5B2] text-[#0E1726] font-bold text-xs shadow-lg shadow-[#D9C9A3]/20 transition-all cursor-pointer mt-4 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#0E1726] border-t-transparent rounded-full animate-spin" />
                  <span>Đang xử lý...</span>
                </>
              ) : authMode === 'register' ? (
                <span>Tạo Tài Khoản Mới</span>
              ) : (
                <span>Đăng Nhập</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
