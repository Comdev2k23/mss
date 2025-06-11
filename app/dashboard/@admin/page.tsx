'use client'

import React, { useEffect } from 'react'

import {jwtDecode} from 'jwt-decode'
import { useRouter } from 'next/navigation';
import AdminAnalytics from '@/components/admin-analytics';
import PendingStatus from '@/components/admin-pending';
import ApprovedStatus from '@/components/admin-approved';
import OngoingDefense from '@/components/admin-ongoing';
import SchedulePage from './@schedules/page';


type DecodedToken = {
  role: 'admin' | 'student' | 'adviser' | 'panel';
};



function AdminPage() {

  
  const router = useRouter()


  useEffect(()=> {
    const token = localStorage.getItem('token')

    if (!token) {
      return alert('Invalid Token')
    }

    const decoded =  jwtDecode<DecodedToken>(token)
    const role = decoded.role

    if(role !== 'admin'){
      console.log('🚫You do not have permit to access this page ')
      router.push('/login')
    }

  })

  

  return (
          <div className='flex-col gap-2 mt-2'>
              <div className='flex gap-2'>
                <AdminAnalytics />
            <PendingStatus />
            <ApprovedStatus />
            <OngoingDefense />
              </div>
            <div>
               <SchedulePage />
            </div>
        </div>
        
  )
}

export default AdminPage