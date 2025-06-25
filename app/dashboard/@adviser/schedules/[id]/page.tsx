'use client'

import React from 'react'
import { useParams } from 'next/navigation'

import AdviserEditSchedule from '@/components/adviser-edit-schedule'

export default function SchedulePage() {
    const params = useParams()
    const id = params?.id as string
  return (
    <div className='flex w-full justify-center'>
        <AdviserEditSchedule schedId={id} />
    </div>
  )
}
