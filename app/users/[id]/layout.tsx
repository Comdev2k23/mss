import React from 'react'

export default function Layout({children}: {children : React.ReactNode}) {
  return (
    <div className='flex gap-4 w-full'>
        {children}
    </div>
  )
}
