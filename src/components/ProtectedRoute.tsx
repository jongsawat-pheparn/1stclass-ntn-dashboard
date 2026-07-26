'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // ถ้ายังไม่มี user (กำลังตรวจสอบหรือยังไม่ login) ให้แสดงข้อความ
  if (!user) {
    return <div className="p-8 text-center">กรุณาเข้าสู่ระบบ...</div>;
  }

  // ถ้ามี user แล้ว ให้แสดงเนื้อหาข้างใน (children)
  return <>{children}</>;
}