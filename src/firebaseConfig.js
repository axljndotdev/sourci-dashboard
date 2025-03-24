import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBj86OKDJ2ODFeqiFGrP7pOS5RpxBmEVV8",
  authDomain: "sourci-dashboard-2025.firebaseapp.com",
  projectId: "sourci-dashboard-2025",
  storageBucket: "sourci-dashboard-2025.firebasestorage.app",
  messagingSenderId: "401709296688",
  appId: "1:401709296688:web:133e8b62f79ce986f111f5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);