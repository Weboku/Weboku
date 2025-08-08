import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC43q_VtwbiG0cKR0s9DaRv_A0O8rxhPWQ",
  authDomain: "hustle-27144.firebaseapp.com",
  projectId: "hustle-27144",
  storageBucket: "hustle-27144.firebasestorage.app",
  messagingSenderId: "948175828630",
  appId: "1:948175828630:web:85f7284b228f45965b34b7",
  measurementId: "G-3RDPRJJ5V8"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
