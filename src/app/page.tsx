import { Card, CardContent } from '@/components/ui/card';
import { Quote, Zap, Flag, Heart, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* ส่วนที่ 1: Welcome Section */}
      <section className="bg-gradient-to-br from-[#F0F4F8] via-white to-[#E0F7FA] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block text-sm font-semibold tracking-wider text-[#0096C7] uppercase mb-4">
            Welcome to NTN Trading – Thailand
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-[#0A2540] leading-tight">
            ศูนย์รวมข้อมูลองค์กรและบริการ <br className="hidden sm:block" />
            สำหรับบุคลากรมืออาชีพ{' '}
            <span className="text-[#0096C7]">(First Class Employee)</span>
          </h1>
        </div>
      </section>

      {/* ส่วนที่ 2: Quote Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="hidden md:flex flex-col items-center gap-2 pr-6 border-r-4 border-[#0096C7]">
              <Quote className="w-8 h-8 text-[#0096C7]" />
            </div>
            <div className="flex-1">
              <p className="text-2xl md:text-3xl font-bold text-[#0A2540] leading-snug mb-4">
                “เราเชื่อว่าความสำเร็จขององค์กร<br />
                เริ่มต้นจากคุณภาพของคน”
              </p>
              <p className="text-gray-600 leading-relaxed">
                “เราไม่ได้ต้องการเพียงพนักงานที่ทำงานเก่ง แต่เราต้องการคนดีที่พร้อมพัฒนาตนเอง
                ส่งมอบคุณค่าให้ลูกค้า และสร้างความภาคภูมิใจให้กับองค์กร”
              </p>
              <p className="text-gray-600 leading-relaxed mt-3">
                เพราะเครื่องมือแพทย์ที่ดีที่สุด จะไม่มีคุณค่า หากไม่มีบุคลากรที่มี ความรู้ ความรับผิดชอบ และหัวใจของการบริการ
              </p>
              <p className="text-[#0A2540] font-medium mt-4">
                NTN Medical Team จึงมุ่งมั่นสร้างองค์กรแห่งการเรียนรู้ ที่ทุกคนเติบโตไปพร้อมกัน ทั้งในฐานะพนักงาน มืออาชีพ และสมาชิกของสังคม
              </p>
            </div>
            <Quote className="w-8 h-8 text-[#0096C7] md:hidden" />
          </div>
        </div>
      </section>

      {/* ส่วนที่ 3: NTN Medical Team Culture Framework */}
      <section className="py-16 md:py-24 bg-[#F0F4F8]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-4">
              NTN Medical Team Culture Framework
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              วัฒนธรรมองค์กรแบบ <span className="font-semibold text-[#0096C7]">Tailwind Culture</span> — แนวทางการทำงานที่คล่องตัว
              รวดเร็ว ดั่งมีลมส่งท้ายผลักดัน ก้าวไปข้างหน้าด้วยกรอบแนวคิด 3 ระดับ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Level 1: Artifacts */}
            <Card className="group relative overflow-hidden bg-white border border-gray-200 shadow-md transition-all duration-500 hover:-translate-y-3 hover:shadow-xl border-t-4 border-t-[#0096C7]">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0096C7] text-white text-sm font-bold">1</span>
                    <h3 className="text-lg font-bold text-[#0A2540]">Artifacts</h3>
                  </div>
                  <Zap className="w-5 h-5 text-[#0096C7]" />
                </div>
                <p className="text-gray-600 mb-4 flex-grow font-bold">(หลักฐานเชิงประจักษ์)</p>
                <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500 ease-in-out">
                  <p className="text-sm text-gray-500 border-t pt-3">
                    โครงสร้างองค์กร, เครื่องมือที่ใช้จริง เช่น <span className="font-medium">ERP, ISO, BI, Dashboard</span>
                  </p>
                </div>
                <div className="mt-4 flex justify-end">
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-[#0096C7] bg-[#E0F7FA]/50 border border-[#0096C7]/30 rounded-full group-hover:bg-[#0096C7] group-hover:text-white transition-colors cursor-pointer">
                    ดูรายละเอียด
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Level 2: Espoused Values */}
            <Card className="group relative overflow-hidden bg-white border border-gray-200 shadow-md transition-all duration-500 hover:-translate-y-3 hover:shadow-xl border-t-4 border-t-[#0096C7]">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0096C7] text-white text-sm font-bold">2</span>
                    <h3 className="text-lg font-bold text-[#0A2540]">Espoused Values</h3>
                  </div>
                  <Flag className="w-5 h-5 text-[#0096C7]" />
                </div>
                <p className="text-gray-600 mb-4 flex-grow font-bold">(สิ่งที่เราประกาศร่วมกัน)</p>
                <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500 ease-in-out">
                  <p className="text-sm text-gray-500 border-t pt-3">
                    คือหลักคิดและเป้าหมายที่องค์กรยึดถือ ได้แก่ คำประกาศหรือวิสัยทัศน์ (Vision) คำโฆษณาหรือพันธกิจ (Mission) และคำมั่นสัญญาหรือค่านิยม (Value)
                  </p>
                </div>
                <div className="mt-4 flex justify-end">
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-[#0096C7] bg-[#E0F7FA]/50 border border-[#0096C7]/30 rounded-full group-hover:bg-[#0096C7] group-hover:text-white transition-colors cursor-pointer">
                    ดูรายละเอียด
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Level 3: Tacit Assumptions */}
            <Card className="group relative overflow-hidden bg-white border border-gray-200 shadow-md transition-all duration-500 hover:-translate-y-3 hover:shadow-xl border-t-4 border-t-[#0096C7]">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0096C7] text-white text-sm font-bold">3</span>
                    <h3 className="text-lg font-bold text-[#0A2540]">Tacit Assumptions</h3>
                  </div>
                  <Heart className="w-5 h-5 text-[#0096C7]" />
                </div>
                <p className="text-gray-600 mb-4 flex-grow font-bold">(ความเชื่อที่ฝังลึก)</p>
                <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500 ease-in-out">
                  <p className="text-sm text-gray-500 border-t pt-3">
                    สัญชาตญาณในการทำงาน, จิตสำนึก (Mindset),<br />
                    ความเชื่อพื้นฐาน เช่น <span className="font-medium">แนวคิด 1st Class Project</span>
                  </p>
                </div>
                <div className="mt-4 flex justify-end">
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-[#0096C7] bg-[#E0F7FA]/50 border border-[#0096C7]/30 rounded-full group-hover:bg-[#0096C7] group-hover:text-white transition-colors cursor-pointer">
                    ดูรายละเอียด
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}