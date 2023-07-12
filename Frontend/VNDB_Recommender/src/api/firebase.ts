// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./firebase_config";
import { getAuth } from "firebase/auth";

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const analytics = getAnalytics(app);