let timerInterval = null;
let remainingSeconds = 0;
let isPaused = false;

const timerDisplay = document.getElementById("timerDisplay");
const durationInput = document.getElementById("durationInput");
const startBtn = document.getElementById("startBtn");
const breakBtn = document.getElementById("breakBtn");
const continueBtn = document.getElementById("continueBtn");
const forfeitBtn = document.getElementById("forfeitBtn");

function updateDisplay() {
  const min = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
  const sec = String(remainingSeconds % 60).padStart(2, "0");
  timerDisplay.textContent = `${min}:${sec}`;
}

function startTimer() {
  const duration = parseInt(durationInput.value, 10);
  if (isNaN(duration) || duration <= 0) {
    alert("Please enter a valid duration in minutes.");
    return;
  }
  remainingSeconds = duration * 60;
  isPaused = false;
  updateDisplay();
  startBtn.disabled = true;
  breakBtn.disabled = false;
  continueBtn.disabled = true;
  forfeitBtn.disabled = false;
  timerInterval = setInterval(() => {
    if (!isPaused && remainingSeconds > 0) {
      remainingSeconds--;
      updateDisplay();
      if (remainingSeconds === 0) {
        clearInterval(timerInterval);
        alert("Time's up! Great job!");
        startBtn.disabled = false;
        breakBtn.disabled = true;
        continueBtn.disabled = true;
        forfeitBtn.disabled = true;
      }
    }
  }, 1000);
}

function pauseTimer() {
  isPaused = true;
  breakBtn.disabled = true;
  continueBtn.disabled = false;
}

function continueTimer() {
  isPaused = false;
  breakBtn.disabled = false;
  continueBtn.disabled = true;
}

function forfeitTimer() {
  clearInterval(timerInterval);
  timerDisplay.textContent = "00:00";
  startBtn.disabled = false;
  breakBtn.disabled = true;
  continueBtn.disabled = true;
  forfeitBtn.disabled = true;
  alert("Session forfeited.");
}

startBtn.addEventListener("click", startTimer);
breakBtn.addEventListener("click", pauseTimer);
continueBtn.addEventListener("click", continueTimer);
forfeitBtn.addEventListener("click", forfeitTimer);

// Initial state
breakBtn.disabled = true;
continueBtn.disabled = true;
forfeitBtn.disabled = true;
updateDisplay();
