"use client"

import { useState } from "react"
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

type UpdateScheduleStatusFormProps = {
  schedId: string,
  section: string,
  studentName: string,
  adviser: string,
  manuscriptTitle: string,
  currentStatus: string,
  className?: string
}

export default function UpdateScheduleStatusForm({
  schedId,
  section,
  studentName,
  adviser,
  manuscriptTitle,
  currentStatus,
  className,
}: UpdateScheduleStatusFormProps) {
  const router = useRouter()

  const [status, setStatus] = useState(currentStatus)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {

        const token = localStorage.getItem('token')

     await axios.patch(
        `https://mss-express.onrender.com/api/schedules/admin/update-status/${schedId}`,
        { status },
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        )

      router.push("/dashboard")
    } catch (error) {
      console.error("Failed to update schedule status:", error)
      alert("Failed to update. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex w-1/2 justify-center     flex-col gap-6 ", className) }>
      <Card className="   w-full mt-10 justify-center">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Update Schedule Status</CardTitle>
          <CardDescription>
            Modify the status of the selected manuscript schedule.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Student Name</Label>
                <Input value={studentName} disabled />
              </div>

               <div className="grid gap-2">
                <Label>Section</Label>
                <Input value={section} disabled />
              </div>

              <div className="grid gap-2">
                <Label>Adviser</Label>
                <Input value={adviser} disabled />
              </div>

              <div className="grid gap-2">
                <Label>Manuscript Title</Label>
                <Input value={manuscriptTitle} disabled />
              </div>

              <div className="grid gap-2">
                <Label>Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="reject">Reject</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-1/2"
                  onClick={() => router.push("/dashboard")}
                >
                  Cancel
                </Button>

                <Button type="submit" className="w-1/2" disabled={loading}>
                  {loading ? "Applying..." : "Apply Changes"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
