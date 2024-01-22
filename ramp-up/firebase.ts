import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyCj8-SxnOpyvzREJpskG9nBCkDzIG1RHnI",
    authDomain: "ramp-up-99ab1.firebaseapp.com",
    projectId: "ramp-up-99ab1",
    storageBucket: "ramp-up-99ab1.appspot.com",
    messagingSenderId: "422064253742",
    appId: "1:422064253742:web:8b34bf09c41a371d50a8bf",
    measurementId: "G-GD4SJD9736"
  };
  
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);