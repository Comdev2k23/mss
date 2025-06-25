'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ClipboardCheck, ClipboardX } from 'lucide-react'

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

export default function StudentSchedule() {
    const [isLoading, setIsLoading] = useState(false)
    const [schedules, setSchedules] = useState<Schedule []>([])
    const router = useRouter()

    async function handleDelete (schedId: string) {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.delete(`https://mss-express.onrender.com/api/schedules/my-schedules/${schedId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                
            toast.success('Schedule has been Canceled')
            setTimeout(() => {
                router.push('/dashboard')
            }, 1500)
        } catch (error) {
            toast.error('Error deleting schedule')
        }
    }
  

    useEffect(()=> {
        async function fetchMySchedule() {
            try {
                const token = localStorage.getItem('token')
                const res = await axios.get('https://mss-express.onrender.com/api/schedules/my-schedules', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setSchedules(res.data)
            } catch (error) {
                toast.error('Error fetching schedules')
            }
        }
        fetchMySchedule()
    }, [])
  return (
   <div className="flex flex-col items-center min-h-screen p-4 gap-4 w-full md:w-3/4 lg:w-1/2 mx-auto">
  {schedules.length === 0 ? (
    <Alert variant="default" className="w-full max-w-2xl">
      <AlertTitle className="flex gap-2 items-center">
        <ClipboardX size={15} /> No schedule yet
      </AlertTitle>
      <AlertDescription>
        You don't have any submitted schedule yet. Please add a new schedule and view it on this page.
      </AlertDescription>
    </Alert>
  ) : null}

  {schedules.map((schedule) => (
    <Card key={schedule._id} className="w-full max-w-2xl p-4">
      <CardContent>
        <CardTitle>Student Name:</CardTitle>
        <p className="break-words">{schedule.studentName}</p>
      </CardContent>

      <CardContent>
        <CardTitle>Section:</CardTitle>
        <p className="break-words">{schedule.section}</p>
      </CardContent>

      <CardContent>
        <CardTitle>Manuscript Title:</CardTitle>
        <p className="break-words">{schedule.manuscriptTitle}</p>
      </CardContent>

    <CardContent>
  <CardTitle>Defense Date:</CardTitle>
  <p className="break-words">
    {new Date(schedule.defenseDate).toLocaleString("en-PH", {
      timeZone: "Asia/Manila",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}
  </p>
</CardContent>


      <CardContent>
        <CardTitle>Adviser:</CardTitle>
        <p className="break-words">{schedule.adviser}</p>
      </CardContent>

      <CardContent>
        <CardTitle>Status:</CardTitle>
        <p className="break-words">{schedule.status}</p>
      </CardContent>

      <CardContent>
        <CardTitle>Panel Status:</CardTitle>
        <ul className="space-y-1">
          {schedule.panelStatus.map((panel, i) => (
            <li key={i} className="flex justify-between">
              <span>{panel.name}</span>
              <span
                className={`
                  ${
                    panel.status === "approved"
                      ? "text-green-600"
                      : panel.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }
                `}
              >
                {panel.status}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardContent className="flex justify-center">
        <AlertDialog>
          <AlertDialogTrigger className="bg-red-500 hover:bg-muted p-2 rounded-lg text-white">
            Cancel
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this schedule and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(schedule._id)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  ))}
</div>

  )
}
