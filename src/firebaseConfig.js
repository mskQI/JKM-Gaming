// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJsYFZrbj69JWwyDBoA9FC66G5Uw2QNCw",
  authDomain: "afterlife-adventures.firebaseapp.com",
  projectId: "afterlife-adventures",
  storageBucket: "afterlife-adventures.appspot.com",
  messagingSenderId: "540852917712",
  appId: "1:540852917712:web:4c514c32bd73252275d5d5",
  measurementId: "G-XLMDPX0XKE"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);



