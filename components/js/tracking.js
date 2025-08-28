// mood.js - Handles Daily Mood Form and Firestore integration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

// Your Firebase config (reuse from your project)
const firebaseConfig = {
  apiKey: "AIzaSyBFhvhCnOc1va9VsWnJU47q2YWef78DUU4",
  authDomain: "mental-wellness-website-1a03e.firebaseapp.com",
  projectId: "mental-wellness-website-1a03e",
  storageBucket: "mental-wellness-website-1a03e.appspot.com",
  messagingSenderId: "16743832523",
  appId: "1:16743832523:web:a80addb597241f677f344e",
  measurementId: "G-2NTBHJD95F"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// UI: Show slider values
const energy = document.getElementById('energy');
const stress = document.getElementById('stress');
const sleep = document.getElementById('sleep');
const energyValue = document.getElementById('energy-value');
const stressValue = document.getElementById('stress-value');
const sleepValue = document.getElementById('sleep-value');

if (energy) energy.addEventListener('input', () => energyValue.textContent = energy.value);
if (stress) stress.addEventListener('input', () => stressValue.textContent = stress.value);
if (sleep) sleep.addEventListener('input', () => sleepValue.textContent = sleep.value);

const moodForm = document.getElementById('mood-form');
const moodMessage = document.getElementById('mood-message');

if (moodForm) {
  moodForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Get form values
    const mood = moodForm.mood.value;
    const energyVal = parseInt(energy.value);
    const stressVal = parseInt(stress.value);
    const sleepVal = parseInt(sleep.value);
    // Get user
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        moodMessage.textContent = "Please log in to save your mood.";
        moodMessage.classList.remove('hidden');
        return;
      }
      const userId = user.uid;
      const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      try {
        await setDoc(doc(db, "moods", userId, "dates", today), {
          mood,
          energy: energyVal,
          stress: stressVal,
          sleep: sleepVal
        });
        moodForm.reset();
        energy.value = stress.value = sleep.value = 5;
        energyValue.textContent = stressValue.textContent = sleepValue.textContent = '5';
        moodMessage.textContent = "Mood saved!";
        moodMessage.classList.remove('hidden');
        setTimeout(() => moodMessage.classList.add('hidden'), 2000);
      } catch (err) {
        moodMessage.textContent = "Error saving mood: " + err.message;
        moodMessage.classList.remove('hidden');
        console.error("Error saving mood:", err);
      }
    });
  });
}
