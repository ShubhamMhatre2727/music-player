// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAycGw7v-QGdmOTF1UcvcFYEP3UQwqKl3Q",
  authDomain: "music-player-da18f.firebaseapp.com",
  projectId: "music-player-da18f",
  storageBucket: "music-player-da18f.firebasestorage.app",
  messagingSenderId: "12123006549",
  appId: "1:12123006549:web:13d2406aea31d3014d96dc",
  measurementId: "G-JPX67HS5BW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);