import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const journalList = document.getElementById("journal-list");
const journalForm = document.getElementById("journal-form");
const journalInput = document.getElementById("journal-input");

// Load all journal entries
async function loadJournals() {
  journalList.innerHTML = "";
  const q = query(collection(db, "journals"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const div = document.createElement("div");
    div.className = "journal-entry";
    div.innerHTML = `
      <div class="journal-text" data-id="${docSnap.id}">${data.text}</div>
      <button data-id="${docSnap.id}" class="edit-journal">Edit</button>
      <button data-id="${docSnap.id}" class="delete-journal">Delete</button>
      <div class='journal-date'>${new Date(
        data.createdAt.seconds ? data.createdAt.seconds * 1000 : data.createdAt
      ).toLocaleString()}</div>
    `;
    journalList.appendChild(div);
  });
  // Attach delete listeners
  document.querySelectorAll(".delete-journal").forEach((btn) => {
    btn.onclick = async (e) => {
      const id = btn.getAttribute("data-id");
      await deleteDoc(doc(db, "journals", id));
      loadJournals();
    };
  });
  // Attach edit listeners
  document.querySelectorAll(".edit-journal").forEach((btn) => {
    btn.onclick = (e) => {
      const id = btn.getAttribute("data-id");
      const textDiv = document.querySelector(`.journal-text[data-id='${id}']`);
      const oldText = textDiv.textContent;
      const input = document.createElement("input");
      input.type = "text";
      input.value = oldText;
      input.style.width = "70%";
      textDiv.replaceWith(input);
      input.focus();
      input.onblur = async () => {
        const newText = input.value.trim();
        if (newText && newText !== oldText) {
          const { updateDoc, doc } = await import(
            "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js"
          );
          await updateDoc(doc(db, "journals", id), { text: newText });
        }
        loadJournals();
      };
      input.onkeydown = async (ev) => {
        if (ev.key === "Enter") {
          input.blur();
        }
      };
    };
  });
}

// Add new journal entry
journalForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = journalInput.value.trim();
  if (!text) return;
  await addDoc(collection(db, "journals"), {
    text,
    createdAt: new Date(),
  });
  journalInput.value = "";
  loadJournals();
});

// Initial load
loadJournals();
