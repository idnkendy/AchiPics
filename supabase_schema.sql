-- =========================================================================
-- ARCHIPICS AI - SUPABASE DATABASE SCHEMA (CẬP NHẬT MỚI NHẤT)
-- Hướng dẫn: Copy toàn bộ nội dung file này -> Dán vào Supabase SQL Editor -> Nhấn RUN
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

-- Hỗ trợ thêm cột phone nếu bảng đã tồn tại từ trước
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

-- Nếu bảng render_history đã có cột style hoặc cost từ phiên bản trước thì tự động xóa
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

-- 4. BẢNG PAYMENTS: Lưu đơn hàng VietQR, lịch sử nạp Credits & nâng cấp gói
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

-- 5. BẢNG CREDIT_LOGS: Lưu biến động số dư Credits (trừ khi Render / cộng khi nạp)
create table if not exists public.credit_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  action text not null,
  cost integer not null,
  created_at timestamptz default now()
);

-- 6. BẢNG CONTACTS: Lưu yêu cầu tư vấn gói Studio / Enterprise từ trang Liên hệ
create table if not exists public.contacts (
  id text primary key,
  name text not null,
  email text not null,
  phone text,
  company text,
  message text not null,
  created_at timestamptz default now()
);

-- =========================================================================
-- 7. BẬT BẢO MẬT ROW LEVEL SECURITY (RLS) CHO CÁC BẢNG
-- =========================================================================
alter table public.profiles enable row level security;
alter table public.render_history enable row level security;
alter table public.generation_jobs enable row level security;
alter table public.payments enable row level security;
alter table public.credit_logs enable row level security;
alter table public.contacts enable row level security;

-- =========================================================================
-- 8. THIẾT LẬP POLICIES (HỖ TRỢ CHẠY LẠI NHIỀU LẦN KHÔNG LỖI)
-- =========================================================================

-- Policies cho bảng profiles
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Policies cho bảng render_history
drop policy if exists "Users can manage own history" on public.render_history;
create policy "Users can manage own history"
  on public.render_history for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Policies cho bảng generation_jobs
drop policy if exists "Users can manage own generation jobs" on public.generation_jobs;
create policy "Users can manage own generation jobs"
  on public.generation_jobs for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Policies cho bảng payments
drop policy if exists "Users can manage own payments" on public.payments;
create policy "Users can manage own payments"
  on public.payments for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Policies cho bảng credit_logs
drop policy if exists "Users can manage own credit logs" on public.credit_logs;
create policy "Users can manage own credit logs"
  on public.credit_logs for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Policies cho bảng contacts (cho phép gửi form liên hệ công khai)
drop policy if exists "Anyone can submit contact" on public.contacts;
create policy "Anyone can submit contact"
  on public.contacts for insert
  with check (true);

drop policy if exists "Authenticated users can view contacts" on public.contacts;
create policy "Authenticated users can view contacts"
  on public.contacts for select
  using (auth.role() = 'authenticated');

-- =========================================================================
-- 9. TRIGGER TỰ ĐỘNG TẠO HỒ SƠ & TẶNG 60 CREDITS + GÓI FREE CHO TÀI KHOẢN MỚI
-- =========================================================================
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
