'use client';
import { useState, useEffect } from 'react';
import {
  BookOpen,
  Target,
  Eye,
  Heart,
  Shield,
  Users,
  LayoutDashboard,
  Menu,
  X,
  ChevronRight,
  Ship,
  Store,
  Monitor,
  Calendar,
  Building,
  Factory,
  Globe,
  Quote,
  ChevronDown,
  User,
  Handshake,
  TrendingUp,
  Users2,
  Landmark,
  Star,
  CheckCircle2,
  Sparkles,
  Zap,
  Flag,
} from 'lucide-react';

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState('legacy');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMission, setOpenMission] = useState<string | null>(null);
  const [openCoreCheck, setOpenCoreCheck] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const menuItems = [
    { id: 'legacy', label: 'จากรุ่นสู่รุ่น', icon: BookOpen },
    { id: 'resolution', label: 'ปณิธานและความมุ่งมั่น', icon: Target },
    { id: 'purpose-vision', label: 'จุดมุ่งหมาย / วิสัยทัศน์ / พันธกิจ / ค่านิยม', icon: Eye },
    { id: 'culture', label: 'วัฒนธรรมองค์กร', icon: Sparkles },
    { id: 'identity', label: 'อัตลักษณ์องค์กร', icon: Shield },
    { id: 'structure', label: 'โครงสร้างองค์กร', icon: Users },
  ];

  const missionGroups = [
    {
      id: 'customers',
      title: 'บริษัทกับลูกค้า',
      icon: User,
      color: '#0096C7',
      items: [
        'เป็นตัวกลางในการจัดการนำสินค้าที่ได้มาตรฐาน ราคายุติธรรม มาบริการลูกค้าให้ได้รับและเกิดความพึงพอใจสูงสุด',
        'เป็นผู้เชี่ยวชาญในการนำสินค้าที่ใช้นวัตกรรมและเทคโนโลยีชั้นสูงในการผลิตและการใช้ มาเสนอขายกับผู้เชี่ยวชาญทุกสาขา',
        'เป็นผู้สร้าง ผลิต เครื่องมือแพทย์ที่ได้มาตรฐานสากลและมีคุณภาพสูง',
        'พัฒนาร่วมกับผู้มีความรู้อย่างต่อเนื่องและลงทุนด้านวิจัยอย่างต่อเนื่อง',
        'เป็นผู้สร้าง ผู้กำหนด มาตรฐานการบริการหลังการขายแบบมืออาชีพให้กับตลาดอย่างต่อเนื่อง และให้เกิดความไว้วางใจและความเชื่อมั่นจากลูกค้า',
      ],
    },
    {
      id: 'employees',
      title: 'บริษัทกับพนักงาน',
      icon: Users2,
      color: '#0A2540',
      items: [
        'สนับสนุนและส่งเสริมให้พนักงานทุกคนได้รับโอกาสพัฒนาองค์ความรู้ ให้มีความสามารถทำงาน ให้ได้ผลงานยอดเยี่ยมกับลูกค้าทุกราย',
        'ให้โอกาสในการศึกษาอบรมทั้งภายในและภายนอกประเทศ',
        'ให้พนักงานทุกคนมีรายได้เพิ่มขึ้นทุกปี',
        'ให้พนักงานได้รับรางวัลในความสำเร็จตามเป้าหมาย',
      ],
    },
    {
      id: 'shareholders',
      title: 'บริษัทกับผู้ถือหุ้น',
      icon: TrendingUp,
      color: '#F97316',
      items: [
        'สร้างองค์กรที่มีการบริหารจัดการที่ได้มาตรฐานสากล มีผลงานเทียบบริษัทชั้นนำของโลก มีการเติบโตอย่างสม่ำเสมอ มูลค่าหุ้นเพิ่มขึ้นทุกปี',
      ],
    },
    {
      id: 'partners',
      title: 'บริษัทกับคู่ค้า',
      icon: Handshake,
      color: '#EAB308',
      items: [
        'ทำการค้าแบบสากล ทั้งการกำหนดราคาและการเคลื่อนย้ายสินค้า',
        'ทำงานกับสินค้าของคู่ค้าอย่างมีเป้าหมายและประสบความสำเร็จ',
      ],
    },
    {
      id: 'society',
      title: 'บริษัทกับสังคม',
      icon: Landmark,
      color: '#DC2626',
      items: [
        'บริหารงานให้เป็นแบบอย่างให้บริษัทในท้องถิ่นเห็นเป็นต้นแบบในการทำธุรกิจ เพื่อยกสถานะบริษัทระดับประเทศและนานาชาติ',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden sticky top-16 z-40 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] px-4 py-3 flex items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--color-accent-cyan)]"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          <span className="font-semibold text-sm">รู้จักเรา</span>
        </button>
        <span className="ml-auto text-xs text-[var(--text-secondary)]">
          {menuItems.find((item) => item.id === activeSection)?.label}
        </span>
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar – Sticky on Desktop */}
        <aside
          className={`
            fixed top-16 left-0 z-30 h-[calc(100vh-4rem)] w-64 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] overflow-y-auto transition-transform duration-300
            lg:translate-x-0 lg:sticky lg:top-16 lg:z-auto lg:h-[calc(100vh-4rem)]
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4 text-[var(--color-heading)] flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-[var(--color-accent-orange)]" />
              รู้จักเรา
            </h2>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 hover:bg-[#F97316]/10 hover:text-[var(--color-accent-orange)] ${
                    activeSection === item.id
                      ? 'bg-[#F97316]/10 font-semibold border-r-2 border-[#F97316] text-[var(--color-accent-orange)]'
                      : 'text-[var(--text-secondary)]'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${activeSection === item.id ? 'text-[var(--color-accent-orange)]' : ''}`} />
                  <span>{item.label}</span>
                  {activeSection === item.id && <ChevronRight className="w-3 h-3 ml-auto" />}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 px-4 py-8 lg:px-12 max-w-4xl">
          {/* Hero mini */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-heading)]">
              รู้จัก<span className="text-[var(--color-accent-orange)]">เรา</span>
            </h1>
            <p className="text-[var(--text-secondary)] mt-2">
              ทำความรู้จักกับ NTN Medical Team องค์กรที่เติบโตจากรุ่นสู่รุ่น
            </p>
          </div>

          {/* ============================================ */}
          {/* Section: จากรุ่นสู่รุ่น */}
          {/* ============================================ */}
          <section id="legacy" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[var(--color-heading)]">
              <BookOpen className="w-6 h-6 text-[var(--color-accent-orange)]" /> จากรุ่นสู่รุ่น
            </h2>

            <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
              จุดเริ่มต้นของ NTN Trading นั้นเกิดจากความมุ่งมั่นและความอุตสาหะที่ส่งต่อกันมาจากรุ่นสู่รุ่น โดยเริ่มจากการค้าขายเล็กๆ จนเติบโตเป็นผู้นำเข้าและจัดจำหน่ายเครื่องมือแพทย์ระดับประเทศ
            </p>

            <div className="relative pl-8 md:pl-12">
              <div className="absolute left-3 md:left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#F97316] via-[#0096C7] to-[#0A2540] rounded-full" />

              {/* รุ่นที่ 1 */}
              <div className="mb-10 relative group">
                <div className="absolute left-[-1.65rem] md:left-[-2.15rem] top-6 w-6 h-6 bg-[#F97316] rounded-full border-4 border-white shadow-md z-10" />
                <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-[#F97316] text-white p-4 flex items-center justify-center md:w-20 md:flex-shrink-0">
                      <Ship className="w-8 h-8" />
                    </div>
                    <div className="p-5 flex-1">
                      <h3 className="text-xl font-bold text-[var(--color-heading)] mb-2">
                        รุ่นที่ 1 : <span className="text-[var(--color-accent-orange)]">จุดเริ่มต้นบนสายน้ำ</span>
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        จากครอบครัวทำไร่ทำนาในชนบทประเทศจีน สู่การทำธุรกิจในประเทศไทย เริ่มทำการค้าบนเรือสินค้า จากกรุงเทพฯ ล่องไปยังจังหวัดต่างๆ
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* รุ่นที่ 2 */}
              <div className="mb-10 relative group">
                <div className="absolute left-[-1.65rem] md:left-[-2.15rem] top-6 w-6 h-6 bg-[#0096C7] rounded-full border-4 border-white shadow-md z-10" />
                <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-[#0096C7] text-white p-4 flex items-center justify-center md:w-20 md:flex-shrink-0">
                      <Store className="w-8 h-8" />
                    </div>
                    <div className="p-5 flex-1">
                      <h3 className="text-xl font-bold text-[var(--color-heading)] mb-2">
                        รุ่นที่ 2 : <span className="text-[var(--color-accent-cyan)]">ก้าวสู่สากลทางการแพทย์</span>
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        ขึ้นฝั่งเปิดร้านขายของชำที่จังหวัดนครนายก นำมาต่อยอดขยายร้านเป็นซุปเปอร์สโตร์ที่ใหญ่และประสบความสำเร็จสูงสุดในจังหวัดนครนายก และแยกแตกแขนงมาทำธุรกิจในอุตสาหกรรมทางการแพทย์ เป็นที่มาของ <strong className="text-[var(--color-heading)]">NTN MEDICAL TEAM</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* รุ่นที่ 3 */}
              <div className="relative group">
                <div className="absolute left-[-1.65rem] md:left-[-2.15rem] top-6 w-6 h-6 bg-[#0A2540] rounded-full border-4 border-white shadow-md z-10" />
                <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-[#0A2540] text-white p-4 flex items-center justify-center md:w-20 md:flex-shrink-0">
                      <Monitor className="w-8 h-8" />
                    </div>
                    <div className="p-5 flex-1">
                      <h3 className="text-xl font-bold text-[var(--color-heading)] mb-2">
                        รุ่นที่ 3 : <span className="text-[var(--color-heading)]">นวัตกรรมและเทคโนโลยี</span>
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        ขยายธุรกิจสู่การนำเข้าเครื่องมือแพทย์ที่ใช้เทคโนโลยีขั้นสูง ยกระดับการบริการหลังการขาย และพัฒนาระบบการบริหารจัดการองค์กรด้วยเทคโนโลยีสารสนเทศที่ทันสมัย
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================ */}
          {/* Section: ปณิธานและความมุ่งมั่น */}
          {/* ============================================ */}
          <section id="resolution" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[var(--color-heading)]">
              <Target className="w-6 h-6 text-[var(--color-accent-orange)]" /> ปณิธานและความมุ่งมั่น
            </h2>

            {/* Quote Highlight */}
            <div className="bg-gradient-to-r from-[#F97316]/10 to-transparent border-l-4 border-[#F97316] rounded-r-xl p-6 mb-10">
              <Quote className="w-8 h-8 text-[var(--color-accent-orange)] mb-2" />
              <p className="text-xl md:text-2xl font-bold text-[var(--color-heading)] leading-snug">
                “ทุกองค์กรมีจุดเริ่มต้น และทุกจุดเริ่มต้นล้วนเกิดจากความเชื่อ”
              </p>
            </div>

            {/* Founder Story */}
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] shadow-sm p-6 mb-10 hover:shadow-md transition">
              <h3 className="text-lg font-bold text-[var(--color-accent-cyan)] mb-3 flex items-center gap-2">
                <Building className="w-5 h-5" /> แรงบันดาลใจจากความเชื่อ
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                เดิมทีสังคมไทยมีความเชื่อว่า ภาคตะวันออกเฉียงเหนือเป็นพื้นที่ที่ห่างไกลจากความเจริญและเทคโนโลยีชั้นสูง ความเชื่อนี้ได้กลายเป็นแรงบันดาลใจสำคัญให้ <strong className="text-[var(--color-heading)]">นายบุญเลิศ บูรณศักดา</strong> ก่อตั้ง NTN Medical Team ขึ้น เพื่อพิสูจน์ว่า จังหวัดขอนแก่นและภาคตะวันออกเฉียงเหนือ สามารถเป็นศูนย์กลางของธุรกิจด้านเครื่องมือแพทย์ เทคโนโลยี และองค์ความรู้ที่ทันสมัยได้เช่นเดียวกับพื้นที่อื่นของประเทศ
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mt-3">
                ด้วยความมุ่งมั่น อดทน และไม่ย่อท้อต่ออุปสรรค ผู้ก่อตั้งได้สร้างองค์กรให้เติบโตอย่างต่อเนื่อง จนได้รับการยอมรับว่า ประเทศไทยมิได้จำกัดอยู่เพียงกรุงเทพมหานครเท่านั้น หากแต่ภูมิภาคต่าง ๆ ก็สามารถเป็นแหล่งรวมของผู้มีความรู้ ผู้เชี่ยวชาญ และเทคโนโลยีทางการแพทย์ที่ทันสมัยได้เช่นเดียวกัน
              </p>
            </div>

            {/* จุดเริ่มต้น NTN Medical Team */}
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] shadow-sm p-6 mb-10 hover:shadow-md transition">
              <h3 className="text-lg font-bold text-[var(--color-accent-orange)] mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5" /> จุดเริ่มต้นของ NTN Medical Team
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                NTN Medical Team เริ่มดำเนินธุรกิจด้านเครื่องมือ เครื่องใช้ และอุปกรณ์ทางการแพทย์ในจังหวัดขอนแก่น ตั้งแต่ปี <strong className="text-[var(--color-heading)]">พ.ศ. 2521</strong> ภายใต้ชื่อ <strong className="text-[var(--color-heading)]">บริษัท เอ็นทีเอ็น เทรดดิ้ง-ประเทศไทย จำกัด (NTN Trading-Thailand Company Limited)</strong>
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mt-3">
                ในระยะแรก บริษัทดำเนินธุรกิจในรูปแบบ “ซื้อมา–ขายไป” โดยจัดจำหน่ายเครื่องมือและอุปกรณ์สำหรับโรงพยาบาลเกือบทุกประเภท พร้อมยึดมั่นในหลักความเชี่ยวชาญ ความเป็นมืออาชีพ คุณธรรม และจริยธรรมในการดำเนินธุรกิจต่อ ลูกค้า คู่ค้า พนักงาน และผู้มีส่วนได้ส่วนเสียทุกฝ่าย
              </p>
            </div>

            {/* Timeline การเติบโต */}
            <div className="mb-10">
              <h3 className="text-lg font-bold text-[var(--color-heading)] mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[var(--color-accent-cyan)]" /> การเติบโตของกลุ่มบริษัท
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] shadow-sm hover:shadow-lg transition p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#0096C7] text-white px-3 py-1 rounded-bl-xl text-sm font-bold">2544</div>
                  <Factory className="w-8 h-8 text-[var(--color-accent-cyan)] mb-3" />
                  <h4 className="font-bold text-[var(--color-heading)] mb-2">บริษัท ตะวันแม็คไวสซ์ จำกัด</h4>
                  <p className="text-[var(--text-secondary)] text-sm">
                    ก่อตั้งเพื่อดำเนินธุรกิจด้านการจัดจำหน่ายเครื่องมือแพทย์เฉพาะทาง โดยมุ่งเน้นผลิตภัณฑ์สำหรับการผ่าตัดผ่านกล้อง ระบบวีดิทัศน์ทางการแพทย์ และผลิตภัณฑ์เทคโนโลยีขั้นสูง พร้อมพัฒนาความเชี่ยวชาญเฉพาะด้านอย่างต่อเนื่อง
                  </p>
                </div>

                <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] shadow-sm hover:shadow-lg transition p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#F97316] text-white px-3 py-1 rounded-bl-xl text-sm font-bold">2547</div>
                  <Factory className="w-8 h-8 text-[var(--color-accent-orange)] mb-3" />
                  <h4 className="font-bold text-[var(--color-heading)] mb-2">บริษัท เฮอร์เบิร์ท (ประเทศไทย) จำกัด</h4>
                  <p className="text-[var(--text-secondary)] text-sm">
                    เริ่มพัฒนาศักยภาพสู่การเป็นผู้ผลิตเครื่องมือแพทย์ โดยลงทุนพัฒนาบุคลากร โรงงานผลิต และระบบบริการหลังการขาย บุคลากรได้รับการอบรมจากบริษัทแม่เพื่อให้บริการครบวงจรอย่างมืออาชีพ
                  </p>
                </div>
              </div>
            </div>

            {/* พันธกิจในการก่อตั้ง */}
            <div className="bg-[#0A2540] text-white rounded-xl p-6 mb-10">
              <Quote className="w-6 h-6 text-[var(--color-accent-orange)] mb-3" />
              <p className="text-lg leading-relaxed">
                “นับตั้งแต่วันแรกของการก่อตั้ง NTN Medical Team มีความเชื่อว่า การพัฒนาอุตสาหกรรมเครื่องมือแพทย์มิใช่เพียงการจำหน่ายผลิตภัณฑ์ แต่ต้องเป็นการพัฒนาองค์ความรู้ บุคลากร เทคโนโลยี ลูกค้า และทุกภาคส่วนที่เกี่ยวข้องไปพร้อมกัน”
              </p>
              <p className="mt-4 text-gray-300">
                องค์กรจึงมุ่งมั่นพัฒนาศักยภาพของตนเองอย่างต่อเนื่อง เพื่อมีส่วนร่วมในการยกระดับอุตสาหกรรมเครื่องมือแพทย์ของประเทศไทย ให้สามารถแข่งขันและเติบโตได้อย่างทัดเทียมในระดับสากล
              </p>
            </div>

            {/* กลุ่มบริษัท NTN Medical Team */}
            <h3 className="text-xl font-bold text-[var(--color-heading)] mb-6 flex items-center gap-2">
              <Building className="w-6 h-6 text-[var(--color-accent-cyan)]" /> กลุ่มบริษัท NTN Medical Team
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] shadow-sm p-6 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-[#0A2540]/10 rounded-full flex items-center justify-center mb-4">
                  <Building className="w-6 h-6 text-[var(--color-heading)]" />
                </div>
                <h4 className="font-bold text-[var(--color-heading)] mb-1">NTN TRADING-THAILAND</h4>
                <p className="text-xs text-[var(--text-secondary)] mb-3">บริษัท เอ็นทีเอ็น เทรดดิ้ง-ประเทศไทย จำกัด</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>ก่อตั้ง: 10 พ.ย. 2521</li>
                  <li>ที่อยู่: 74 ม.1 ต.สำราญ อ.เมือง จ.ขอนแก่น 40000</li>
                  <li>โทร: 043-393685</li>
                  <li>ทะเบียน: 0405521000123</li>
                </ul>
              </div>

              <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] shadow-sm p-6 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-[#0096C7]/10 rounded-full flex items-center justify-center mb-4">
                  <Factory className="w-6 h-6 text-[var(--color-accent-cyan)]" />
                </div>
                <h4 className="font-bold text-[var(--color-heading)] mb-1">HERBERT (THAILAND)</h4>
                <p className="text-xs text-[var(--text-secondary)] mb-3">บริษัท เฮอร์เบิร์ท (ประเทศไทย) จำกัด</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>ผลิต/ซ่อม/ติดตั้ง/จำหน่ายวัสดุการแพทย์</li>
                  <li>ก่อตั้ง: 4 มิ.ย. 2534</li>
                  <li>ที่อยู่: 47 ม.1 ต.สำราญ อ.เมือง จ.ขอนแก่น 40000</li>
                  <li>โทร: 043-393695</li>
                  <li>ทะเบียน: 0405534000259</li>
                </ul>
              </div>

              <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] shadow-sm p-6 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-[#F97316]/10 rounded-full flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-[var(--color-accent-orange)]" />
                </div>
                <h4 className="font-bold text-[var(--color-heading)] mb-1">TAWANMCWEIS</h4>
                <p className="text-xs text-[var(--text-secondary)] mb-3">บริษัท ตะวันแม็คไวสซ์ จำกัด</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>ตัวแทนจำหน่ายเครื่องมือแพทย์เฉพาะทาง</li>
                  <li>ก่อตั้ง: 19 ก.พ. 2544</li>
                  <li>ที่อยู่: 21/3 ถ.ลาดพร้าว ซ.15 แขวงจอมพล เขตจตุจักร กทม. 10900</li>
                  <li>โทร: 02-9385744, 02-9385755</li>
                  <li>ทะเบียน: 0105544016738</li>
                </ul>
              </div>
            </div>

            {/* ก้าวต่อไป */}
            <div className="bg-gradient-to-r from-[#0096C7]/10 to-[#F97316]/10 border border-[#0096C7]/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-[var(--color-heading)] mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[var(--color-accent-cyan)]" /> ก้าวต่อไปของ NTN Medical Team
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                จากจุดเริ่มต้นในจังหวัดขอนแก่น สู่การเติบโตเป็นกลุ่มบริษัทด้านเครื่องมือแพทย์ที่มีความเชี่ยวชาญ NTN Medical Team ยังคงยึดมั่นในเจตนารมณ์ของผู้ก่อตั้งในการพัฒนาองค์ความรู้ เทคโนโลยี และความร่วมมืออย่างต่อเนื่อง เรามุ่งมั่นที่จะเป็นหนึ่งในผู้เล่นระดับโลกในอุตสาหกรรมเครื่องมือแพทย์ และทำให้ชื่อของ NTN Medical Team ปรากฏบนแผนที่โลก ด้วยคุณภาพ มาตรฐาน และความไว้วางใจที่สร้างขึ้นจากการทำงานร่วมกันของบุคลากรทุกคน
              </p>
            </div>
          </section>

          {/* ============================================ */}
          {/* Section: จุดมุ่งหมาย / วิสัยทัศน์ / พันธกิจ / ค่านิยม */}
          {/* ============================================ */}
          <section id="purpose-vision" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[var(--color-heading)]">
              <Eye className="w-6 h-6 text-[var(--color-accent-orange)]" /> จุดมุ่งหมาย / วิสัยทัศน์ / พันธกิจ / ค่านิยม
            </h2>

            {/* Corporate Purpose */}
            <div className="bg-gradient-to-br from-[#F97316] via-[#F97316]/90 to-[#0096C7] text-white rounded-xl p-6 md:p-8 mb-10 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-7 h-7" />
                <h3 className="text-lg font-bold uppercase tracking-wider">Corporate Purpose</h3>
              </div>
              <p className="text-2xl md:text-3xl font-bold leading-snug mb-4">
                “เชื่อมโยงความร่วมมือ สร้างองค์ความรู้ และขับเคลื่อนนวัตกรรมด้านเครื่องมือแพทย์ เพื่อยกระดับคุณภาพการรักษาพยาบาล และสร้างมาตรฐานระดับโลก”
              </p>
              <div className="border-t border-white/20 pt-4 mt-4">
                <p className="text-sm opacity-90 leading-relaxed">
                  <strong>Purpose คือเหตุผลของการมีอยู่ขององค์กร</strong> เป็นคำตอบของคำถามว่า “เราดำรงอยู่เพื่ออะไร”<br />
                  NTN Medical Team มุ่งมั่นเป็นศูนย์กลางในการเชื่อมโยงผู้คน องค์ความรู้ เทคโนโลยี และนวัตกรรม เพื่อร่วมกันยกระดับคุณภาพการรักษาพยาบาล และสร้างมาตรฐานด้านเครื่องมือแพทย์ที่ได้รับการยอมรับในระดับโลก
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0096C7]/10 rounded-full mb-4">
                <Globe className="w-8 h-8 text-[var(--color-accent-cyan)]" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent-cyan)] mb-2">Vision</h3>
              <p className="text-2xl md:text-3xl font-bold text-[var(--color-heading)] leading-snug">
                “เป็นหนึ่งในผู้เล่นระดับโลกในอุตสาหกรรมเครื่องมือแพทย์ ปรากฏบนแผนที่โลก”
              </p>
              <p className="text-[var(--text-secondary)] mt-3 max-w-xl mx-auto">
                วิสัยทัศน์นี้สะท้อนความมุ่งมั่นของ NTN Medical Team ที่จะพัฒนาองค์กร บุคลากร เทคโนโลยี และมาตรฐานการดำเนินงานอย่างต่อเนื่อง เพื่อก้าวสู่การเป็นองค์กรที่ได้รับการยอมรับในระดับสากล
              </p>
            </div>

            {/* Mission – Accordion */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-[var(--color-accent-orange)]" />
                <h3 className="text-xl font-bold text-[var(--color-heading)]">Mission</h3>
              </div>
              <div className="space-y-4">
                {missionGroups.map((group) => (
                  <div
                    key={group.id}
                    className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] shadow-sm overflow-hidden transition hover:shadow-md"
                  >
                    <button
                      onClick={() =>
                        setOpenMission(openMission === group.id ? null : group.id)
                      }
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-[var(--bg-secondary)] transition"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${group.color}15` }}
                        >
                          <group.icon
                            className="w-5 h-5"
                            style={{ color: group.color }}
                          />
                        </div>
                        <span className="font-semibold text-[var(--color-heading)]">{group.title}</span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-[var(--text-secondary)] transition-transform duration-300 ${
                          openMission === group.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openMission === group.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <ul className="px-5 pb-5 space-y-2">
                        {group.items.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-sm text-[var(--text-secondary)] leading-relaxed"
                          >
                            <div
                              className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                              style={{ backgroundColor: group.color }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Values: C.O.R.E. */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-[var(--color-accent-red)]" />
                <h3 className="text-xl font-bold text-[var(--color-heading)]">ค่านิยมองค์กร (Core Values)</h3>
              </div>

              {/* Subtitle */}
              <div className="bg-gradient-to-r from-[#DC2626]/10 to-transparent border-l-4 border-[#DC2626] rounded-r-xl p-4 mb-6">
                <p className="text-lg font-bold text-[var(--color-accent-red)]">"THE C.O.R.E. ยาเม็ดครอบจักรวาล"</p>
                <p className="text-[var(--text-secondary)] mt-1">
                  C.O.R.E. เปรียบเสมือนหลักคิดพื้นฐานที่พนักงานทุกคนยึดถือในการปฏิบัติงานและการตัดสินใจ หากทุกคนยึดหลักนี้เป็นแนวทางเดียวกัน จะนำพาองค์กรไปสู่ความสำเร็จอย่างยั่งยืน
                </p>
              </div>

              {/* 4 C.O.R.E. Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {/* C */}
                <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] shadow-sm hover:shadow-lg transition p-5 flex gap-4">
                  <div className="w-12 h-12 bg-[#F97316] rounded-xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    C
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-accent-orange)] text-lg">Commitment</h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      มีความมุ่งมั่น รับผิดชอบงานอย่างเต็มที่ ติดตามผลจนจบ และมุ่งมั่นทำงานให้บรรลุเป้าหมายที่ได้รับมอบหมาย
                    </p>
                  </div>
                </div>

                {/* O */}
                <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] shadow-sm hover:shadow-lg transition p-5 flex gap-4">
                  <div className="w-12 h-12 bg-[#0096C7] rounded-xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    O
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-accent-cyan)] text-lg">Openness</h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      เปิดใจและเปิดรับ สื่อสารตรงไปตรงมา พร้อมรับฟังความคิดเห็น เปิดรับแนวคิดใหม่ และพร้อมปรับปรุงพัฒนาตนเองอยู่เสมอ
                    </p>
                  </div>
                </div>

                {/* R */}
                <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] shadow-sm hover:shadow-lg transition p-5 flex gap-4">
                  <div className="w-12 h-12 bg-[#DC2626] rounded-xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    R
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-accent-red)] text-lg">Resolve</h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      กล้าชนกับความท้าทาย ไม่ยอมแพ้ต่อปัญหา กล้ารับมือกับความท้าทาย และคิดหาทางออกอย่างมีระบบ เพื่อให้บรรลุเป้าหมายขององค์กร
                    </p>
                  </div>
                </div>

                {/* E */}
                <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] shadow-sm hover:shadow-lg transition p-5 flex gap-4">
                  <div className="w-12 h-12 bg-[#0A2540] rounded-xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    E
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-heading)] text-lg">Excellence</h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      มุ่งสู่ความเป็นเลิศ ทำงานให้แม่นยำ ครบถ้วน และสร้างผลลัพธ์ที่เหนือความคาดหมาย ด้วยมาตรฐานการทำงานระดับมืออาชีพ
                    </p>
                  </div>
                </div>
              </div>

              {/* C.O.R.E. Check */}
              <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenCoreCheck(!openCoreCheck)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-[var(--bg-secondary)] transition"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-accent-red)]" />
                    <span className="font-bold text-[var(--color-heading)]">C.O.R.E. Check</span>
                    <span className="text-sm text-[var(--text-secondary)]">ก่อนตัดสินใจหรือส่งมอบงาน</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[var(--text-secondary)] transition-transform duration-300 ${
                      openCoreCheck ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openCoreCheck ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-5 space-y-3">
                    {[
                      { letter: 'C', color: '#F97316', text: 'เราได้ทุ่มเทและรับผิดชอบงานนี้อย่างเต็มที่แล้วหรือยัง?' },
                      { letter: 'O', color: '#0096C7', text: 'เราเปิดใจรับฟังความคิดเห็นและข้อมูลที่หลากหลายแล้วหรือยัง?' },
                      { letter: 'R', color: '#DC2626', text: 'เราเผชิญปัญหาและหาทางออกอย่างเป็นระบบแล้วหรือยัง?' },
                      { letter: 'E', color: '#0A2540', text: 'ผลงานนี้เป็นผลงานที่ดีที่สุดที่เราสามารถส่งมอบได้แล้วหรือยัง?' },
                    ].map((item) => (
                      <div key={item.letter} className="flex items-start gap-3">
                        <span
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.letter}
                        </span>
                        <span className="text-[var(--text-secondary)]">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Closing Quote */}
              <div className="mt-8 bg-[#0A2540] text-white rounded-xl p-6 text-center">
                <Quote className="w-6 h-6 text-[var(--color-accent-orange)] mx-auto mb-3" />
                <p className="text-lg leading-relaxed font-medium">
                  “C.O.R.E. ไม่ใช่เพียงค่านิยมขององค์กร แต่คือแนวทางการคิด การตัดสินใจ และการปฏิบัติงานของคน NTN Medical Team ทุกคน”
                </p>
              </div>
            </div>
          </section>

          {/* ============================================ */}
          {/* Section: วัฒนธรรมองค์กร — Tailwind Culture Infographic */}
          {/* ============================================ */}
          <section id="culture" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[var(--color-heading)]">
              <Sparkles className="w-6 h-6 text-[var(--color-accent-yellow)]" /> วัฒนธรรมองค์กร
            </h2>

            <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
              แนวทางการทำงานที่เน้นความคล่องตัวและรวดเร็วเสมือนการมีลมส่งท้ายที่ช่วยผลักดันให้ก้าวไปข้างหน้า โดยมีกรอบแนวคิดหลัก 3 ระดับ ดังนี้:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Level 1 */}
              <div className="group relative overflow-hidden bg-[var(--card-bg)] border border-[var(--border-color)] shadow-md rounded-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-xl border-t-4 border-t-[#F97316]">
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#F97316] text-white text-sm font-bold">1</span>
                      <h3 className="text-lg font-bold text-[var(--color-heading)]">Artifacts</h3>
                    </div>
                    <Zap className="w-5 h-5 text-[var(--color-accent-orange)]" />
                  </div>
                  <p className="text-gray-600 mb-4 flex-grow font-bold">(หลักฐานเชิงประจักษ์)</p>
                  <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500 ease-in-out">
                    <p className="text-sm text-[var(--text-secondary)] border-t pt-3">
                      คือสิ่งที่เราสามารถมองเห็นได้จริงจากการทำงาน เช่น โครงสร้างขององค์กร หรือเครื่องมือต่างๆ ที่นำมาใช้ (ERP, ISO, BI)
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-[var(--color-accent-orange)] bg-[#F97316]/10 border border-[#F97316]/30 rounded-full group-hover:bg-[#F97316] group-hover:text-white transition-colors cursor-pointer">
                      ดูรายละเอียด
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Level 2 */}
              <div className="group relative overflow-hidden bg-[var(--card-bg)] border border-[var(--border-color)] shadow-md rounded-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-xl border-t-4 border-t-[#0096C7]">
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0096C7] text-white text-sm font-bold">2</span>
                      <h3 className="text-lg font-bold text-[var(--color-heading)]">Espoused Value</h3>
                    </div>
                    <Flag className="w-5 h-5 text-[var(--color-accent-cyan)]" />
                  </div>
                  <p className="text-gray-600 mb-4 flex-grow font-bold">(สิ่งที่เราประกาศร่วมกัน)</p>
                  <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500 ease-in-out">
                    <p className="text-sm text-[var(--text-secondary)] border-t pt-3">
                      คือหลักคิดและเป้าหมายที่องค์กรยึดถือ ได้แก่ คำประกาศหรือวิสัยทัศน์ (Vision) คำโฆษณาหรือพันธกิจ (Mission) และคำมั่นสัญญาหรือค่านิยม (Value)
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-[var(--color-accent-cyan)] bg-[#0096C7]/10 border border-[#0096C7]/30 rounded-full group-hover:bg-[#0096C7] group-hover:text-white transition-colors cursor-pointer">
                      ดูรายละเอียด
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Level 3 */}
              <div className="group relative overflow-hidden bg-[var(--card-bg)] border border-[var(--border-color)] shadow-md rounded-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-xl border-t-4 border-t-[#0A2540]">
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0A2540] text-white text-sm font-bold">3</span>
                      <h3 className="text-lg font-bold text-[var(--color-heading)]">Tacit Assumptions</h3>
                    </div>
                    <Heart className="w-5 h-5 text-[var(--color-accent-red)]" />
                  </div>
                  <p className="text-gray-600 mb-4 flex-grow font-bold">(ความเชื่อที่ฝังลึก)</p>
                  <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500 ease-in-out">
                    <p className="text-sm text-[var(--text-secondary)] border-t pt-3">
                      คือสัญชาตญาณในการทำงาน รวมถึงจิตสำนึก (Mindset) และความเชื่อพื้นฐาน เช่น แนวคิด 1st Class Project
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-[var(--color-heading)] bg-[#0A2540]/10 border border-[#0A2540]/30 rounded-full group-hover:bg-[#0A2540] group-hover:text-white transition-colors cursor-pointer">
                      ดูรายละเอียด
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================ */}
          {/* Section: อัตลักษณ์องค์กร */}
          {/* ============================================ */}
          <section id="identity" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[var(--color-heading)]">
              <Shield className="w-6 h-6 text-[var(--color-accent-yellow)]" /> อัตลักษณ์องค์กร
            </h2>

            {/* Quote */}
            <div className="bg-gradient-to-r from-[#EAB308]/10 to-transparent border-l-4 border-[#EAB308] rounded-r-xl p-6 mb-10">
              <Quote className="w-8 h-8 text-[var(--color-accent-yellow)] mb-2" />
              <p className="text-xl md:text-2xl font-bold text-[var(--color-heading)] leading-snug">
                “อัตลักษณ์ขององค์กร คือรากฐานของการดำเนินธุรกิจ และเป็นสิ่งที่สะท้อนว่าเราเป็นใคร เชื่อในอะไร และกำลังมุ่งไปสู่เป้าหมายใด”
              </p>
            </div>

            <p className="text-[var(--text-secondary)] leading-relaxed mb-10">
              NTN Medical Team เชื่อว่า องค์กรที่ยั่งยืนต้องมีอัตลักษณ์ที่ชัดเจน เพื่อให้ผู้บริหาร พนักงาน ลูกค้า คู่ค้า และผู้มีส่วนได้ส่วนเสียทุกฝ่าย มีความเข้าใจและยึดถือแนวทางเดียวกันในการปฏิบัติงาน<br />
              อัตลักษณ์ขององค์กรประกอบด้วย ความหมายของตราสัญลักษณ์ (Logo Meaning), จุดมุ่งหมายขององค์กร (Corporate Purpose), วิสัยทัศน์ (Vision), พันธกิจ (Mission) และค่านิยมองค์กร (Core Values : C.O.R.E.) ซึ่งเป็นรากฐานของการตัดสินใจ การบริหาร และการพัฒนาองค์กรสู่การเป็นองค์กรระดับโลก
            </p>

            {/* Logo Section */}
            <div className="text-center mb-10">
              <h3 className="text-lg font-bold text-[var(--color-heading)] mb-6">OUR LOGO</h3>
              <div className="inline-block p-6 bg-white rounded-2xl shadow-lg border border-[var(--border-color)]">
                <img
                  src="/image/Logo-NTNMedicalTeam.png"
                  alt="NTN Medical Team Logo"
                  className="w-48 md:w-64 h-auto object-contain mx-auto"
                />
              </div>
              <p className="mt-4 text-sm font-semibold text-[var(--color-accent-cyan)] uppercase tracking-wider">
                “Every Element Has Meaning”
              </p>
              <p className="text-[var(--text-secondary)] text-sm mt-1">
                ทุกองค์ประกอบของตราสัญลักษณ์ ล้วนสะท้อนตัวตนและความเชื่อขององค์กร
              </p>
            </div>

            {/* Logo Elements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-5 flex gap-4 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-[#0096C7] flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-heading)] mb-1">วงกลมสีน้ำเงิน</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    สื่อถึง ความไว้วางใจ (Trust) ความมั่นคง ความน่าเชื่อถือ และความเป็นสากล สะท้อนถึงการดำเนินธุรกิจบนมาตรฐานที่ได้รับการยอมรับในระดับนานาชาติ
                  </p>
                </div>
              </div>

              <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-5 flex gap-4 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-[#EAB308] flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-heading)] mb-1">ดาว 10 ดวง</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    เป็นตัวแทนของ 10 ประเทศสมาชิกอาเซียน สะท้อนถึงความมุ่งมั่นของ NTN Medical Team ในการเป็นส่วนหนึ่งของประชาคมอาเซียน และเป็นศูนย์กลางแห่งความร่วมมือด้านเครื่องมือแพทย์ของภูมิภาค เพื่อก้าวสู่การยอมรับในระดับโลก
                  </p>
                </div>
              </div>

              <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-5 flex gap-4 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-[#F97316] flex items-center justify-center flex-shrink-0">
                  <Handshake className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-heading)] mb-1">มือจับกัน</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    สื่อถึง ความเป็นหุ้นส่วน (Partnership) สะท้อนความเชื่อว่า ความสำเร็จเกิดจากความร่วมมือระหว่างลูกค้า บุคลากรทางการแพทย์ คู่ค้า พนักงาน ผู้ถือหุ้น และทุกภาคส่วนที่เกี่ยวข้อง
                  </p>
                </div>
              </div>

              <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-5 flex gap-4 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-[#DC2626] flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-heading)] mb-1">เส้นสีแดง–ส้ม</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    เป็นสัญลักษณ์ของ การเชื่อมต่อ (Connection) หมายถึงการเชื่อมโยงผู้คน องค์ความรู้ เทคโนโลยี และนวัตกรรม เพื่อสร้างคุณค่าให้กับระบบการแพทย์และสังคม
                  </p>
                </div>
              </div>
            </div>

            {/* NTN Medical Team Name */}
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6 mb-10 text-center hover:shadow-md transition">
              <h4 className="font-bold text-[var(--color-heading)] text-lg mb-2">NTN Medical Team</h4>
              <p className="text-sm text-[var(--text-secondary)]">
                เป็นชื่อของกลุ่มบริษัทที่สะท้อนถึง การทำงานเป็นทีม ความร่วมมือ และการเติบโตร่วมกัน เพื่อสร้างมาตรฐานใหม่ให้กับอุตสาหกรรมเครื่องมือแพทย์
              </p>
            </div>

            {/* ความหมายโดยรวม */}
            <div className="bg-gradient-to-br from-[#0A2540] to-[#0096C7] text-white rounded-xl p-6 md:p-8 text-center">
              <h3 className="text-lg font-bold mb-4">ความหมายโดยรวมของตราสัญลักษณ์</h3>
              <p className="text-lg leading-relaxed font-medium">
                “กลุ่มบริษัท เอ็นทีเอ็น เมดิเคิล ทีม เป็นตัวแทนแห่งความร่วมมือของประชาคมอาเซียน
                ที่มุ่งมั่นผลักดันให้โลกได้รู้จักอาเซียนในฐานะศูนย์กลางด้านเครื่องมือแพทย์
                และปักหมุดชื่อขององค์กรบนแผนที่โลกด้วย คุณภาพ มาตรฐาน และความร่วมมือ”
              </p>
            </div>
          </section>

          {/* ============================================ */}
          {/* Section: โครงสร้างองค์กร — Interactive Org Chart */}
          {/* ============================================ */}
          <section id="structure" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-[var(--color-heading)]">
              <Users className="w-6 h-6 text-[var(--color-accent-cyan)]" /> โครงสร้างองค์กร
            </h2>

            {/* Org Chart */}
            <div className="flex flex-col items-center gap-0">
              {/* ผู้ถือหุ้น */}
              <div className="bg-[#0A2540] text-white px-8 py-4 rounded-2xl font-bold text-center shadow-lg min-w-[240px]">
                ผู้ถือหุ้น
                <br />
                <span className="text-xs font-normal opacity-80">SHAREHOLDERS</span>
              </div>

              {/* เส้นเชื่อมลง */}
              <div className="w-px h-8 bg-gray-400"></div>

              {/* กรรมการบริหาร */}
              <div className="bg-[#0096C7] text-white px-8 py-4 rounded-2xl font-bold text-center shadow-lg min-w-[240px]">
                กรรมการบริหาร
                <br />
                <span className="text-xs font-normal opacity-80">BOARD OF DIRECTORS</span>
              </div>

              {/* เส้นเชื่อมลง */}
              <div className="w-px h-8 bg-gray-400"></div>

              {/* CEO */}
              <div className="bg-[#F97316] text-white px-8 py-4 rounded-2xl font-bold text-center shadow-lg min-w-[240px]">
                ประธานเจ้าหน้าที่บริหาร
                <br />
                <span className="text-xs font-normal opacity-80">CHIEF EXECUTIVE OFFICER</span>
              </div>

              {/* เส้นเชื่อมลง */}
              <div className="w-px h-8 bg-gray-400"></div>

              {/* ผู้ช่วย CEO */}
              <div className="bg-[#4B5563] text-white px-6 py-3 rounded-xl font-bold text-center shadow-md min-w-[220px]">
                ผู้ช่วยประธานเจ้าหน้าที่บริหาร
                <br />
                <span className="text-xs font-normal opacity-80">ASSISTANT CEO</span>
              </div>

              {/* เส้นเชื่อมลง + กระจาย 8 ฝ่าย */}
              <div className="flex flex-col items-center w-full max-w-4xl">
                {/* เส้นตั้งจากผู้ช่วย CEO ลงมาตรงกลาง */}
                <div className="w-px h-8 bg-gray-400"></div>

                {/* กล่องรวมเส้นนอนและฝ่าย */}
                <div className="relative w-full flex flex-col items-center">
                  {/* เส้นนอนกลาง */}
                  <div className="w-full border-t border-gray-400"></div>

                  {/* ตำแหน่งของเส้นตั้งย่อยลงไปยังแต่ละฝ่าย จะถูกจัดการให้อัตโนมัติด้วย grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-0 pt-4 w-full">
                    {[
                      { name: 'ฝ่ายทรัพยากรบุคคล', en: 'HR', bg: 'bg-[#F97316]' },
                      { name: 'ฝ่ายทรัพย์สิน', en: 'Asset', bg: 'bg-[#0096C7]' },
                      { name: 'ฝ่ายไอที', en: 'IT', bg: 'bg-[#EAB308]' },
                      { name: 'ฝ่ายจัดหา ดูแลสินค้า\nและพัฒนาธุรกิจ', en: 'Procurement & BD', bg: 'bg-[#DC2626]' },
                      { name: 'ฝ่ายจัดการออร์เดอร์ลูกค้าหลัก', en: 'Key Account', bg: 'bg-[#0A2540]' },
                      { name: 'ฝ่ายดูแลลูกค้า', en: 'Customer Service', bg: 'bg-[#0096C7]' },
                      { name: 'ฝ่ายดูแลสินค้า', en: 'Inventory', bg: 'bg-[#0A2540]' },
                      { name: 'ฝ่ายบัญชีการเงิน', en: 'Accounting', bg: 'bg-[#DC2626]' },
                    ].map((dept, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        {/* เส้นตั้งเล็กจากเส้นนอนลงมาการ์ด */}
                        <div className="w-px h-6 bg-gray-400"></div>
                        <div
                          className={`px-4 py-3 rounded-xl text-white text-sm font-semibold text-center shadow-md w-full ${dept.bg}`}
                        >
                          {dept.name.split('\n').map((line, i) => (
                            <span key={i}>
                              {line}
                              <br />
                            </span>
                          ))}
                          <span className="text-xs font-light opacity-80">{dept.en}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}