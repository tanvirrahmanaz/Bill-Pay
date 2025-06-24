
// src/firebase/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgt1R6lZ7o2EuNV0DAuHfevWykCquWSA4",
  authDomain: "bill-pay-873f7.firebaseapp.com",
  projectId: "bill-pay-873f7",
  storageBucket: "bill-pay-873f7.firebasestorage.app",
  messagingSenderId: "289023800561",
  appId: "1:289023800561:web:1819eda3f5e6f4a1212550",
  measurementId: "G-VXTG4T8K4Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;