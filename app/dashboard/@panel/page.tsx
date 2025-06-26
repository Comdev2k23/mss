'use client'

import React from 'react'
import { jwtDecode } from 'jwt-decode'

export default function PanelPage() {

  const token = localStorage.getItem('token')
if (token) {
  const decoded: any = jwtDecode(token)
  console.log(decoded)
}

  return (
    <div>PanelPage</div>
  )
}
