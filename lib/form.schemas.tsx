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

