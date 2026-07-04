import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// These can be configured using environment variables in a .env file:
// VITE_FIREBASE_API_KEY=...
// VITE_FIREBASE_AUTH_DOMAIN=...
// VITE_FIREBASE_PROJECT_ID=...
// VITE_FIREBASE_STORAGE_BUCKET=...
// VITE_FIREBASE_MESSAGING_SENDER_ID=...
// VITE_FIREBASE_APP_ID=...
const firebaseConfig = {
  apiKey: "AIzaSyChOoGly5wnT2SlQ2nVTu2Wu84oy2A2wxI",
  authDomain: "shagunart-969bf.firebaseapp.com",
  projectId: "shagunart-969bf",
  storageBucket: "shagunart-969bf.firebasestorage.app",
  messagingSenderId: "315534531299",
  appId: "1:315534531299:web:dcf776820fa43c4dbe83d6"
};

// Check if Firebase keys are provided, otherwise we fall back to LocalStorage
const isFirebaseConfigured = 
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.appId;

let db = null;

if (isFirebaseConfigured) {
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
    console.log("Firebase initialized successfully.");
  } catch (error) {
    console.error("Firebase failed to initialize:", error);
  }
} else {
  console.log("Firebase is not configured. Falling back to LocalStorage mode.");
}

export { db, isFirebaseConfigured };
