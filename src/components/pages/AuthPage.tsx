import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Mail,
  Lock,
  User as UserIcon,
  Sparkles,
  Database,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  KeyRound,
  ShieldCheck,
  Send,
  Sliders,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithMagicLink,
  signInWithOAuth,
  getSupabaseConfig,
  saveSupabaseConfig,
  clearSupabaseConfig,
  getSupabaseClient,
} from '../../lib/supabase';

export const AuthPage: React.FC = () => {
  const { setActiveRoute, setUser } = useApp();

  const [authMode, setAuthMode] = useState<'login' | 'register' | 'magic'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Supabase Config state
  const [supabaseConfig, setSupabaseConfig] = useState(getSupabaseConfig());
  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const [configUrl, setConfigUrl] = useState(supabaseConfig.url || '');
  const [configKey, setConfigKey] = useState(supabaseConfig.anonKey || '');
  const [configSuccess, setConfigSuccess] = useState<string | null>(null);

  useEffect(() => {
    setSupabaseConfig(getSupabaseConfig());
  }, []);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      saveSupabaseConfig(configUrl, configKey);
      setSupabaseConfig(getSupabaseConfig());
      setConfigSuccess('Đã lưu cấu hình và kết nối Supabase thành công!');
      setErrorMsg(null);
      setTimeout(() => setConfigSuccess(null), 3500);
    } catch (err: any) {
      setErrorMsg(err.message || 'Lỗi lưu cấu hình Supabase');
    }
  };

  const handleClearConfig = () => {
    clearSupabaseConfig();
    setSupabaseConfig(getSupabaseConfig());
    setConfigUrl('');
    setConfigKey('');
    setConfigSuccess('Đã xóa cấu hình Supabase.');
    setTimeout(() => setConfigSuccess(null), 3000);
  };

  // Submit Handler for Email & Password or Register
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      if (authMode === 'magic') {
        await signInWithMagicLink(email);
        setSuccessMsg('Đã gửi link đăng nhập một lần (Magic Link) vào email của bạn. Vui lòng kiểm tra hộp thư!');
        setIsLoading(false);
        return;
      }

      if (authMode === 'register') {
        const data = await signUpWithEmail(email, password, name);
        if (data.session) {
          setUser({
            id: data.user?.id || `user-${Date.now()}`,
            name: name || 'KTS ArchiPics',
            email: email,
            credits: 1250,
            plan: 'Pro',
            expiryDate: '15/12/2026',
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
            avatarUrl: data.user.user_metadata?.avatar_url,
            credits: 1250,
            plan: 'Pro',
            expiryDate: '15/12/2026',
            isLoggedIn: true,
            provider: 'supabase',
          });
          setActiveRoute('/image');
        }
      }
    } catch (err: any) {
      console.error('Supabase Auth error:', err);
      // Helpful friendly message
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
    if (!supabaseConfig.isConfigured) {
      // If not configured, fall back to instant local session for preview
      handleDemoLogin();
      return;
    }
    try {
      await signInWithOAuth('google');
    } catch (err: any) {
      setErrorMsg(err.message || 'Lỗi xác thực Google qua Supabase');
    }
  };

  // OAuth GitHub
  const handleGithubOAuth = async () => {
    setErrorMsg(null);
    if (!supabaseConfig.isConfigured) {
      handleDemoLogin();
      return;
    }
    try {
      await signInWithOAuth('github');
    } catch (err: any) {
      setErrorMsg(err.message || 'Lỗi xác thực GitHub qua Supabase');
    }
  };

  // Instant Demo Login (for preview / quick testing without Supabase credentials)
  const handleDemoLogin = () => {
    setUser({
      id: 'demo-kts-01',
      name: 'KTS An Bình',
      email: 'khavyauflowteam@gmail.com',
      credits: 1250,
      plan: 'Pro',
      expiryDate: '15/12/2026',
      isLoggedIn: true,
      provider: 'demo',
    });
    setActiveRoute('/image');
  };

  return (
    <div className="min-h-screen bg-[#0E1726] text-[#F1ECE2] flex flex-col items-center justify-center p-4 font-sans relative selection:bg-[#D9C9A3] selection:text-[#0E1726]">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(217,201,163,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Bar: Back button & Supabase Status Badge */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <button
          onClick={() => setActiveRoute('/')}
          className="flex items-center gap-2 text-xs font-semibold text-[#9AA3B5] hover:text-[#F1ECE2] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Về trang chủ</span>
        </button>

        {/* Supabase status badge */}
        <button
          onClick={() => setShowConfigPanel(!showConfigPanel)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
            supabaseConfig.isConfigured
              ? 'bg-[#121D30] border-[#24304A] text-[#DDCDA8] hover:border-[#D9C9A3]/50'
              : 'bg-[#121D30] border-amber-500/40 text-amber-300 hover:border-amber-400'
          }`}
          title="Nhấp để cấu hình Supabase"
        >
          <span className={`w-2 h-2 rounded-full ${supabaseConfig.isConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
          <span>{supabaseConfig.isConfigured ? 'Supabase Auth đã kết nối' : 'Cấu hình Supabase'}</span>
          <Sliders className="w-3.5 h-3.5 opacity-70" />
        </button>
      </div>

      <div className="w-full max-w-md my-12 relative z-10 space-y-4">
        {/* Supabase Configuration Panel (Accordion) */}
        {showConfigPanel && (
          <div className="p-5 rounded-2xl bg-[#121D30] border border-[#24304A] shadow-xl text-xs space-y-3.5 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-[#24304A]">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-[#DDCDA8]" />
                <span className="font-bold text-[#F1ECE2]">Thiết Lập Kết Nối Supabase</span>
              </div>
              <button
                onClick={() => setShowConfigPanel(false)}
                className="text-[#9AA3B5] hover:text-[#F1ECE2]"
              >
                Đóng ✕
              </button>
            </div>

            <p className="text-[#9AA3B5] text-[11.5px] leading-relaxed">
              Nhập thông tin dự án Supabase của bạn từ <strong>Supabase Dashboard → Project Settings → API</strong> để liên kết xác thực người dùng thực.
            </p>

            <form onSubmit={handleSaveConfig} className="space-y-3">
              <div>
                <label className="block font-semibold text-[#9AA3B5] mb-1">
                  Supabase Project URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://xyzcompany.supabase.co"
                  value={configUrl}
                  onChange={(e) => setConfigUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-[#111B2D] border border-[#24304A] rounded-xl text-[#F1ECE2] text-xs placeholder:text-[#646E84] focus:outline-none focus:border-[#D9C9A3]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#9AA3B5] mb-1">
                  Supabase Anon Public API Key
                </label>
                <input
                  type="password"
                  required
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={configKey}
                  onChange={(e) => setConfigKey(e.target.value)}
                  className="w-full px-3 py-2 bg-[#111B2D] border border-[#24304A] rounded-xl text-[#F1ECE2] text-xs placeholder:text-[#646E84] focus:outline-none focus:border-[#D9C9A3]"
                />
              </div>

              {configSuccess && (
                <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{configSuccess}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-1">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D9C9A3] hover:bg-[#E4D5B2] text-[#0E1726] rounded-xl font-bold cursor-pointer transition-colors shadow-sm"
                >
                  Lưu & Kết Nối Ngay
                </button>
                {supabaseConfig.isConfigured && (
                  <button
                    type="button"
                    onClick={handleClearConfig}
                    className="text-[#9AA3B5] hover:text-rose-400 underline cursor-pointer text-[11px]"
                  >
                    Xóa cấu hình
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

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

          {/* Auth Mode Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-[#111B2D] border border-[#24304A] rounded-xl mb-5">
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
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
              className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                authMode === 'register'
                  ? 'bg-[#D9C9A3] text-[#0E1726] font-bold shadow-xs'
                  : 'text-[#9AA3B5] hover:text-[#F1ECE2]'
              }`}
            >
              Đăng ký
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('magic');
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                authMode === 'magic'
                  ? 'bg-[#D9C9A3] text-[#0E1726] font-bold shadow-xs'
                  : 'text-[#9AA3B5] hover:text-[#F1ECE2]'
              }`}
            >
              Magic Link
            </button>
          </div>

          {/* Social OAuth Buttons */}
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            <button
              type="button"
              onClick={handleGoogleOAuth}
              className="py-2.5 px-3 rounded-xl bg-[#16213A] hover:bg-[#1C2944] border border-[#24304A] hover:border-[#D9C9A3]/40 text-[#F1ECE2] text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
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
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={handleGithubOAuth}
              className="py-2.5 px-3 rounded-xl bg-[#16213A] hover:bg-[#1C2944] border border-[#24304A] hover:border-[#D9C9A3]/40 text-[#F1ECE2] text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          <div className="flex items-center gap-3 my-4">
            <span className="flex-1 h-px bg-[#24304A]" />
            <span className="text-[11px] text-[#646E84] uppercase tracking-wider">
              {authMode === 'magic' ? 'Xác thực không mật khẩu' : 'Hoặc qua Email'}
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
            )}

            <div>
              <label className="text-xs font-semibold text-[#9AA3B5] block mb-1">
                Email công việc
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

            {authMode !== 'magic' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-[#9AA3B5]">
                    Mật khẩu
                  </label>
                  {authMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setAuthMode('magic')}
                      className="text-[11px] text-[#DDCDA8] hover:underline"
                    >
                      Quên mật khẩu?
                    </button>
                  )}
                </div>
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
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-[#D9C9A3] hover:bg-[#E4D5B2] text-[#0E1726] font-bold text-xs shadow-lg shadow-[#D9C9A3]/20 transition-all cursor-pointer mt-3 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#0E1726] border-t-transparent rounded-full animate-spin" />
                  <span>Đang kết nối Supabase...</span>
                </>
              ) : authMode === 'register' ? (
                <span>Tạo Tài Khoản Mới</span>
              ) : authMode === 'magic' ? (
                <>
                  <Send className="w-4 h-4" />
                  <span>Gửi Magic Link Đăng Nhập</span>
                </>
              ) : (
                <span>Đăng Nhập Với Supabase</span>
              )}
            </button>
          </form>

          {/* Quick Demo Bypass */}
          <div className="mt-5 pt-4 border-t border-[#24304A] text-center">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 rounded-xl bg-[#16213A] hover:bg-[#1C2944] border border-[#24304A] hover:border-[#D9C9A3]/40 text-[#DDCDA8] text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dùng Tài Khoản Demo (Không cần Supabase)</span>
            </button>
            <p className="text-[11px] text-[#646E84] mt-2">
              Trải nghiệm tức thì 1,250 Credits cho tất cả công cụ KTS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
