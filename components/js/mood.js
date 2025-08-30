// mood.js - Handles Daily Mood Form and Firestore integration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

// Your Firebase config (reuse from your project)
const firebaseConfig = {
  apiKey: "AIzaSyBFhvhCnOc1va9VsWnJU47q2YWef78DUU4",
  authDomain: "mental-wellness-website-1a03e.firebaseapp.com",
  projectId: "mental-wellness-website-1a03e",
  storageBucket: "mental-wellness-website-1a03e.appspot.com",
  messagingSenderId: "16743832523",
  appId: "1:16743832523:web:a80addb597241f677f344e",
  measurementId: "G-2NTBHJD95F",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// UI: Show slider values
const energy = document.getElementById("energy");
const stress = document.getElementById("stress");
const sleep = document.getElementById("sleep");
const energyValue = document.getElementById("energy-value");
const stressValue = document.getElementById("stress-value");
const sleepValue = document.getElementById("sleep-value");

if (energy)
  energy.addEventListener(
    "input",
    () => (energyValue.textContent = energy.value)
  );
if (stress)
  stress.addEventListener(
    "input",
    () => (stressValue.textContent = stress.value)
  );
if (sleep)
  sleep.addEventListener("input", () => (sleepValue.textContent = sleep.value));

const moodForm = document.getElementById("mood-form");
const moodMessage = document.getElementById("mood-message");

if (moodForm) {
  moodForm.addEventListener("submit", async (e) => {
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
        moodMessage.classList.remove("hidden");
        return;
      }
      const userId = user.uid;
      const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      try {
        await setDoc(doc(db, "moods", userId, "dates", today), {
          mood,
          energy: energyVal,
          stress: stressVal,
          sleep: sleepVal,
        });
        moodForm.reset();
        energy.value = stress.value = sleep.value = 5;
        energyValue.textContent =
          stressValue.textContent =
          sleepValue.textContent =
            "5";
        moodMessage.textContent = "Mood saved!";
        moodMessage.classList.remove("hidden");
        setTimeout(() => moodMessage.classList.add("hidden"), 2000);
        setTimeout(updateCalendar, 500);
      } catch (err) {
        moodMessage.textContent = "Error saving mood: " + err.message;
        moodMessage.classList.remove("hidden");
        console.error("Error saving mood:", err);
      }
    });
  });
}

// --- Mood Calendar Component ---
const calendarContainer = document.getElementById("mood-calendar");
const calendarMonth = document.getElementById("calendar-month");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

let calendarDate = new Date();
let monthMoods = {};

function getMonthKey(date) {
  return (
    date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0")
  );
}

function renderCalendar(date, moods) {
  if (!calendarContainer) return;
  calendarContainer.innerHTML = "";
  const year = date.getFullYear();
  const month = date.getMonth();
  calendarMonth.textContent = date.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // Days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Fill blanks for first week
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement("div");
    calendarContainer.appendChild(blank);
  }

  // Render days
  for (let d = 1; d <= daysInMonth; d++) {
    const day = document.createElement("div");
    day.className = "mood-day";
    const today = new Date();
    if (
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      day.classList.add("today");
    }
    day.textContent = d;

    // Mood dot
    const dateKey =
      year +
      "-" +
      String(month + 1).padStart(2, "0") +
      "-" +
      String(d).padStart(2, "0");
    if (moods[dateKey]) {
      const dot = document.createElement("div");
      dot.className = "mood-dot " + moods[dateKey].mood;
      day.appendChild(dot);
    }
    calendarContainer.appendChild(day);
  }
}

// Fetch moods for the month
async function fetchMonthMoods(date) {
  const user = auth.currentUser;
  if (!user) return {};
  const userId = user.uid;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const start = `${year}-${month}-01`;
  const end = `${year}-${month}-31`;

  const moodsRef = collection(db, "moods", userId, "dates");
  const q = query(
    moodsRef,
    where("__name__", ">=", start),
    where("__name__", "<=", end)
  );
  const snapshot = await getDocs(q);
  const moods = {};
  snapshot.forEach((doc) => {
    moods[doc.id] = doc.data();
  });
  return moods;
}

// Calendar navigation
async function updateCalendar() {
  monthMoods = await fetchMonthMoods(calendarDate);
  // ...existing code...
  // UI: Show slider values
  const energy = document.getElementById("energy");
  const stress = document.getElementById("stress");
  const sleep = document.getElementById("sleep");
  const energyValue = document.getElementById("energy-value");
  const stressValue = document.getElementById("stress-value");
  const sleepValue = document.getElementById("sleep-value");

  if (energy)
    energy.addEventListener(
      "input",
      () => (energyValue.textContent = energy.value)
    );
  if (stress)
    stress.addEventListener(
      "input",
      () => (stressValue.textContent = stress.value)
    );
  if (sleep)
    sleep.addEventListener(
      "input",
      () => (sleepValue.textContent = sleep.value)
    );

  const moodForm = document.getElementById("mood-form");
  const moodMessage = document.getElementById("mood-message");

  if (moodForm) {
    moodForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      // Get form values
      const mood = moodForm.mood.value;
      const energyVal = parseInt(energy.value);
      const stressVal = parseInt(stress.value);
      const sleepVal = parseInt(sleep.value);
      // Only allow 5 moods
      const allowedMoods = ["happy", "sad", "anxious", "calm", "anger"];
      if (!allowedMoods.includes(mood)) {
        moodMessage.textContent = "Please select a valid mood.";
        moodMessage.classList.remove("hidden");
        return;
      }
      // Get user
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          moodMessage.textContent = "Please log in to save your mood.";
          moodMessage.classList.remove("hidden");
          return;
        }
        const userId = user.uid;
        const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        try {
          await setDoc(doc(db, "moods", userId, "dates", today), {
            mood,
            energy: energyVal,
            stress: stressVal,
            sleep: sleepVal,
          });
          moodForm.reset();
          energy.value = stress.value = sleep.value = 5;
          energyValue.textContent =
            stressValue.textContent =
            sleepValue.textContent =
              "5";
          moodMessage.textContent = "Mood saved!";
          moodMessage.classList.remove("hidden");
          setTimeout(() => moodMessage.classList.add("hidden"), 2000);
          setTimeout(updateCalendar, 500);
        } catch (err) {
          moodMessage.textContent = "Error saving mood: " + err.message;
          moodMessage.classList.remove("hidden");
          console.error("Error saving mood:", err);
        }
      });
    });
  }
  renderCalendar(calendarDate, monthMoods);
}
if (prevMonthBtn && nextMonthBtn) {
  prevMonthBtn.onclick = () => {
    calendarDate.setMonth(calendarDate.getMonth() - 1);
    updateCalendar();
  };
  nextMonthBtn.onclick = () => {
    calendarDate.setMonth(calendarDate.getMonth() + 1);
    updateCalendar();
  };
}

// On login, load calendar
onAuthStateChanged(auth, (user) => {
  if (user) updateCalendar();
});
