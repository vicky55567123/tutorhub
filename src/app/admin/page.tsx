'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  UsersIcon,
  AcademicCapIcon,
  CalendarIcon,
  ClockIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from '@/components/AuthContext'
import { isSupabaseConfigured } from '@/lib/supabase'

interface StudentRow {
  id: string
  name: string
  email: string
  sessionsCount: number
  totalHours: number
  subjects: string[]
}

interface TutorRow {
  id: string
  name: string
  email: string
  hourlyRate?: number
  sessionsCount: number
  totalHours: number
  subjectBreakdown: { subject: string; hours: number }[]
}

interface AdminStats {
  totalTutors: number
  totalStudents: number
  totalSessions: number
  upcomingSessions: number
}

export default function AdminDashboardPage() {
  const { user, getAccessToken } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [forbidden, setForbidden] = useState(false)
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [students, setStudents] = useState<StudentRow[]>([])
  const [tutors, setTutors] = useState<TutorRow[]>([])

  useEffect(() => {
    async function load() {
      if (!user) return
      setIsLoading(true)
      setForbidden(false)
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
        } else if (res.status === 403) {
          setForbidden(true)
        } else {
          toast.error(data.error || 'Failed to load admin stats')
        }
      } catch (error) {
        console.error(error)
        toast.error('Failed to load admin stats')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [user, getAccessToken])

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

  const statCards = [
    { label: 'Registered Tutors', value: stats?.totalTutors ?? 0, icon: AcademicCapIcon, color: 'from-green-600 to-emerald-600' },
    { label: 'Registered Students', value: stats?.totalStudents ?? 0, icon: UsersIcon, color: 'from-blue-600 to-primary-600' },
    { label: 'Total Sessions Booked', value: stats?.totalSessions ?? 0, icon: CalendarIcon, color: 'from-purple-600 to-pink-600' },
    { label: 'Upcoming Sessions', value: stats?.upcomingSessions ?? 0, icon: ClockIcon, color: 'from-orange-500 to-red-500' },
  ]

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <ShieldCheckIcon className="h-8 w-8 text-primary-600" />
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-1">Platform-wide overview of registered users and booked sessions.</p>
      </div>

      {isLoading ? (
        <p className="text-gray-500">Loading stats...</p>
      ) : (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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
                      <th className="py-2 pr-4 font-medium">Sessions</th>
                      <th className="py-2 pr-4 font-medium">Total Hours</th>
                      <th className="py-2 pr-4 font-medium">Subjects Studied</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => (
                      <tr key={s.id} className="border-b border-gray-50 last:border-0">
                        <td className="py-2 pr-4 font-medium text-gray-900">{s.name}</td>
                        <td className="py-2 pr-4 text-gray-500">{s.email}</td>
                        <td className="py-2 pr-4">{s.sessionsCount}</td>
                        <td className="py-2 pr-4">{s.totalHours}h</td>
                        <td className="py-2 pr-4 text-gray-500">{s.subjects.join(', ') || '—'}</td>
                      </tr>
                    ))}
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
                      <th className="py-2 pr-4 font-medium">Sessions</th>
                      <th className="py-2 pr-4 font-medium">Total Hours</th>
                      <th className="py-2 pr-4 font-medium">Hours by Subject</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tutors.map((t) => (
                      <tr key={t.id} className="border-b border-gray-50 last:border-0 align-top">
                        <td className="py-2 pr-4 font-medium text-gray-900">{t.name}</td>
                        <td className="py-2 pr-4 text-gray-500">{t.email}</td>
                        <td className="py-2 pr-4">{t.sessionsCount}</td>
                        <td className="py-2 pr-4">{t.totalHours}h</td>
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
                                  {sb.subject}: {sb.hours}h
                                </span>
                              ))}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </>
      )}
    </div>
  )
}
