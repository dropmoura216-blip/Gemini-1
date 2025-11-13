// Fix: Use Firebase v8 compatibility syntax as the modular import is failing,
// likely due to a project version mismatch. This involves using the default export.
import firebase from "firebase/app";
import "firebase/firestore";

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
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export const db = firebase.firestore();
