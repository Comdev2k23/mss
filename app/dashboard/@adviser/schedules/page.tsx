"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { columns, Schedule } from "./columns"
import { DataTable } from "./data-table"
import { toast } from "sonner"

export default function AdviserSchedulePage() {
  const [data, setData] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          alert("Invalid token")
          return
        }

        const res = await axios.get("https://mss-express.onrender.com/api/schedules/adviser/schedules", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setData(res.data)
      } catch (error) {
        toast.error("Failed to schedules")
        console.error("Failed to schedules:", error)
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [])

  if (loading) {
    return <p className="text-center py-10">Loading Schedules...</p>
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
