'use client'

import React, { useEffect, useState } from 'react'
import {jwtDecode} from 'jwt-decode'
import { useRouter } from 'next/navigation';

type DecodedToken = {
  role: 'admin' | 'student' | 'adviser' | 'panel';
};


export default function PanelPage() {
    const [error, setError] = useState('')
    
    const router = useRouter()
  
    useEffect(()=> {
      const token = localStorage.getItem('token')
  
      if (!token) {
        return alert('Invalid Token')
      }
  
      const decoded =  jwtDecode<DecodedToken>(token)
      const role = decoded.role
  
      if(role !== 'panel'){
        console.log('🚫You do not have permit to access this page ')
        router.push('/login')
      }
  
    })
  return (
    <div>PanelPage</div>
  )
}
