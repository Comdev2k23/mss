import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
 

export default function Layout({children}:{children: React.ReactNode}) {
  return (
     <SidebarProvider >
      <AppSidebar />
      <main className='flex w-3/4 gap-4 h-screen'>
        <SidebarTrigger />  <div className='flex justify-center  w-5/6'>{children}</div>
      </main>
    </SidebarProvider>
  )
}
