// firebaseConfig.ts

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Agrega esta importación


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4UauFOxhoZiVNJD2oFKhe0siEuTQuu0s",
  authDomain: "moviechat-45b3c.firebaseapp.com",
  projectId: "moviechat-45b3c",
  storageBucket: "moviechat-45b3c.appspot.com",
  messagingSenderId: "655262294354",
  appId: "1:655262294354:web:98094f9db012e0139a5a8b",
  measurementId: "G-3S6NSE0GVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);
const firestore = getFirestore(app); 
const db = getFirestore(app);

export { auth, firestore, db};