'use client'

import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Button } from './ui/button'
import { Calendar, Clipboard, ClipboardCheck, HamburgerIcon, LogOutIcon, MenuIcon, PlusIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function StudentNavbar() {
    
    const router = useRouter()

     function handleLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("role")

    toast.success("Logged out", {
      description: "You have been successfully logged out.",
    })

    setTimeout(()=> {
      router.push("/login")
    }, 1500)
  }
  return (
    <div>
        <NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger >
        <MenuIcon />
      </NavigationMenuTrigger>
      <NavigationMenuContent className='w-36 flex-col items-center'>
        <div className='flex items-center'>
          <PlusIcon  size={14}/> 
       <NavigationMenuLink href='/dashboard' >
       Schedule
      </NavigationMenuLink>
        </div>
         <div className='flex items-center'>
          <Calendar  size={14}/> 
       <NavigationMenuLink href='/dashboard/calendar' >
       Calendar
      </NavigationMenuLink>
        </div>
         <div className='flex items-center w-36'>
          <ClipboardCheck  size={14}/> 
       <NavigationMenuLink href='/dashboard/schedule' >
       My Schedule
      </NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem className='ml-1'>
        <Button className='bg-red-400' variant={'ghost'} onClick={handleLogout}>
            <LogOutIcon />
            </Button>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
    </div>
  )
}
