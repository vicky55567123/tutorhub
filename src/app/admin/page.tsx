'use client'

import { Fragment, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  UsersIcon,
  AcademicCapIcon,
  CalendarIcon,
  ClockIcon,
  ShieldCheckIcon,
  PlusIcon,
  PencilSquareIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CurrencyPoundIcon,
  GiftIcon,
  EyeIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from '@/components/AuthContext'
import { isSupabaseConfigured } from '@/lib/supabase'

interface SessionRow {
  id: string
  title: string
  subject: string
  withName: string
  startTime: string
  endTime: string
  durationMinutes: number
  status: string
  isTrial: boolean
  price: number
  paymentStatus: 'unpaid' | 'pending' | 'paid' | 'free' | 'rejected'
  paymentReference?: string | null
  paymentProof?: string | null
  paymentSubmittedAt?: string | null
  hasMeetingLink: boolean
}

interface StudentRow {
  id: string
  name: string
  email: string
  phone?: string | null
  sessionsCount: number
  totalHours: number
  totalPaid: number
  subjects: string[]
  joinedAt?: string
  sessions: SessionRow[]
}

interface TutorRow {
  id: string
  name: string
  email: string
  phone?: string | null
  hourlyRate?: number | null
  bio?: string | null
  yearsExperience?: number | null
  qualifications?: string[]
  isApproved?: boolean
  sessionsCount: number
  totalHours: number
  totalEarned: number
  subjectBreakdown: { subject: string; hours: number; revenue: number }[]
  joinedAt?: string
  sessions: SessionRow[]
}

interface AdminStats {
  totalTutors: number
  totalStudents: number
  totalSessions: number
  upcomingSessions: number
  totalRevenue: number
  totalTrials: number
  pendingPayments: number
}

interface IntegrationStatus {
  emailConfigured: boolean
  googleMeetConfigured: boolean
}

type ModalType = 'student' | 'tutor' | null

interface UserFormState {
  fullName: string
  email: string
  password: string
  phone: string
  subjects: string
  hourlyRate: string
  bio: string
  yearsExperience: string
}

const emptyForm: UserFormState = {
  fullName: '',
  email: '',
  password: '',
  phone: '',
  subjects: '',
  hourlyRate: '',
  bio: '',
  yearsExperience: '',
}

function formatDate(value?: string) {
  if (!value) return '—'
  try {
    return new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return '—'
  }
}

function formatDateTime(value?: string) {
  if (!value) return '—'
  try {
    return new Date(value).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  } catch {
    return '—'
  }
}

function paymentBadgeClasses(status: string) {
  if (status === 'paid') return 'bg-green-50 text-green-700'
  if (status === 'free') return 'bg-blue-50 text-blue-700'
  if (status === 'pending') return 'bg-amber-50 text-amber-700'
  if (status === 'rejected') return 'bg-red-50 text-red-700'
  return 'bg-yellow-50 text-yellow-700'
}

function SessionsTable({
  sessions,
  withLabel,
  onReview,
  onRetryMeeting,
  retryingId,
}: {
  sessions: SessionRow[]
  withLabel: string
  onReview?: (session: SessionRow) => void
  onRetryMeeting?: (session: SessionRow) => void
  retryingId?: string | null
}) {
  if (sessions.length === 0) {
    return <p className="text-gray-500 text-xs">No sessions booked yet.</p>
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="text-left text-gray-400 border-b border-gray-200">
            <th className="py-1.5 pr-3 font-medium">Date &amp; Time</th>
            <th className="py-1.5 pr-3 font-medium">{withLabel}</th>
            <th className="py-1.5 pr-3 font-medium">Subject</th>
            <th className="py-1.5 pr-3 font-medium">Duration</th>
            <th className="py-1.5 pr-3 font-medium">Status</th>
            <th className="py-1.5 pr-3 font-medium">Price</th>
            <th className="py-1.5 pr-3 font-medium">Payment</th>
            <th className="py-1.5 pr-3 font-medium">Video link</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s) => (
            <tr key={s.id} className="border-b border-gray-100 last:border-0">
              <td className="py-1.5 pr-3 text-gray-700 whitespace-nowrap">{formatDateTime(s.startTime)}</td>
              <td className="py-1.5 pr-3 text-gray-700">{s.withName}</td>
              <td className="py-1.5 pr-3 text-gray-500">
                {s.subject}
                {s.isTrial && (
                  <span className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-700">
                    TRIAL
                  </span>
                )}
              </td>
              <td className="py-1.5 pr-3 text-gray-500">{s.durationMinutes} min</td>
              <td className="py-1.5 pr-3 text-gray-500 capitalize">{s.status}</td>
              <td className="py-1.5 pr-3 text-gray-700 font-medium">£{s.price.toFixed(2)}</td>
              <td className="py-1.5 pr-3">
                <div className="flex items-center gap-1.5">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${paymentBadgeClasses(s.paymentStatus)}`}>
                    {s.paymentStatus}
                  </span>
                  {s.paymentProof && onReview && (
                    <button
                      onClick={() => onReview(s)}
                      className="inline-flex items-center gap-0.5 text-primary-600 hover:text-primary-800"
                      aria-label="Review payment proof"
                    >
                      <EyeIcon className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </td>
              <td className="py-1.5 pr-3">
                {s.hasMeetingLink ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-50 text-green-700">
                    Ready
                  </span>
                ) : s.paymentStatus === 'paid' || s.paymentStatus === 'free' ? (
                  <button
                    onClick={() => onRetryMeeting?.(s)}
                    disabled={retryingId === s.id}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700 hover:bg-amber-100 disabled:opacity-50"
                  >
                    {retryingId === s.id ? 'Retrying...' : 'Send video link'}
                  </button>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function AdminDashboardPage() {
  const { user, getAccessToken } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [forbidden, setForbidden] = useState(false)
  const [migrationRequired, setMigrationRequired] = useState<string | null>(null)
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [integrations, setIntegrations] = useState<IntegrationStatus | null>(null)
  const [students, setStudents] = useState<StudentRow[]>([])
  const [tutors, setTutors] = useState<TutorRow[]>([])

  const [modalType, setModalType] = useState<ModalType>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<UserFormState>(emptyForm)
  const [isSaving, setIsSaving] = useState(false)
  const [expandedTutorId, setExpandedTutorId] = useState<string | null>(null)
  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null)
  const [reviewSession, setReviewSession] = useState<SessionRow | null>(null)
  const [isReviewing, setIsReviewing] = useState(false)
  const [retryingMeetingId, setRetryingMeetingId] = useState<string | null>(null)

  const loadStats = useCallback(async () => {
    if (!user) return
    setIsLoading(true)
    setForbidden(false)
    setMigrationRequired(null)
    try {
      const token = await getAccessToken()
      if (!token) {
        setIsLoading(false)
        return
      }
      const res = await fetch('/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data.success) {
        setStats(data.stats)
        setStudents(data.students)
        setTutors(data.tutors)
        setIntegrations(data.integrations || null)
      } else if (res.status === 403) {
        setForbidden(true)
      } else if (data.migrationRequired) {
        setMigrationRequired(data.error)
      } else {
        toast.error(data.error || 'Failed to load admin stats')
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to load admin stats')
    } finally {
      setIsLoading(false)
    }
  }, [user, getAccessToken])

  useEffect(() => {
    loadStats()
  }, [loadStats])

  function openAddModal(type: 'student' | 'tutor') {
    setModalType(type)
    setEditingId(null)
    setForm(emptyForm)
  }

  function openEditModal(type: 'student' | 'tutor', row: StudentRow | TutorRow) {
    setModalType(type)
    setEditingId(row.id)
    const subjectsText =
      type === 'student'
        ? (row as StudentRow).subjects.join(', ')
        : (row as TutorRow).subjectBreakdown.map((s) => s.subject).join(', ')
    setForm({
      fullName: row.name,
      email: row.email,
      password: '',
      phone: row.phone || '',
      subjects: subjectsText,
      hourlyRate: type === 'tutor' ? String((row as TutorRow).hourlyRate ?? '') : '',
      bio: type === 'tutor' ? (row as TutorRow).bio || '' : '',
      yearsExperience: type === 'tutor' ? String((row as TutorRow).yearsExperience ?? '') : '',
    })
  }

  function closeModal() {
    setModalType(null)
    setEditingId(null)
    setForm(emptyForm)
  }

  async function handlePaymentDecision(status: 'paid' | 'rejected') {
    if (!reviewSession) return
    setIsReviewing(true)
    try {
      const token = await getAccessToken()
      if (!token) {
        toast.error('Session expired, please log in again')
        return
      }
      const res = await fetch('/api/admin/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: reviewSession.id, paymentStatus: status }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Failed to update payment')

      if (status === 'paid') {
        const problems: string[] = []
        if (data.meetingPending) {
          problems.push(
            data.meetingSetupError
              ? `no video link (${data.meetingSetupError})`
              : 'no video link created'
          )
        }
        if (data.emailConfigured === false) {
          problems.push('emails are not configured on the server (SMTP_HOST/SMTP_USER/SMTP_PASSWORD missing)')
        } else if (data.emailSent === false) {
          problems.push('the confirmation email failed to send')
        }
        if (problems.length > 0) {
          toast.error(`Payment confirmed, but ${problems.join(' and ')}. See BACKEND_SETUP.md to fix this.`, { duration: 8000 })
        } else {
          toast.success('Payment confirmed - student and tutor notified by email')
        }
      } else {
        if (data.emailConfigured === false) {
          toast.error('Payment rejected, but emails are not configured on the server (SMTP_HOST/SMTP_USER/SMTP_PASSWORD missing) - the student was not notified.', { duration: 8000 })
        } else if (data.emailSent === false) {
          toast.error('Payment rejected, but the notification email failed to send.')
        } else {
          toast.success('Payment rejected - student notified by email')
        }
      }
      setReviewSession(null)
      loadStats()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update payment')
    } finally {
      setIsReviewing(false)
    }
  }

  async function handleRetryMeeting(session: SessionRow) {
    setRetryingMeetingId(session.id)
    try {
      const token = await getAccessToken()
      if (!token) {
        toast.error('Session expired, please log in again')
        return
      }
      const res = await fetch('/api/admin/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: session.id, retryMeetingOnly: true }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Failed to retry video link')

      if (data.meetingPending) {
        toast.error(
          `Still no video link${data.meetingSetupError ? ` (${data.meetingSetupError})` : ''}. See BACKEND_SETUP.md to fix this.`,
          { duration: 8000 }
        )
      } else if (data.emailConfigured === false) {
        toast.success('Video link created! (Email notifications are not configured, so the student/tutor were not emailed.)', { duration: 6000 })
      } else if (data.emailSent === false) {
        toast.success('Video link created, but the notification email failed to send.')
      } else {
        toast.success('Video link created and sent to student + tutor by email')
      }
      loadStats()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to retry video link')
    } finally {
      setRetryingMeetingId(null)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!modalType) return
    if (!form.fullName.trim()) {
      toast.error('Full name is required')
      return
    }
    if (!editingId) {
      if (!form.email.trim()) {
        toast.error('Email is required')
        return
      }
      if (!form.password || form.password.length < 6) {
        toast.error('Password must be at least 6 characters')
        return
      }
    }

    setIsSaving(true)
    try {
      const token = await getAccessToken()
      if (!token) {
        toast.error('Session expired, please log in again')
        return
      }

      const subjectsArray = form.subjects
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)

      const tutorFields =
        modalType === 'tutor'
          ? {
              hourlyRate: form.hourlyRate ? Number(form.hourlyRate) : null,
              bio: form.bio || null,
              yearsExperience: form.yearsExperience ? Number(form.yearsExperience) : null,
            }
          : {}

      let res: Response
      if (editingId) {
        res = await fetch('/api/admin/users', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            id: editingId,
            fullName: form.fullName,
            phone: form.phone || null,
            subjects: subjectsArray,
            ...tutorFields,
          }),
        })
      } else {
        res = await fetch('/api/admin/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            userType: modalType,
            fullName: form.fullName,
            email: form.email,
            password: form.password,
            phone: form.phone || null,
            subjects: subjectsArray,
            ...tutorFields,
          }),
        })
      }

      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Something went wrong')

      toast.success(editingId ? 'Details updated' : `${modalType === 'tutor' ? 'Tutor' : 'Student'} added`)
      closeModal()
      loadStats()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setIsSaving(false)
    }
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Backend not configured</h1>
        <p className="text-gray-600">See BACKEND_SETUP.md to connect Supabase before viewing admin stats.</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Please log in</h1>
        <p className="text-gray-600">Log in with an admin account to view the platform dashboard.</p>
      </div>
    )
  }

  if (user.type !== 'admin') {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <ShieldCheckIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admins only</h1>
        <p className="text-gray-600">
          This dashboard is only visible to admin accounts. Ask an existing admin to set your account&apos;s{' '}
          <code className="bg-gray-100 px-1 rounded">user_type</code> to <code className="bg-gray-100 px-1 rounded">admin</code>{' '}
          in the Supabase Table Editor (profiles table).
        </p>
      </div>
    )
  }

  if (forbidden) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <ShieldCheckIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access denied</h1>
        <p className="text-gray-600">The server did not recognise this account as an admin.</p>
      </div>
    )
  }

  if (migrationRequired) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <ShieldCheckIcon className="h-16 w-16 text-amber-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Database update needed</h1>
        <p className="text-gray-600 mb-4">{migrationRequired}</p>
        <div className="bg-gray-900 text-gray-100 text-left text-xs rounded-lg p-4 overflow-x-auto mb-4">
          <pre>{`alter table public.bookings
  add column if not exists is_trial boolean not null default false,
  add column if not exists price numeric(10,2) not null default 0,
  add column if not exists payment_status text not null default 'unpaid'
    check (payment_status in ('unpaid','paid','free'));`}</pre>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Paste that into your Supabase project&apos;s SQL Editor and run it (the full file is also at{' '}
          <code className="bg-gray-100 px-1 rounded">database/booking_payments_and_trial.sql</code> in the repo), then
          refresh this page.
        </p>
        <button
          onClick={() => loadStats()}
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg px-4 py-2"
        >
          I&apos;ve run it - refresh
        </button>
      </div>
    )
  }

  const statCards = [
    { label: 'Registered Tutors', value: stats?.totalTutors ?? 0, icon: AcademicCapIcon, color: 'from-green-600 to-emerald-600' },
    { label: 'Registered Students', value: stats?.totalStudents ?? 0, icon: UsersIcon, color: 'from-blue-600 to-primary-600' },
    { label: 'Total Sessions Booked', value: stats?.totalSessions ?? 0, icon: CalendarIcon, color: 'from-purple-600 to-pink-600' },
    { label: 'Upcoming Sessions', value: stats?.upcomingSessions ?? 0, icon: ClockIcon, color: 'from-orange-500 to-red-500' },
    { label: 'Total Revenue', value: `£${(stats?.totalRevenue ?? 0).toFixed(2)}`, icon: CurrencyPoundIcon, color: 'from-emerald-600 to-teal-600' },
    { label: 'Free Trials Used', value: stats?.totalTrials ?? 0, icon: GiftIcon, color: 'from-sky-500 to-blue-600' },
    { label: 'Pending Payments', value: stats?.pendingPayments ?? 0, icon: ExclamationTriangleIcon, color: 'from-amber-500 to-orange-500' },
  ]

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <ShieldCheckIcon className="h-8 w-8 text-primary-600" />
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">Platform-wide overview of registered users and booked sessions.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => openAddModal('student')}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
          >
            <PlusIcon className="h-4 w-4" /> Add Student
          </button>
          <button
            onClick={() => openAddModal('tutor')}
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
          >
            <PlusIcon className="h-4 w-4" /> Add Tutor
          </button>
        </div>
      </div>

      {isLoading ? (
        <p className="text-gray-500">Loading stats...</p>
      ) : (
        <>
          {integrations && (!integrations.emailConfigured || !integrations.googleMeetConfigured) && (
            <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
              <ExclamationTriangleIcon className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-800">
                <p className="font-semibold mb-1">Some integrations aren&apos;t configured on this server</p>
                <ul className="list-disc list-inside space-y-0.5">
                  {!integrations.emailConfigured && (
                    <li>
                      <strong>Email notifications are OFF</strong> - students and tutors are not being emailed about
                      bookings or payment decisions. Set <code className="bg-amber-100 px-1 rounded">SMTP_HOST</code>,{' '}
                      <code className="bg-amber-100 px-1 rounded">SMTP_USER</code> and{' '}
                      <code className="bg-amber-100 px-1 rounded">SMTP_PASSWORD</code> (see BACKEND_SETUP.md).
                    </li>
                  )}
                  {!integrations.googleMeetConfigured && (
                    <li>
                      <strong>Google Meet links are OFF</strong> - sessions will stay &quot;video link pending&quot;
                      forever. Set <code className="bg-amber-100 px-1 rounded">GOOGLE_CLIENT_ID</code>,{' '}
                      <code className="bg-amber-100 px-1 rounded">GOOGLE_CLIENT_SECRET</code>, then visit{' '}
                      <code className="bg-amber-100 px-1 rounded">/api/auth/google/authorize</code> once as an admin
                      to generate <code className="bg-amber-100 px-1 rounded">GOOGLE_REFRESH_TOKEN</code>.
                    </li>
                  )}
                </ul>
                <p className="mt-1 text-amber-700">
                  If this is deployed on Netlify, remember these must be set as Netlify environment variables, not
                  just in your local .env.local file.
                </p>
              </div>
            </div>
          )}

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-10">
            {statCards.map((card) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white shadow-sm`}
              >
                <card.icon className="h-8 w-8 mb-3 opacity-90" />
                <p className="text-3xl font-bold">{card.value}</p>
                <p className="text-sm opacity-90 mt-1">{card.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Students table */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <UsersIcon className="h-5 w-5 text-primary-600" /> Students ({students.length})
            </h2>
            {students.length === 0 ? (
              <p className="text-gray-500 text-sm">No students have registered yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b border-gray-100">
                      <th className="py-2 pr-4 font-medium">Name</th>
                      <th className="py-2 pr-4 font-medium">Email</th>
                      <th className="py-2 pr-4 font-medium">Phone</th>
                      <th className="py-2 pr-4 font-medium">Sessions</th>
                      <th className="py-2 pr-4 font-medium">Total Hours</th>
                      <th className="py-2 pr-4 font-medium">Total Paid</th>
                      <th className="py-2 pr-4 font-medium">Subjects Studied</th>
                      <th className="py-2 pr-4 font-medium">Joined</th>
                      <th className="py-2 pr-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => {
                      const isExpanded = expandedStudentId === s.id
                      return (
                        <Fragment key={s.id}>
                          <tr className="border-b border-gray-50 last:border-0 align-top">
                            <td className="py-2 pr-4 font-medium text-gray-900">
                              <button
                                onClick={() => setExpandedStudentId(isExpanded ? null : s.id)}
                                className="inline-flex items-center gap-1 hover:text-primary-700"
                              >
                                {isExpanded ? (
                                  <ChevronUpIcon className="h-4 w-4 text-gray-400" />
                                ) : (
                                  <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                                )}
                                {s.name}
                              </button>
                            </td>
                            <td className="py-2 pr-4 text-gray-500">{s.email}</td>
                            <td className="py-2 pr-4 text-gray-500">{s.phone || '—'}</td>
                            <td className="py-2 pr-4">{s.sessionsCount}</td>
                            <td className="py-2 pr-4">{s.totalHours}h</td>
                            <td className="py-2 pr-4 font-medium text-gray-700">£{s.totalPaid.toFixed(2)}</td>
                            <td className="py-2 pr-4 text-gray-500">{s.subjects.join(', ') || '—'}</td>
                            <td className="py-2 pr-4 text-gray-500">{formatDate(s.joinedAt)}</td>
                            <td className="py-2 pr-4 text-right">
                              <button
                                onClick={() => openEditModal('student', s)}
                                className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-800 font-medium text-xs"
                              >
                                <PencilSquareIcon className="h-4 w-4" /> Edit
                              </button>
                            </td>
                          </tr>
                          {isExpanded && (
                            <tr className="bg-gray-50 border-b border-gray-100">
                              <td colSpan={9} className="py-3 px-4">
                                <p className="text-gray-400 uppercase tracking-wide text-xs mb-2">
                                  Sessions ({s.sessions.length}) - exact date &amp; time
                                </p>
                                <SessionsTable
                                  sessions={s.sessions}
                                  withLabel="Tutor"
                                  onReview={setReviewSession}
                                  onRetryMeeting={handleRetryMeeting}
                                  retryingId={retryingMeetingId}
                                />
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          {/* Tutors table */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AcademicCapIcon className="h-5 w-5 text-primary-600" /> Tutors ({tutors.length})
            </h2>
            {tutors.length === 0 ? (
              <p className="text-gray-500 text-sm">No tutors have registered yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b border-gray-100">
                      <th className="py-2 pr-4 font-medium">Name</th>
                      <th className="py-2 pr-4 font-medium">Email</th>
                      <th className="py-2 pr-4 font-medium">Phone</th>
                      <th className="py-2 pr-4 font-medium">Rate</th>
                      <th className="py-2 pr-4 font-medium">Approved</th>
                      <th className="py-2 pr-4 font-medium">Sessions</th>
                      <th className="py-2 pr-4 font-medium">Total Hours</th>
                      <th className="py-2 pr-4 font-medium">Total Earned</th>
                      <th className="py-2 pr-4 font-medium">Hours by Subject</th>
                      <th className="py-2 pr-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tutors.map((t) => {
                      const isExpanded = expandedTutorId === t.id
                      return (
                        <Fragment key={t.id}>
                          <tr className="border-b border-gray-50 last:border-0 align-top">
                            <td className="py-2 pr-4 font-medium text-gray-900">
                              <button
                                onClick={() => setExpandedTutorId(isExpanded ? null : t.id)}
                                className="inline-flex items-center gap-1 hover:text-primary-700"
                              >
                                {isExpanded ? (
                                  <ChevronUpIcon className="h-4 w-4 text-gray-400" />
                                ) : (
                                  <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                                )}
                                {t.name}
                              </button>
                            </td>
                            <td className="py-2 pr-4 text-gray-500">{t.email}</td>
                            <td className="py-2 pr-4 text-gray-500">{t.phone || '—'}</td>
                            <td className="py-2 pr-4 text-gray-500">{t.hourlyRate ? `£${t.hourlyRate}/hr` : '—'}</td>
                            <td className="py-2 pr-4">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                  t.isApproved ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                                }`}
                              >
                                {t.isApproved ? 'Approved' : 'Pending'}
                              </span>
                            </td>
                            <td className="py-2 pr-4">{t.sessionsCount}</td>
                            <td className="py-2 pr-4">{t.totalHours}h</td>
                            <td className="py-2 pr-4 font-medium text-gray-700">£{t.totalEarned.toFixed(2)}</td>
                            <td className="py-2 pr-4">
                              {t.subjectBreakdown.length === 0 ? (
                                <span className="text-gray-400">—</span>
                              ) : (
                                <div className="flex flex-wrap gap-1">
                                  {t.subjectBreakdown.map((sb) => (
                                    <span
                                      key={sb.subject}
                                      className="inline-flex items-center gap-1 bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full text-xs font-medium"
                                    >
                                      {sb.subject}: {sb.hours}h (£{sb.revenue.toFixed(2)})
                                    </span>
                                  ))}
                                </div>
                              )}
                            </td>
                            <td className="py-2 pr-4 text-right">
                              <button
                                onClick={() => openEditModal('tutor', t)}
                                className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-800 font-medium text-xs"
                              >
                                <PencilSquareIcon className="h-4 w-4" /> Edit
                              </button>
                            </td>
                          </tr>
                          {isExpanded && (
                            <tr className="bg-gray-50 border-b border-gray-100">
                              <td colSpan={10} className="py-3 px-4">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                                  <div>
                                    <p className="text-gray-400 uppercase tracking-wide mb-1">Joined</p>
                                    <p className="text-gray-700">{formatDate(t.joinedAt)}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-400 uppercase tracking-wide mb-1">Years Experience</p>
                                    <p className="text-gray-700">{t.yearsExperience ?? '—'}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-400 uppercase tracking-wide mb-1">Qualifications</p>
                                    <p className="text-gray-700">
                                      {t.qualifications && t.qualifications.length > 0 ? t.qualifications.join(', ') : '—'}
                                    </p>
                                  </div>
                                  <div className="sm:col-span-3">
                                    <p className="text-gray-400 uppercase tracking-wide mb-1">Bio</p>
                                    <p className="text-gray-700">{t.bio || '—'}</p>
                                  </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-gray-200">
                                  <p className="text-gray-400 uppercase tracking-wide text-xs mb-2">
                                    Sessions ({t.sessions.length}) - exact date &amp; time
                                  </p>
                                  <SessionsTable
                                    sessions={t.sessions}
                                    withLabel="Student"
                                    onReview={setReviewSession}
                                    onRetryMeeting={handleRetryMeeting}
                                    retryingId={retryingMeetingId}
                                  />
                                </div>
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </>
      )}

      {/* Add / Edit user modal */}
      <AnimatePresence>
        {modalType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingId ? 'Edit' : 'Add'} {modalType === 'tutor' ? 'Tutor' : 'Student'}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600" aria-label="Close">
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g. Sarah Ahmed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email {editingId ? '' : '*'}</label>
                  <input
                    type="email"
                    required={!editingId}
                    disabled={!!editingId}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:text-gray-500"
                    placeholder="name@example.com"
                  />
                  {editingId && <p className="text-xs text-gray-400 mt-1">Email cannot be changed here.</p>}
                </div>
                {!editingId && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Temporary Password *</label>
                    <input
                      type="text"
                      required
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="At least 6 characters"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="+44 7..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subjects <span className="text-gray-400 font-normal">(comma-separated)</span>
                  </label>
                  <input
                    type="text"
                    value={form.subjects}
                    onChange={(e) => setForm({ ...form, subjects: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Maths, Physics, Chemistry"
                  />
                </div>
                {modalType === 'tutor' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate (£)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={form.hourlyRate}
                        onChange={(e) => setForm({ ...form, hourlyRate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="25"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                      <input
                        type="number"
                        min="0"
                        value={form.yearsExperience}
                        onChange={(e) => setForm({ ...form, yearsExperience: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        rows={3}
                        value={form.bio}
                        onChange={(e) => setForm({ ...form, bio: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                        placeholder="Short tutor bio..."
                      />
                    </div>
                  </>
                )}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium disabled:opacity-50"
                  >
                    {isSaving ? 'Saving...' : editingId ? 'Save Changes' : 'Create Account'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment proof review modal */}
      <AnimatePresence>
        {reviewSession && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setReviewSession(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Review Payment Proof</h3>
                <button onClick={() => setReviewSession(null)} className="text-gray-400 hover:text-gray-600" aria-label="Close">
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="px-6 py-5 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-400">Amount</p>
                    <p className="font-semibold text-gray-900">£{reviewSession.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Current status</p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${paymentBadgeClasses(reviewSession.paymentStatus)}`}>
                      {reviewSession.paymentStatus}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400">Reference / payer</p>
                    <p className="text-gray-700">{reviewSession.paymentReference || '—'}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400">Submitted</p>
                    <p className="text-gray-700">{formatDateTime(reviewSession.paymentSubmittedAt || undefined)}</p>
                  </div>
                </div>

                {reviewSession.paymentProof ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={reviewSession.paymentProof}
                    alt="Payment proof screenshot"
                    className="w-full max-h-80 object-contain border border-gray-200 rounded-lg bg-gray-50"
                  />
                ) : (
                  <p className="text-sm text-gray-500">No screenshot was attached.</p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => handlePaymentDecision('rejected')}
                    disabled={isReviewing}
                    className="flex-1 px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 disabled:opacity-50"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handlePaymentDecision('paid')}
                    disabled={isReviewing}
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium disabled:opacity-50"
                  >
                    {isReviewing ? 'Saving...' : 'Mark as Paid'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
