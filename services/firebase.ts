// Use Firebase v9+ modular syntax.
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// User-provided web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8WEl3k_4PcPUqk5EdMGB47rb3IuNzlU0",
  authDomain: "quizgamificadootavio.firebaseapp.com",
  projectId: "quizgamificadootavio",
  storageBucket: "quizgamificadootavio.firebasestorage.app",
  messagingSenderId: "359882701013",
  appId: "1:359882701013:web:30eb80ddcddec40e224a5c"
};

// Initialize Firebase only if it hasn't been initialized yet.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
