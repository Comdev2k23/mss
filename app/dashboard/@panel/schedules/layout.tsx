import React from 'react'

 

export default function Layout({children}:{children: React.ReactNode}) {
  return (
      <main className='flex gap-4 w-full mr-28'>
       {children}
      </main>
  )
}
