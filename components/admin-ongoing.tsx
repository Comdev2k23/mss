'use client'

import React, { useEffect, useState } from 'react'
import axios,{AxiosError} from 'axios'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Schedule = {
    _id: string,
    studentId: string,
    studentName: string,
    status: string
}

export default function OngoingDefense() {
    const [schedules, setSchedules] = useState<Schedule[]>([])
    const [error, setError] = useState<string | null>(null)
    const [lastUpdated, setLastUpdated] = useState<string | null>(null)
    
    
  useEffect(() => {
    async function fetchSchedules() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setError('No token found.')
          return
        }

        const res = await axios.get('https://mss-express.onrender.com/api/schedules/', {
          headers: { Authorization: `Bearer ${token}` },
        })

        setSchedules(res.data)
        setLastUpdated(new Date().toLocaleString()) // <-- run only on client
      } catch (err) {
          if (axios.isAxiosError(err)) {
          const axiosErr = err as AxiosError
          setError(`Error ${axiosErr.response?.status}: ${axiosErr.response?.data}`)
      }
    }}

    fetchSchedules()
  }, [])
  return (
    <div>
          <Card>
            <CardHeader>
              <CardTitle>Today ongoing defense</CardTitle>
              <CardDescription>
                {error ? error : 'Current session'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                    {schedules.filter(schedule => schedule.status === 'pending').length}</h1>
              )}
            </CardContent>
            <CardFooter>
             <CardDescription>
                 {lastUpdated ? `Last updated: ${lastUpdated}` : 'Loading...'}
             </CardDescription>
            </CardFooter>
          </Card>
        </div>
  )
}
