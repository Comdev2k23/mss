'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Schedule = {
  _id: string
  studentName: string
  section: string
  manuscriptTitle: string
  adviser: string
  panelMembers: string[]
  defenseDate: string
  room: string
  status: string
  adviserStatus: string
  panelStatus: { name: string; status: string }[]
}

export default function DashboardPage() {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  async function getSchedules() {
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        setError('No token found. Redirecting to login...')
        router.push('/login')
        return
      }

      const res = await axios.get('https://mss-express.onrender.com/api/schedules', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setSchedules(res.data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to load schedules.'
      console.error('❌ Error fetching schedules:', msg)
      setError(msg)

      if (err.response?.status === 401 || err.response?.status === 403) {
        router.push('/login')
      }
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    localStorage.removeItem('token')
    router.push('/login')
  }

  useEffect(() => {
    getSchedules()
  }, [])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {loading && <p>Loading schedules...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="space-y-4">
          {schedules.length === 0 ? (
            <p>No schedules found.</p>
          ) : (
            schedules.map((schedule) => (
              <div
                key={schedule._id}
                className="border p-4 rounded-lg shadow bg-white"
              >
                <p><strong>Student:</strong> {schedule.studentName}</p>
                <p><strong>Section:</strong> {schedule.section}</p>
                <p><strong>Title:</strong> {schedule.manuscriptTitle}</p>
                <p><strong>Adviser:</strong> {schedule.adviser}</p>
                <p><strong>Panel Members:</strong> {schedule.panelMembers.join(', ')}</p>
                <p><strong>Defense Date:</strong> {new Date(schedule.defenseDate).toLocaleString()}</p>
                <p><strong>Room:</strong> {schedule.room}</p>
                <p><strong>Status:</strong> {schedule.status}</p>
                <p><strong>Adviser Status:</strong> {schedule.adviserStatus}</p>
                <div>
                  <strong>Panel Status:</strong>
                  <ul className="list-disc list-inside ml-4">
                    {schedule.panelStatus.map((p, idx) => (
                      <li key={idx}>
                        {p.name}: {p.status}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
