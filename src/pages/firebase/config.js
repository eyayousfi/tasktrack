// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

// import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNZrTIIf6909x_bO2k5402ZJx7l04Iv_4",
  authDomain: "react2-bffbd.firebaseapp.com",
  projectId: "react2-bffbd",
  storageBucket: "react2-bffbd.firebasestorage.app",
  messagingSenderId: "793928516757",
  appId: "1:793928516757:web:b40f68aa20e1a24242479c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

console.log('Firestore initialized:', db);