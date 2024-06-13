import { initializeApp } from "firebase/app";
import { getDatabase } from "@firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyCjIRLRb_QFcFpGCy5G5M7lkc8aV_ttnfE",
    authDomain: "menudb-96d7a.firebaseapp.com",
    databaseURL:"https://menudb-96d7a-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "menudb-96d7a",
    storageBucket: "menudb-96d7a.appspot.com",
    messagingSenderId: "386100584702",
    appId: "1:386100584702:web:03e847886287c0f0ac45af",
    measurementId: "G-3C6XLB6EY7"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
