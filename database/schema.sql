-- ============================================================================
-- TutorHub / Ahmed Tutors - Core Backend Schema (Supabase / PostgreSQL)
-- ============================================================================
-- Run this entire file in the Supabase SQL editor (Project -> SQL Editor -> New query)
-- It is safe to re-run (uses IF NOT EXISTS / CREATE OR REPLACE everywhere).
--
-- This schema powers:
--   1. Student & Tutor accounts (on top of Supabase Auth's auth.users table)
--   2. Tutor weekly availability
--   3. Session bookings (student books a slot with a tutor)
--   4. Google Meet metadata for each booked session
-- ============================================================================

-- Needed for gen_random_uuid()
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. PROFILES  (one row per Supabase Auth user; students AND tutors)
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text not null default '',
  user_type text not null default 'student' check (user_type in ('student', 'tutor', 'admin')),
  avatar_url text,
  phone text,
  timezone text default 'Europe/London',

  -- Tutor-only fields (nullable for students)
  subjects text[] default '{}',
  bio text,
  hourly_rate numeric(10, 2),
  years_experience integer,
  qualifications text[] default '{}',
  is_approved boolean default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_profiles_user_type on public.profiles (user_type);

-- Keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Automatically create a profile row whenever a new auth user is created
-- (covers email/password sign up AND OAuth sign in, e.g. Google)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, user_type, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'user_type', 'student'),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_on_auth_user_created on auth.users;
create trigger trg_on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ----------------------------------------------------------------------------
-- 2. TUTOR AVAILABILITY (recurring weekly slots + one-off overrides)
-- ----------------------------------------------------------------------------
create table if not exists public.tutor_availability (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references public.profiles(id) on delete cascade,

  -- Recurring weekly slot (0 = Sunday ... 6 = Saturday). NULL when specific_date is used.
  day_of_week smallint check (day_of_week between 0 and 6),
  -- One-off availability / override for a specific calendar date. NULL when recurring.
  specific_date date,

  start_time time not null,
  end_time time not null,
  is_recurring boolean not null default true,

  created_at timestamptz not null default now(),

  constraint chk_time_order check (start_time < end_time),
  constraint chk_recurring_or_date check (
    (is_recurring = true and day_of_week is not null and specific_date is null) or
    (is_recurring = false and specific_date is not null and day_of_week is null)
  )
);

create index if not exists idx_availability_tutor on public.tutor_availability (tutor_id);
create index if not exists idx_availability_day on public.tutor_availability (day_of_week);

-- ----------------------------------------------------------------------------
-- 3. BOOKINGS (a student books a session with a tutor)
-- ----------------------------------------------------------------------------
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  tutor_id uuid not null references public.profiles(id) on delete cascade,

  title text not null,
  subject text,
  description text,

  start_time timestamptz not null,
  end_time timestamptz not null,
  duration_minutes integer not null default 60,

  status text not null default 'scheduled'
    check (status in ('scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled')),

  -- Google Meet / Calendar metadata
  google_event_id text unique,
  meeting_url text,
  calendar_link text,

  cancelled_by uuid references public.profiles(id),
  cancellation_reason text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_bookings_student on public.bookings (student_id);
create index if not exists idx_bookings_tutor on public.bookings (tutor_id);
create index if not exists idx_bookings_start on public.bookings (start_time);
create index if not exists idx_bookings_status on public.bookings (status);

drop trigger if exists trg_bookings_updated_at on public.bookings;
create trigger trg_bookings_updated_at
  before update on public.bookings
  for each row execute function public.set_updated_at();

-- Prevent double-booking the same tutor for overlapping times (active bookings only)
create or replace function public.check_tutor_overlap()
returns trigger as $$
begin
  if new.status in ('scheduled', 'confirmed', 'in-progress') then
    if exists (
      select 1 from public.bookings b
      where b.tutor_id = new.tutor_id
        and b.id <> coalesce(new.id, gen_random_uuid())
        and b.status in ('scheduled', 'confirmed', 'in-progress')
        and tstzrange(b.start_time, b.end_time) && tstzrange(new.start_time, new.end_time)
    ) then
      raise exception 'This tutor already has a booking that overlaps with the requested time.';
    end if;
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_check_tutor_overlap on public.bookings;
create trigger trg_check_tutor_overlap
  before insert or update on public.bookings
  for each row execute function public.check_tutor_overlap();

-- ----------------------------------------------------------------------------
-- 3b. PUBLIC "busy slots" lookup (so students can see a tutor is taken
--     without exposing booking details / other students' info)
-- ----------------------------------------------------------------------------
create or replace function public.get_tutor_busy_slots(
  p_tutor_id uuid,
  p_from timestamptz,
  p_to timestamptz
)
returns table (start_time timestamptz, end_time timestamptz)
language sql
security definer
set search_path = public
stable
as $$
  select b.start_time, b.end_time
  from public.bookings b
  where b.tutor_id = p_tutor_id
    and b.status in ('scheduled', 'confirmed', 'in-progress')
    and b.start_time < p_to
    and b.end_time > p_from
  order by b.start_time;
$$;

grant execute on function public.get_tutor_busy_slots(uuid, timestamptz, timestamptz) to anon, authenticated;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
alter table public.profiles enable row level security;
alter table public.tutor_availability enable row level security;
alter table public.bookings enable row level security;

-- Profiles: anyone (incl. anon) can view public tutor info; owners can update their own row
drop policy if exists "Profiles are publicly readable" on public.profiles;
create policy "Profiles are publicly readable"
  on public.profiles for select
  using (true);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Availability: publicly readable (students need to see open slots); only the tutor can manage their own
drop policy if exists "Availability is publicly readable" on public.tutor_availability;
create policy "Availability is publicly readable"
  on public.tutor_availability for select
  using (true);

drop policy if exists "Tutors manage their own availability" on public.tutor_availability;
create policy "Tutors manage their own availability"
  on public.tutor_availability for all
  using (auth.uid() = tutor_id)
  with check (auth.uid() = tutor_id);

-- Bookings: only the involved student or tutor can see / modify the booking
drop policy if exists "Participants can view their bookings" on public.bookings;
create policy "Participants can view their bookings"
  on public.bookings for select
  using (auth.uid() = student_id or auth.uid() = tutor_id);

drop policy if exists "Students can create bookings" on public.bookings;
create policy "Students can create bookings"
  on public.bookings for insert
  with check (auth.uid() = student_id);

drop policy if exists "Participants can update their bookings" on public.bookings;
create policy "Participants can update their bookings"
  on public.bookings for update
  using (auth.uid() = student_id or auth.uid() = tutor_id);

-- ============================================================================
-- Done. Next steps:
--   1. Copy your Project URL + anon key + service_role key into .env.local
--      (see .env.example).
--   2. Existing users created before this migration will not have a profile row
--      until they log in again - or run a manual backfill insert if needed.
-- ============================================================================
