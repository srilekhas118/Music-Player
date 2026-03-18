// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSZBRAyHj4975DBlbO0LDHeQQur65ghLM",
  authDomain: "your-domain",
  projectId: "your-Id",
  storageBucket: "your-storage",
  messagingSenderId: "your-id",
  appId: "your-appId"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export let __AUTH = getAuth(firebaseApp)
export let __DB  = getFirestore(firebaseApp)
