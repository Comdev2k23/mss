import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
 

export default function Layout({children}:{children: React.ReactNode}) {
  return (
     <SidebarProvider >
      <AppSidebar />
      <main className='flex gap-4 w-full'>
        <SidebarTrigger />  {children}
      </main>
    </SidebarProvider>
  )
}
