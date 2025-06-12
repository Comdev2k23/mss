"use client"

import { useEffect, useState } from "react"
import { EyeIcon } from "lucide-react"
import axios from "axios"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type PanelStatus = {
  name: string
  status: "pending" | "approved" | "rejected"
}

type Schedule = {
  studentName: string
  section: string
  manuscriptTitle: string
  adviser: string
  defenseDate: string
  room: string
  status: string
  panelMembers: string[]
  panelStatus: PanelStatus[]
}

const btnView = {
    icon: EyeIcon
}

export function PopoverDemo({ schedId }: { schedId: string }) {
  const [schedule, setSchedule] = useState<Schedule | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get(
          `https://mss-express.onrender.com/api/schedules/${schedId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setSchedule(res.data)
      } catch (error) {
        console.error("Failed to load schedule:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSchedule()
  }, [schedId])

  const renderPanelInfo = () => (
    <>
      {(schedule?.panelMembers.length?? 0) > 0 && (
        <div>
          <h5 className="font-medium text-sm">Panel Members:</h5>
          <ul className="list-disc pl-5 text-sm">
            {schedule?.panelMembers.map((member, i) => (
              <li key={i}>{member}</li>
            ))}
          </ul>
        </div>
      )}
      {(schedule?.panelStatus.length?? 0) > 0 && (
        <div>
          <h5 className="font-medium text-sm pt-2">Panel Status:</h5>
          <ul className="pl-3 text-sm space-y-1">
            {schedule?.panelStatus.map((panel, i) => (
              <li key={i} className="flex justify-between">
                <span>{panel.name}</span>
                <span
                  className={
                    panel.status === "approved"
                      ? "text-green-600"
                      : panel.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }
                >
                  {panel.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )

  return (
    <Popover>
      <PopoverTrigger asChild className="text-sm p-2 flex gap-2 items-center hover:bg-sidebar-accent w-full rounded-lg ">
        <button >
        <btnView.icon className="size-4" />
          View schedule
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : schedule ? (
          <div className="space-y-3">
            <h4 className="font-semibold">{schedule.studentName}</h4>
            <div className="grid gap-1 text-sm">
              <p>
                <strong>Section:</strong> {schedule.section}
              </p>
              <p>
                <strong>Title:</strong> {schedule.manuscriptTitle}
              </p>
              <p>
                <strong>Adviser:</strong> {schedule.adviser}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(schedule.defenseDate).toLocaleString("en-PH")}
              </p>
              <p>
                <strong>Room:</strong> {schedule.room}
              </p>
              <p>
                <strong>Status:</strong> {schedule.status}
              </p>
            </div>
            {renderPanelInfo()}
          </div>
        ) : (
          <p className="text-sm text-red-500">No schedule found.</p>
        )}
      </PopoverContent>
    </Popover>
  )
}
