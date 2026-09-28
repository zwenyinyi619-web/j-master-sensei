import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIL3BFOaYhMCRaPFdNbhO19b3zxtvaMeI",
  authDomain: "j-master-sensei.firebaseapp.com",
  projectId: "j-master-sensei",
  storageBucket: "j-master-sensei.firebasestorage.app",
  messagingSenderId: "810720620789",
  appId: "1:810720620789:web:c6e6a8b62f8bbffeaa95bc",
  measurementId: "G-6EVVSKMGN6"
};

// Prevent multiple initializations
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);
