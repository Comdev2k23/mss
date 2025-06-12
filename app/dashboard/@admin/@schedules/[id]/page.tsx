
import axios from "axios"
import { useEffect, useState } from "react"

type PanelStatus = {
  name: string
  status: "pending" | "approved" | "rejected"
}

type Schedule = {
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

export default function SchedulePage({ params }: { params: { id: string } }) {
  const [schedule, setSchedule] = useState<Schedule | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get(`https://mss-express.onrender.com/api/schedules/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setSchedule(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [params.id])

  if (!schedule) return <div>Loading...</div>

  return (
    <div className="p-4 space-y-2">
      <h1 className="text-xl font-bold">{schedule.studentName}</h1>
      <p><strong>Section:</strong> {schedule.section}</p>
      <p><strong>Title:</strong> {schedule.manuscriptTitle}</p>
      <p><strong>Adviser:</strong> {schedule.adviser}</p>
      <p><strong>Adviser Status:</strong> <span className={
        schedule.adviserStatus === "approved" ? "text-green-600"
        : schedule.adviserStatus === "rejected" ? "text-red-600"
        : "text-yellow-600"
      }>{schedule.adviserStatus}</span></p>
      <p><strong>Date:</strong> {new Date(schedule.defenseDate).toLocaleString("en-PH")}</p>
      <p><strong>Room:</strong> {schedule.room}</p>
      <p><strong>Status:</strong> {schedule.status}</p>

      <div className="mt-4">
        <h2 className="font-semibold">Panel Members:</h2>
        <ul className="list-disc ml-6">
          {schedule.panelMembers.map((member, i) => (
            <li key={i}>{member}</li>
          ))}
        </ul>
      </div>

      <div className="mt-2">
        <h2 className="font-semibold">Panel Status:</h2>
        <ul className="ml-6">
          {schedule.panelStatus.map((p, i) => (
            <li key={i} className="flex justify-between w-64">
              <span>{p.name}</span>
              <span className={
                p.status === "approved" ? "text-green-600"
                : p.status === "rejected" ? "text-red-600"
                : "text-yellow-600"
              }>
                {p.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
