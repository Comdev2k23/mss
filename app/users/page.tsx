"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { columns, User } from "./columns"
import { DataTable } from "./data-table"

export default function UserPage() {
  const [data, setData] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          alert("Invalid token")
          return
        }

        const res = await axios.get("https://mss-express.onrender.com/api/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setData(res.data)
      } catch (error) {
        console.error("Failed to fetch users:", error)
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [])

  if (loading) {
    return <p className="text-center py-10">Loading users...</p>
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
