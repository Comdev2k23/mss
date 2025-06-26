'use client'

import React from 'react'
import { useParams } from 'next/navigation'


import PanelEditSchedule from '@/components/panel-edit-schedule'

export default function SchedulePage() {
    const params = useParams()
    const id = params?.id as string
  return (
    <div className='flex w-full justify-center'>
        <PanelEditSchedule schedId={id} />
    </div>
  )
}
