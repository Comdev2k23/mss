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

type Schedule = {
  _id: string
  studentName: string
  section: string
  manuscriptTitle: string
  adviser: string
  status: string
  adviserStatus: string
}

type AdviserEditScheduleProps = {
  schedId: string
  className?: string
}

export default function AdviserEditSchedule({ schedId, className }: AdviserEditScheduleProps) {
  const router = useRouter()

  const [schedule, setSchedule] = useState<Schedule | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`https://mss-express.onrender.com/api/schedules/adviser/schedules/${schedId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setSchedule(res.data)
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

      await axios.patch(
        `https://mss-express.onrender.com/api/schedules/adviser/update-status/${schedId}`,
        { status: schedule?.adviserStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      toast.success("Adviser status has been updated")
      setTimeout(() => {
        router.push("/dashboard/schedules")
      }, 1500)

    } catch (error) {
      console.error("Failed to update adviser status:", error)
      toast.error('Failed to update Adviser Status')
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
          <CardTitle className="text-xl md:text-2xl">Update Adviser Status</CardTitle>
          <CardDescription>
            Modify the adviser status of the selected manuscript schedule.
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
                <Label>Adviser</Label>
                <Input value={schedule.adviser} disabled />
              </div>

              <div className="grid gap-2">
                <Label>Manuscript Title</Label>
                <Input value={schedule.manuscriptTitle} disabled />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Adviser Status</Label>
              <Select
                value={schedule.adviserStatus}
                onValueChange={(value) => setSchedule({ ...schedule, adviserStatus: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select adviser status" />
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
