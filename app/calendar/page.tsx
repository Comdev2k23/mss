'use client'

import * as React from "react"
import axios from "axios"
import { toast } from "sonner"
import { Calendar1, CalendarDays, PlusIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useEffect, useState } from "react"

type Schedule = {
  studentName: string
  defenseDate: string
  room: string
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [schedules, setSchedules] = useState<Schedule[]>([])

  useEffect(() => {
    async function fetchApprovedSchedules() {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get(
          "https://mss-express.onrender.com/api/schedules/admin/approved-schedules",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setSchedules(res.data || []) // your API now returns an array directly
      } catch (err) {
        toast.error("Failed to load approved schedules.")
      }
    }

    fetchApprovedSchedules()
  }, [])

  const filteredSchedules = schedules.filter((schedule) => {
    const defense = new Date(schedule.defenseDate)
    return (
      defense.getFullYear() === date?.getFullYear() &&
      defense.getMonth() === date?.getMonth() &&
      defense.getDate() === date?.getDate()
    )
  })

  return (

        <div className="w-full ">
           <h1 className="scroll-m-20  text-3xl font-extrabold tracking-tight text-balance mt-10">
         Calendar
        </h1>
             <div className="flex max-h-1/2  justify-center w-3/4 mt-12 gap-5">
        <Card className="w-1/2 justify-center items-center">
               <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="bg-transparent p-0"
          required
        />
        </Card>

      <Card className="flex flex-col items-start gap-3 border-t px-4 pt-4 w-1/4">
        <div className="flex w-full items-center justify-between px-1">
          <div className="text-sm font-medium">
            {date?.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          <Button variant="ghost" size="icon" className="size-6" title="Add Event">
            <PlusIcon />
            <span className="sr-only">Add Event</span>
          </Button>
        </div>

        <div className="flex w-full flex-col gap-2">
          {filteredSchedules.length === 0 ? (
            <div className="text-sm text-muted-foreground">No defense scheduled.</div>
          ) : (
            filteredSchedules.map((event, i) => (
              <div
                key={i}
                className="bg-muted after:bg-primary/70 relative rounded-md p-2 pl-6 text-sm after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full"
              >
                <div className="font-medium">{event.studentName}</div>
                <div className="text-muted-foreground text-xs">
                  Room: {event.room}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
        </div>
        </div>
       

        
  )
}
