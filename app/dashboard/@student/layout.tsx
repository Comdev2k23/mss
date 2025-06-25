"use client"

import React, { useState } from "react"
import StudentNavbar from "@/components/student-nav"
import { Button } from "@/components/ui/button"
import { MenuIcon, XIcon } from "lucide-react"

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <main className="flex h-screen w-full">
      {/* Mobile Sidebar Overlay */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden
          ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-muted p-4 transition-transform lg:relative lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
            <XIcon className="w-5 h-5" />
          </Button>
        </div>
        <StudentNavbar />
      </div>

      {/* Page Content */}
      <div className="flex-1 overflow-y-auto p-4 ml-0 lg:ml-64 w-full">
        {/* Mobile Menu Button */}
        <div className="lg:hidden mb-4">
          <Button variant="outline" size="icon" onClick={() => setIsSidebarOpen(true)}>
            <MenuIcon className="w-5 h-5" />
          </Button>
        </div>

        {children}
      </div>
    </main>
  )
}
