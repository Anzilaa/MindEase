import { db } from "./firebase.js";
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import {
  getAuth,
  deleteUser,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const avatarDiv = document.getElementById("avatar");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const genderInput = document.getElementById("gender");
const notifInput = document.getElementById("notif");
const reminderInput = document.getElementById("reminder");
const logoutBtn = document.querySelector(".logout");
const deleteBtn = document.querySelector(".delete");

const auth = getAuth();
let userId = null;

// Load profile from Firestore
async function loadProfile() {
  if (!userId) return;
  try {
    const docRef = doc(db, "profiles", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      nameInput.value = data.name || "";
      ageInput.value = data.age || "";
      genderInput.value = data.gender || "";
      notifInput.checked = !!data.notif;
      reminderInput.checked = !!data.reminder;
      updateAvatar();
    }
  } catch (err) {
    console.error("Error loading profile:", err);
    alert("Failed to load profile. Please try again.");
  }
}

// Update avatar letter on name change
function updateAvatar() {
  const name = nameInput.value.trim();
  if (name) {
    avatarDiv.textContent = name.charAt(0).toUpperCase();
  } else if (auth.currentUser?.email) {
    avatarDiv.textContent = auth.currentUser.email.charAt(0).toUpperCase();
  } else {
    avatarDiv.textContent = "A";
  }
}

// Auto-save handler
async function autoSaveProfile() {
  if (!userId) return;
  const profileData = {
    name: nameInput.value.trim(),
    age: ageInput.value,
    gender: genderInput.value,
    notif: notifInput.checked,
    reminder: reminderInput.checked,
  };
  try {
    await setDoc(doc(db, "profiles", userId), profileData, { merge: true });
    updateAvatar();
  } catch (err) {
    console.error("Error saving profile:", err);
    alert("Failed to save profile changes.");
  }
}

// Input event listeners (auto-save)
nameInput.addEventListener("input", () => {
  updateAvatar();
  autoSaveProfile();
});
ageInput.addEventListener("input", autoSaveProfile);
genderInput.addEventListener("change", autoSaveProfile);
notifInput.addEventListener("change", autoSaveProfile);
reminderInput.addEventListener("change", autoSaveProfile);

// Logout
logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("Logged out!");
    window.location.href = "../root/login.html";
  } catch (err) {
    console.error("Logout failed:", err);
    alert("Logout failed: " + err.message);
  }
});

// Delete account from Firestore and Auth
deleteBtn.addEventListener("click", async () => {
  if (!confirm("Are you sure you want to delete your account?")) return;
  if (!userId) return;

  try {
    // Delete profile from Firestore
    await deleteDoc(doc(db, "profiles", userId));

    // Delete user from Auth
    const user = auth.currentUser;
    if (user) {
      await deleteUser(user);
    }

    alert("Account deleted!");
    window.location.href = "../root/signup.html";
  } catch (err) {
    console.error("Delete failed:", err);
    if (err.code === "auth/requires-recent-login") {
      alert("Please log in again to delete your account.");
      await signOut(auth);
      window.location.href = "../root/login.html";
    } else {
      alert("Failed to delete account: " + err.message);
    }
  }
});

// Auth state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    userId = user.uid;
    loadProfile();
  } else {
    // Not logged in, redirect to login
    window.location.href = "../root/login.html";
  }
});
