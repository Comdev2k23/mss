"use client"

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

// ✅ Define item types
type MenuItem =
  | {
      title: string
      icon: React.ElementType
      type: "link"
      href: string
    }
  | {
      title: string
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
      title: "Home",
      icon: Home,
      type: "link",
      href: "/dashboard",
    },
    {
      title: "Inbox",
      icon: Inbox,
      type: "link",
      href: "/dashboard/inbox",
    },
    {
      title: "Calendar",
      icon: Calendar,
      type: "action",
      onClick: () =>
        toast("Calendar Clicked", {
          description: "Display calendar data here.",
        }),
    },
    {
      title: "Update User",
      icon: User,
      type: "action",
      onClick: () =>
        toast("User Settings", {
          description: "User update triggered.",
        }),
    },
    {
      title: "Search",
      icon: Search,
      type: "link",
      href: "/dashboard/search",
    },
    {
      title: "Settings",
      icon: Settings,
      type: "link",
      href: "/dashboard/settings",
    },
  ]

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
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
