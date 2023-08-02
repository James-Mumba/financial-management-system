import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAO8O7jz9p6qZm26hrwXnBuk6cuNUkAbVI",

  authDomain: "financial-management-sys-9321c.firebaseapp.com",

  projectId: "financial-management-sys-9321c",

  storageBucket: "financial-management-sys-9321c.appspot.com",

  messagingSenderId: "785396963821",

  appId: "1:785396963821:web:7c3927831be8ff95832fe4",

  measurementId: "G-ZSFZ6HL4WG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


export { app };
export { analytics };
export {db}
