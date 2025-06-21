"use client"

import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { DataTable } from "@/app/dashboard/@admin/@schedules/data-table" // update this path if needed
import { columns } from "./columns"
import { Schedule } from "@/lib/form.schemas" // make sure this matches your type
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState("All")

  useEffect(() => {
    async function fetchSchedules() {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          setError("No token found.")
          return toast('No token ')
        }

        const res = await axios.get("https://mss-express.onrender.com/api/schedules/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setSchedules(res.data) 
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const axiosErr = err as AxiosError
          setError(
            `Error ${axiosErr.response?.status}: ${JSON.stringify(
              axiosErr.response?.data
            )}`
          )
        }
      }
    }

    fetchSchedules()
  }, [])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  const filteredSchedules = schedules.filter((sched) =>
  statusFilter === "All"
    ? true
    : sched.status.toLowerCase() === statusFilter.toLowerCase()
)


  return (
    <div className="p-4">
 <div className="flex justify-end mb-4">
  <Select value={statusFilter} onValueChange={setStatusFilter}>
    <SelectTrigger className="w-[200px]">
      <SelectValue placeholder="Filter by status" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="All">All</SelectItem>
      <SelectItem value="Approved">Approved</SelectItem>
      <SelectItem value="Pending">Pending</SelectItem>
      <SelectItem value="Rejected">Rejected</SelectItem>
    </SelectContent>
  </Select>
</div>


      <h1 className="text-2xl font-bold mb-4">Schedule List</h1>
      <DataTable columns={columns} data={filteredSchedules} />
    </div>
  )
}
