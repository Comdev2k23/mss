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
    router.push("/login")

    toast("Logged out", {
      description: "You have been successfully logged out.",
    })
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
      onClick: () =>
        toast("Calendar Clicked", {
          description: "Display calendar data here.",
        }),
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
    {
      key: 'settings',
      title: "Settings",
      icon: Settings,
      type: "link",
      href: "/settings",
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
