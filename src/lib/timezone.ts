/**
 * Timezone helpers used across the booking flow.
 *
 * Tutors set their weekly availability as wall-clock times (e.g. "16:00 -
 * 19:00"). Those times are meaningless without knowing WHICH timezone they're
 * in, so every profile has a `timezone` field (defaults to Europe/London -
 * i.e. UK time). Students booking a session can view/pick their own timezone
 * so they always see the accurate local time for their region, while the
 * tutor's local time is shown alongside it for clarity.
 */
import { fromZonedTime, formatInTimeZone } from 'date-fns-tz'

export const DEFAULT_TIMEZONE = 'Europe/London'

/** A short, curated list covering the UK (default) plus common regions our students/tutors are in. */
export const COMMON_TIMEZONES: { value: string; label: string }[] = [
  { value: 'Europe/London', label: '🇬🇧 United Kingdom (London)' },
  { value: 'Europe/Dublin', label: '🇮🇪 Ireland (Dublin)' },
  { value: 'Asia/Karachi', label: '🇵🇰 Pakistan (Karachi)' },
  { value: 'Asia/Kolkata', label: '🇮🇳 India (Kolkata)' },
  { value: 'Asia/Dhaka', label: '🇧🇩 Bangladesh (Dhaka)' },
  { value: 'Asia/Dubai', label: '🇦🇪 UAE (Dubai)' },
  { value: 'Asia/Riyadh', label: '🇸🇦 Saudi Arabia (Riyadh)' },
  { value: 'Asia/Qatar', label: '🇶🇦 Qatar (Doha)' },
  { value: 'Europe/Paris', label: '🇫🇷 France / Central Europe (Paris)' },
  { value: 'Europe/Berlin', label: '🇩🇪 Germany (Berlin)' },
  { value: 'America/New_York', label: '🇺🇸 USA Eastern (New York)' },
  { value: 'America/Chicago', label: '🇺🇸 USA Central (Chicago)' },
  { value: 'America/Denver', label: '🇺🇸 USA Mountain (Denver)' },
  { value: 'America/Los_Angeles', label: '🇺🇸 USA Pacific (Los Angeles)' },
  { value: 'America/Toronto', label: '🇨🇦 Canada (Toronto)' },
  { value: 'Australia/Sydney', label: '🇦🇺 Australia (Sydney)' },
  { value: 'Asia/Singapore', label: '🇸🇬 Singapore' },
  { value: 'Asia/Shanghai', label: '🇨🇳 China (Shanghai)' },
  { value: 'Asia/Tokyo', label: '🇯🇵 Japan (Tokyo)' },
  { value: 'Africa/Cairo', label: '🇪🇬 Egypt (Cairo)' },
  { value: 'Africa/Johannesburg', label: '🇿🇦 South Africa (Johannesburg)' },
  { value: 'Pacific/Auckland', label: '🇳🇿 New Zealand (Auckland)' },
]

/** Detects the visitor's browser/OS timezone, falling back to UK time. */
export function getBrowserTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || DEFAULT_TIMEZONE
  } catch {
    return DEFAULT_TIMEZONE
  }
}

/** Human-friendly short label for a timezone, e.g. "GMT+1" or "PKT". */
export function timeZoneAbbreviation(timeZone: string, date: Date = new Date()): string {
  try {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'short' }).formatToParts(date)
    return parts.find((p) => p.type === 'timeZoneName')?.value || timeZone
  } catch {
    return timeZone
  }
}

/** Nicer display name, e.g. "Europe/London" -> "London". Falls back to the raw id. */
export function timeZoneLabel(timeZone: string): string {
  const match = COMMON_TIMEZONES.find((t) => t.value === timeZone)
  if (match) return match.label.replace(/^\S+\s/, '') // strip the flag emoji
  const parts = timeZone.split('/')
  return parts[parts.length - 1]?.replace(/_/g, ' ') || timeZone
}

/**
 * Builds the real UTC instant for a wall-clock date + time-of-day that's
 * understood to be in `timeZone`. E.g. "2026-07-10" + "16:00" in
 * "Europe/London" -> the correct UTC Date, accounting for BST/GMT.
 */
export function zonedDateTimeToUtc(dateKey: string, timeHHMM: string, timeZone: string): Date {
  return fromZonedTime(`${dateKey}T${timeHHMM}:00`, timeZone)
}

/** Formats a UTC Date instant as a wall-clock time string in the given timezone, e.g. "4:00 PM". */
export function formatTimeInZone(date: Date, timeZone: string): string {
  return formatInTimeZone(date, timeZone, 'h:mm a')
}

/** Formats a UTC Date instant as a full date+time string in the given timezone. */
export function formatDateTimeInZone(date: Date, timeZone: string): string {
  return formatInTimeZone(date, timeZone, 'EEE d MMM yyyy, h:mm a')
}

/** Returns the YYYY-MM-DD calendar-date key for a UTC instant, as seen in the given timezone. */
export function dateKeyInZone(date: Date, timeZone: string): string {
  return formatInTimeZone(date, timeZone, 'yyyy-MM-dd')
}

/** Day-of-week (0=Sunday..6=Saturday) for a UTC instant, as seen in the given timezone. */
export function dayOfWeekInZone(date: Date, timeZone: string): number {
  const str = formatInTimeZone(date, timeZone, 'i') // ISO day (1=Mon..7=Sun)
  const iso = parseInt(str, 10)
  return iso % 7 // convert ISO(1-7, Mon-Sun) -> JS(0-6, Sun-Sat)
}
