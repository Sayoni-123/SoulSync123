let timerInterval;
let timeLeft = 300; // 5 minutes in seconds
let isPaused = false;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");

// Function to format time as MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// Function to start the timer
function startTimer() {
  if (timerInterval || isPaused) return; // Prevent multiple intervals
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timerDisplay.textContent = formatTime(timeLeft);
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("Meditation complete. Namaste!");
    }
  }, 1000);
}

// Function to pause the timer
function pauseTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    isPaused = true;
  }
}

// Function to reset the timer
function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timeLeft = 300; // Reset to 5 minutes
  timerDisplay.textContent = formatTime(timeLeft);
  isPaused = false;
}

// Event listeners
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Initialize the timer display
timerDisplay.textContent = formatTime(timeLeft);