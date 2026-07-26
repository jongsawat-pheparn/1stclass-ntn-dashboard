import Link from 'next/link';
import {
  BedSingle,
  Scan,
  ShieldCheck,
  HeartPulse,
  Stethoscope,
  Zap,
  Bandage,
  Package,
  Globe,
  Award,
  Headphones,
} from 'lucide-react';

const categories = [
  {
    code: 'M1',
    nameEN: 'Patient Positioning',
    nameTH: 'การจัดท่าผ่าตัด',
    icon: BedSingle,
    color: 'text-[var(--color-accent-orange)]',
    bg: 'bg-[#F97316]/10',
  },
  {
    code: 'T1',
    nameEN: 'Minimally Invasive Surgery (MIS)',
    nameTH: 'การผ่าตัดผ่านกล้อง',
    icon: Scan,
    color: 'text-[var(--color-accent-cyan)]',
    bg: 'bg-[#0096C7]/10',
  },
  {
    code: 'T2',
    nameEN: 'Infection Prevention Control (IPC)',
    nameTH: 'การป้องกันการติดเชื้อ',
    icon: ShieldCheck,
    color: 'text-[var(--color-accent-green)]',
    bg: 'bg-[#10B981]/10',
  },
  {
    code: 'T3',
    nameEN: "Women's Health and Gynecology",
    nameTH: 'สุขภาพสตรีและสูตินรีเวช',
    icon: HeartPulse,
    color: 'text-[var(--color-accent-red)]',
    bg: 'bg-[#DC2626]/10',
  },
  {
    code: 'T4',
    nameEN: 'Advance Open Surgery Instrument',
    nameTH: 'การผ่าตัดแบบเปิดขั้นสูง',
    icon: Stethoscope,
    color: 'text-[var(--color-heading)]',
    bg: 'bg-[#0A2540]/10',
  },
  {
    code: 'T5',
    nameEN: 'Laser',
    nameTH: 'การผ่าตัดด้วยเลเซอร์',
    icon: Zap,
    color: 'text-[var(--color-accent-yellow)]',
    bg: 'bg-[#EAB308]/10',
  },
  {
    code: 'Tx',
    nameEN: 'Adhesion Prevention',
    nameTH: 'การป้องกันการเกิดพังผืด',
    icon: Bandage,
    color: 'text-[var(--color-accent-cyan)]',
    bg: 'bg-[#0096C7]/10',
  },
];

const highlights = [
  {
    icon: Package,
    title: 'สินค้าหลากหลาย',
    desc: 'ครอบคลุมทุกความต้องการด้านเครื่องมือแพทย์',
  },
  {
    icon: Globe,
    title: 'มาตรฐานสากล',
    desc: 'นำเข้าจากแบรนด์ชั้นนำระดับโลก',
  },
  {
    icon: Headphones,
    title: 'บริการหลังการขาย',
    desc: 'ทีมช่างผู้เชี่ยวชาญพร้อมดูแลตลอดอายุการใช้งาน',
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0A2540] to-[#0096C7] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            ผลิตภัณฑ์ของเรา
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            NTN Medical Team คือตัวแทนจำหน่ายเครื่องมือแพทย์และอุปกรณ์การแพทย์ที่ครบวงจร
            ครอบคลุมตั้งแต่การเตรียมผู้ป่วย การผ่าตัด ไปจนถึงการป้องกันและฟื้นฟู
          </p>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-heading)] mb-4">
              กลุ่มสินค้า
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              เลือกดูผลิตภัณฑ์ตามหมวดหมู่ที่เชี่ยวชาญ
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.code}
                className="group bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 p-6 flex flex-col items-start gap-4"
              >
                <div className={`p-3 rounded-xl ${cat.bg}`}>
                  <cat.icon className={`w-6 h-6 ${cat.color}`} />
                </div>
                <span className="text-sm font-bold text-[var(--color-accent-cyan)]">
                  {cat.code}
                </span>
                <h3 className="font-semibold text-[var(--color-heading)] text-lg leading-tight">
                  {cat.nameEN}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm">{cat.nameTH}</p>
                <div className="mt-auto pt-2">
                  <span className="text-xs text-[var(--color-accent-cyan)] font-medium group-hover:underline cursor-pointer">
                    ดูเพิ่มเติม →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((hl) => (
              <div
                key={hl.title}
                className="text-center bg-[var(--card-bg)] rounded-xl p-6 shadow-sm border border-[var(--border-color)] hover:shadow-md transition"
              >
                <div className="w-14 h-14 mx-auto bg-[#0096C7]/10 rounded-full flex items-center justify-center mb-4">
                  <hl.icon className="w-7 h-7 text-[var(--color-accent-cyan)]" />
                </div>
                <h3 className="font-bold text-[var(--color-heading)] mb-2">
                  {hl.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm">{hl.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-16 md:py-20 bg-white dark:bg-transparent">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-heading)] mb-4">
            ต้องการดูรายละเอียดเพิ่มเติม?
          </h2>
          <p className="text-[var(--text-secondary)] mb-8">
            เข้าสู่หน้าร้านค้าออนไลน์ของเราเพื่อชมสินค้า ราคา และโปรโมชั่นล่าสุด
          </p>
          <Link
            href="https://www.ntntrading.co.th/product"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0096C7] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-btn hover:bg-[#007BA1] hover:-translate-y-0.5 transition-all duration-200"
          >
            <Package className="w-5 h-5" />
            ดูสินค้าทั้งหมด
          </Link>
          <p className="text-xs text-[var(--text-secondary)] mt-4">
            * ลิงก์จะเปิดในแท็บใหม่
          </p>
        </div>
      </section>
    </div>
  );
}