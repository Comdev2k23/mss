'use client'

import React from 'react'
import { useEffect, useState } from "react"
import axios from "axios"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AlertCircleIcon, BadgeCheckIcon, CheckIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { toast } from 'sonner'

type PanelStatus = {
  name: string
  status: string
}   

export default function InboxNotification() {
    const [notifCount, setNotifCount] = useState(0)

    useEffect(() => {

        async function fetchNotification () {

            try {
                const token = localStorage.getItem('token')
                const res = await axios.get(
                    "https://mss-express.onrender.com/api/schedules/admin/ready-schedules", {
                        headers :{
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setNotifCount(res.data.count)

            } catch (error) {
                toast.error('Error fetching notification')
            }
        }

        fetchNotification()
    },[])

  return (
    <div>
        {notifCount === 0 ? '': <Badge variant={'destructive'} 
        className='rounded-full'>
          {notifCount}</Badge>}
    </div>
  )
}
