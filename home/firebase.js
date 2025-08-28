// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFhvhCnOc1va9VsWnJU47q2YWef78DUU4",
  authDomain: "mental-wellness-website-1a03e.firebaseapp.com",
  projectId: "mental-wellness-website-1a03e",
  storageBucket: "mental-wellness-website-1a03e.appspot.com",
  messagingSenderId: "16743832523",
  appId: "1:16743832523:web:a80addb597241f677f344e",
  measurementId: "G-2NTBHJD95F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore
export const db = getFirestore(app);
