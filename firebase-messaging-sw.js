// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDg9nJ36YnxwcSY0CPAIKXnc_9MDltlVRw",
  authDomain: "jazbaflix-push.firebaseapp.com",
  projectId: "jazbaflix-push",
  storageBucket: "jazbaflix-push.firebasestorage.app",
  messagingSenderId: "294121382918",
  appId: "1:294121382918:web:c2a12d0485d56b754f0f87",
  measurementId: "G-XMF993L90S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
