'use client'

type Schedule = {
  _id: string
  studentName: string
  manuscriptTitle: string
  defenseDate: string
  panel: string
  panelStatus: {
    name: string
    status: string
  }[]
}

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircleIcon, BadgeCheckIcon, CheckIcon, FileSliders } from "lucide-react"
import { Button } from '@/components/ui/button'

export default function InboxPage() {
  const [schedules, setSchedules] = useState<Schedule []>([])

  const router = useRouter()

  const handleUpdate = (id: string) => {
    router.push(`/schedules/${id}`)
  } 


  useEffect(()=> {

      async function fetchData () {
        
        try {
          
          const token = localStorage.getItem('token')
          if(!token){
            return toast('Error: Invalid token or expired, please login again')
          }

          const res = await axios.get(
            "https://mss-express.onrender.com/api/schedules/admin/ready-schedules", {
                        headers :{
                            Authorization: `Bearer ${token}`
                        }
                    }
          )
          setSchedules(res.data.schedules)
            console.log(res.data)

        } catch (error) {
            toast.error(`${error}`)          
        }
      }
    fetchData()
  },[])

  return (
      <div className='mt-4'>
          <h1 className="text-2xl font-bold">
      Schedules waiting for admin approval: 
    </h1>
       <div className="flex max-h-72 gap-4 p-4 mt-4">
      { schedules.length === 0 && <p>No schedules ready for approval.</p>}
      
      {schedules.map((schedule) => (
        <Card key={schedule._id}>
          <CardHeader>
            <CardTitle>{schedule.manuscriptTitle}</CardTitle>
          </CardHeader>
          <CardContent>
          <div>
              <p><strong>Student:</strong> {schedule.studentName}</p>
            <p><strong>Date:</strong> {new Date(schedule.defenseDate).toLocaleDateString()}</p>
            <p><strong>Panel:</strong></p>
            <ul className="ml-4 list-disc ">
              {schedule.panelStatus.map((panel, idx) => (
                <li key={idx}>
                  {panel.name} 
                   <Badge variant="secondary" className="bg-green-500 text-white ml-4"  >
                    <BadgeCheckIcon />
                    {panel.status}
                  </Badge>  
                </li>
              ))
              }
            </ul>
                <div className='flex justify-center mt-2'>
              <Button variant={'link'} onClick={() => handleUpdate(schedule._id)}>
               <FileSliders />
               update schedule</Button>
          </div>
          </div>
          </CardContent>
        </Card>
      ))}
    </div>
      </div>
   
  )
}
