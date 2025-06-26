"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { toast } from "sonner"
import { jwtDecode } from "jwt-decode"

type PanelStatus = {
  name: string,
  status: string
}

type Schedule = {
  _id: string
  studentName: string
  section: string
  manuscriptTitle: string
  adviser: string
  status: string
  panelStatus: PanelStatus[]
}

type PanelEditScheduleProps = {
  schedId: string
  className?: string
}

export default function PanelEditSchedule({ schedId, className }: PanelEditScheduleProps) {
  const router = useRouter()

  const [schedule, setSchedule] = useState<Schedule | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<string>("")
  const [panelName, setPanelName] = useState<string>("")

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const token = localStorage.getItem('token')
        if (!token) return

        const decoded: any = jwtDecode(token)
        const panelNameFromToken = decoded.name
        setPanelName(panelNameFromToken)

        const res = await axios.get(`https://mss-express.onrender.com/api/schedules/panel/schedules/${schedId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setSchedule(res.data)

        // Pre-select the current panel status if assigned
        const panelData = res.data.panelStatus.find((panel: any) => panel.name === panelNameFromToken)
        if (panelData) setSelectedStatus(panelData.status)

      } catch (error) {
        console.error("Failed to fetch schedule:", error)
      }
    }

    if (schedId) {
      fetchSchedule()
    }
  }, [schedId])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) return

      await axios.patch(
        `https://mss-express.onrender.com/api/schedules/panel/schedules/update-status/${schedId}`,
        { status: selectedStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      toast.success("Panel status has been updated")
      setTimeout(() => {
        router.push("/dashboard/schedules")
      }, 1500)

    } catch (error) {
      console.error("Failed to update panel status:", error)
      toast.error('Failed to update Panel Status')
    } finally {
      setLoading(false)
    }
  }

  if (!schedule) {
    return <div className="text-center mt-10">Loading schedule...</div>
  }

  return (
    <div className={cn("flex justify-center items-center min-h-screen p-4", className)}>
      <Card className="w-full max-w-2xl p-4">
        <CardHeader className="text-center">
          <CardTitle className="text-xl md:text-2xl">Update Panel Status</CardTitle>
          <CardDescription>
            Modify your status for this manuscript schedule.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Student Name</Label>
                <Input value={schedule.studentName} disabled />
              </div>

              <div className="grid gap-2">
                <Label>Section</Label>
                <Input value={schedule.section} disabled />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Panel Name</Label>
                <Input value={panelName} disabled />
              </div>

              <div className="grid gap-2">
                <Label>Manuscript Title</Label>
                <Input value={schedule.manuscriptTitle} disabled />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Your Status</Label>
              <Select
                value={selectedStatus}
                onValueChange={(value) => setSelectedStatus(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending" disabled>Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Button
                type="button"
                variant="secondary"
                className="w-full md:w-1/2"
                onClick={() => router.push("/dashboard")}
              >
                Cancel
              </Button>

              <Button type="submit" className="w-full md:w-1/2" disabled={loading}>
                {loading ? "Applying..." : "Apply Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
