import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYTgheltLCaS6GZPFNF9CmsGAk1TgALps",
  authDomain: "chatgpt-build-3abfd.firebaseapp.com",
  projectId: "chatgpt-build-3abfd",
  storageBucket: "chatgpt-build-3abfd.appspot.com",
  messagingSenderId: "1094740535633",
  appId: "1:1094740535633:web:42fc395a33742a8735cb70",
  measurementId: "G-8FJ9F33QPG",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
