const questions = [
  "Do you feel happy today?",
  "Are you feeling energetic?",
  "Do you feel calm and relaxed?",
  "Are you feeling motivated?",
  "Do you feel connected to others?"
];

let currentQuestionIndex = 0;
let moodScore = 0;

const startContainer = document.getElementById("start-container");
const questionsContainer = document.getElementById("questions-container");
const nextBtn = document.getElementById("next-btn");
const moodResult = document.getElementById("moodResult");
const navigationButtons = document.querySelector(".navigation-buttons");

// Start the mood check
function startMoodCheck() {
  startContainer.style.display = "none";
  questionsContainer.style.display = "block";
  navigationButtons.style.display = "block";
  loadQuestion();
}

// Load the current question
function loadQuestion() {
  questionsContainer.innerHTML = `
    <p>${questions[currentQuestionIndex]}</p>
    <div>
      <label><input type="radio" name="answer" value="1" onclick="enableNext()"> Yes</label>
      <label><input type="radio" name="answer" value="0" onclick="enableNext()"> No</label>
    </div>
  `;
  nextBtn.disabled = true;
}

// Enable the Next button when an answer is selected
function enableNext() {
  nextBtn.disabled = false;
}

// Go to the next question or show the result
function nextQuestion() {
  const selectedAnswer = document.querySelector("input[name='answer']:checked");
  if (selectedAnswer) {
    moodScore += parseInt(selectedAnswer.value);
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// Show the result based on the mood score
function showResult() {
  questionsContainer.style.display = "none";
  navigationButtons.style.display = "none";

  if (moodScore >= 4) {
    moodResult.innerHTML = `
      <p>You are happy! Great! Have a little talk with <a href="soothy.html">Soothy</a> to make your day even happier.</p>
    `;
  } else if (moodScore >= 2) {
    moodResult.innerHTML = `
      <p>You seem a bit down. Try some <a href="meditation.html">meditation</a> or listen to <a href="sounds.html">calming sounds</a>.</p>
    `;
  } else {
    moodResult.innerHTML = `
      <p>You seem sad. Consider taking the <a href="deep-test.html">Deep Depression Test</a> or try some <a href="yoga.html">yoga poses</a> to feel better.</p>
    `;
  }
}