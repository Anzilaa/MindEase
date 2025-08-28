import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const form = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");

// Function to load and display all contact submissions
async function loadContacts() {
  contactList.innerHTML = "";
  const q = query(collection(db, "contact"), orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.style.border = "1px solid #ccc";
    div.style.margin = "5px";
    div.style.padding = "5px";
    div.innerHTML = `<strong>${data.name}</strong><br><em>${
      data.subject
    }</em><br>${data.message}<br><small>${new Date(
      data.timestamp.seconds ? data.timestamp.seconds * 1000 : data.timestamp
    ).toLocaleString()}</small>`;
    contactList.appendChild(div);
  });
}

loadContacts();

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  try {
    await addDoc(collection(db, "contact"), {
      name,
      subject,
      message,
      timestamp: new Date(),
    });
    alert("✅ Contact submitted!");
    form.reset();
    loadContacts(); // refresh list
  } catch (err) {
    console.error("Error submitting contact:", err);
    alert("❌ Failed to submit contact: " + err.message);
  }
});
