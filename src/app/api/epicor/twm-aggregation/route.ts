import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // ดึงข้อมูล invoice ทั้งหมดจาก Firestore
    const collRef = adminDb.collection('epicor_invoices_twm');
    const snapshot = await collRef.get();
    const invoices: any[] = [];
    snapshot.forEach(doc => {
      invoices.push({ id: doc.id, ...doc.data() });
    });

    // ถ้าไม่มีข้อมูล
    if (invoices.length === 0) {
      return NextResponse.json({ success: true, message: 'No invoices found', data: [] });
    }

    // คำนวณค่า aggregation
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    // คำนวณ Daily, MTD, YTD
    let dailyTotal = 0;
    let mtdTotal = 0;
    let ytdTotal = 0;
    let dailyBreakdown: Record<string, number> = {};
    let mtdBreakdown: Record<string, number> = {};
    let ytdBreakdown: Record<string, number> = {};

    for (const inv of invoices) {
      const isoDate = inv.isoDate;
      const netPrice = inv.netPrice || 0;
      const docType = inv.docType || 'IVT';

      if (!isoDate) continue;

      const invDate = new Date(isoDate);
      const invMonth = invDate.getMonth() + 1;
      const invYear = invDate.getFullYear();

      // Year to Date
      if (invYear === currentYear && invDate <= today) {
        ytdTotal += netPrice;
        ytdBreakdown[docType] = (ytdBreakdown[docType] || 0) + netPrice;
      }

      // Month to Date
      if (invMonth === currentMonth && invYear === currentYear && invDate <= today) {
        mtdTotal += netPrice;
        mtdBreakdown[docType] = (mtdBreakdown[docType] || 0) + netPrice;
      }

      // Daily
      if (isoDate === todayStr) {
        dailyTotal += netPrice;
        dailyBreakdown[docType] = (dailyBreakdown[docType] || 0) + netPrice;
      }
    }

    // สร้างข้อมูล aggregation
    const aggregationData = {
      daily: {
        total: dailyTotal,
        breakdown: dailyBreakdown,
        invoiceCount: invoices.filter(inv => inv.isoDate === todayStr).length,
      },
      mtd: {
        total: mtdTotal,
        breakdown: mtdBreakdown,
        invoiceCount: invoices.filter(inv => {
          if (!inv.isoDate) return false;
          const d = new Date(inv.isoDate);
          return d.getMonth() + 1 === currentMonth && d.getFullYear() === currentYear && d <= today;
        }).length,
      },
      ytd: {
        total: ytdTotal,
        breakdown: ytdBreakdown,
        invoiceCount: invoices.filter(inv => {
          if (!inv.isoDate) return false;
          const d = new Date(inv.isoDate);
          return d.getFullYear() === currentYear && d <= today;
        }).length,
      },
      totalInvoices: invoices.length,
      updatedAt: FieldValue.serverTimestamp(),
    };

    // บันทึกผลลัพธ์ลง Firestore
    await adminDb.collection('aggregations').doc('twm_daily').set(aggregationData, { merge: true });

    return NextResponse.json({
      success: true,
      message: 'Aggregation completed successfully',
      data: {
        daily: aggregationData.daily,
        mtd: aggregationData.mtd,
        ytd: aggregationData.ytd,
        totalInvoices: aggregationData.totalInvoices,
      },
    });
  } catch (error: any) {
    console.error('Aggregation error:', error.message);
    return NextResponse.json(
      { error: 'Aggregation failed', detail: error.message },
      { status: 500 }
    );
  }
}