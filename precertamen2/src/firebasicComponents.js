import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZlU3r-tTSsZL0Cd8IcfEmxzm-ZHRuQd0",
  authDomain: "actividad-4-ac262.firebaseapp.com",
  projectId: "actividad-4-ac262",
  storageBucket: "actividad-4-ac262.firebasestorage.app",
  messagingSenderId: "540653958263",
  appId: "1:540653958263:web:85a470c75c566961480272",
  measurementId: "G-3H0JCTLBME"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); 