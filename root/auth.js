// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBFhvhCnOc1va9VsWnJU47q2YWef78DUU4",
  authDomain: "mental-wellness-website-1a03e.firebaseapp.com",
  projectId: "mental-wellness-website-1a03e",
  storageBucket: "mental-wellness-website-1a03e.firebasestorage.app",
  messagingSenderId: "16743832523",
  appId: "1:16743832523:web:a80addb597241f677f344e",
  measurementId: "G-2NTBHJD95F",
};
// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Providers
const googleProvider = new GoogleAuthProvider();

// Email Sign Up
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Sign up successful!");
        window.location.href = "../home/main.html"; // redirect after signup
      })
      .catch((err) => alert(err.message));
  });
}

// Email Login
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Login successful!");
        window.location.href = "../home/main.html"; // redirect after login
      })
      .catch((err) => alert(err.message));
  });
}

// Google Signup
const googleSignupBtn = document.getElementById("google-signup");
if (googleSignupBtn) {
  googleSignupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signInWithPopup(auth, googleProvider)
      .then(() => {
        alert("Google sign up successful!");
        window.location.href = "../home/main.html"; // redirect after google signup
      })
      .catch((err) => alert(err.message));
  });
}

// Google Login
const googleLoginBtn = document.getElementById("google-login");
if (googleLoginBtn) {
  googleLoginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signInWithPopup(auth, googleProvider)
      .then(() => {
        alert("Google login successful!");
        window.location.href = "../home/main.html"; // redirect after google login
      })
      .catch((err) => alert(err.message));
  });
}

import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider)
  .then((result) => {
    console.log("User signed in:", result.user);
  })
  .catch((error) => {
    console.error("Error signing in:", error);
  });
