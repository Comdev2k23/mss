"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton" // Adjust the path as needed
import { FileSliders } from "lucide-react"
import { useRouter } from "next/navigation"

//  Zod schemas to validate input
const ScheduleSearchFormSchema = z.object({
  schedule: z.string().min(2, { message: "Keyword must be at least 2 characters." }),
})

const UserSearchFormSchema = z.object({
  user: z.string().min(2, { message: "Keyword must be at least 2 characters." }),
})

export function ScheduleSearch() {
  const [schedules, setSchedules] = useState([]) // Store schedule results
  const [users, setUsers] = useState([])         // Store user results
  const [query, setQuery] = useState("")         // Input keyword
  const [loadingSchedules, setLoadingSchedules] = useState(false)
  const [loadingUsers, setLoadingUsers] = useState(false)
  
  const router = useRouter()

  //  React Hook Form for schedules
  const scheduleForm = useForm<z.infer<typeof ScheduleSearchFormSchema>>({
    resolver: zodResolver(ScheduleSearchFormSchema),
    defaultValues: { schedule: "" },
  })

  //  React Hook Form for users
  const userForm = useForm<z.infer<typeof UserSearchFormSchema>>({
    resolver: zodResolver(UserSearchFormSchema),
    defaultValues: { user: "" },
  })

  //  Fetch schedules from backend
  const fetchSchedules = async (keyword: string) => {
    try {
      setLoadingSchedules(true)
      const token = localStorage.getItem("token")
      const res = await axios.get(
        `https://mss-express.onrender.com/api/schedules/admin/search?q=${keyword}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setSchedules(res.data)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Schedule search failed")
      setSchedules([])
    } finally {
      setLoadingSchedules(false)
    }
  }

  //  Fetch users from backend
  const fetchUsers = async (keyword: string) => {
    try {
      setLoadingUsers(true)
      const token = localStorage.getItem("token")
      const res = await axios.get(
        `https://mss-express.onrender.com/api/users/admin/search?q=${keyword}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setUsers(res.data)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "User search failed")
      setUsers([])
    } finally {
      setLoadingUsers(false)
    }
  }

  //  Submit schedule form
  const onSubmitSchedule = (data: z.infer<typeof ScheduleSearchFormSchema>) => {
    const keyword = data.schedule.trim()
    setQuery(keyword)
    fetchSchedules(keyword)
  }

  //  Submit user form
  const onSubmitUser = (data: z.infer<typeof UserSearchFormSchema>) => {
    const keyword = data.user.trim()
    setQuery(keyword)
    fetchUsers(keyword)
  }

  //Handle update button for schedule
  function handleSchedUpdate (schedId :string) {
    router.push(`/schedules/${schedId}`)
  }

  //Handle update button for schedule
  function handleUserUpdate (userId :string) {
    router.push(`/users/${userId}`)
  }

  return (
    <div className="flex flex-col gap-10 p-6">
      <div className="flex flex-col lg:flex-row gap-6">

        {/*  SCHEDULE SEARCH FORM */}
        <Card className="p-4 w-full lg:w-1/2">
          <Form {...scheduleForm}>
            <form onSubmit={scheduleForm.handleSubmit(onSubmitSchedule)} className="space-y-6">
              <FormField
                control={scheduleForm.control}
                name="schedule"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search for Schedule Fields</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. John, BSIT-3A, Thesis Title" {...field} />
                    </FormControl>
                    <FormDescription>
                      Search by student name, section, or manuscript title.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Search Schedule</Button>
            </form>
          </Form>
        </Card>

        {/*  USER SEARCH FORM */}
        <Card className="p-4 w-full lg:w-1/2">
          <Form {...userForm}>
            <form onSubmit={userForm.handleSubmit(onSubmitUser)} className="space-y-6">
              <FormField
                control={userForm.control}
                name="user"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search for User</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. John Mark" {...field} />
                    </FormControl>
                    <FormDescription>
                      Search user by name or by email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Search User</Button>
            </form>
          </Form>
        </Card>
      </div>

      {/*  SCHEDULE LOADING SKELETON */}
      {loadingSchedules && (
        <Card className="p-4">
          <h2 className="font-bold text-lg mb-2">Loading Schedule Results...</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        </Card>
      )}

      {/*  SCHEDULE RESULTS */}
      {schedules.length > 0 && !loadingSchedules && (
        <Card className="p-4">
          <h2 className="font-bold text-lg mb-2">Schedule Results</h2>
          <ul className="space-y-2">
            {schedules.map((sched: any) => (
              <li key={sched._id} className="border p-2 rounded shadow">
                <strong>{sched.studentName}</strong> - {sched.manuscriptTitle}<br />
                Section: {sched.section} | Room: {sched.room} | Status: {sched.status} <Button onClick={() => handleSchedUpdate(sched._id)}>Update</Button>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/*  USER LOADING SKELETON */}
      {loadingUsers && (
        <Card className="p-4">
          <h2 className="font-bold text-lg mb-2">Loading User Results...</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        </Card>
      )}

      {/*  USER RESULTS */}
      {users.length > 0 && !loadingUsers && (
        <Card className="p-4">
          <h2 className="font-bold text-lg mb-2">User Results</h2>
          <ul className="space-y-2">
            {users.map((user: any) => (
              <li key={user._id} className="border p-2 rounded shadow">
                <strong>{user.name}</strong> - {user.email} | Role: {user.role} <Button onClick={() => handleUserUpdate(user._id)}>Update</Button>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}
