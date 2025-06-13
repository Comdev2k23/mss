'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import AdminEditSchedule from "@/components/admin-edit-schedule"



type PanelStatus = {
  name: string
  status: "pending" | "approved" | "rejected"
}

type Schedule = {
    _id: string
  studentName: string
  section: string
  manuscriptTitle: string
  adviser: string
  adviserStatus: "pending" | "approved" | "rejected"
  defenseDate: string
  room: string
  status: string
  panelMembers: string[]
  panelStatus: PanelStatus[]
}

export default function SchedulePage() {
  const params = useParams()
  const id = params?.id as string
  const [schedule, setSchedule] = useState<Schedule | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get(`https://mss-express.onrender.com/api/schedules/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setSchedule(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    if (id) fetchData()
  }, [id])

  if (!schedule) return <div>Loading...</div>

  return (
        <div className="w-full flex justify-center">
             <AdminEditSchedule 
        schedId={schedule._id} 
        section={schedule.section}
        studentName={schedule.studentName}
        adviser={schedule.adviser}
        manuscriptTitle={schedule.manuscriptTitle}
        currentStatus={schedule.status}
        />
        </div>
  )
}
