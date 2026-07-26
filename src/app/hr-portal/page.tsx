'use client';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function HRPortal() {
  return (
    <ProtectedRoute>
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">HR Portal</h1>
        <p className="text-gray-700 mb-4">
          คลิกปุ่มด้านล่างเพื่อเข้าสู่ระบบ HR
        </p>
        <a
          href="https://www.ntnmedicalteam.com/office/application/lham/login.php?ref=%2Foffice%2Fapplication%2Flham%2F"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          เข้าสู่ระบบ HR
        </a>
      </div>
    </ProtectedRoute>
  );
}