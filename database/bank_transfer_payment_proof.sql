-- ============================================================================
-- Bank-transfer payment proof support
-- ============================================================================
-- Run this in the Supabase SQL Editor (safe to re-run).
--
-- Payments on this platform are manual bank transfers, not a card processor:
--   1. The student sees fixed bank details (account name/number/sort code)
--      and transfers the amount themselves.
--   2. The student then submits a payment reference and a screenshot of the
--      transfer as proof (stored inline as a base64 data URL - no separate
--      file storage bucket needed).
--   3. The booking is created immediately with payment_status = 'pending'
--      so the lesson can be scheduled, but an admin must review the proof
--      in the Admin Dashboard and mark it 'paid' (confirmed) or 'rejected'
--      (proof was invalid/missing) afterwards.
--
-- Adds:
--   - bookings.payment_reference    - free-text reference the student typed
--                                      (their name + optional transaction id)
--   - bookings.payment_proof        - base64 data URL of the screenshot
--   - bookings.payment_submitted_at - when the proof was submitted
--   - widens the payment_status check constraint to also allow
--     'pending' (awaiting review) and 'rejected' (admin rejected the proof)
-- ============================================================================

alter table public.bookings
  add column if not exists payment_reference text,
  add column if not exists payment_proof text,
  add column if not exists payment_submitted_at timestamptz;

alter table public.bookings
  drop constraint if exists bookings_payment_status_check;

alter table public.bookings
  add constraint bookings_payment_status_check
  check (payment_status in ('unpaid', 'pending', 'paid', 'free', 'rejected'));

create index if not exists idx_bookings_payment_submitted_at on public.bookings (payment_submitted_at);
