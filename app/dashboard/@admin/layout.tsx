import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
 

export default function Layout({children, schedules}:{children: React.ReactNode, schedules: React.ReactNode}) {
  return (
     <SidebarProvider >
      <AppSidebar />
      <main className='flex gap-4'>
        <SidebarTrigger />  {children}{schedules}
      </main>
    </SidebarProvider>
  )
}
