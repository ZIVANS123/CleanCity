// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage,ref} from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtlThbtNH6aZWi7CN0kIzOFoPv9NRRxH8",
  authDomain: "cleancity1-97b0b.firebaseapp.com",
  projectId: "cleancity1-97b0b",
  storageBucket: "cleancity1-97b0b.appspot.com",
  messagingSenderId: "109023577613",
  appId: "1:109023577613:web:8a6a797d713ddbc7ebb744",
  measurementId: "G-5HB38T8HQT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize  Firestore storage and get a reference to the service
export const storage = getStorage(app);

