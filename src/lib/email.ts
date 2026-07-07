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
      <p style="color:#6b7280;font-size:13px;">You can manage this session from your Ahmed Tutors dashboard.</p>
    </div>
  `

  await sendEmail({ to: details.tutorEmail, subject: `New session booked: ${details.subject || details.title}`, html })
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
