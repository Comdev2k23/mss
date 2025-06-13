'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import AdminEditUser from '@/components/admin-edit-user'

export default function UserPage() {
    const params = useParams()
    const id = params?.id as string
  return (
    <div className='flex w-full justify-center'>
        <AdminEditUser userId={id} />
    </div>
  )
}
