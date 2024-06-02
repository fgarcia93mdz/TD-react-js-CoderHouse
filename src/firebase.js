import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0dCD_ENsaGywY9GU-0y2rOC3NDlkQ3Ro",
  authDomain: "api-testin-fgg.firebaseapp.com",
  projectId: "api-testin-fgg",
  storageBucket: "api-testin-fgg.appspot.com",
  messagingSenderId: "238085859086",
  appId: "1:238085859086:web:b00d98b4d6ce705104d95f",
  measurementId: "G-214BJPKM6M"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth, onAuthStateChanged };