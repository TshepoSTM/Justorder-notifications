import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDITRWXql08keDXSoAbJyc7TJNumJ1DVgQ",
  authDomain: "justorder-c7c23.firebaseapp.com",
  projectId: "justorder-c7c23",
  storageBucket: "justorder-c7c23.firebasestorage.app",
  messagingSenderId: "877523794407",
  appId: "1:877523794407:web:8def1d75cae1bea783e542",
  measurementId: "G-6TJD8FG0LY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db, app };
