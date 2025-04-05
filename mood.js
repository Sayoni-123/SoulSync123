const questions = [
  "Do you feel hopeless or down lately?",
  "Have you experienced sudden bursts of anger?",
  "Do you find joy in your daily activities?",
  "Are you feeling more nervous than usual?",
  "Have you been isolating yourself?"
];

const moodScores = {
  Happy: 0,
  Sad: 0,
  Angry: 0,
  Anxious: 0,
  Neutral: 0
};

let currentQuestion = 1;
const totalQuestions = 3;

function loadQuestions() {
  const container = document.getElementById("questions-container");
  container.innerHTML = "";
  const selectedQuestions = questions.slice(0, totalQuestions);

  selectedQuestions.forEach((q, index) => {
    const card = document.createElement("div");
    card.className = "question-card";
    card.id = `question-${index + 1}`;
    card.style.display = index === 0 ? "block" : "none";
    card.innerHTML = `
      <p>${q}</p>
      <div class="answer-options">
        <label><input type="radio" name="q${index + 1}" value="Happy" onclick="enableNextButton()"> I'm doing fine</label><br>
        <label><input type="radio" name="q${index + 1}" value="Sad" onclick="enableNextButton()"> Feeling low</label><br>
        <label><input type="radio" name="q${index + 1}" value="Angry" onclick="enableNextButton()"> Irritated/Frustrated</label><br>
        <label><input type="radio" name="q${index + 1}" value="Anxious" onclick="enableNextButton()"> Anxious/Nervous</label><br>
        <label><input type="radio" name="q${index + 1}" value="Neutral" onclick="enableNextButton()"> No major change</label>
      </div>
    `;
    container.appendChild(card);
  });

  showQuestion(currentQuestion);
}

function showQuestion(questionNumber) {
  for (let i = 1; i <= totalQuestions; i++) {
    const questionBlock = document.getElementById(`question-${i}`);
    questionBlock.style.display = i === questionNumber ? "block" : "none";
  }

  document.getElementById("next-btn").disabled = true; // Disable the Next button initially
}

function enableNextButton() {
  document.getElementById("next-btn").disabled = false; // Enable the Next button when an option is selected
}

function nextQuestion() {
  const currentQuestionBlock = document.getElementById(`question-${currentQuestion}`);
  const selectedOption = currentQuestionBlock.querySelector('input[type="radio"]:checked');

  if (selectedOption) {
    const answer = selectedOption.value;
    moodScores[answer]++;

    if (currentQuestion < totalQuestions) {
      currentQuestion++;
      showQuestion(currentQuestion);
    } else {
      submitAllAnswers();
    }
  }
}

function submitAllAnswers() {
  const detectedMood = Object.keys(moodScores).reduce((a, b) =>
    moodScores[a] > moodScores[b] ? a : b
  );

  const moodResult = document.getElementById("moodResult");
  moodResult.innerHTML = `Your overall mood is: <strong>${detectedMood}</strong>`;
}

loadQuestions();