'use client'


import { useSearchParams } from 'next/navigation'
import React from 'react'

type DashboardProps = {
  admin: React.ReactNode
  adviser: React.ReactNode
  student: React.ReactNode
  panel: React.ReactNode
}

export default function DashboardLayout({
  admin,
  adviser,
  student,
  panel,
}: DashboardProps) {
  const searchParams = useSearchParams()
  const segment = searchParams.get('role')

  switch (segment) {
    case 'admin':
      return <>{admin}</>
    case 'student':
      return <>{student}</>
    case 'adviser':
      return <>{adviser}</>
    case 'panel':
      return <>{panel}</>
    default:
      return <p>Invalid role or segment.</p>
  }
}
