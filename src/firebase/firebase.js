// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database"
import "firebase/compat/auth"
import "firebase/auth"
import "firebase/storage"
import "firebase/analytics"
import "firebase/performance"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCVTXhhcen333td2ppnOS-CTEjckWiU4Ww",
    authDomain: "imgaeproject.firebaseapp.com",
    projectId: "imgaeproject",
    storageBucket: "imgaeproject.appspot.com",
    messagingSenderId: "145561441768",
    appId: "1:145561441768:web:50c3c2941c95b709c7c05d",
    measurementId: "G-1J17XZ82L1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getDatabase(app)
const storage = getStorage(app)
const fireStore = getFirestore(app)

export { app, auth, db, storage, fireStore }