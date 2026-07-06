-- ============================================================================
-- Session payments + free trial support
-- ============================================================================
-- Run this in the Supabase SQL Editor (safe to re-run).
--
-- Adds:
--   - bookings.is_trial       - true for a student's one-time free 20-minute
--                                trial lesson
--   - bookings.price          - amount charged for the session (0 for trials)
--   - bookings.payment_status - 'unpaid' | 'paid' | 'free'
--
-- Business rules enforced by the app (src/app/api/bookings/route.ts):
--   1. A student can only book a PAID session after payment is confirmed
--      (payment_status is set to 'paid' with a price calculated from the
--      tutor's hourly_rate at booking time).
--   2. A student may book ONE free trial session (fixed at 20 minutes,
--      price = 0, payment_status = 'free'). The server checks - by the
--      student's account email - whether they've already used a trial
--      before allowing another one, using the service-role client so the
--      check covers every account, not just the caller's own bookings.
-- ============================================================================

alter table public.bookings
  add column if not exists is_trial boolean not null default false,
  add column if not exists price numeric(10, 2) not null default 0,
  add column if not exists payment_status text not null default 'unpaid'
    check (payment_status in ('unpaid', 'paid', 'free'));

create index if not exists idx_bookings_trial on public.bookings (is_trial);
create index if not exists idx_bookings_payment_status on public.bookings (payment_status);
