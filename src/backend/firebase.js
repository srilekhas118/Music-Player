// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSZBRAyHj4975DBlbO0LDHeQQur65ghLM",
  authDomain: "tech-haven-music-11.firebaseapp.com",
  projectId: "tech-haven-music-11",
  storageBucket: "tech-haven-music-11.firebasestorage.app",
  messagingSenderId: "55200796283",
  appId: "1:55200796283:web:6ff1763fe2bf68f514dcde"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export let __AUTH = getAuth(firebaseApp)
export let __DB  = getFirestore(firebaseApp)
