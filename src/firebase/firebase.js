import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth,browserLocalPersistence, setPersistence } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAy6KniqniN8z61PmxKzv4M7ZUezWfh8Jg",
  authDomain: "emoji-54e5a.firebaseapp.com",
  projectId: "emoji-54e5a",
  storageBucket: "emoji-54e5a.appspot.com",
  messagingSenderId: "728134105643",
  appId: "1:728134105643:web:ef5a21b48aa993e541086e",
  measurementId: "G-Y870T5X643"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app)
setPersistence(auth, browserLocalPersistence)


export { storage, db, auth}