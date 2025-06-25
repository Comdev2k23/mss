"use client"
import React from "react"


import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  User,
  LogOutIcon,
} from "lucide-react"

import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"

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
import InboxNotification from "./inbox-notification"

// ✅ Define item types
type MenuItem =
  | {
      key: string
      title: string | React.ReactNode
      icon: React.ElementType
      type: "link"
      href: string
    }
  | {
      key: string
      title: string |React.ReactNode
      icon: React.ElementType
      type: "action"
      onClick: () => void
    }

export function AppSidebar() {
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

  const menuItems: MenuItem[] = [
    {
      key: 'home',
      title: "Home",
      icon: Home,
      type: "link",
      href: "/dashboard",
    },
    {
      key: "inbox",
      title: <span className="flex items-center gap-2">
        Inbox
        {<InboxNotification />}
      </span>,
      icon: Inbox,
      type: "action",
      onClick() {
        router.push('/inbox')
      },
    },
    {
      key: 'calendar',
      title: "Calendar",
      icon: Calendar,
      type: "action",
      onClick: () => {
        router.push('/calendar')
      }
    },
    {
      key: 'update',
      title: "Update User",
      icon: User,
      type: "link",
      href: "/users"
    },
    {
      key: 'search',
      title: "Search",
      icon: Search,
      type: "link",
      href: "/search",
    },
  ]

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  {item.type === "link" ? (
                    <SidebarMenuButton asChild>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  ) : (
                    <SidebarMenuButton onClick={item.onClick}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
              
              <SidebarMenuItem className="list-none mt-1">
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOutIcon />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
