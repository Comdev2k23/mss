"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { scheduleFormSchema } from "@/lib/form.schemas"
import { z } from "zod"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { toast } from "sonner"
import axios from "axios"
import { useRouter } from "next/navigation"

type ScheduleFormData = z.infer<typeof scheduleFormSchema>

export default function ScheduleForm() {
  const form = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      studentName: "",
      section: "",
      manuscriptTitle: "",
      adviser: "",
      panelMembers: [],
      defenseDate: "",
      defenseTime: "",
      room: "",
    },
  })

  const [panelInput, setPanelInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: ScheduleFormData) => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        toast.error("Invalid token or expired")
        setTimeout(() => router.push("/"), 1500)
        return
      }

      const combinedDateTime = new Date(`${data.defenseDate}T${data.defenseTime}`)
      const payload = { ...data, defenseDate: combinedDateTime.toISOString() }

      await axios.post("https://mss-express.onrender.com/api/schedules/new-schedule", payload, {
        headers: { Authorization: `Bearer ${token}` },
      })

      toast.success("Schedule submitted successfully!")
      setTimeout(() => form.reset(), 1500)
    } catch (error) {
      toast.error("Failed to submit schedule.")
    } finally {
      setIsLoading(false)
    }
  }

  const addPanelMember = () => {
    const trimmedInput = panelInput.trim()
    if (trimmedInput && !form.getValues("panelMembers").includes(trimmedInput)) {
      form.setValue("panelMembers", [...form.getValues("panelMembers"), trimmedInput])
      setPanelInput("")
    } else if (form.getValues("panelMembers").includes(trimmedInput)) {
      toast.error("Panel member already added")
    }
  }

  const removePanelMember = (index: number) => {
    const updated = [...form.getValues("panelMembers")]
    updated.splice(index, 1)
    form.setValue("panelMembers", updated)
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-2xl p-4">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

              {/* Student Name and Section - Responsive */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Student Name */}
                <FormField
                  control={form.control}
                  name="studentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter student name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Section */}
                <FormField
                  control={form.control}
                  name="section"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter section" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Manuscript Title */}
              <FormField
                control={form.control}
                name="manuscriptTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manuscript Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter manuscript title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Adviser */}
              <FormField
                control={form.control}
                name="adviser"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adviser</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter adviser name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Panel Members */}
              <FormItem>
                <FormLabel>Panel Members</FormLabel>
                <FormControl>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      placeholder="Enter panel member"
                      value={panelInput}
                      onChange={(e) => setPanelInput(e.target.value)}
                    />
                    <Button type="button" onClick={addPanelMember}>
                      Add
                    </Button>
                  </div>
                </FormControl>

                <div className="flex flex-wrap gap-2 mt-2">
                  {form.watch("panelMembers").map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-2 py-1 rounded bg-gray-200 dark:bg-gray-700"
                    >
                      <span>{member}</span>
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        onClick={() => removePanelMember(index)}
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>

              {/* Defense Date and Time - Responsive */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Defense Date */}
                <FormField
                  control={form.control}
                  name="defenseDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Defense Date</FormLabel>
                      <FormControl>
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => {
                            if (date) {
                              const localDate = `${date.getFullYear()}-${(date.getMonth() + 1)
                                .toString()
                                .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`

                              field.onChange(localDate)
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Defense Time */}
                <FormField
                  control={form.control}
                  name="defenseTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Defense Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Room */}
              <FormField
                control={form.control}
                name="room"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter room" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Schedule"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
