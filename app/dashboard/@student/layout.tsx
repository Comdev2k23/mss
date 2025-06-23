import React from 'react'
import StudentNavbar from '@/components/student-nav'

export default function StudentLayout({children}: {children: React.ReactNode}) {
  return (
      <main className='flex h-screen w-full mt-2 mx-auto'>
         <StudentNavbar />
        {children}
      </main>
  )
}
