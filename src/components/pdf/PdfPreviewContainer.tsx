'use client';

interface PdfPreviewContainerProps {
  title: string;
  subtitle: string;
  lastSync: string;
  onClose: () => void;
  onPrint: () => void;
  children: React.ReactNode;
}

export default function PdfPreviewContainer({
  title,
  subtitle,
  lastSync,
  onClose,
  onPrint,
  children,
}: PdfPreviewContainerProps) {
  return (
    <div className="print-container bg-white w-full" style={{ minHeight: '100vh', zIndex: 9999 }}>
      {/* ปุ่มควบคุม (ไม่แสดงใน PDF) */}
      <div className="flex justify-between items-center no-print mb-4 pb-3 border-b-2 px-4 pt-3">
        <h4 className="text-red-600 font-bold m-0">
          🖨️ สรุปสำหรับผู้บริหาร (Executive Print Preview)
        </h4>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-400 rounded-full text-gray-700 hover:bg-gray-100"
          >
            ← กลับ
          </button>
          <button
            onClick={onPrint}
            className="px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700"
          >
            🖨️ พิมพ์ / Save PDF
          </button>
        </div>
      </div>

      {/* เนื้อหาหลักของรายงาน */}
      <div className="mx-auto bg-white" style={{ maxWidth: '850px', padding: '10px 20px', color: '#172b4d' }}>
        {/* Header รายงาน */}
        <div className="mb-4 border-b pb-3">
          <h3 className="font-bold mb-1" style={{ color: '#0052cc', letterSpacing: '-0.5px' }}>
            {title}
          </h3>
          <h5 className="font-bold text-gray-600 mb-2">{subtitle}</h5>
          <p className="mb-1 text-gray-500" style={{ fontSize: '0.8em' }}>
            วันที่ออกรายงาน:{' '}
            <strong className="text-gray-800">
              {new Date().toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </strong>
          </p>
          <p className="mb-0 text-gray-500" style={{ fontSize: '0.8em' }}>
            ข้อมูลอัปเดตล่าสุด: <strong className="text-gray-800">{lastSync}</strong>
          </p>
        </div>

        {/* เนื้อหา Dashboard */}
        {children}

        {/* Footer */}
        <div className="text-center mt-4 pt-3 border-t">
          <p className="mb-0" style={{ color: '#0052cc', fontSize: '0.9rem' }}>
            เอกสารฉบับนี้จัดทำอัตโนมัติ โดยระบบ 1st Class Data Center เพื่อสื่อสารภายในเท่านั้น (Internal Use Only)
          </p>
        </div>
      </div>
    </div>
  );
}