const questions = [
  "Do you feel sad or empty most of the day?",
  "Have you lost interest or pleasure in most activities?",
  "Do you feel tired or have little energy nearly every day?",
  "Do you have trouble sleeping or sleep too much?",
  "Do you feel worthless or excessively guilty?",
  "Have you noticed changes in appetite or weight?",
  "Do you have difficulty concentrating?",
  "Do you feel hopeless about the future?",
  "Have you had thoughts of self-harm or suicide?",
  "Do you feel restless or slowed down physically?",
  "Have you withdrawn from family and friends?",
  "Do you experience mood swings?",
  "Do you have trouble making decisions?",
  "Do you feel unmotivated most of the time?",
  "Do you feel like a failure?",
  "Do you have frequent headaches or unexplained pains?",
  "Are you overly self-critical?",
  "Do you avoid social interactions?",
  "Do you find it hard to complete tasks?",
  "Have you lost interest in personal hygiene?"
];

const form = document.getElementById("quizForm");
const nextBtn = document.getElementById("nextBtn");
const resultDiv = document.getElementById("result");

// Generate form dynamically
questions.forEach((q, index) => {
  const questionBlock = document.createElement("div");
  questionBlock.className = "question-block question";

  const questionText = document.createElement("p");
  questionText.className = "question-text";
  questionText.textContent = q;

  const optionsContainer = document.createElement("div");
  optionsContainer.className = "options-container";

  const yesInput = document.createElement("input");
  yesInput.type = "radio";
  yesInput.name = `q${index}`;
  yesInput.value = "1";
  yesInput.id = `q${index}-yes`;

  const noInput = document.createElement("input");
  noInput.type = "radio";
  noInput.name = `q${index}`;
  noInput.value = "0";
  noInput.id = `q${index}-no`;

  const yesLabel = document.createElement("label");
  yesLabel.textContent = "Yes";
  yesLabel.setAttribute("for", `q${index}-yes`);

  const noLabel = document.createElement("label");
  noLabel.textContent = "No";
  noLabel.setAttribute("for", `q${index}-no`);

  optionsContainer.appendChild(yesInput);
  optionsContainer.appendChild(yesLabel);
  optionsContainer.appendChild(noInput);
  optionsContainer.appendChild(noLabel);

  questionBlock.appendChild(questionText);
  questionBlock.appendChild(optionsContainer);
  form.appendChild(questionBlock);
});

const questionsElements = document.querySelectorAll(".question");

let currentQuestionIndex = 0;
let totalScore = 0;

// Show the first question
questionsElements[currentQuestionIndex].classList.add("active");

// Function to show the next question
function showNextQuestion() {
  const currentQuestion = questionsElements[currentQuestionIndex];
  const selectedAnswer = currentQuestion.querySelector("input[type='radio']:checked");

  if (!selectedAnswer) {
    alert("Please select an answer before proceeding.");
    return;
  }

  totalScore += parseInt(selectedAnswer.value);
  currentQuestion.classList.remove("active");

  currentQuestionIndex++;

  if (currentQuestionIndex < questionsElements.length) {
    questionsElements[currentQuestionIndex].classList.add("active");
  } else {
    nextBtn.style.display = "none";
    displayResult();
  }
}

// Function to display the result
function displayResult() {
  if (totalScore <= 5) {
    resultDiv.textContent = "You are not depressed. Keep taking care of yourself!";
  } else if (totalScore <= 9) {
    resultDiv.textContent = "You might be experiencing mild depression. Consider talking to someone.";
  } else {
    resultDiv.textContent = "You might be experiencing severe depression. Please seek professional help.";
  }
}

// Event listener for the Next button
nextBtn.addEventListener("click", showNextQuestion);
