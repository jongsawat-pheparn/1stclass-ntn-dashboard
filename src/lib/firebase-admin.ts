import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

function getAdminApp() {
  if (getApps().length === 0) {
    // ใช้ Service Account จาก Environment Variable ก่อน
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      return initializeApp({
        credential: cert(serviceAccount),
      });
    }
    // ถ้าไม่มี Environment Variable ให้ลองใช้ไฟล์ JSON
    try {
      const serviceAccount = require('../../private/serviceAccountKey.json');
      return initializeApp({
        credential: cert(serviceAccount),
      });
    } catch (e) {
      // ถ้าไม่มีทั้ง Environment Variable และไฟล์ JSON ให้ใช้ Application Default Credentials
      return initializeApp();
    }
  }
  return getApps()[0];
}

const app = getAdminApp();
export const adminDb = getFirestore(app);