-- ============================================================================
-- Promote a user to admin
-- ============================================================================
-- Run this in the Supabase dashboard -> SQL Editor -> New query.
-- The user must already have an account (sign up as student/tutor first, or
-- create them from the Admin Dashboard's "Add Student"/"Add Tutor" button).
--
-- 1. Replace the email below with the account you want to promote.
-- 2. Run this query.
-- 3. Log out and back in on the site - the "Admin Dashboard" link will
--    appear in the sidebar and /admin will show the full dashboard.
-- ============================================================================

update public.profiles
set user_type = 'admin'
where email = 'waqarahmedmwa@gmail.com';

-- Optional: verify it worked
select id, email, full_name, user_type
from public.profiles
where email = 'waqarahmedmwa@gmail.com';
