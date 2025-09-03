import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const form = document.getElementById("onboarding-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const reminders = form.elements["reminders"].value;
  const contentType = form.elements["contentType"].value;
  const notifTime = document.getElementById("notifTime").value;
  const goal = document.getElementById("goal").value;

  try {
    await addDoc(collection(db, "onboarding"), {
      name,
      age,
      reminders,
      contentType,
      notifTime,
      goal,
      timestamp: new Date(),
    });

    alert("✅ Onboarding data submitted successfully!");
    form.reset();
    window.location.href = "pop.html";
  } catch (err) {
    console.error("Error submitting onboarding data:", err);
    alert("❌ Failed to submit onboarding data: " + err.message);
  }
});
