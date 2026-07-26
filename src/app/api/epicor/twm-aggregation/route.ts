import { NextResponse } from 'next/server';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = { /* เหมือนข้างบน */ };
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export async function GET() {
  const collRef = collection(db, 'epicor_invoices_twm');
  const snapshot = await getDocs(collRef);
  const invoices: any[] = [];
  snapshot.forEach(d => invoices.push(d.data()));

  const today = new Date().toISOString().split('T')[0];
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  // คำนวณเหมือนใน UI แต่ฝั่งเซิร์ฟเวอร์
  // ... (logic เดียวกับที่ใช้ใน Dashboard)
  // เก็บผลลัพธ์ลงเอกสาร aggregations/twm_daily
  // ...

  return NextResponse.json({ success: true });
}