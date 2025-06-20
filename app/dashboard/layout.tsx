'use client';

import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type DecodedToken = {
  role: 'admin' | 'student' | 'adviser' | 'panel';
};

type DashboardProps = {
  admin: React.ReactNode;
  adviser: React.ReactNode;
  student: React.ReactNode;
  panel: React.ReactNode;
};

export default function DashboardLayout({
  admin,
  adviser,
  student,
  panel,
}: DashboardProps) {
  const [role, setRole] = useState<DecodedToken['role'] | null>(null);
 const router = useRouter()
  useEffect(() => {
    try {
      const token = localStorage.getItem('token'); // 🔧 Fix: 'token' should be a string
     
      if (!token) {
        router.push('/');
        alert('Invalid toke or Expired 🍪')
        return;
      }

      const decoded = jwtDecode<DecodedToken>(token);
      setRole(decoded.role);
    } catch (error) {
      console.error('Token decoding failed:', error);
    }
  }, []);

  // Show loading or fallback while decoding token
  if (!role) {
    return <p>Loading dashboard...</p>;
  }

  switch (role) {
    case 'admin':
      return <>{admin}</>;
    case 'student':
      return <>{student}</>;
    case 'adviser':
      return <>{adviser}</>;
    case 'panel':
      return <>{panel}</>;
    default:
      return <p>Invalid role or segment.</p>;
  }
}
