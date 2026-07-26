'use client';
import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import {
  LayoutDashboard,
  CalendarCheck,
  Building2,
  UserCheck,
  TrendingUp,
  Bell,
  Clock,
  ChevronRight,
  ShoppingCart,
  FileText,
  Shield,
} from 'lucide-react';

// ---------- ข้อมูลการ์ด ----------
const dailySubItems = [
  { icon: ShoppingCart, label: 'สรุปยอดรับคำสั่งซื้อ PO', desc: 'ยอดรับออร์เดอร์ใหม่ประจำวัน บ.เอ็นทีเอ็น' },
  { icon: FileText, label: 'สรุปยอดขาย (Invoice NTN)', desc: 'ยอดรับเปิดบิลขาย บ.เอ็นทีเอ็น' },
  { icon: FileText, label: 'สรุปยอดออกบิล บ.ตะวัน (Invoice TWM)', desc: 'ยอดขาย ยอดบริการ และยอดเช่า บ.ตะวัน' },
];

const departmentList = [
  'ฝ่ายทรัพยากรบุคคล', 'ฝ่ายทรัพย์สิน', 'ฝ่ายไอที',
  'ฝ่ายจัดหาดูแลสินค้าและพัฒนาธุรกิจ', 'ฝ่ายจัดการออร์เดอร์ลูกค้าหลัก',
  'ฝ่ายดูแลลูกค้า', 'ฝ่ายดูแลสินค้า', 'ฝ่ายบัญชีและการเงิน',
];

const talentList = [
  'สมุดพกพนักงานฝ่ายทรัพยากรบุคคล', 'สมุดพกพนักงานฝ่ายทรัพย์สิน', 'สมุดพกพนักงานฝ่ายไอที',
  'สมุดพกพนักงานฝ่ายจัดหาดูแลสินค้าและพัฒนาธุรกิจ', 'สมุดพกพนักงานฝ่ายจัดการออร์เดอร์ลูกค้าหลัก',
  'สมุดพกพนักงานฝ่ายดูแลลูกค้า', 'สมุดพกพนักงานฝ่ายดูแลสินค้า', 'สมุดพกพนักงานฝ่ายบัญชีและการเงิน',
];

function DashboardHubContent() {
  const { user, userData } = useAuth();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('สวัสดีตอนเช้า');
    else if (hour < 18) setGreeting('สวัสดีตอนบ่าย');
    else setGreeting('สวัสดีตอนเย็น');
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[var(--bg-primary)]">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-[#0A2540] to-[#0096C7] text-white py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-white/70 text-xs md:text-sm mb-0.5">
                {greeting}, {userData?.displayName || user?.email?.split('@')[0]}
              </p>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <LayoutDashboard className="w-6 h-6 text-[#F97316]" />
                1st Class Dashboard Hub
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Clock className="w-3.5 h-3.5" />
              <span>{new Date().toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </section>

        {/* Dashboard Modules Grid */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Dashboard */}
            <Link href="/dashboard/daily" className="group bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
              <div className="bg-gradient-to-br from-[#F97316] via-[#EA580C] to-[#C2410C] px-5 py-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold">Daily Dashboard</h3>
                    <p className="text-xs text-white/80">รายงานสรุปผลรายวัน</p>
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-2 flex-1">
                {dailySubItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors">
                    <item.icon className="w-4 h-4 text-[var(--color-accent-cyan)] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-[var(--color-heading)]">{item.label}</div>
                      <div className="text-xs text-[var(--text-secondary)]">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-5 pb-4 flex items-center justify-end text-xs text-[var(--color-accent-cyan)] group-hover:underline">
                <span>ดูรายละเอียด</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </div>
            </Link>

            {/* Department Dashboard */}
            <Link href="/dashboard/department" className="group bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
              <div className="bg-gradient-to-br from-[#0096C7] via-[#007BA1] to-[#006080] px-5 py-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold">Department Dashboard</h3>
                    <p className="text-xs text-white/80">รายงานผลงานระดับฝ่าย</p>
                  </div>
                </div>
              </div>
              <div className="p-5 grid grid-cols-2 gap-1.5 flex-1">
                {departmentList.map((dept, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors text-xs text-[var(--text-secondary)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-cyan)] flex-shrink-0" />
                    <span className="truncate">{dept}</span>
                  </div>
                ))}
              </div>
              <div className="px-5 pb-4 flex items-center justify-end text-xs text-[var(--color-accent-cyan)] group-hover:underline">
                <span>ดูรายละเอียด</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </div>
            </Link>

            {/* Employee Performance Dashboard */}
            <Link href="/dashboard/talent" className="group bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
              <div className="bg-gradient-to-br from-[#0A2540] via-[#1A3B5C] to-[#2A5080] px-5 py-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold">Employee Performance Dashboard</h3>
                    <p className="text-xs text-white/80">สมุดพกพนักงาน - ประเมินผลตัวชี้วัด</p>
                  </div>
                </div>
              </div>
              <div className="p-5 grid grid-cols-2 gap-1.5 flex-1">
                {talentList.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors text-xs text-[var(--text-secondary)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-orange)] flex-shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
              <div className="px-5 pb-4 flex items-center justify-end text-xs text-[var(--color-accent-cyan)] group-hover:underline">
                <span>ดูรายละเอียด</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </div>
            </Link>

            {/* Corporate Dashboard */}
            <Link href="/dashboard/corporate" className="group bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col relative">
              <div className="bg-gradient-to-br from-[#7F1D1D] via-[#991B1B] to-[#B91C1C] px-5 py-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold">Corporate Dashboard</h3>
                    <p className="text-xs text-white/80">สรุปผลงานองค์กร (ผู้บริหารระดับสูง)</p>
                  </div>
                  <span className="ml-auto text-[10px] bg-[#EAB308] text-[#0A2540] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Executive Only
                  </span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-center">
                <div className="bg-[var(--bg-secondary)] rounded-lg p-4 text-center">
                  <Shield className="w-6 h-6 text-[#DC2626] mx-auto mb-2" />
                  <p className="text-xs text-[var(--text-secondary)]">
                    ภาพรวมผลประกอบการ, วิเคราะห์แนวโน้ม, และตัวชี้วัดระดับองค์กรสำหรับผู้บริหาร
                  </p>
                </div>
              </div>
              <div className="px-5 pb-4 flex items-center justify-end text-xs text-[var(--color-accent-cyan)] group-hover:underline">
                <span>ดูรายละเอียด</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </div>
            </Link>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm">
            <h3 className="text-base font-bold text-[var(--color-heading)] mb-3 flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#F97316]" />
              กิจกรรมล่าสุด
            </h3>
            <div className="space-y-2 text-sm">
              {[
                { time: '10:30 น.', text: 'Daily Dashboard อัปเดตข้อมูลเรียบร้อย' },
                { time: '09:15 น.', text: 'มีประกาศใหม่: แนวทางการเบิกจ่ายประจำเดือน' },
                { time: 'เมื่อวาน', text: 'KPI ฝ่ายขายบรรลุเป้า 95%' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-[var(--text-secondary)]">
                  <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs text-[var(--text-secondary)] mr-2">{item.time}</span>
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}

export default function DashboardHubPage() {
  return <DashboardHubContent />;
}