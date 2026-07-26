import { NextResponse } from 'next/server';
import axios from 'axios';
import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB4p8CccM7P7DCTET9g58onpMIxlaETv9g",
  authDomain: "stclass-ntn.firebaseapp.com",
  projectId: "stclass-ntn",
  storageBucket: "stclass-ntn.firebasestorage.app",
  messagingSenderId: "490787953291",
  appId: "1:490787953291:web:0325319eb735031eae128e",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

function extractInvoiceData(row: any) {
  const rawDateStr = row.InvcDtl_ShipDate || row.InvcHead_InvoiceDate || '';
  const invNum = row.InvcHead_LegalNumber || row.InvcHead_InvoiceNum?.toString() || '-';
  const soNum = row.InvcDtl_OrderNum?.toString() || '-';
  const custName = row.Customer_Name || '-';
  const territory = row.SalesTer_TerritoryDesc || '-';
  const netPrice = parseFloat(row.Calculated_Net_DocPrice_withTax || row.Calculated_Net_DocPrice || row.InvcDtl_DocExtPrice || 0);

  let displayDate = rawDateStr;
  let isoDate = '';
  if (rawDateStr) {
    const dObj = new Date(rawDateStr);
    if (!isNaN(dObj.getTime())) {
      displayDate = `${String(dObj.getDate()).padStart(2, '0')}/${String(dObj.getMonth() + 1).padStart(2, '0')}/${dObj.getFullYear().toString().substr(-2)}`;
      isoDate = `${dObj.getFullYear()}-${String(dObj.getMonth() + 1).padStart(2, '0')}-${String(dObj.getDate()).padStart(2, '0')}`;
    } else {
      const parts = rawDateStr.split('/');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        let year = parseInt(parts[2], 10);
        if (year < 100) year += 2000;
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
          displayDate = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${String(year).toString().substr(-2)}`;
          isoDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        }
      }
    }
  }

  let docType = 'IVT';
  if (invNum.startsWith('IST')) docType = 'IST';
  else if (invNum.startsWith('IRT')) docType = 'IRT';
  else if (invNum.startsWith('DBT')) docType = 'DBT';

  const bkkTerritories = ['BKK AE1', 'BKK AE2', 'BKK Bay', 'Urban 1', 'Bangkok'];
  const isBkk = bkkTerritories.some(t => territory.includes(t));

  return {
    invNum,
    soNum,
    custName,
    territory,
    isBkk,
    netPrice,
    tax: netPrice * 0.07,
    amount: netPrice * 1.07,
    docType,
    rawDate: displayDate,
    isoDate,
    syncedAt: serverTimestamp(),
  };
}

export async function GET(request: Request) {
  const url = process.env.EPICOR_API_URL || 'https://ntntrading-live.epicorsaas.com/server/api/v1/BaqSvc/ZB_TWM_InvoiceAll_Details_2023(19949B)';
  const epicorUser = process.env.EPICOR_USERNAME || '19949A-NJongsawat';
  const epicorPass = process.env.EPICOR_PASSWORD || 'Fc13728HR@ntn.';

  const { searchParams } = new URL(request.url);
  const isFullSync = searchParams.get('full') === 'true';

  try {
    let existingInvNums: Set<string> = new Set();
    if (!isFullSync) {
      const metaRef = doc(db, 'meta', 'twmInvNums');
      const metaSnap = await getDoc(metaRef);
      if (metaSnap.exists()) {
        existingInvNums = new Set(metaSnap.data().list || []);
      }
    }

    let rows: any[] = [];

    if (isFullSync) {
      const response = await axios.get(url, {
        auth: { username: epicorUser, password: epicorPass },
      });
      rows = response.data?.value || [];
    } else {
      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const startDateStr = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}T00:00:00`;
      const filterUrl = `${url}?$filter=InvcHead_InvoiceDate gt datetime'${startDateStr}'`;
      const response = await axios.get(filterUrl, {
        auth: { username: epicorUser, password: epicorPass },
      });
      rows = response.data?.value || [];
    }

    if (!rows.length) {
      return NextResponse.json({ success: true, message: 'No data', new: 0 });
    }

    const grouped: Record<string, any> = {};
    for (const row of rows) {
      const info = extractInvoiceData(row);
      if (!grouped[info.invNum]) {
        grouped[info.invNum] = { ...info, netPrice: 0, tax: 0, amount: 0 };
      }
      grouped[info.invNum].netPrice += info.netPrice;
      grouped[info.invNum].tax = grouped[info.invNum].netPrice * 0.07;
      grouped[info.invNum].amount = grouped[info.invNum].netPrice * 1.07;
    }
    const invoiceList = Object.values(grouped);

    const newInvoices = isFullSync
      ? invoiceList
      : invoiceList.filter((inv: any) => !existingInvNums.has(inv.invNum));

    if (newInvoices.length > 0) {
      const collRef = collection(db, 'epicor_invoices_twm');
      const batchSize = 400;
      const newInvNums: string[] = [];

      for (let i = 0; i < newInvoices.length; i += batchSize) {
        const batch = writeBatch(db);
        const batchItems = newInvoices.slice(i, i + batchSize);
        for (const inv of batchItems) {
          const docRef = doc(collRef, inv.invNum);
          batch.set(docRef, inv, { merge: true });
          newInvNums.push(inv.invNum);
        }
        await batch.commit();
      }

      const metaRef = doc(db, 'meta', 'twmInvNums');
      if (isFullSync) {
        await setDoc(metaRef, { list: newInvNums, lastUpdate: serverTimestamp() });
      } else {
        const updatedList = [...existingInvNums, ...newInvNums];
        await setDoc(metaRef, { list: updatedList, lastUpdate: serverTimestamp() });
      }
    }

    await setDoc(doc(db, 'settings', 'syncStatus'), {
      lastSyncTWM: serverTimestamp(),
    }, { merge: true });

    return NextResponse.json({
      success: true,
      message: `ซิงค์สำเร็จ: เพิ่ม ${newInvoices.length} รายการใหม่`,
      total: invoiceList.length,
      new: newInvoices.length,
    });
  } catch (error: any) {
    console.error('Sync error:', error.message);
    return NextResponse.json(
      { error: 'Sync failed', detail: error.message },
      { status: 500 }
    );
  }
}