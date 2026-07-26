import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB4p8CccM7P7DCTET9g58onpMIxlaETv9g",
  authDomain: "stclass-ntn.firebaseapp.com",
  projectId: "stclass-ntn",
  storageBucket: "stclass-ntn.firebasestorage.app",
  messagingSenderId: "490787953291",
  appId: "1:490787953291:web:0325319eb735031eae128e",
  measurementId: "G-9KKL2EMYD1"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);

export const ALLOWED_DOMAINS = [
  '@ntntrading.co.th',
  '@tawanmcweis.com',
  '@herbert.co.th',
  '@ntnmedicalteam.net',
];