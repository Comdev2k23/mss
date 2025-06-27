"use client"

import { useEffect, useState } from "react"
import axios from "axios"
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

export default function PanelSchedulePage() {
  const [data, setData] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("All")

  useEffect(() => {
    async function getData() {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          alert("Invalid token")
          return
        }

        const res = await axios.get("https://mss-express.onrender.com/api/schedules/panel/schedules", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setData(res.data)
      } catch (error) {
        toast.error("Failed to fetch schedules")
        console.error("Failed to fetch schedules:", error)
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [])

  if (loading) {
    return <p className="text-center py-10">Loading Schedules...</p>
  }

  // ✅ Fix: use 'data' instead of 'schedules'
  const filteredSchedules = data.filter((sched) =>
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

      <h1 className="text-2xl font-bold mb-4">Panel Schedule List</h1>
      <DataTable columns={columns} data={filteredSchedules} />
    </div>
  )
}
