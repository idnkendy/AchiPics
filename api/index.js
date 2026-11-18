import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true }));

// Enable CORS for API requests
app.use('/api', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, x-supabase-url, x-supabase-anon-key, x-supabase-service-key'
  );
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// ============================================================================
// ============================================================================
// 1. CẤU HÌNH SUPABASE TRỰC TIẾP TẠI BACK-END (Nhập thông tin tại đây hoặc trong .env)
// Người dùng có thể điền chuỗi trực tiếp vào 3 thuộc tính dưới đây
// ============================================================================

export const BACKEND_SUPABASE_CONFIG = {
  // Điền URL dự án Supabase (vd: 'https://xxxxxxxxxxxx.supabase.co')
  url: process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '',
  // Điền Anon Public API Key của Supabase
  anonKey: process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '',
  // Điền Service Role Key bí mật (Tùy chọn - Dùng cho quyền quản trị server)
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
};

let runtimeSupabaseConfig = {
  url: '',
  anonKey: '',
  serviceRoleKey: '',
};

/**
 * Lấy thông tin cấu hình Supabase ưu tiên:
 * 1. BACKEND_SUPABASE_CONFIG (Cấu hình trực tiếp ở file back-end api/index.js)
 * 2. Biến môi trường (.env)
 * 3. Biến runtime / Header request
 */
export const resolveSupabaseCredentials = (req) => {
  const headerUrl = req?.headers?.['x-supabase-url'];
  const headerAnonKey = req?.headers?.['x-supabase-anon-key'];
  const headerServiceKey = req?.headers?.['x-supabase-service-key'];

  const url = (
    BACKEND_SUPABASE_CONFIG.url ||
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    runtimeSupabaseConfig.url ||
    headerUrl ||
    ''
  ).trim();

  const anonKey = (
    BACKEND_SUPABASE_CONFIG.anonKey ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    runtimeSupabaseConfig.anonKey ||
    headerAnonKey ||
    ''
  ).trim();

  const serviceRoleKey = (
    BACKEND_SUPABASE_CONFIG.serviceRoleKey ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    runtimeSupabaseConfig.serviceRoleKey ||
    headerServiceKey ||
    ''
  ).trim();

  const isConfigured = Boolean(
    url &&
      url.startsWith('http') &&
      url !== 'https://your-project-id.supabase.co' &&
      (anonKey.length > 20 || serviceRoleKey.length > 20)
  );

  return {
    url,
    anonKey,
    serviceRoleKey,
    isConfigured,
  };
};

/**
 * Khởi tạo Supabase Client cho mỗi Request (hỗ trợ gắn JWT Bearer Token của User)
 */
export const getSupabaseForRequest = (req, useServiceRole = false) => {
  const { url, anonKey, serviceRoleKey, isConfigured } = resolveSupabaseCredentials(req);
  if (!isConfigured) {
    return null;
  }

  const keyToUse = useServiceRole && serviceRoleKey ? serviceRoleKey : anonKey || serviceRoleKey;
  if (!keyToUse) return null;

  const authHeader = req?.headers?.authorization;
  const globalHeaders = {};
  if (authHeader && authHeader.startsWith('Bearer ') && !useServiceRole) {
    globalHeaders.Authorization = authHeader;
  }

  try {
    return createClient(url, keyToUse, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
      global: {
        headers: globalHeaders,
      },
    });
  } catch (error) {
    console.error('[API Supabase] Lỗi khởi tạo Supabase client:', error);
    return null;
  }
};

/**
 * Bộ nhớ đệm (Fallback Store) khi chưa tạo bảng trên Supabase
 * Giúp các luồng API luôn hoạt động mượt mà ngay cả khi DB chưa chạy migration SQL
 */
const memoryStore = {
  profiles: new Map([
    [
      'user-opzen-01',
      {
        id: 'user-opzen-01',
        name: 'KTS An Bình',
        email: 'khavyauflowteam@gmail.com',
        phone: '0901234567',
        credits: 60,
        plan: 'Free',
        expiry_date: 'Không giới hạn',
        provider: 'supabase',
        updated_at: new Date().toISOString(),
      },
    ],
  ]),
  // Lịch sử ảnh đã tạo xong (đã lược bỏ style và cost)
  history: [
    {
      id: 'hist-1',
      user_id: 'user-opzen-01',
      tool: 'Render',
      prompt:
        'Villa hiện đại bên hồ nước, kết cấu cantilever bê tông xám & đèn hắt ấm áp, hoàng hôn',
      result_image:
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      original_image: null,
      created_at: '2026-10-04 07:45',
      is_favorite: true,
      aspect_ratio: '16:9',
    },
  ],
  // Bảng Generation Jobs: theo dõi tiến trình tạo ảnh (pending, processing, completed, failed)
  generationJobs: [
    {
      id: 'job-init-1',
      user_id: 'user-opzen-01',
      tool: 'Render',
      prompt: 'Villa hiện đại bên hồ nước, kết cấu cantilever bê tông xám',
      result_image:
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      original_image: null,
      aspect_ratio: '16:9',
      status: 'completed',
      error_message: null,
      created_at: '2026-10-04T07:44:00Z',
      updated_at: '2026-10-04T07:45:00Z',
    },
  ],
  payments: [
    {
      id: 'TX-98214',
      user_id: 'user-opzen-01',
      plan_id: 'pro',
      plan_name: 'Gói Pro Monthly',
      amount: 499000,
      amount_formatted: '499,000 đ',
      credits: 1250,
      transfer_code: 'OPZEN98214',
      status: 'completed',
      created_at: '2026-10-04T08:00:00Z',
    },
  ],
  creditLogs: [
    {
      id: 'log-1',
      user_id: 'user-opzen-01',
      action: 'Tặng 60 Credits khởi tạo tài khoản',
      cost: 60,
      created_at: '04/10/2026 09:00',
    },
    {
      id: 'log-2',
      user_id: 'user-opzen-01',
      action: 'Render Villa 4K (2 ảnh)',
      cost: -30,
      created_at: '04/10/2026 09:12',
    },
  ],
  contacts: [],
};

// ============================================================================
// 2. MIDDLEWARE XÁC THỰC TOKEN SUPABASE
// ============================================================================

const extractAuthUser = async (req) => {
  const authHeader = req.headers.authorization;
  const token =
    authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.replace('Bearer ', '').trim()
      : null;

  if (!token) return null;

  const supabase = getSupabaseForRequest(req);
  if (!supabase) return null;

  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) return null;
    return data.user;
  } catch {
    return null;
  }
};

// ============================================================================
// 3. LUỒNG KIỂM TRA HỆ THỐNG & CẤU HÌNH SUPABASE (/api/health & /api/supabase/*)
// ============================================================================

app.get('/api/health', async (req, res) => {
  const creds = resolveSupabaseCredentials(req);
  res.json({
    ok: true,
    service: 'ArchiPics AI Backend API',
    timestamp: new Date().toISOString(),
    supabase: {
      isConfigured: creds.isConfigured,
      url: creds.url ? `${creds.url.slice(0, 28)}...` : null,
      hasServiceRole: Boolean(creds.serviceRoleKey),
    },
  });
});

app.get('/api/supabase/status', async (req, res) => {
  const creds = resolveSupabaseCredentials(req);
  if (!creds.isConfigured) {
    return res.json({
      ok: true,
      connected: false,
      isConfigured: false,
      message: 'Chưa cấu hình thông tin kết nối Supabase (URL / Anon Key).',
    });
  }

  const supabase = getSupabaseForRequest(req, true);
  if (!supabase) {
    return res.status(400).json({
      ok: false,
      connected: false,
      isConfigured: false,
      message: 'Không thể khởi tạo kết nối Supabase với thông tin hiện tại.',
    });
  }

  const startTime = Date.now();
  try {
    // Kiểm tra kết nối tới Supabase Auth & kiểm tra bảng profiles
    const { error: tableError } = await supabase.from('profiles').select('id').limit(1);
    const latencyMs = Date.now() - startTime;

    const tablesReady = !tableError || !tableError.message?.includes('does not exist');

    return res.json({
      ok: true,
      connected: true,
      isConfigured: true,
      url: creds.url,
      anonKey: creds.anonKey, // Cho phép frontend tự động nhận public anon key từ Back-end
      hasServiceRole: Boolean(creds.serviceRoleKey),
      configuredInBackend: Boolean(BACKEND_SUPABASE_CONFIG.url && BACKEND_SUPABASE_CONFIG.anonKey),
      tablesReady,
      tableNotice: tableError
        ? `Đã kết nối Supabase từ Back-end (chưa tạo đủ 6 bảng: ${tableError.message})`
        : 'Đã kết nối Supabase Auth & Database từ Back-end thành công.',
      latencyMs,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      connected: false,
      isConfigured: true,
      message: err.message || 'Lỗi khi kiểm tra kết nối tới Supabase.',
    });
  }
});

app.post('/api/supabase/config', async (req, res) => {
  const { url, anonKey, serviceRoleKey } = req.body || {};

  if (!url || !url.trim().startsWith('http')) {
    return res.status(400).json({
      ok: false,
      error: 'Supabase Project URL phải bắt đầu bằng https://',
    });
  }

  if (!anonKey || anonKey.trim().length < 20) {
    return res.status(400).json({
      ok: false,
      error: 'Supabase Anon Key không hợp lệ.',
    });
  }

  runtimeSupabaseConfig = {
    url: url.trim(),
    anonKey: anonKey.trim(),
    serviceRoleKey: serviceRoleKey ? serviceRoleKey.trim() : runtimeSupabaseConfig.serviceRoleKey,
  };

  const supabase = getSupabaseForRequest(req, true);
  if (!supabase) {
    return res.status(400).json({
      ok: false,
      error: 'Không thể khởi tạo Supabase Client với cấu hình đã nhập.',
    });
  }

  return res.json({
    ok: true,
    message: 'Đã lưu cấu hình Supabase trên Back-end thành công!',
    config: {
      url: runtimeSupabaseConfig.url,
      isConfigured: true,
      hasServiceRole: Boolean(runtimeSupabaseConfig.serviceRoleKey),
    },
  });
});

app.delete('/api/supabase/config', (req, res) => {
  runtimeSupabaseConfig = {
    url: '',
    anonKey: '',
    serviceRoleKey: '',
  };

  res.json({
    ok: true,
    message: 'Đã xóa cấu hình Supabase runtime trên Back-end.',
  });
});

const SUPABASE_SCHEMA_SQL = `
-- =========================================================================
-- ARCHIPICS AI - SUPABASE DATABASE SCHEMA (CẬP NHẬT MỚI NHẤT)
-- =========================================================================

-- 1. BẢNG PROFILES: Lưu hồ sơ KTS, SĐT, gói dịch vụ & số dư Credits (Mặc định 60 Credits, Gói Free)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text default 'KTS ArchiPics',
  email text,
  phone text,
  avatar_url text,
  credits integer default 60 not null,
  plan text default 'Free' not null,
  expiry_date text default 'Không giới hạn',
  provider text default 'supabase',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Cập nhật thêm phone nếu bảng đã tồn tại
alter table public.profiles add column if not exists phone text;
alter table public.profiles alter column credits set default 60;
alter table public.profiles alter column plan set default 'Free';

-- 2. BẢNG RENDER_HISTORY: Lưu lịch sử ảnh Render AI sau khi tạo xong (Đã lược bỏ style & cost)
create table if not exists public.render_history (
  id text primary key,
  user_id uuid references auth.users on delete cascade,
  tool text not null,
  prompt text not null,
  result_image text not null,
  original_image text,
  aspect_ratio text default '16:9',
  is_favorite boolean default false,
  created_at timestamptz default now()
);

alter table public.render_history drop column if exists style;
alter table public.render_history drop column if exists cost;

-- 3. BẢNG GENERATION_JOBS: Lưu trạng thái tác vụ Render (đang chờ, đang xử lý, hoàn thành, thất bại)
create table if not exists public.generation_jobs (
  id text primary key,
  user_id uuid references auth.users on delete cascade,
  tool text not null,
  prompt text not null,
  result_image text,
  original_image text,
  aspect_ratio text default '16:9',
  status text default 'pending', -- 'pending' | 'processing' | 'completed' | 'failed'
  error_message text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. BẢNG PAYMENTS: Lưu giao dịch nạp Credits & nâng cấp gói
create table if not exists public.payments (
  id text primary key,
  user_id uuid references auth.users on delete set null,
  plan_id text not null,
  plan_name text not null,
  amount numeric not null,
  amount_formatted text,
  credits integer not null,
  transfer_code text not null,
  status text default 'pending',
  created_at timestamptz default now()
);

-- 5. BẢNG CREDIT_LOGS: Lưu nhật ký sử dụng Credits
create table if not exists public.credit_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  action text not null,
  cost integer not null,
  created_at timestamptz default now()
);

-- 6. BẢNG CONTACTS: Lưu yêu cầu tư vấn từ trang Liên hệ
create table if not exists public.contacts (
  id text primary key,
  name text not null,
  email text not null,
  phone text,
  company text,
  message text not null,
  created_at timestamptz default now()
);

-- 7. Bật Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.render_history enable row level security;
alter table public.generation_jobs enable row level security;
alter table public.payments enable row level security;
alter table public.credit_logs enable row level security;
alter table public.contacts enable row level security;

-- 8. Policies (An toàn khi chạy lại nhiều lần)
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

drop policy if exists "Users can manage own history" on public.render_history;
create policy "Users can manage own history" on public.render_history for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users can manage own generation jobs" on public.generation_jobs;
create policy "Users can manage own generation jobs" on public.generation_jobs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users can manage own payments" on public.payments;
create policy "Users can manage own payments" on public.payments for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users can manage own credit logs" on public.credit_logs;
create policy "Users can manage own credit logs" on public.credit_logs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Anyone can submit contact" on public.contacts;
create policy "Anyone can submit contact" on public.contacts for insert with check (true);

drop policy if exists "Authenticated users can view contacts" on public.contacts;
create policy "Authenticated users can view contacts" on public.contacts for select using (auth.role() = 'authenticated');

-- 9. Trigger tự động khởi tạo Profile + tặng 60 Credits và Gói Free khi User đăng ký
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, email, phone, avatar_url, credits, plan, expiry_date, provider)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1), 'KTS ArchiPics'),
    new.email,
    coalesce(new.raw_user_meta_data->>'phone', ''),
    new.raw_user_meta_data->>'avatar_url',
    60,
    'Free',
    'Không giới hạn',
    coalesce(new.raw_app_meta_data->>'provider', 'supabase')
  )
  on conflict (id) do update set
    phone = coalesce(excluded.phone, public.profiles.phone),
    updated_at = now();

  insert into public.credit_logs (user_id, action, cost)
  values (new.id, 'Tặng 60 Credits khởi tạo tài khoản mới', 60);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
`.trim();

app.get('/api/supabase/schema', (req, res) => {
  res.json({
    ok: true,
    sql: SUPABASE_SCHEMA_SQL,
    tables: [
      { name: 'profiles', description: 'Hồ sơ KTS, SĐT, gói cước (Free) & 60 Credits' },
      { name: 'render_history', description: 'Lịch sử ảnh Render AI đã hoàn thành (bỏ style & cost)' },
      { name: 'generation_jobs', description: 'Tiến trình tác vụ Render (status, updated_at)' },
      { name: 'payments', description: 'Đơn hàng VietQR & lịch sử nạp Credits' },
      { name: 'credit_logs', description: 'Nhật ký trừ/cộng Credits chi tiết' },
      { name: 'contacts', description: 'Danh sách liên hệ tư vấn doanh nghiệp' },
    ],
  });
});

app.get('/api/supabase/tables-check', async (req, res) => {
  const creds = resolveSupabaseCredentials(req);
  if (!creds.isConfigured) {
    return res.json({
      ok: false,
      connected: false,
      message: 'Chưa cấu hình Supabase URL & Anon Key trong file api/index.js hoặc .env.',
      tables: [],
    });
  }

  const supabase = getSupabaseForRequest(req, true);
  if (!supabase) {
    return res.json({
      ok: false,
      connected: false,
      message: 'Không thể khởi tạo kết nối Supabase.',
      tables: [],
    });
  }

  const tableList = [
    'profiles',
    'render_history',
    'generation_jobs',
    'payments',
    'credit_logs',
    'contacts',
  ];
  const results = await Promise.all(
    tableList.map(async (tableName) => {
      try {
        const { error } = await supabase.from(tableName).select('*').limit(1);
        const isMissing =
          error &&
          (error.code === '42P01' ||
            error.message?.toLowerCase().includes('does not exist') ||
            error.message?.toLowerCase().includes('could not find the table'));

        return {
          name: tableName,
          ready: !isMissing,
          error: isMissing ? error.message : null,
        };
      } catch (err) {
        return {
          name: tableName,
          ready: false,
          error: err.message || 'Lỗi kiểm tra bảng',
        };
      }
    })
  );

  const allReady = results.every((t) => t.ready);
  return res.json({
    ok: true,
    connected: true,
    allReady,
    tables: results,
  });
});

// ============================================================================
// 4. LUỒNG XÁC THỰC NGƯỜI DÙNG QUA SUPABASE (/api/auth/*)
// ============================================================================

/**
 * Helper đồng bộ hoặc khởi tạo hồ sơ người dùng trong bảng `profiles`
 */
const syncUserProfile = async (supabase, authUser, fallbackName, phone) => {
  if (!authUser) return null;

  const defaultProfile = {
    id: authUser.id,
    name:
      fallbackName ||
      authUser.user_metadata?.full_name ||
      authUser.email?.split('@')[0] ||
      'KTS ArchiPics',
    email: authUser.email || '',
    phone: phone || authUser.user_metadata?.phone || '',
    avatar_url: authUser.user_metadata?.avatar_url || null,
    credits: 60,
    plan: 'Free',
    expiry_date: 'Không giới hạn',
    provider: authUser.app_metadata?.provider || 'supabase',
  };

  if (supabase) {
    try {
      const { data: existingProfile, error: selectErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();

      if (!selectErr && existingProfile) {
        memoryStore.profiles.set(authUser.id, existingProfile);
        return existingProfile;
      }

      const { data: insertedProfile, error: insertErr } = await supabase
        .from('profiles')
        .upsert(defaultProfile, { onConflict: 'id' })
        .select()
        .maybeSingle();

      if (!insertErr && insertedProfile) {
        memoryStore.profiles.set(authUser.id, insertedProfile);
        return insertedProfile;
      }
    } catch (err) {
      console.warn('[API Profile Sync] Sử dụng fallback memory profile:', err.message);
    }
  }

  const cached = memoryStore.profiles.get(authUser.id) || defaultProfile;
  memoryStore.profiles.set(authUser.id, cached);
  return cached;
};

// POST /api/auth/login - Đăng nhập Email & Password qua Supabase
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({
      ok: false,
      error: 'Vui lòng nhập đầy đủ Email và Mật khẩu.',
    });
  }

  const supabase = getSupabaseForRequest(req);
  if (!supabase) {
    return res.status(400).json({
      ok: false,
      error: 'Chưa cấu hình kết nối Supabase. Vui lòng thiết lập URL và Anon Key.',
    });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      return res.status(401).json({
        ok: false,
        error: error.message,
      });
    }

    const profile = await syncUserProfile(supabase, data.user);

    return res.json({
      ok: true,
      user: data.user,
      session: data.session,
      profile,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.message || 'Lỗi máy chủ khi đăng nhập.',
    });
  }
});

// POST /api/auth/register - Đăng ký tài khoản mới qua Supabase
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({
      ok: false,
      error: 'Vui lòng nhập đầy đủ Email và Mật khẩu.',
    });
  }

  const supabase = getSupabaseForRequest(req);
  if (!supabase) {
    return res.status(400).json({
      ok: false,
      error: 'Chưa cấu hình kết nối Supabase. Vui lòng thiết lập URL và Anon Key.',
    });
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: name || 'KTS ArchiPics',
        },
      },
    });

    if (error) {
      return res.status(400).json({
        ok: false,
        error: error.message,
      });
    }

    const profile = data.user ? await syncUserProfile(supabase, data.user, name) : null;

    return res.json({
      ok: true,
      user: data.user,
      session: data.session,
      profile,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.message || 'Lỗi máy chủ khi đăng ký tài khoản.',
    });
  }
});

// POST /api/auth/magic-link - Gửi link đăng nhập OTP qua Email
app.post('/api/auth/magic-link', async (req, res) => {
  const { email, redirectTo } = req.body || {};
  if (!email) {
    return res.status(400).json({
      ok: false,
      error: 'Vui lòng nhập địa chỉ Email.',
    });
  }

  const supabase = getSupabaseForRequest(req);
  if (!supabase) {
    return res.status(400).json({
      ok: false,
      error: 'Chưa cấu hình kết nối Supabase.',
    });
  }

  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: redirectTo || process.env.APP_URL || 'http://localhost:3000',
      },
    });

    if (error) {
      return res.status(400).json({ ok: false, error: error.message });
    }

    return res.json({
      ok: true,
      message: 'Đã gửi Magic Link tới hộp thư của bạn.',
      data,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.message || 'Lỗi khi gửi Magic Link.',
    });
  }
});

// POST /api/auth/oauth - Khởi tạo URL đăng nhập OAuth (Google / GitHub)
app.post('/api/auth/oauth', async (req, res) => {
  const { provider, redirectTo } = req.body || {};
  if (!provider) {
    return res.status(400).json({
      ok: false,
      error: 'Thiếu thông tin OAuth provider (google hoặc github).',
    });
  }

  const supabase = getSupabaseForRequest(req);
  if (!supabase) {
    return res.status(400).json({
      ok: false,
      error: 'Chưa cấu hình kết nối Supabase.',
    });
  }

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectTo || process.env.APP_URL || 'http://localhost:3000',
      },
    });

    if (error) {
      return res.status(400).json({ ok: false, error: error.message });
    }

    return res.json({
      ok: true,
      url: data?.url,
      provider: data?.provider,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.message || 'Lỗi tạo liên kết OAuth.',
    });
  }
});

// GET /api/auth/me - Lấy thông tin phiên đăng nhập và hồ sơ từ Bearer Token
app.get('/api/auth/me', async (req, res) => {
  const authUser = await extractAuthUser(req);
  if (!authUser) {
    return res.status(401).json({
      ok: false,
      authenticated: false,
      error: 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn.',
    });
  }

  const supabase = getSupabaseForRequest(req);
  const profile = await syncUserProfile(supabase, authUser);

  return res.json({
    ok: true,
    authenticated: true,
    user: authUser,
    profile,
  });
});

// POST /api/auth/logout - Đăng xuất phiên hiện tại
app.post('/api/auth/logout', async (req, res) => {
  const supabase = getSupabaseForRequest(req);
  if (supabase) {
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignore signout errors
    }
  }
  return res.json({ ok: true, message: 'Đã đăng xuất thành công.' });
});

// ============================================================================
// 5. LUỒNG QUẢN LÝ HỒ SƠ & CREDITS NGƯỜI DÙNG (/api/user/*)
// ============================================================================

app.get('/api/user/profile', async (req, res) => {
  const authUser = await extractAuthUser(req);
  const requestedUserId = req.query.userId || authUser?.id || 'user-opzen-01';
  const supabase = getSupabaseForRequest(req);

  if (supabase && authUser) {
    const profile = await syncUserProfile(supabase, authUser);
    return res.json({ ok: true, profile });
  }

  if (supabase && requestedUserId) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', requestedUserId)
        .maybeSingle();

      if (!error && data) {
        return res.json({ ok: true, profile: data });
      }
    } catch {
      // Fallback to memoryStore
    }
  }

  const fallback =
    memoryStore.profiles.get(String(requestedUserId)) ||
    memoryStore.profiles.get('user-opzen-01');

  return res.json({ ok: true, profile: fallback });
});

app.put('/api/user/profile', async (req, res) => {
  const authUser = await extractAuthUser(req);
  const { userId, name, phone, avatarUrl, plan, expiryDate } = req.body || {};
  const targetId = authUser?.id || userId || 'user-opzen-01';

  const current = memoryStore.profiles.get(targetId) || {
    id: targetId,
    name: 'KTS ArchiPics',
    email: authUser?.email || '',
    phone: '',
    credits: 60,
    plan: 'Free',
    expiry_date: 'Không giới hạn',
  };

  const updated = {
    ...current,
    ...(name !== undefined ? { name } : {}),
    ...(phone !== undefined ? { phone } : {}),
    ...(avatarUrl !== undefined ? { avatar_url: avatarUrl } : {}),
    ...(plan !== undefined ? { plan } : {}),
    ...(expiryDate !== undefined ? { expiry_date: expiryDate } : {}),
    updated_at: new Date().toISOString(),
  };

  memoryStore.profiles.set(targetId, updated);

  const supabase = getSupabaseForRequest(req);
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert(updated, { onConflict: 'id' })
        .select()
        .maybeSingle();

      if (!error && data) {
        memoryStore.profiles.set(targetId, data);
        return res.json({ ok: true, profile: data });
      }
    } catch {
      // Fallback gracefully
    }
  }

  return res.json({ ok: true, profile: updated });
});

// POST /api/user/credits/deduct - Trừ credits khi thực hiện Render / AI Tool
app.post('/api/user/credits/deduct', async (req, res) => {
  const authUser = await extractAuthUser(req);
  const { userId, amount, action } = req.body || {};
  const cost = Number(amount) || 0;
  const targetId = authUser?.id || userId || 'user-opzen-01';

  if (cost <= 0) {
    return res.status(400).json({ ok: false, error: 'Số lượng credits cần trừ không hợp lệ.' });
  }

  const supabase = getSupabaseForRequest(req);
  let profile = memoryStore.profiles.get(targetId) || {
    id: targetId,
    name: authUser?.user_metadata?.full_name || 'KTS ArchiPics',
    email: authUser?.email || 'khavyauflowteam@gmail.com',
    phone: '',
    credits: 60,
    plan: 'Free',
    expiry_date: 'Không giới hạn',
  };

  if (supabase) {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', targetId)
        .maybeSingle();
      if (data) profile = data;
    } catch {
      // Use in-memory profile
    }
  }

  if ((profile.credits || 0) < cost) {
    return res.status(400).json({
      ok: false,
      error: 'Số dư Credits không đủ để thực hiện tác vụ này.',
      credits: profile.credits || 0,
    });
  }

  const newCredits = (profile.credits || 0) - cost;
  profile = { ...profile, credits: newCredits, updated_at: new Date().toISOString() };
  memoryStore.profiles.set(targetId, profile);

  const logItem = {
    id: `log-${Date.now()}`,
    user_id: targetId,
    action: action || 'Sử dụng công cụ AI Render',
    cost: -cost,
    created_at: new Date().toLocaleString('vi-VN'),
  };
  memoryStore.creditLogs.unshift(logItem);

  if (supabase) {
    try {
      await supabase
        .from('profiles')
        .update({ credits: newCredits, updated_at: new Date().toISOString() })
        .eq('id', targetId);

      await supabase.from('credit_logs').insert({
        user_id: targetId,
        action: logItem.action,
        cost: -cost,
      });
    } catch {
      // Fallback gracefully
    }
  }

  return res.json({
    ok: true,
    credits: newCredits,
    deducted: cost,
    log: logItem,
  });
});

// POST /api/user/credits/add - Cộng thêm credits vào tài khoản
app.post('/api/user/credits/add', async (req, res) => {
  const authUser = await extractAuthUser(req);
  const { userId, amount, reason, plan } = req.body || {};
  const added = Number(amount) || 0;
  const targetId = authUser?.id || userId || 'user-opzen-01';

  if (added <= 0) {
    return res.status(400).json({ ok: false, error: 'Số lượng credits cộng thêm phải lớn hơn 0.' });
  }

  const supabase = getSupabaseForRequest(req);
  let profile = memoryStore.profiles.get(targetId) || {
    id: targetId,
    name: authUser?.user_metadata?.full_name || 'KTS ArchiPics',
    email: authUser?.email || 'khavyauflowteam@gmail.com',
    phone: '',
    credits: 60,
    plan: 'Free',
    expiry_date: 'Không giới hạn',
  };

  if (supabase) {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', targetId)
        .maybeSingle();
      if (data) profile = data;
    } catch {
      // Ignore
    }
  }

  const newCredits = (profile.credits || 0) + added;
  const updatedFields = {
    credits: newCredits,
    ...(plan ? { plan } : {}),
    updated_at: new Date().toISOString(),
  };

  profile = { ...profile, ...updatedFields };
  memoryStore.profiles.set(targetId, profile);

  if (supabase) {
    try {
      await supabase.from('profiles').update(updatedFields).eq('id', targetId);
      await supabase.from('credit_logs').insert({
        user_id: targetId,
        action: reason || `Nạp thêm +${added} Credits`,
        cost: added,
      });
    } catch {
      // Ignore
    }
  }

  return res.json({
    ok: true,
    credits: newCredits,
    added,
    profile,
  });
});

// GET /api/user/logs - Lấy lịch sử giao dịch & nhật ký trừ credits
app.get('/api/user/logs', async (req, res) => {
  const authUser = await extractAuthUser(req);
  const targetId = authUser?.id || req.query.userId || 'user-opzen-01';
  const supabase = getSupabaseForRequest(req);

  let payments = memoryStore.payments;
  let creditLogs = memoryStore.creditLogs;

  if (supabase && authUser) {
    try {
      const [{ data: dbPayments }, { data: dbLogs }] = await Promise.all([
        supabase
          .from('payments')
          .select('*')
          .eq('user_id', targetId)
          .order('created_at', { ascending: false })
          .limit(20),
        supabase
          .from('credit_logs')
          .select('*')
          .eq('user_id', targetId)
          .order('created_at', { ascending: false })
          .limit(30),
      ]);

      if (dbPayments && dbPayments.length > 0) payments = dbPayments;
      if (dbLogs && dbLogs.length > 0) creditLogs = dbLogs;
    } catch {
      // Fallback to memoryStore
    }
  }

  return res.json({
    ok: true,
    payments,
    creditLogs,
  });
});

// ============================================================================
// 6. LUỒNG QUẢN LÝ LỊCH SỬ RENDER AI (/api/history/*)
// Lưu trữ các kết quả đã hoàn thành (Đã lược bỏ style & cost theo yêu cầu)
// ============================================================================

const mapDbHistoryToFrontend = (row) => ({
  id: row.id,
  tool: row.tool,
  prompt: row.prompt,
  resultImage: row.result_image || row.resultImage,
  originalImage: row.original_image || row.originalImage,
  createdAt: row.created_at || row.createdAt,
  isFavorite: Boolean(row.is_favorite ?? row.isFavorite),
  aspectRatio: row.aspect_ratio || row.aspectRatio || '16:9',
});

app.get('/api/history', async (req, res) => {
  const authUser = await extractAuthUser(req);
  const supabase = getSupabaseForRequest(req);

  if (supabase) {
    try {
      let query = supabase
        .from('render_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (authUser?.id) {
        query = query.eq('user_id', authUser.id);
      }

      const { data, error } = await query;
      if (!error && Array.isArray(data) && data.length > 0) {
        return res.json({
          ok: true,
          source: 'supabase',
          items: data.map(mapDbHistoryToFrontend),
        });
      }
    } catch {
      // Fallback to memoryStore
    }
  }

  return res.json({
    ok: true,
    source: 'memory',
    items: memoryStore.history.map(mapDbHistoryToFrontend),
  });
});

app.post('/api/history', async (req, res) => {
  const authUser = await extractAuthUser(req);
  const item = req.body || {};

  if (!item.prompt || !item.resultImage) {
    return res.status(400).json({
      ok: false,
      error: 'Thiếu thông tin prompt hoặc resultImage để lưu lịch sử.',
    });
  }

  const dbRecord = {
    id: item.id || `hist-${Date.now()}`,
    user_id: authUser?.id || item.userId || null,
    tool: item.tool || 'Render',
    prompt: item.prompt,
    result_image: item.resultImage,
    original_image: item.originalImage || null,
    aspect_ratio: item.aspectRatio || '16:9',
    is_favorite: Boolean(item.isFavorite),
    created_at: item.createdAt || new Date().toISOString(),
  };

  memoryStore.history.unshift(dbRecord);

  const supabase = getSupabaseForRequest(req);
  if (supabase) {
    try {
      await supabase.from('render_history').upsert(dbRecord, { onConflict: 'id' });
    } catch (err) {
      console.warn('[API History] Lưu fallback bộ nhớ tạm:', err.message);
    }
  }

  return res.json({
    ok: true,
    item: mapDbHistoryToFrontend(dbRecord),
  });
});

app.patch('/api/history/:id/favorite', async (req, res) => {
  const { id } = req.params;
  const { isFavorite } = req.body || {};

  let updatedRecord = null;
  memoryStore.history = memoryStore.history.map((item) => {
    if (item.id === id) {
      const nextFav = isFavorite !== undefined ? Boolean(isFavorite) : !item.is_favorite;
      updatedRecord = { ...item, is_favorite: nextFav };
      return updatedRecord;
    }
    return item;
  });

  const supabase = getSupabaseForRequest(req);
  if (supabase) {
    try {
      await supabase
        .from('render_history')
        .update({
          is_favorite:
            isFavorite !== undefined
              ? Boolean(isFavorite)
              : updatedRecord?.is_favorite ?? true,
        })
        .eq('id', id);
    } catch {
      // Ignore
    }
  }

  return res.json({
    ok: true,
    id,
    isFavorite: updatedRecord?.is_favorite ?? Boolean(isFavorite),
  });
});

app.delete('/api/history/:id', async (req, res) => {
  const { id } = req.params;
  memoryStore.history = memoryStore.history.filter((item) => item.id !== id);

  const supabase = getSupabaseForRequest(req);
  if (supabase) {
    try {
      await supabase.from('render_history').delete().eq('id', id);
    } catch {
      // Ignore
    }
  }

  return res.json({
    ok: true,
    deletedId: id,
  });
});

// ============================================================================
// 7. LUỒNG QUẢN LÝ TIẾN TRÌNH GENERATION JOBS (/api/jobs/*)
// Bảng lưu tiến trình tạo ảnh (status: pending, processing, completed, failed)
// ============================================================================

const mapDbJobToFrontend = (row) => ({
  id: row.id,
  userId: row.user_id || row.userId,
  tool: row.tool,
  prompt: row.prompt,
  resultImage: row.result_image || row.resultImage || null,
  originalImage: row.original_image || row.originalImage || null,
  aspectRatio: row.aspect_ratio || row.aspectRatio || '16:9',
  status: row.status || 'pending',
  errorMessage: row.error_message || row.errorMessage || null,
  createdAt: row.created_at || row.createdAt,
  updatedAt: row.updated_at || row.updatedAt,
});

// GET /api/jobs - Lấy danh sách jobs của người dùng
app.get('/api/jobs', async (req, res) => {
  const authUser = await extractAuthUser(req);
  const { status, limit = 30 } = req.query;
  const targetUserId = authUser?.id || 'user-opzen-01';
  const supabase = getSupabaseForRequest(req);

  if (supabase) {
    try {
      let query = supabase
        .from('generation_jobs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(Number(limit));

      if (authUser?.id) {
        query = query.eq('user_id', authUser.id);
      }
      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;
      if (!error && Array.isArray(data)) {
        return res.json({
          ok: true,
          source: 'supabase',
          jobs: data.map(mapDbJobToFrontend),
        });
      }
    } catch {
      // Fallback to memoryStore
    }
  }

  let filteredJobs = memoryStore.generationJobs.filter(
    (job) => !authUser?.id || job.user_id === targetUserId
  );
  if (status) {
    filteredJobs = filteredJobs.filter((job) => job.status === status);
  }

  return res.json({
    ok: true,
    source: 'memory',
    jobs: filteredJobs.map(mapDbJobToFrontend),
  });
});

// POST /api/jobs - Khởi tạo một Generation Job mới (trạng thái pending / processing)
app.post('/api/jobs', async (req, res) => {
  const authUser = await extractAuthUser(req);
  const {
    id,
    tool,
    prompt,
    resultImage,
    originalImage,
    aspectRatio,
    status = 'pending',
    errorMessage,
  } = req.body || {};

  if (!prompt) {
    return res.status(400).json({
      ok: false,
      error: 'Thiếu nội dung prompt để tạo Generation Job.',
    });
  }

  const now = new Date().toISOString();
  const newJob = {
    id: id || `job-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    user_id: authUser?.id || req.body.userId || 'user-opzen-01',
    tool: tool || 'Render',
    prompt,
    result_image: resultImage || null,
    original_image: originalImage || null,
    aspect_ratio: aspectRatio || '16:9',
    status, // 'pending' | 'processing' | 'completed' | 'failed'
    error_message: errorMessage || null,
    created_at: now,
    updated_at: now,
  };

  memoryStore.generationJobs.unshift(newJob);

  const supabase = getSupabaseForRequest(req);
  if (supabase) {
    try {
      await supabase.from('generation_jobs').insert(newJob);
    } catch (err) {
      console.warn('[API Jobs] Lưu fallback memory:', err.message);
    }
  }

  return res.json({
    ok: true,
    job: mapDbJobToFrontend(newJob),
  });
});

// GET /api/jobs/:id - Lấy trạng thái cụ thể của 1 Job
app.get('/api/jobs/:id', async (req, res) => {
  const { id } = req.params;
  const supabase = getSupabaseForRequest(req);

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('generation_jobs')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (!error && data) {
        return res.json({
          ok: true,
          job: mapDbJobToFrontend(data),
        });
      }
    } catch {
      // Fallback
    }
  }

  const found = memoryStore.generationJobs.find((j) => j.id === id);
  if (!found) {
    return res.status(404).json({ ok: false, error: 'Không tìm thấy Job này.' });
  }

  return res.json({
    ok: true,
    job: mapDbJobToFrontend(found),
  });
});

// PATCH /api/jobs/:id - Cập nhật trạng thái Job (vd: hoàn thành có resultImage hoặc báo lỗi)
app.patch('/api/jobs/:id', async (req, res) => {
  const { id } = req.params;
  const { status, resultImage, originalImage, errorMessage } = req.body || {};
  const now = new Date().toISOString();

  let updatedJob = null;
  memoryStore.generationJobs = memoryStore.generationJobs.map((job) => {
    if (job.id === id) {
      updatedJob = {
        ...job,
        ...(status ? { status } : {}),
        ...(resultImage !== undefined ? { result_image: resultImage } : {}),
        ...(originalImage !== undefined ? { original_image: originalImage } : {}),
        ...(errorMessage !== undefined ? { error_message: errorMessage } : {}),
        updated_at: now,
      };
      return updatedJob;
    }
    return job;
  });

  const supabase = getSupabaseForRequest(req);
  if (supabase) {
    try {
      const updatePayload = {
        ...(status ? { status } : {}),
        ...(resultImage !== undefined ? { result_image: resultImage } : {}),
        ...(originalImage !== undefined ? { original_image: originalImage } : {}),
        ...(errorMessage !== undefined ? { error_message: errorMessage } : {}),
        updated_at: now,
      };
      await supabase.from('generation_jobs').update(updatePayload).eq('id', id);

      // Nếu job hoàn thành và có ảnh kết quả, tự động ghi nhận vào render_history
      if (status === 'completed' && (resultImage || updatedJob?.result_image)) {
        const histRecord = {
          id: `hist-${id}`,
          user_id: updatedJob?.user_id,
          tool: updatedJob?.tool || 'Render',
          prompt: updatedJob?.prompt,
          result_image: resultImage || updatedJob?.result_image,
          original_image: originalImage || updatedJob?.original_image || null,
          aspect_ratio: updatedJob?.aspect_ratio || '16:9',
          is_favorite: false,
          created_at: now,
        };
        await supabase.from('render_history').upsert(histRecord, { onConflict: 'id' }).catch(() => {});
        memoryStore.history.unshift(histRecord);
      }
    } catch {
      // Ignore
    }
  }

  return res.json({
    ok: true,
    job: updatedJob ? mapDbJobToFrontend(updatedJob) : null,
  });
});

// ============================================================================
// 7. LUỒNG BẢNG GIÁ & THANH TOÁN ĐƠN HÀNG (/api/plans & /api/payments/*)
// ============================================================================

const PRICING_PLANS = {
  starter: { id: 'starter', name: 'Gói Starter', price: 299000, credits: 500, planLabel: 'Starter' },
  pro: { id: 'pro', name: 'Gói Pro', price: 599000, credits: 1250, planLabel: 'Pro' },
  ultra: { id: 'ultra', name: 'Gói Ultra Studio', price: 1699000, credits: 4500, planLabel: 'Ultra' },
};

app.get('/api/plans', (req, res) => {
  res.json({
    ok: true,
    plans: Object.values(PRICING_PLANS),
  });
});

app.post('/api/payments/create', async (req, res) => {
  const authUser = await extractAuthUser(req);
  const { planId, userId } = req.body || {};
  const plan = PRICING_PLANS[planId] || PRICING_PLANS.pro;

  const orderId = `TX-${Math.floor(10000 + Math.random() * 90000)}`;
  const transferCode = `OPZEN${Math.floor(10000 + Math.random() * 90000)}`;

  const order = {
    id: orderId,
    user_id: authUser?.id || userId || null,
    plan_id: plan.id,
    plan_name: plan.name,
    amount: plan.price,
    amount_formatted: `${plan.price.toLocaleString('vi-VN')} đ`,
    credits: plan.credits,
    transfer_code: transferCode,
    status: 'pending',
    created_at: new Date().toISOString(),
  };

  memoryStore.payments.unshift(order);

  const supabase = getSupabaseForRequest(req);
  if (supabase) {
    try {
      await supabase.from('payments').insert(order);
    } catch {
      // Fallback to memoryStore
    }
  }

  return res.json({
    ok: true,
    order,
  });
});

app.post('/api/payments/confirm', async (req, res) => {
  const authUser = await extractAuthUser(req);
  const { orderId, planId, transferCode, userId } = req.body || {};
  const plan = PRICING_PLANS[planId] || PRICING_PLANS.pro;
  const targetUserId = authUser?.id || userId || 'user-opzen-01';

  // Cập nhật trạng thái đơn hàng
  const txId = orderId || `TX-${Math.floor(10000 + Math.random() * 90000)}`;
  const completedOrder = {
    id: txId,
    user_id: targetUserId,
    plan_id: plan.id,
    plan_name: plan.name,
    amount: plan.price,
    amount_formatted: `${plan.price.toLocaleString('vi-VN')} đ`,
    credits: plan.credits,
    transfer_code: transferCode || `OPZEN${Math.floor(10000 + Math.random() * 90000)}`,
    status: 'completed',
    created_at: new Date().toISOString(),
  };

  memoryStore.payments.unshift(completedOrder);

  // Cộng credits cho user
  const currentProfile = memoryStore.profiles.get(targetUserId) || {
    id: targetUserId,
    name: authUser?.user_metadata?.full_name || 'KTS An Bình',
    email: authUser?.email || 'khavyauflowteam@gmail.com',
    credits: 1250,
    plan: 'Pro',
    expiry_date: '15/12/2026',
  };

  const updatedProfile = {
    ...currentProfile,
    credits: (currentProfile.credits || 0) + plan.credits,
    plan: plan.planLabel,
    updated_at: new Date().toISOString(),
  };
  memoryStore.profiles.set(targetUserId, updatedProfile);

  const supabase = getSupabaseForRequest(req);
  if (supabase) {
    try {
      await supabase.from('payments').upsert(completedOrder, { onConflict: 'id' });
      await supabase
        .from('profiles')
        .upsert(updatedProfile, { onConflict: 'id' });
      await supabase.from('credit_logs').insert({
        user_id: targetUserId,
        action: `Kích hoạt ${plan.name} (+${plan.credits} cr)`,
        cost: plan.credits,
      });
    } catch {
      // Fallback gracefully
    }
  }

  return res.json({
    ok: true,
    message: `Đã xác nhận thanh toán ${plan.name} và cộng +${plan.credits} Credits!`,
    order: completedOrder,
    profile: updatedProfile,
  });
});

// ============================================================================
// 8. LUỒNG LIÊN HỆ & HỖ TRỢ DOANH NGHIỆP (/api/contact)
// ============================================================================

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, company, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({
      ok: false,
      error: 'Vui lòng điền đầy đủ Họ tên, Email và Nội dung tin nhắn.',
    });
  }

  const contactRecord = {
    id: `contact-${Date.now()}`,
    name,
    email,
    phone: phone || '',
    company: company || '',
    message,
    created_at: new Date().toISOString(),
  };

  memoryStore.contacts.unshift(contactRecord);

  const supabase = getSupabaseForRequest(req);
  if (supabase) {
    try {
      await supabase.from('contacts').insert(contactRecord);
    } catch {
      // Ignore if table not created
    }
  }

  return res.json({
    ok: true,
    message: 'Cảm ơn bạn đã liên hệ! Đội ngũ chuyên gia sẽ phản hồi trong vòng 2 giờ.',
    contact: contactRecord,
  });
});

// Nếu chạy trực tiếp `node api/index.js`, tự động lắng nghe trên cổng PORT (mặc định 3001)
const isDirectRun =
  process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  const PORT = Number(process.env.API_PORT || 3001);
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[API Server] Đang chạy tại http://0.0.0.0:${PORT}`);
  });
}

export default app;
