export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] text-[var(--text-primary)] py-10 border-t border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-2">1stClass NTN Trading</h3>
          <p className="text-sm text-[var(--text-secondary)]">ผู้จัดจำหน่ายอุปกรณ์การแพทย์ชั้นนำ</p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2 text-[#0096C7]">ลิงก์ด่วน</h3>
          <ul className="text-sm space-y-1">
            <li><a href="/about" className="hover:underline">รู้จักเรา</a></li>
            <li><a href="/products" className="hover:underline">สินค้า</a></li>
            <li><a href="/contact" className="hover:underline">ติดต่อเรา</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2 text-[#0096C7]">ติดต่อ</h3>
          <p className="text-sm text-[var(--text-secondary)]">123 ถนนสุขุมวิท กรุงเทพฯ 10110</p>
          <p className="text-sm text-[var(--text-secondary)]">โทร: 02-123-4567</p>
        </div>
      </div>
      <div className="text-center text-sm text-[var(--text-secondary)] mt-8 border-t border-[var(--border-color)] pt-6">
        © 2026 1stClass NTN Trading. All rights reserved.
      </div>
    </footer>
  );
}