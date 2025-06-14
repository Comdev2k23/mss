"use client"

import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
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

export type User = {
  _id: string
  name: string
  email: string
  password: string
  role: {
    name: string
    role: "admin" | "adviser" | "student" | "panel"
  }
  createdAt?: string
  updatedAt?: string
}

export default function AdminEditUser({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [newRole, setNewRole] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) return toast.error("Invalid or missing token")

        const res = await axios.get(
          `https://mss-express.onrender.com/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        setUser(res.data)
        setNewRole(res.data.role.role) // extract string value
      } catch (error) {
        toast.error("Failed to fetch user")
        console.error(error)
      }
    }

    fetchData()
  }, [userId])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem("token")
      if (!token) return toast.error("Missing token")

      await axios.patch(
        `https://mss-express.onrender.com/api/users/update-user/${userId}`,
        { role: newRole }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      toast.success("Role updated successfully")
      router.push("/users")
    } catch (error) {
      console.error("Failed to update user role:", error)
      toast.error("Failed to update role")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex w-1/2 justify-center flex-col gap-6")}>
      <Card className="w-full mt-10 justify-center">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Update User Role</CardTitle>
          <CardDescription>
            Modify the role of the selected user account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>User Name</Label>
                <Input value={user?.name || ""} disabled />
              </div>

              <div className="grid gap-2">
                <Label>Email</Label>
                <Input value={user?.email || ""} disabled />
              </div>

              <div className="grid gap-2">
                <Label>Password</Label>
                <Input value={user?.password || ""} disabled />
              </div>

              <div className="grid gap-2">
                <Label>Role</Label>
                <Select value={newRole} onValueChange={setNewRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="adviser">Adviser</SelectItem>
                    <SelectItem value="panel">Panel</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-1/2"
                  onClick={() => router.push("/users")}
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
