'use client'

import {z} from 'zod'

export const signupFormSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Email is required"),
    password: z.string().min(6, "Password must at least 6 characters")
})

export const loginFormSchema = z.object({
    email: z.string().email("Email is required"),
    password: z.string().min(6, "Password must at least 6 characters")
})

export const scheduleFormSchema = z.object({
  studentName: z.string().min(1, 'Student name is required'),
  section: z.string().min(1, 'Section is required'),
  manuscriptTitle: z.string().min(1, 'Manuscript title is required'),
  adviser: z.string().min(1, 'Adviser is required'),
  panelMembers: z.array(z.string()).min(1, '3 panel members are required'),
  defenseDate: z.string().min(1, 'Defense date is required'),
  defenseTime: z.string().min(2, 'Time is required'),
  room: z.string().min(1, 'Room is required')
})

export type Schedule = {
  _id: string
  studentId: string
  studentName: string
  section: string
  manuscriptTitle: string
  adviser: string
  panelMembers: string[]
  defenseDate: string // or Date if already parsed
  room: string
  status: "pending" | "approved" | "rejected"
  adviserStatus: "pending" | "approved" | "rejected"
  panelStatus: {
    name: string
    status: "pending" | "approved" | "rejected"
  }[]
  createdAt?: string
  updatedAt?: string
}
