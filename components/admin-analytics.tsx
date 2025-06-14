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
import { User } from 'lucide-react'


type User = {
  _id: string
  name: string
  email: string
  role: string,
}

export default function AdminAnalytics() {
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setError('No token found.')
          return
        }

        const res = await axios.get('https://mss-express.onrender.com/api/users/', {
          headers: { Authorization: `Bearer ${token}` },
        })

        setUsers(res.data)
        setLastUpdated(new Date().toLocaleString()) // <-- run only on client
      } catch (err) {
          if (axios.isAxiosError(err)) {
          const axiosErr = err as AxiosError
          setError(`Error ${axiosErr.response?.status}: ${axiosErr.response?.data}`)
      }
    }}

    fetchUsers()
  }, [])

  return (
    <div >
      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
          <CardDescription>
            {error ? error : 'All users currently in the system'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className='flex gap-2 justify-center items-center'>
                <User size={31} />
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                {users.length}</h1>
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
