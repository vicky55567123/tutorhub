// Server-only helper for sending transactional emails (booking notifications
// to tutors and admins) via SMTP using nodemailer.
//
// Configuration (see .env.example): SMTP_HOST, SMTP_PORT, SMTP_SECURE,
// SMTP_USER, SMTP_PASSWORD, EMAIL_FROM. If any of SMTP_HOST/SMTP_USER/
// SMTP_PASSWORD are missing, sending is silently skipped (with a console
// warning) so booking creation never fails just because email isn't set up
// yet - this mirrors how Google Meet/Calendar degrade gracefully elsewhere
// in this app.
import nodemailer, { Transporter } from 'nodemailer'
import { getSupabaseAdmin } from './supabaseAdmin'

let _transporter: Transporter | null | undefined

function getTransporter(): Transporter | null {
  if (_transporter !== undefined) return _transporter

  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASSWORD

  if (!host || !user || !pass) {
    console.warn('Email notifications are not configured (SMTP_HOST/SMTP_USER/SMTP_PASSWORD missing) - skipping.')
    _transporter = null
    return null
  }

  _transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for port 465, false for 587/25 (STARTTLS)
    auth: { user, pass },
  })

  return _transporter
}

/** True if SMTP_HOST/SMTP_USER/SMTP_PASSWORD are all set, i.e. email
 *  notifications are expected to actually send (not just silently skip). */
export function isEmailConfigured(): boolean {
  return !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD)
}

interface SendEmailParams {
  to: string | string[]
  subject: string
  html: string
}

/** Sends an email, swallowing/logging any failure so callers never need to
 *  worry about email problems breaking the primary action (e.g. booking a
 *  session). Returns true if the email was (likely) sent. */
export async function sendEmail({ to, subject, html }: SendEmailParams): Promise<boolean> {
  const recipients = (Array.isArray(to) ? to : [to]).filter(Boolean)
  if (recipients.length === 0) return false

  const transporter = getTransporter()
  if (!transporter) return false

  const from = process.env.EMAIL_FROM || process.env.SMTP_USER || 'no-reply@ahmedtutors.com'

  try {
    await transporter.sendMail({ from, to: recipients.join(', '), subject, html })
    return true
  } catch (error) {
    console.error(`Failed to send email "${subject}" to ${recipients.join(', ')}:`, error)
    return false
  }
}

/** Looks up every admin's email address (profiles.user_type = 'admin'),
 *  plus any extra addresses configured in ADMIN_NOTIFICATION_EMAILS (comma
 *  separated), so booking notifications reach admins even before anyone's
 *  account has been promoted. */
export async function getAdminNotificationEmails(): Promise<string[]> {
  const emails = new Set<string>()

  const extra = process.env.ADMIN_NOTIFICATION_EMAILS
  if (extra) {
    extra
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean)
      .forEach((e) => emails.add(e))
  }

  const admin = getSupabaseAdmin()
  if (admin) {
    const { data } = await admin.from('profiles').select('email').eq('user_type', 'admin')
    ;(data || []).forEach((row) => {
      if (row.email) emails.add(row.email)
    })
  }

  return Array.from(emails)
}

function formatSessionDateTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

export interface BookingEmailDetails {
  studentName: string
  studentEmail: string
  tutorName: string
  tutorEmail: string
  subject?: string
  title: string
  startTime: string
  durationMinutes: number
  isTrial: boolean
  price: number
  meetingUrl?: string
  calendarLink?: string
  /** True when the Google Meet link could not be created automatically
   *  (not configured, expired auth, transient error) - the booking still
   *  went ahead, but someone needs to send a video link manually. */
  meetingPending?: boolean
}

/** Sends the "new session booked" notification to the tutor being booked. */
export async function sendTutorBookingEmail(details: BookingEmailDetails): Promise<void> {
  if (!details.tutorEmail) return

  const when = formatSessionDateTime(details.startTime)
  const priceLine = details.isTrial ? 'Free trial session (20 minutes)' : `£${details.price.toFixed(2)} - paid session`

  const html = `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
      <h2 style="color: #1d4ed8;">New session booked with you</h2>
      <p>Hi ${escapeHtml(details.tutorName)},</p>
      <p><strong>${escapeHtml(details.studentName)}</strong> (${escapeHtml(details.studentEmail)}) has booked a session with you.</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr><td style="padding: 6px 0; color: #6b7280;">Subject</td><td style="padding: 6px 0; font-weight: 600;">${escapeHtml(details.subject || details.title)}</td></tr>
        <tr><td style="padding: 6px 0; color: #6b7280;">When</td><td style="padding: 6px 0; font-weight: 600;">${when}</td></tr>
        <tr><td style="padding: 6px 0; color: #6b7280;">Duration</td><td style="padding: 6px 0; font-weight: 600;">${details.durationMinutes} minutes</td></tr>
        <tr><td style="padding: 6px 0; color: #6b7280;">Payment</td><td style="padding: 6px 0; font-weight: 600;">${priceLine}</td></tr>
      </table>
      ${details.meetingUrl ? `<p><a href="${details.meetingUrl}" style="background:#1d4ed8;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;display:inline-block;">Join Google Meet</a></p>` : ''}
      ${details.calendarLink ? `<p><a href="${details.calendarLink}">View in Google Calendar</a></p>` : ''}
      ${details.meetingPending ? `<p style="background:#fef3c7;color:#92400e;padding:10px 14px;border-radius:8px;">The video call link couldn't be generated automatically for this session - we'll send it to you separately.</p>` : ''}
      <p style="color:#6b7280;font-size:13px;">You can manage this session from your Ahmed Tutors dashboard.</p>
    </div>
  `

  await sendEmail({ to: details.tutorEmail, subject: `New session booked: ${details.subject || details.title}`, html })
}

/** Sends the "you're booked" confirmation to the student who made the booking. */
export async function sendStudentBookingEmail(details: BookingEmailDetails): Promise<void> {
  if (!details.studentEmail) return

  const when = formatSessionDateTime(details.startTime)
  const priceLine = details.isTrial ? 'Free trial session (20 minutes)' : `£${details.price.toFixed(2)} - paid session`

  const paymentNotice = details.isTrial
    ? ''
    : `<p style="background:#eff6ff;color:#1e40af;padding:10px 14px;border-radius:8px;">Your payment proof has been submitted and is awaiting review by our team. We'll email you again as soon as it's confirmed.</p>`

  const html = `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
      <h2 style="color: #1d4ed8;">Your session is booked!</h2>
      <p>Hi ${escapeHtml(details.studentName)},</p>
      <p>Your session with <strong>${escapeHtml(details.tutorName)}</strong> has been booked.</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr><td style="padding: 6px 0; color: #6b7280;">Subject</td><td style="padding: 6px 0; font-weight: 600;">${escapeHtml(details.subject || details.title)}</td></tr>
        <tr><td style="padding: 6px 0; color: #6b7280;">When</td><td style="padding: 6px 0; font-weight: 600;">${when}</td></tr>
        <tr><td style="padding: 6px 0; color: #6b7280;">Duration</td><td style="padding: 6px 0; font-weight: 600;">${details.durationMinutes} minutes</td></tr>
        <tr><td style="padding: 6px 0; color: #6b7280;">Payment</td><td style="padding: 6px 0; font-weight: 600;">${priceLine}</td></tr>
      </table>
      ${details.meetingUrl ? `<p><a href="${details.meetingUrl}" style="background:#1d4ed8;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;display:inline-block;">Join Google Meet</a></p>` : ''}
      ${details.calendarLink ? `<p><a href="${details.calendarLink}">View in Google Calendar</a></p>` : ''}
      ${details.meetingPending ? `<p style="background:#fef3c7;color:#92400e;padding:10px 14px;border-radius:8px;">We're finalising your video call link and will email it to you separately.</p>` : ''}
      ${paymentNotice}
      <p style="color:#6b7280;font-size:13px;">You can manage this session from your Ahmed Tutors dashboard.</p>
    </div>
  `

  await sendEmail({ to: details.studentEmail, subject: `Session booked with ${details.tutorName}`, html })
}

/** Sends a "payment confirmed" email to the student (and a heads-up to the
 *  tutor) once an admin has verified the bank-transfer proof in the Admin
 *  Dashboard. Returns true if at least one of the two emails actually sent
 *  (e.g. SMTP is configured and reachable) so the caller can warn the admin
 *  if not. */
export async function sendPaymentConfirmedEmail(details: BookingEmailDetails): Promise<boolean> {
  const when = formatSessionDateTime(details.startTime)

  const studentHtml = `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
      <h2 style="color: #059669;">Payment confirmed - your session is all set!</h2>
      <p>Hi ${escapeHtml(details.studentName)},</p>
      <p>We've confirmed your payment of <strong>£${details.price.toFixed(2)}</strong> for your session with <strong>${escapeHtml(details.tutorName)}</strong>.</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr><td style="padding: 6px 0; color: #6b7280;">Subject</td><td style="padding: 6px 0; font-weight: 600;">${escapeHtml(details.subject || details.title)}</td></tr>
        <tr><td style="padding: 6px 0; color: #6b7280;">When</td><td style="padding: 6px 0; font-weight: 600;">${when}</td></tr>
        <tr><td style="padding: 6px 0; color: #6b7280;">Duration</td><td style="padding: 6px 0; font-weight: 600;">${details.durationMinutes} minutes</td></tr>
      </table>
      ${details.meetingUrl ? `<p><a href="${details.meetingUrl}" style="background:#1d4ed8;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;display:inline-block;">Join Google Meet</a></p>` : ''}
      ${details.calendarLink ? `<p><a href="${details.calendarLink}">View in Google Calendar</a></p>` : ''}
      ${details.meetingPending ? `<p style="background:#fef3c7;color:#92400e;padding:10px 14px;border-radius:8px;">We're still finalising your video call link and will email it to you separately before the session.</p>` : ''}
      <p style="color:#6b7280;font-size:13px;">You can manage this session from your Ahmed Tutors dashboard.</p>
    </div>
  `

  const tutorHtml = `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
      <h2 style="color: #059669;">Payment confirmed for an upcoming session</h2>
      <p>Hi ${escapeHtml(details.tutorName)},</p>
      <p>${escapeHtml(details.studentName)}'s payment for your session on <strong>${when}</strong> has been confirmed by our team - it's ready to go.</p>
      ${details.meetingUrl ? `<p><a href="${details.meetingUrl}" style="background:#1d4ed8;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;display:inline-block;">Join Google Meet</a></p>` : ''}
    </div>
  `

  const results = await Promise.all([
    details.studentEmail
      ? sendEmail({ to: details.studentEmail, subject: `Payment confirmed: your session with ${details.tutorName}`, html: studentHtml })
      : Promise.resolve(false),
    details.tutorEmail
      ? sendEmail({ to: details.tutorEmail, subject: `Payment confirmed: session with ${details.studentName}`, html: tutorHtml })
      : Promise.resolve(false),
  ])
  return results.some(Boolean)
}

/** Sends a "we couldn't verify your payment" email to the student when an
 *  admin rejects the submitted bank-transfer proof. Returns true if the
 *  email actually sent. */
export async function sendPaymentRejectedEmail(details: BookingEmailDetails): Promise<boolean> {
  if (!details.studentEmail) return false
  const when = formatSessionDateTime(details.startTime)

  const html = `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
      <h2 style="color: #dc2626;">We couldn't verify your payment</h2>
      <p>Hi ${escapeHtml(details.studentName)},</p>
      <p>Unfortunately we couldn't verify the payment proof you submitted for your session with <strong>${escapeHtml(details.tutorName)}</strong> on <strong>${when}</strong>.</p>
      <p>Please reply to this email, or contact support, with a clearer screenshot/reference so we can take another look - or book again with a new payment.</p>
    </div>
  `

  return sendEmail({ to: details.studentEmail, subject: `Action needed: payment issue with your session`, html })
}

/** Sends the "new session booked" notification to every admin. */
export async function sendAdminBookingEmail(details: BookingEmailDetails): Promise<void> {
  const admins = await getAdminNotificationEmails()
  if (admins.length === 0) return

  const when = formatSessionDateTime(details.startTime)
  const priceLine = details.isTrial ? 'Free trial (£0)' : `£${details.price.toFixed(2)} (paid)`

  const html = `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
      <h2 style="color: #1d4ed8;">New session booked on the platform</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr><td style="padding: 6px 0; color: #6b7280;">Student</td><td style="padding: 6px 0; font-weight: 600;">${escapeHtml(details.studentName)} (${escapeHtml(details.studentEmail)})</td></tr>
        <tr><td style="padding: 6px 0; color: #6b7280;">Tutor</td><td style="padding: 6px 0; font-weight: 600;">${escapeHtml(details.tutorName)} (${escapeHtml(details.tutorEmail)})</td></tr>
        <tr><td style="padding: 6px 0; color: #6b7280;">Subject</td><td style="padding: 6px 0; font-weight: 600;">${escapeHtml(details.subject || details.title)}</td></tr>
        <tr><td style="padding: 6px 0; color: #6b7280;">When</td><td style="padding: 6px 0; font-weight: 600;">${when}</td></tr>
        <tr><td style="padding: 6px 0; color: #6b7280;">Duration</td><td style="padding: 6px 0; font-weight: 600;">${details.durationMinutes} minutes</td></tr>
        <tr><td style="padding: 6px 0; color: #6b7280;">Payment</td><td style="padding: 6px 0; font-weight: 600;">${priceLine}</td></tr>
      </table>
      ${details.meetingPending ? `<p style="background:#fef3c7;color:#92400e;padding:10px 14px;border-radius:8px;"><strong>Action needed:</strong> the Google Meet link could not be created automatically for this session (check the Google connection at /api/auth/google/authorize, or send a meeting link manually).</p>` : ''}
      <p style="color:#6b7280;font-size:13px;">View full details, and (for paid sessions) review the payment proof, in the Admin Dashboard.</p>
    </div>
  `

  await sendEmail({ to: admins, subject: `New booking: ${details.studentName} → ${details.tutorName}`, html })
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
