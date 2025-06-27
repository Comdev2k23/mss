"use client"

import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { columns, Schedule } from "./columns"
import { DataTable } from "./data-table"
import { toast } from "sonner"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

export default function AdviserSchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState("All")

  useEffect(() => {
    async function getData() {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          setError("No token found.")
          return toast.error("Invalid or missing token.")
        }

        const res = await axios.get("https://mss-express.onrender.com/api/schedules/adviser/schedules", {
          headers: { Authorization: `Bearer ${token}` },
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
        } else {
          setError("Failed to fetch schedules.")
        }
        toast.error("Failed to fetch schedules.")
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [])

  if (loading) {
    return <p className="text-center py-10">Loading Schedules...</p>
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>
  }

  const filteredSchedules = schedules.filter((sched) =>
    statusFilter === "All"
      ? true
      : sched.status.toLowerCase() === statusFilter.toLowerCase()
  )

  return (
    <div className="container mx-auto py-10">
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

      <h1 className="text-2xl font-bold mb-4">Adviser Schedule List</h1>
      <DataTable columns={columns} data={filteredSchedules} />
    </div>
  )
}
