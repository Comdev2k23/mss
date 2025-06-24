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
import { HamburgerIcon, LogOutIcon, MenuIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function StudentNavbar() {
    
    const router = useRouter()

     function handleLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("role")

    toast("Logged out", {
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
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
        <Button className='bg-red-400' variant={'ghost'} onClick={handleLogout}>
            <LogOutIcon />
            Logout</Button>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
    </div>
  )
}
