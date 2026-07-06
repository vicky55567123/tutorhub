# Backend Setup Guide - Real Accounts, Availability & Google Meet Booking

This document explains how to turn on the real backend that was added for:

1. Persistent **student** and **tutor** accounts (sign up / login)
2. Tutors setting their **weekly availability**
3. Students **booking a session** with a tutor (with double-booking prevention)
4. Automatic **Google Meet** creation for every confirmed booking

Everything is built on [Supabase](https://supabase.com) (a hosted Postgres +
Auth + instant REST API) so you don't need to run your own database server.

---

## 1. Create a Supabase project

1. Go to https://supabase.com and create a free project.
2. Open **Project Settings -> API** and copy:
   - `Project URL`
   - `anon public` key
   - `service_role` key (keep this secret!)
3. Open the **SQL Editor** in Supabase, paste the entire contents of
   [database/schema.sql](database/schema.sql) and run it. This creates:
   - `profiles` - one row per user (student, tutor or admin), auto-created
     whenever someone signs up via Supabase Auth
   - `tutor_availability` - weekly recurring slots (or one-off dates) that a
     tutor is free to teach
   - `bookings` - a confirmed session between a student and a tutor, with the
     Google Meet link attached, plus payment fields (`is_trial`, `price`,
     `payment_status`)
   - Row Level Security policies so users can only see/edit their own data
   - A `get_tutor_busy_slots()` function so students can see which times are
     taken without exposing other students' private booking details

   If your project already existed before payments/trials were added, instead
   run [database/booking_payments_and_trial.sql](database/booking_payments_and_trial.sql)
   to add the 3 new columns to your existing `bookings` table (safe, additive
   migration - `schema.sql` already includes them for fresh installs).

## 2. Configure environment variables

Copy [.env.example](.env.example) to `.env.local` and fill in:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

Once these three are set, the app automatically switches from the old
localStorage demo database to real, persisted Supabase accounts - no code
changes needed (see `isSupabaseConfigured` in [src/lib/supabase.ts](src/lib/supabase.ts)).

## 3. Enable email/password sign-in in Supabase

Supabase Auth has email/password enabled by default. For local development,
it's easiest to turn OFF "Confirm email" so accounts are usable immediately:

**Authentication -> Providers -> Email -> disable "Confirm email"**
(re-enable this in production and configure a custom SMTP sender).

## 4. (Optional) Enable Google sign-in via Supabase

If you want students/tutors to sign in with Google directly through Supabase
(recommended, replaces the old NextAuth Google popup once configured):

1. **Authentication -> Providers -> Google** in Supabase, toggle it on.
2. Create OAuth credentials in Google Cloud Console and paste the Client ID /
   Secret into Supabase.
3. Add the Supabase-provided redirect URL to your Google OAuth app's
   "Authorized redirect URIs".

If you skip this step, the app automatically falls back to the existing
NextAuth Google/Facebook/GitHub login (see `AuthContext.tsx`), but those users
won't have a `profiles` row and therefore can't book sessions or set
availability until Supabase auth is configured.

## 5. Configure the Google Meet "booking calendar" account

All Google Meet links are created on a single Google account (this is much
simpler than asking every tutor to connect their own calendar). This part was
already scaffolded in the project:

1. Set `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` in `.env.local` (see
   [GOOGLE_MEET_SETUP.md](GOOGLE_MEET_SETUP.md) / [GOOGLE_CALENDAR_API_SETUP.md](GOOGLE_CALENDAR_API_SETUP.md)
   for full Google Cloud Console instructions).
2. Start the app and visit `/api/auth/google/authorize` once, logged in as an
   admin, to grant Calendar access and generate a refresh token.
3. Copy the resulting `GOOGLE_REFRESH_TOKEN` into `.env.local`.

Once this is done, every booking created through `/api/bookings` will:
- create a Google Calendar event with a Google Meet link,
- email both the student and tutor an invite,
- store the `google_event_id`, `meeting_url` and `calendar_link` on the
  booking row.

## 6. How the pieces fit together

| Feature | Where |
|---|---|
| Sign up / log in | [src/components/AuthContext.tsx](src/components/AuthContext.tsx), [src/components/SignupModal.tsx](src/components/SignupModal.tsx), [src/components/LoginModal.tsx](src/components/LoginModal.tsx) |
| Tutor directory | `GET` [src/app/api/tutors/route.ts](src/app/api/tutors/route.ts) |
| Tutor sets availability | [src/app/tutor/availability/page.tsx](src/app/tutor/availability/page.tsx) -> [src/app/api/availability/route.ts](src/app/api/availability/route.ts) |
| Student books a session | [src/app/book-session/page.tsx](src/app/book-session/page.tsx) -> [src/app/api/bookings/route.ts](src/app/api/bookings/route.ts) |
| Google Meet creation | [src/lib/googleMeet.ts](src/lib/googleMeet.ts) |
| Dashboard upcoming sessions | [src/app/dashboard/page.tsx](src/app/dashboard/page.tsx) |

## 7. Booking flow in detail

1. Student opens **Book a Session**, picks a tutor.
2. The page loads that tutor's weekly availability plus their already-booked
   time ranges (via the `get_tutor_busy_slots` RPC) and computes free slots
   for the next 14 days.
3. Student picks a slot and confirms. The client calls
   `POST /api/bookings` with their Supabase access token in the
   `Authorization: Bearer` header.
4. The API route:
   - re-checks the tutor has no overlapping booking (defense in depth),
   - creates the Google Calendar event + Meet link,
   - inserts the `bookings` row (a Postgres trigger also rejects overlapping
     bookings at the database level, so double-booking is impossible even
     under concurrent requests),
   - rolls back (deletes) the Google Calendar event if the insert fails.
5. Both dashboards (student & tutor) show the session under **Upcoming
   Sessions** with a **Join Meeting** button and a **Cancel** button.

## 8. Tutor sign-up

Tutors sign up exactly like students, just choosing "Tutor" in the sign-up
modal. New tutor profiles start with `is_approved = false` - flip this to
`true` (e.g. via the Supabase Table Editor) for tutors you've vetted, or wire
up an admin approval screen later. `hourly_rate`, `subjects`, `bio` etc. can
be filled in via `profiles` for now (a dedicated tutor-profile-editing UI can
be added next).

## 9. Timezones

Every profile has a `timezone` column (defaults to `Europe/London`, i.e. UK
time). Tutors pick their own timezone on the **My Availability** page - all
the weekly time windows they set are interpreted in that zone. Students pick
which timezone they want to *view* times in on the **Book a Session** page
(also defaults to UK time); each bookable slot shows the time in the
student's chosen zone with the tutor's local time alongside it, so there's
never any ambiguity about which time zone a session is happening in.

## 10. Admin Dashboard

Visit `/admin` (also appears in the sidebar as "Admin Dashboard") to see:
- Total registered tutors / students, total sessions, upcoming sessions,
  **total revenue** (sum of all paid sessions), and how many free trials have
  been used
- A table of every student with their phone, number of booked sessions,
  total hours, **total amount paid**, subjects studied, and join date - click
  their name to expand the full list of their sessions with the **exact
  date and time**, tutor, subject, duration, status, price and payment status
- A table of every tutor with their phone, hourly rate, approval status,
  number of sessions, total hours taught, **total amount earned**, an
  hours-and-revenue-per-subject breakdown, and (click their name to expand)
  bio / years of experience / qualifications / join date **and** the same
  detailed session-by-session list (exact date/time, student, subject,
  price, payment status)

**Adding a tutor or student as an admin:** click "Add Student" or "Add Tutor"
at the top of `/admin`. Fill in their name, email, a temporary password, and
(for tutors) subjects/rate/bio/experience, then submit. This calls
`POST /api/admin/users`, which creates a real Supabase Auth account
(pre-confirmed, no email verification needed) and fills in their profile -
they can log in immediately with the email/password you set. Give them their
temporary password so they can log in and change it from Settings.

**Editing an existing student/tutor's details:** click "Edit" on their row to
update phone, subjects, and (for tutors) hourly rate/bio/years of experience.
This calls `PATCH /api/admin/users`. Email can't be changed from this form.

**To make a user an admin:** open the Supabase dashboard -> **SQL Editor** ->
New query, and run (replace the email with the account you want to promote):

```sql
update public.profiles
set user_type = 'admin'
where email = 'you@example.com';
```

Then log out and back in on the site - the "Admin Dashboard" link appears in
the sidebar immediately. (A ready-to-copy version of this lives in
`database/make_admin.sql`.) There's no sign-up option for admin - it must be
set manually for security. Both admin APIs (`/api/admin/stats`,
`/api/admin/users`) check this field server-side using the service role key,
so only genuine admins can see or modify everyone's data.

## 11. Payments &amp; the Free Trial

Students can no longer book a **paid** session without paying first. The
rules, enforced server-side in [src/app/api/bookings/route.ts](src/app/api/bookings/route.ts)
(so they can't be bypassed from the browser):

- **Paid session**: price = the tutor's `hourly_rate` × session length. The
  student sees the price on **Book a Session**, clicks "Pay & Book", and a
  demo checkout modal ([src/components/SessionPaymentModal.tsx](src/components/SessionPaymentModal.tsx))
  collects card details (client-side format validation only - no real card
  processor is wired up yet; Stripe integration is still on the roadmap).
  Once "paid", the booking API is called again with `paymentConfirmed: true`
  and the booking is created with `payment_status = 'paid'` and the
  calculated `price`. If a tutor hasn't set an `hourly_rate` yet, paid
  booking is disabled for them until an admin or the tutor sets one.
- **Free trial**: fixed at **20 minutes**, `price = 0`,
  `payment_status = 'free'`, `is_trial = true`. A student can only ever book
  **one** trial - the API checks by the student's **account email** (via the
  service-role client, across all their bookings, not just what RLS would
  normally let them see) and rejects a second trial attempt with a 409 error
  telling them to book a paid session instead.
- Both the price and payment status are visible to admins for every session
  in the Admin Dashboard (see section 10), including total revenue collected
  and how many free trials have been used platform-wide.

If you already have a `bookings` table from before this feature, run
[database/booking_payments_and_trial.sql](database/booking_payments_and_trial.sql)
in the Supabase SQL Editor to add the missing columns.

---

### Troubleshooting

- **"Backend not configured" message** - `NEXT_PUBLIC_SUPABASE_URL` /
  `NEXT_PUBLIC_SUPABASE_ANON_KEY` are missing from `.env.local` (restart `npm
  run dev` after adding them).
- **Booking fails with a Google error** - visit `/api/auth/google/authorize`
  again to refresh `GOOGLE_REFRESH_TOKEN`.
- **New tutor doesn't show up in Book a Session** - the tutors list only
  returns rows where `user_type = 'tutor'`; check the `profiles` table in
  Supabase.
- **"Admins only" on /admin** - your account's `user_type` in the `profiles`
  table isn't set to `admin` yet (see section 10 above).
- **"Payment is required before this session can be booked"** - the student
  tried to book a paid session without completing the checkout step; this is
  expected and enforced server-side in `/api/bookings` (see section 11).
- **Paid session button is disabled / tutor has no rate** - set an
  `hourly_rate` on that tutor's profile (Edit Profile, or via the Admin
  Dashboard "Edit" button) before students can book a paid session with them.

