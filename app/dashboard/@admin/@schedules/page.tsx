"use client"

import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { DataTable } from "@/app/dashboard/@admin/@schedules/data-table" // update this path if needed
import { columns } from "./columns"
import { Schedule } from "@/lib/form.schemas" // make sure this matches your type
import { toast } from "sonner"

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [error, setError] = useState<string | null>(null)

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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Schedule List</h1>
      <DataTable columns={columns} data={schedules} />
    </div>
  )
}
