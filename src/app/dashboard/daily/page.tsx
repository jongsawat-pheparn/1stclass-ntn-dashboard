'use client';
import { useState, useEffect, useMemo } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import {
  CalendarCheck,
  RefreshCw,
  FileText,
  Search,
  Download,
  Mail,
  Filter,
  ArrowUpDown,
} from 'lucide-react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import PdfPreviewContainer from '@/components/pdf/PdfPreviewContainer';
import PdfKpiCard from '@/components/pdf/PdfKpiCard';

// ---------- Types ----------
interface Invoice {
  id: string;
  invNum: string;
  soNum: string;
  custName: string;
  territory: string;
  isBkk: boolean;
  netPrice: number;
  tax: number;
  amount: number;
  docType: 'IVT' | 'IST' | 'IRT' | 'DBT';
  rawDate: string;
  isoDate: string;
}

// ---------- Helpers ----------
const formatCurr = (num: number) => {
  if (num === undefined || num === null || isNaN(num)) return '฿0.00';
  const isNegative = num < 0;
  const absNum = Math.abs(num);
  const formatted = absNum.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (isNegative ? '-' : '') + '฿' + formatted;
};

const parseDateFromRaw = (rawDate: string): string | null => {
  if (!rawDate) return null;
  const parts = rawDate.split('/');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    let year = parseInt(parts[2], 10);
    if (year < 100) year += 2000;
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }
  }
  const d = new Date(rawDate);
  if (!isNaN(d.getTime())) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  return null;
};

const getIsoDate = (inv: Invoice): string | null => {
  if (inv.isoDate && inv.isoDate.length === 10 && inv.isoDate !== 'Invalid Date')
    return inv.isoDate;
  return parseDateFromRaw(inv.rawDate);
};

// ---------- Targets ----------
const targetDaily = 1812500;
const targetMTD = 36250000;
const targetYTD = 435000000;

export default function TWMDailyDashboardPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string>('กำลังโหลด...');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'debit'>('all');
  const [period, setPeriod] = useState<'today' | 'month' | 'year' | 'all' | 'custom'>('today');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [sortField, setSortField] = useState<string>('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [showPrintPreview, setShowPrintPreview] = useState(false);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const collRef = collection(db, 'epicor_invoices_twm');
      const snapshot = await getDocs(collRef);
      const list: Invoice[] = [];
      snapshot.forEach((d) => {
        list.push({ id: d.id, ...d.data() } as Invoice);
      });
      setInvoices(list);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
    setLoading(false);
  };

  const fetchLastSync = async () => {
    try {
      const docRef = doc(db, 'settings', 'syncStatus');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.lastSyncTWM) {
          const d = data.lastSyncTWM.toDate();
          const monthsThai = [
            'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
            'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.',
          ];
          setLastSync(
            `${d.getDate()} ${monthsThai[d.getMonth()]} ${d.getFullYear() + 543} ${d.toLocaleTimeString('th-TH')}`
          );
        }
      }
    } catch (error) {
      console.error('Error fetching last sync:', error);
    }
  };

  useEffect(() => {
    fetchInvoices();
    fetchLastSync();
  }, []);

  // ✅ เปลี่ยนชื่อไฟล์ PDF อัตโนมัติ
  useEffect(() => {
    if (showPrintPreview) {
      const today = new Date();
      const year = today.getFullYear();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = months[today.getMonth()];
      const day = String(today.getDate()).padStart(2, '0');
      const originalTitle = document.title;
      document.title = `TWM_Invoice_${year}-${month}-${day}`;
      return () => {
        document.title = originalTitle;
      };
    }
  }, [showPrintPreview]);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/epicor/twm-invoices');
      const data = await res.json();
      if (data.success) {
        await fetchInvoices();
        await fetchLastSync();
        alert(`Sync สำเร็จ: ${data.message}`);
      } else {
        alert('Sync failed: ' + data.detail);
      }
    } catch (err) {
      alert('Network error');
    }
    setSyncing(false);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  // ---------- Current Date ----------
  const today = new Date();
  const todayISO = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  // ---------- Filter invoices by period ----------
  const dailyInvoices = invoices.filter((inv) => {
    const iso = getIsoDate(inv);
    return iso === todayISO && inv.docType !== 'DBT';
  });
  const dailyDebits = invoices.filter((inv) => {
    const iso = getIsoDate(inv);
    return iso === todayISO && inv.docType === 'DBT';
  });

  const mtdInvoices = invoices.filter((inv) => {
    if (inv.docType === 'DBT') return false;
    const iso = getIsoDate(inv);
    if (!iso) return false;
    const [y, m] = iso.split('-').map(Number);
    return y === currentYear && m === currentMonth;
  });

  const ytdInvoices = invoices.filter((inv) => {
    if (inv.docType === 'DBT') return false;
    const iso = getIsoDate(inv);
    if (!iso) return false;
    const [y] = iso.split('-').map(Number);
    return y === currentYear;
  });

  const allInvoices = invoices.filter((inv) => inv.docType !== 'DBT');
  const allDebits = invoices.filter((inv) => inv.docType === 'DBT');

  let periodInvoices: Invoice[] = [];
  let periodDebits: Invoice[] = [];
  if (period === 'today') {
    periodInvoices = dailyInvoices;
    periodDebits = dailyDebits;
  } else if (period === 'month') {
    periodInvoices = mtdInvoices;
    periodDebits = invoices.filter((inv) => {
      if (inv.docType !== 'DBT') return false;
      const iso = getIsoDate(inv);
      if (!iso) return false;
      const [y, m] = iso.split('-').map(Number);
      return y === currentYear && m === currentMonth;
    });
  } else if (period === 'year') {
    periodInvoices = ytdInvoices;
    periodDebits = invoices.filter((inv) => {
      if (inv.docType !== 'DBT') return false;
      const iso = getIsoDate(inv);
      if (!iso) return false;
      const [y] = iso.split('-').map(Number);
      return y === currentYear;
    });
  } else if (period === 'custom') {
    if (customStart && customEnd) {
      periodInvoices = invoices.filter((inv) => {
        if (inv.docType === 'DBT') return false;
        const iso = getIsoDate(inv);
        return iso && iso >= customStart && iso <= customEnd;
      });
      periodDebits = invoices.filter((inv) => {
        if (inv.docType !== 'DBT') return false;
        const iso = getIsoDate(inv);
        return iso && iso >= customStart && iso <= customEnd;
      });
    } else {
      periodInvoices = dailyInvoices;
      periodDebits = dailyDebits;
    }
  } else {
    periodInvoices = allInvoices;
    periodDebits = allDebits;
  }

  // ---------- Summary calculations ----------
  const dailyTotal = dailyInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const dailyDbt = dailyDebits.reduce((sum, inv) => sum + Math.abs(inv.amount), 0);
  const netDaily = dailyTotal - dailyDbt;
  const dailyCountIvt = dailyInvoices.filter((i) => i.docType === 'IVT').length;
  const dailyCountIst = dailyInvoices.filter((i) => i.docType === 'IST').length;
  const dailyCountIrt = dailyInvoices.filter((i) => i.docType === 'IRT').length;
  const dailyCountDbt = dailyDebits.length;

  const mtdTotal = mtdInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const mtdDbt = invoices
    .filter((inv) => {
      if (inv.docType !== 'DBT') return false;
      const iso = getIsoDate(inv);
      if (!iso) return false;
      const [y, m] = iso.split('-').map(Number);
      return y === currentYear && m === currentMonth;
    })
    .reduce((sum, inv) => sum + Math.abs(inv.amount), 0);
  const netMtd = mtdTotal - mtdDbt;

  const ytdTotal = ytdInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const ytdDbt = invoices
    .filter((inv) => {
      if (inv.docType !== 'DBT') return false;
      const iso = getIsoDate(inv);
      if (!iso) return false;
      const [y] = iso.split('-').map(Number);
      return y === currentYear;
    })
    .reduce((sum, inv) => sum + Math.abs(inv.amount), 0);
  const netYtd = ytdTotal - ytdDbt;

  const dailyPercent = targetDaily > 0 ? ((netDaily / targetDaily) * 100).toFixed(2) : '0';
  const mtdPercent = targetMTD > 0 ? ((netMtd / targetMTD) * 100).toFixed(2) : '0';
  const ytdPercent = targetYTD > 0 ? ((netYtd / targetYTD) * 100).toFixed(2) : '0';

  // ---------- Export PDF ----------
  const handleExportPDF = () => {
    setShowPrintPreview(true);
  };

  // ---------- Sort & Filter Table ----------
  const filteredInvoices = activeTab === 'all' ? periodInvoices : periodDebits;
  const searchedInvoices = filteredInvoices.filter(
    (inv) =>
      inv.custName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.invNum.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.soNum.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedInvoices = [...searchedInvoices].sort((a, b) => {
    if (!sortField) return 0;
    let aVal: any = a[sortField as keyof Invoice];
    let bVal: any = b[sortField as keyof Invoice];
    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();
    if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  // ---------- UI ----------
  if (showPrintPreview) {
    const dailyIvtAmount = dailyInvoices.filter(i => i.docType === 'IVT').reduce((s, i) => s + i.amount, 0);
    const dailyIstAmount = dailyInvoices.filter(i => i.docType === 'IST').reduce((s, i) => s + i.amount, 0);
    const dailyIrtAmount = dailyInvoices.filter(i => i.docType === 'IRT').reduce((s, i) => s + i.amount, 0);

    const mtdIvtAmount = mtdInvoices.filter(i => i.docType === 'IVT').reduce((s, i) => s + i.amount, 0);
    const mtdIstAmount = mtdInvoices.filter(i => i.docType === 'IST').reduce((s, i) => s + i.amount, 0);
    const mtdIrtAmount = mtdInvoices.filter(i => i.docType === 'IRT').reduce((s, i) => s + i.amount, 0);

    const ytdIvtAmount = ytdInvoices.filter(i => i.docType === 'IVT').reduce((s, i) => s + i.amount, 0);
    const ytdIstAmount = ytdInvoices.filter(i => i.docType === 'IST').reduce((s, i) => s + i.amount, 0);
    const ytdIrtAmount = ytdInvoices.filter(i => i.docType === 'IRT').reduce((s, i) => s + i.amount, 0);

    // สรุปภูมิภาค
    const bkkInvoices = periodInvoices.filter(i => i.isBkk);
    const regInvoices = periodInvoices.filter(i => !i.isBkk);
    const bkkCount = bkkInvoices.length;
    const bkkAmount = bkkInvoices.reduce((s, i) => s + i.amount, 0);
    const regCount = regInvoices.length;
    const regAmount = regInvoices.reduce((s, i) => s + i.amount, 0);
    const totalInvoiceCount = periodInvoices.length;
    const debitCount = periodDebits.length;

    return (
      <PdfPreviewContainer
        title="รายงานสรุปการออกบิล"
        subtitle="บริษัท ตะวันแม็คไวสซ์ จำกัด (TWM Invoice Report)"
        lastSync={lastSync}
        onClose={() => setShowPrintPreview(false)}
        onPrint={() => window.print()}
      >
        <div className="grid grid-cols-3 gap-3 mb-4">
          {/* Daily Card */}
          <PdfKpiCard
            label="ยอดสุทธิวันนี้ (Daily)"
            value={formatCurr(netDaily)}
            percent={dailyPercent}
            targetLabel={`เป้าหมาย: ${(targetDaily / 1000000).toFixed(2)}M`}
            color="#00875a"
            breakdown={[
              { icon: '📄', label: 'บิลขาย (IVT)', value: formatCurr(dailyIvtAmount), count: `${dailyCountIvt} บิล` },
              { icon: '🔧', label: 'บริการ (IST)', value: formatCurr(dailyIstAmount), count: `${dailyCountIst} บิล` },
              { icon: '🚚', label: 'งานเช่า (IRT)', value: formatCurr(dailyIrtAmount), count: `${dailyCountIrt} บิล` },
              { icon: '📝', label: 'ลดหนี้ (DBT)', value: `-${formatCurr(dailyDbt)}`, count: `${dailyCountDbt} บิล` },
            ]}
          />
          {/* MTD Card */}
          <PdfKpiCard
            label="ยอดสุทธิเดือนนี้ (MTD)"
            value={formatCurr(netMtd)}
            percent={mtdPercent}
            targetLabel={`เป้าหมาย: ${(targetMTD / 1000000).toFixed(2)}M`}
            color="#0052cc"
            breakdown={[
              { icon: '📄', label: 'บิลขาย (IVT)', value: formatCurr(mtdIvtAmount) },
              { icon: '🔧', label: 'บริการ (IST)', value: formatCurr(mtdIstAmount) },
              { icon: '🚚', label: 'งานเช่า (IRT)', value: formatCurr(mtdIrtAmount) },
              { icon: '📝', label: 'ลดหนี้ (DBT)', value: `-${formatCurr(mtdDbt)}` },
            ]}
            diffLabel="ยอดขาด/เกิน เป้าหมาย"
            diffValue={`${netMtd >= targetMTD ? '+' : ''}${formatCurr(netMtd - targetMTD)}`}
            diffColor={netMtd >= targetMTD ? '#00875a' : '#de350b'}
          />
          {/* YTD Card */}
          <PdfKpiCard
            label="ยอดสุทธิปีนี้ (YTD)"
            value={formatCurr(netYtd)}
            percent={ytdPercent}
            targetLabel={`เป้าหมาย: ${(targetYTD / 1000000).toFixed(2)}M`}
            color="#de350b"
            breakdown={[
              { icon: '📄', label: 'บิลขาย (IVT)', value: formatCurr(ytdIvtAmount) },
              { icon: '🔧', label: 'บริการ (IST)', value: formatCurr(ytdIstAmount) },
              { icon: '🚚', label: 'งานเช่า (IRT)', value: formatCurr(ytdIrtAmount) },
              { icon: '📝', label: 'ลดหนี้ (DBT)', value: `-${formatCurr(ytdDbt)}` },
            ]}
            diffLabel="ยอดขาด/เกิน เป้าหมาย"
            diffValue={`${netYtd >= targetYTD ? '+' : ''}${formatCurr(netYtd - targetYTD)}`}
            diffColor={netYtd >= targetYTD ? '#00875a' : '#de350b'}
          />
        </div>

        {/* Invoice Table */}
        <table className="pdf-clean-table w-full border-collapse" style={{ fontSize: '0.7rem' }}>
          <thead>
            <tr>
              <th className="text-center">ลำดับ</th>
              <th className="text-center">วันที่</th>
              <th>เลขที่อินวอยซ์</th>
              <th className="text-center">SO</th>
              <th>ชื่อลูกค้า</th>
              <th className="text-center">พื้นที่</th>
              <th className="text-right">ก่อนภาษี</th>
              <th className="text-right">ภาษี</th>
              <th className="text-right">รวมภาษี</th>
            </tr>
          </thead>
          <tbody>
            {periodInvoices.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-4 text-gray-500">ไม่มีรายการออกบิลในช่วงเวลาที่เลือก</td>
              </tr>
            ) : (
              periodInvoices.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-100' : ''}>
                  <td className="text-center text-gray-500">{idx + 1}</td>
                  <td className="text-center text-gray-500">{row.rawDate}</td>
                  <td className="font-bold">{row.invNum}</td>
                  <td className="text-center text-gray-500">{row.soNum}</td>
                  <td>{row.custName}</td>
                  <td className="text-center">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs ${row.isBkk ? 'bg-cyan-100 text-cyan-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {row.isBkk ? 'กทม./ปริมณฑล' : 'ภูมิภาค'}
                    </span>
                  </td>
                  <td className="text-right text-gray-500">{formatCurr(row.netPrice)}</td>
                  <td className="text-right text-gray-500">{formatCurr(row.tax)}</td>
                  <td className="text-right font-bold" style={{ color: '#0052cc' }}>{formatCurr(row.amount)}</td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr style={{ backgroundColor: '#e6f0ff' }}>
              <td colSpan={8} className="text-right font-bold text-blue-700">รวมยอด (Total)</td>
              <td className="text-right font-bold text-blue-700">
                {formatCurr(periodInvoices.reduce((sum, inv) => sum + inv.amount, 0))}
              </td>
            </tr>
          </tfoot>
        </table>

        {/* Net Total */}
        <div className="mt-4 p-3 bg-gray-100 rounded-lg border flex justify-between items-center">
          <h5 className="font-bold text-gray-800 m-0">
            รวมยอดสุทธิ (Net Total) <span className="text-sm text-gray-500 font-normal ml-2">หลังหักลดหนี้</span>
          </h5>
          <h4 className="font-bold text-green-600 m-0">{formatCurr(netDaily)}</h4>
        </div>

        {/* สรุปภูมิภาคและจำนวนบิล */}
        <div className="mt-3 p-3 bg-white rounded-lg border">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">🏙️ กทม./ปริมณฑล:</span>
              <span className="font-bold">{bkkCount} บิล ({formatCurr(bkkAmount)})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">🏞️ ภูมิภาค:</span>
              <span className="font-bold">{regCount} บิล ({formatCurr(regAmount)})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">📄 จำนวนออก Invoice วันนี้:</span>
              <span className="font-bold">{totalInvoiceCount} บิล</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">📝 จำนวนลดหนี้ (DBT):</span>
              <span className="font-bold">{debitCount} บิล</span>
            </div>
          </div>
        </div>
      </PdfPreviewContainer>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[var(--bg-primary)]">
        {/* Header */}
        <div className="bg-gray-100 border-b border-gray-200 py-6 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                <CalendarCheck className="w-7 h-7 text-[#F97316]" />
                สรุปยอดออกบิล บ.ตะวัน (Invoice TWM)
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                อัปเดตล่าสุด: <span className="font-semibold text-gray-700">{lastSync}</span>
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={handleSync} disabled={syncing} className="flex items-center gap-1 bg-white hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 transition">
                <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                {syncing ? 'กำลัง Sync...' : 'Sync Now'}
              </button>
              <button className="flex items-center gap-1 bg-white hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 transition">
                <Mail className="w-4 h-4" /> ส่งอีเมล
              </button>
              <button onClick={handleExportPDF} className="flex items-center gap-1 bg-white hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 transition">
                <Download className="w-4 h-4" /> PDF
              </button>
            </div>
          </div>
        </div>

        {/* Period Filter */}
        <div className="max-w-7xl mx-auto px-4 mt-4 flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600 mr-2">ช่วงเวลา:</span>
          {(['today', 'month', 'year', 'all', 'custom'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                period === p ? 'bg-[#F97316] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {p === 'today' ? 'วันนี้' : p === 'month' ? 'เดือนนี้' : p === 'year' ? 'ปีนี้' : p === 'all' ? 'ทั้งหมด' : 'กำหนดช่วง'}
            </button>
          ))}
          {period === 'custom' && (
            <div className="flex items-center gap-2 ml-2">
              <input type="date" value={customStart} onChange={(e) => setCustomStart(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-sm" />
              <span className="text-sm text-gray-500">ถึง</span>
              <input type="date" value={customEnd} onChange={(e) => setCustomEnd(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-sm" />
            </div>
          )}
        </div>

        {/* KPI Cards */}
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Daily Card */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-gradient-to-br from-[#00875a] to-[#00b8d9] p-4 text-white">
                <span className="text-sm opacity-90">ยอดสุทธิวันนี้ (Daily)</span>
                <h2 className="text-2xl font-bold mt-1">{formatCurr(netDaily)}</h2>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs opacity-80">เป้าหมาย: {(targetDaily / 1000000).toFixed(2)}M</span>
                  <span className="text-xs font-bold">{dailyPercent}%</span>
                </div>
                <div className="mt-2 bg-white/30 rounded-full h-1.5">
                  <div className="bg-white h-1.5 rounded-full" style={{ width: `${dailyPercent}%` }}></div>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2"><span className="text-blue-600">📄</span><span className="text-gray-600">บิลขาย (IVT)</span></div>
                  <div className="text-right"><span className="font-medium text-gray-800">{formatCurr(dailyInvoices.filter(i => i.docType === 'IVT').reduce((s, i) => s + i.amount, 0))}</span><span className="text-xs text-gray-500 ml-1">({dailyCountIvt} บิล)</span></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2"><span className="text-gray-600">🔧</span><span className="text-gray-600">บริการ (IST)</span></div>
                  <div className="text-right"><span className="font-medium text-gray-800">{formatCurr(dailyInvoices.filter(i => i.docType === 'IST').reduce((s, i) => s + i.amount, 0))}</span><span className="text-xs text-gray-500 ml-1">({dailyCountIst} บิล)</span></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2"><span className="text-yellow-600">🚚</span><span className="text-gray-600">งานเช่า (IRT)</span></div>
                  <div className="text-right"><span className="font-medium text-gray-800">{formatCurr(dailyInvoices.filter(i => i.docType === 'IRT').reduce((s, i) => s + i.amount, 0))}</span><span className="text-xs text-gray-500 ml-1">({dailyCountIrt} บิล)</span></div>
                </div>
                <div className="flex items-center justify-between text-sm border-t pt-2">
                  <div className="flex items-center gap-2"><span className="text-red-600">📝</span><span className="text-red-600">ลดหนี้ (DBT)</span></div>
                  <div className="text-right"><span className="font-medium text-red-600">-{formatCurr(dailyDbt)}</span><span className="text-xs text-gray-500 ml-1">({dailyCountDbt} บิล)</span></div>
                </div>
              </div>
            </div>

            {/* MTD Card */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-gradient-to-br from-[#0052cc] to-[#008eb3] p-4 text-white">
                <span className="text-sm opacity-90">ยอดสุทธิเดือนนี้ (MTD)</span>
                <h2 className="text-2xl font-bold mt-1">{formatCurr(netMtd)}</h2>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs opacity-80">เป้าหมาย: {(targetMTD / 1000000).toFixed(2)}M</span>
                  <span className="text-xs font-bold">{mtdPercent}%</span>
                </div>
                <div className="mt-2 bg-white/30 rounded-full h-1.5">
                  <div className="bg-white h-1.5 rounded-full" style={{ width: `${mtdPercent}%` }}></div>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-sm font-bold text-green-600">
                  <span>ยอดขาด/เกิน เป้าหมาย:</span>
                  <span>{netMtd >= targetMTD ? '+' : ''}{formatCurr(netMtd - targetMTD)}</span>
                </div>
                <div className="flex items-center justify-between text-sm"><span className="text-gray-600">📄 บิลขาย (IVT)</span><span className="font-medium">{formatCurr(mtdInvoices.filter(i => i.docType === 'IVT').reduce((s, i) => s + i.amount, 0))}</span></div>
                <div className="flex items-center justify-between text-sm"><span className="text-gray-600">🔧 บริการ (IST)</span><span className="font-medium">{formatCurr(mtdInvoices.filter(i => i.docType === 'IST').reduce((s, i) => s + i.amount, 0))}</span></div>
                <div className="flex items-center justify-between text-sm"><span className="text-gray-600">🚚 งานเช่า (IRT)</span><span className="font-medium">{formatCurr(mtdInvoices.filter(i => i.docType === 'IRT').reduce((s, i) => s + i.amount, 0))}</span></div>
                <div className="flex items-center justify-between text-sm border-t pt-2 text-red-600"><span>📝 ลดหนี้ (DBT)</span><span className="font-medium">-{formatCurr(mtdDbt)}</span></div>
              </div>
            </div>

            {/* YTD Card */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-gradient-to-br from-[#de350b] to-[#ff991f] p-4 text-white">
                <span className="text-sm opacity-90">ยอดสุทธิปีนี้ (YTD)</span>
                <h2 className="text-2xl font-bold mt-1">{formatCurr(netYtd)}</h2>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs opacity-80">เป้าหมาย: {(targetYTD / 1000000).toFixed(2)}M</span>
                  <span className="text-xs font-bold">{ytdPercent}%</span>
                </div>
                <div className="mt-2 bg-white/30 rounded-full h-1.5">
                  <div className="bg-white h-1.5 rounded-full" style={{ width: `${ytdPercent}%` }}></div>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-sm font-bold text-red-600">
                  <span>ยอดขาด/เกิน เป้าหมาย:</span>
                  <span>{netYtd >= targetYTD ? '+' : ''}{formatCurr(netYtd - targetYTD)}</span>
                </div>
                <div className="flex items-center justify-between text-sm"><span className="text-gray-600">📄 บิลขาย (IVT)</span><span className="font-medium">{formatCurr(ytdInvoices.filter(i => i.docType === 'IVT').reduce((s, i) => s + i.amount, 0))}</span></div>
                <div className="flex items-center justify-between text-sm"><span className="text-gray-600">🔧 บริการ (IST)</span><span className="font-medium">{formatCurr(ytdInvoices.filter(i => i.docType === 'IST').reduce((s, i) => s + i.amount, 0))}</span></div>
                <div className="flex items-center justify-between text-sm"><span className="text-gray-600">🚚 งานเช่า (IRT)</span><span className="font-medium">{formatCurr(ytdInvoices.filter(i => i.docType === 'IRT').reduce((s, i) => s + i.amount, 0))}</span></div>
                <div className="flex items-center justify-between text-sm border-t pt-2 text-red-600"><span>📝 ลดหนี้ (DBT)</span><span className="font-medium">-{formatCurr(ytdDbt)}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'all' ? 'bg-[#F97316] text-white' : 'bg-gray-100 text-gray-600'}`}
                >บิลขาย/บริการ</button>
                <button
                  onClick={() => setActiveTab('debit')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'debit' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                >ลดหนี้ (Debit)</button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="ค้นหา รพ. / เลขที่บิล / SO..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-lg border border-gray-300 bg-white text-sm w-full md:w-64"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    {['rawDate', 'invNum', 'soNum', 'custName', 'territory', 'isBkk', 'netPrice', 'tax', 'amount'].map(field => (
                      <th
                        key={field}
                        onClick={() => handleSort(field)}
                        className={`text-left p-3 font-medium cursor-pointer hover:bg-gray-100 transition ${field === 'netPrice' || field === 'tax' || field === 'amount' ? 'text-right' : field === 'isBkk' ? 'text-center' : ''}`}
                      >
                        <div className={`flex items-center gap-1 ${field === 'netPrice' || field === 'tax' || field === 'amount' ? 'justify-end' : field === 'isBkk' ? 'justify-center' : 'justify-start'}`}>
                          {field === 'rawDate' ? 'วันที่' : field === 'invNum' ? 'เลขที่บิล' : field === 'soNum' ? 'SO' : field === 'custName' ? 'ชื่อลูกค้า' : field === 'territory' ? 'เขตการขาย' : field === 'isBkk' ? 'พื้นที่' : field === 'netPrice' ? 'ก่อนภาษี' : field === 'tax' ? 'ภาษี' : 'รวมภาษี'}
                          <ArrowUpDown className="w-3 h-3 opacity-50" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedInvoices.length === 0 ? (
                    <tr><td colSpan={9} className="text-center p-8 text-gray-500"><FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />ไม่พบข้อมูลในช่วงเวลาที่เลือก</td></tr>
                  ) : (
                    sortedInvoices.map((inv) => (
                      <tr key={inv.id} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="p-3">{inv.rawDate}</td>
                        <td className="p-3 font-medium">
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            inv.docType === 'IVT' ? 'bg-blue-100 text-blue-700' :
                            inv.docType === 'IST' ? 'bg-gray-100 text-gray-700' :
                            inv.docType === 'IRT' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                          }`}>{inv.invNum}</span>
                        </td>
                        <td className="p-3 text-gray-600">{inv.soNum}</td>
                        <td className="p-3 font-medium text-gray-800">{inv.custName}</td>
                        <td className="p-3 text-gray-600">{inv.territory}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${inv.isBkk ? 'bg-cyan-100 text-cyan-700' : 'bg-orange-100 text-orange-700'}`}>{inv.isBkk ? 'กทม./ปริมณฑล' : 'ภูมิภาค'}</span>
                        </td>
                        <td className="p-3 text-right text-gray-600">{formatCurr(inv.netPrice)}</td>
                        <td className="p-3 text-right text-gray-600">{formatCurr(inv.tax)}</td>
                        <td className={`p-3 text-right font-bold ${inv.docType === 'DBT' ? 'text-red-600' : 'text-green-600'}`}>
                          {inv.docType === 'DBT' ? '-' : ''}{formatCurr(Math.abs(inv.amount))}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-blue-200 bg-gray-50 font-bold">
                    <td colSpan={8} className="p-3 text-right text-gray-700">รวมยอด</td>
                    <td className="p-3 text-right text-blue-700">
                      {activeTab === 'all' ? formatCurr(periodInvoices.reduce((sum, inv) => sum + inv.amount, 0)) : formatCurr(periodDebits.reduce((sum, inv) => sum + Math.abs(inv.amount), 0))}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}