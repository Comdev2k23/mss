'use client'
import { CalendarCheck } from 'lucide-react';
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

export default function ApprovedStatus() {
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
              <CardTitle>Approved schedules</CardTitle>
              <CardDescription>
                {error ? error : 'Total approved schedules'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                  <div className='flex gap-2 justify-center items-center'>
                    <CalendarCheck size={31} />
                     <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                    {schedules.filter(schedule => schedule.status === 'approved').length}</h1>
                  </div>
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
