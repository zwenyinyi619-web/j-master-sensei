import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCIL3BFOaYhMCRaPFdNbhO19b3zxtvaMeI",
  authDomain: "j-master-sensei.firebaseapp.com",
  projectId: "j-master-sensei",
  storageBucket: "j-master-sensei.firebasestorage.app",
  messagingSenderId: "810720620789",
  appId: "1:810720620789:web:c6e6a8b62f8bbffeaa95bc",
  measurementId: "G-6EVVSKMGN6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
