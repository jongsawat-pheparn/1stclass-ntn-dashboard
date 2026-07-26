'use client';
import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Building2,
  ExternalLink,
} from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A2540] to-[#0096C7] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <MapPin className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">ติดต่อเรา</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            เรายินดีให้บริการและพร้อมรับฟังทุกความคิดเห็นจากคุณ
          </p>
        </div>
      </section>

      {/* ข้อมูลสำนักงาน */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* สำนักงานใหญ่ ขอนแก่น */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#0096C7]/10 rounded-lg">
                <Building2 className="w-6 h-6 text-[var(--color-accent-cyan)]" />
              </div>
              <h3 className="font-bold text-[var(--color-heading)]">สำนักงานใหญ่ (ขอนแก่น)</h3>
            </div>
            <div className="space-y-2 text-sm text-[var(--text-secondary)]">
              <p><strong>NTN Trading-Thailand</strong></p>
              <p>74 หมู่ 1 ตำบลสำราญ อำเภอเมือง จังหวัดขอนแก่น 40000</p>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>043-393685, 088-5644335</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>hr@ntntrading.co.th</span>
              </div>
            </div>
          </div>

          {/* สาขากรุงเทพ */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#F97316]/10 rounded-lg">
                <Building2 className="w-6 h-6 text-[var(--color-accent-orange)]" />
              </div>
              <h3 className="font-bold text-[var(--color-heading)]">สาขากรุงเทพฯ</h3>
            </div>
            <div className="space-y-2 text-sm text-[var(--text-secondary)]">
              <p><strong>บริษัท ตะวันแม็คไวสซ์ จำกัด</strong></p>
              <p>21/3 ถนนลาดพร้าว ซอย 15 แขวงจอมพล เขตจตุจักร กรุงเทพฯ 10900</p>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>02-9385744, 02-9385755</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>tawan@tawanmcweis.com</span>
              </div>
            </div>
          </div>

          {/* เวลาทำการ */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#10B981]/10 rounded-lg">
                <Clock className="w-6 h-6 text-[#10B981]" />
              </div>
              <h3 className="font-bold text-[var(--color-heading)]">เวลาทำการ</h3>
            </div>
            <div className="space-y-2 text-sm text-[var(--text-secondary)]">
              <p>จันทร์ – ศุกร์</p>
              <p className="font-semibold">08.00 – 17.15 น.</p>
            </div>
          </div>
        </div>

        {/* แผนที่ + ฟอร์ม คู่กัน */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* แผนที่ */}
          <div>
            <div className="rounded-xl overflow-hidden border border-[var(--border-color)] shadow-sm h-full">
              <iframe
                title="NTN Trading-Thailand Office"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4795.893017652304!2d102.82590407596447!3d16.538107126713463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3122f515352ac937%3A0x591855b47a3f91d9!2z4Lia4Lij4Li04Lip4Lix4LiXIOC5gOC4reC5h-C4meC4l-C4teC5gOC4reC5h-C4mSDguYDguJfguKPguJTguJTguLTguYnguIcgLSDguJvguKPguLDguYDguJfguKjguYTguJfguKIg4LiI4Liz4LiB4Lix4LiU!5e1!3m2!1sth!2sth!4v1784790769745!5m2!1sth!2sth"
                width="100%"
                height="100%"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full min-h-[400px]"
              ></iframe>
            </div>
            <div className="text-center mt-3">
              <a
                href="https://maps.app.goo.gl/54tUzZNQnSCfcYHu9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[var(--color-accent-cyan)] hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                เปิดแผนที่ขนาดใหญ่ใน Google Maps
              </a>
            </div>
          </div>

          {/* ฟอร์ม */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-heading)] mb-6 flex items-center gap-2">
              <Send className="w-6 h-6 text-[var(--color-accent-cyan)]" />
              ส่งข้อความถึงเรา
            </h2>

            {submitted ? (
              <div className="bg-[#10B981]/10 border border-[#10B981] text-[#10B981] rounded-xl p-6 text-center">
                <h3 className="text-xl font-bold mb-2">ขอบคุณสำหรับข้อความ!</h3>
                <p>เราได้รับการติดต่อของคุณแล้ว และจะตอบกลับโดยเร็วที่สุด</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }); }}
                  className="mt-4 text-sm underline"
                >
                  ส่งข้อความใหม่
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6 md:p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">ชื่อ-นามสกุล</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-[#0096C7] outline-none"
                      placeholder="คุณสมชาย ใจดี"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">อีเมล</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-[#0096C7] outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">เบอร์โทรศัพท์</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-[#0096C7] outline-none"
                      placeholder="081-234-5678"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">ข้อความ</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-[#0096C7] outline-none resize-none"
                      placeholder="พิมพ์ข้อความของคุณที่นี่..."
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#0096C7] text-white px-6 py-3 rounded-xl font-semibold shadow-btn hover:bg-[#007BA1] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Send className="w-5 h-5" />
                  ส่งข้อความ
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}