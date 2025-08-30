// mood-charts.js
// Pie charts for daily and weekly mood using Chart.js and Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

// Firebase config (reuse your config)
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

// Chart.js loader
function loadChartJs(callback) {
  if (window.Chart) return callback();
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/chart.js";
  script.onload = callback;
  document.head.appendChild(script);
}

function renderPieChart(ctx, data, labels, colors, title) {
  return new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: colors,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        title: { display: true, text: title },
      },
    },
  });
}

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}
function getWeekKeys() {
  const today = new Date();
  const week = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    week.push(d.toISOString().slice(0, 10));
  }
  return week;
}

const EMOTIONS = [
  { key: "happy", label: "Happy", color: "#22c55e" },
  { key: "sad", label: "Sad", color: "#3b82f6" },
  { key: "anxious", label: "Anxious", color: "#f59e42" },
  { key: "calm", label: "Calm", color: "#38bdf8" },
  { key: "anger", label: "Anger", color: "#ef4444" },
];

function countMoods(moodDocs) {
  const counts = {};
  for (const e of EMOTIONS) counts[e.key] = 0;
  for (const doc of moodDocs) {
    if (doc.mood && counts.hasOwnProperty(doc.mood)) counts[doc.mood]++;
  }
  return counts;
}

function updateCharts(userId) {
  const moodsRef = collection(db, "moods", userId, "dates");
  // Daily
  getDocs(query(moodsRef, where("__name__", "==", getTodayKey()))).then(
    (snap) => {
      const moods = [];
      snap.forEach((doc) => moods.push(doc.data()));
      const counts = countMoods(moods);
      const data = EMOTIONS.map((e) => counts[e.key]);
      renderPieChart(
        document.getElementById("daily-mood-chart").getContext("2d"),
        data,
        EMOTIONS.map((e) => e.label),
        EMOTIONS.map((e) => e.color),
        "Today's Mood"
      );
    }
  );
  // Weekly
  const weekKeys = getWeekKeys();
  getDocs(moodsRef).then((snap) => {
    const weekMoods = [];
    snap.forEach((doc) => {
      if (weekKeys.includes(doc.id)) weekMoods.push(doc.data());
    });
    const counts = countMoods(weekMoods);
    const data = EMOTIONS.map((e) => counts[e.key]);
    renderPieChart(
      document.getElementById("weekly-mood-chart").getContext("2d"),
      data,
      EMOTIONS.map((e) => e.label),
      EMOTIONS.map((e) => e.color),
      "This Week's Mood"
    );
  });
}

onAuthStateChanged(auth, (user) => {
  if (!user) return;
  loadChartJs(() => updateCharts(user.uid));
});
