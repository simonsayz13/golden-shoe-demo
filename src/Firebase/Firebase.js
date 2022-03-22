// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDg6bQfdaDGI4o1PgJG3xDjWYkeAYC323M",
  authDomain: "golden-shoes-demo.firebaseapp.com",
  databaseURL:
    "https://golden-shoes-demo-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "golden-shoes-demo",
  storageBucket: "golden-shoes-demo.appspot.com",
  messagingSenderId: "803034286617",
  appId: "1:803034286617:web:5516921fa7abbc8570f888",
  measurementId: "G-138MX0DYEH",
};

const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase
export default firebaseApp;
