const questions = document.querySelectorAll(".question");
const submitBtn = document.getElementById("submitBtn");
const resultDiv = document.getElementById("result");

let currentQuestionIndex = 0;

// Show the first question
questions[currentQuestionIndex].style.display = "block";

// Function to show the next question
function showNextQuestion() {
  // Hide the current question
  questions[currentQuestionIndex].style.display = "none";

  // Move to the next question
  currentQuestionIndex++;

  // If there are more questions, show the next one
  if (currentQuestionIndex < questions.length) {
    questions[currentQuestionIndex].style.display = "block";
  } else {
    // If no more questions, show the submit button
    submitBtn.style.display = "block";
  }
}

// Add event listeners to all radio buttons
questions.forEach((question) => {
  const options = question.querySelectorAll("input[type='radio']");
  options.forEach((option) => {
    option.addEventListener("click", showNextQuestion);
  });
});

// Handle the final submission
submitBtn.addEventListener("click", () => {
  const form = document.getElementById("moodForm");
  const formData = new FormData(form);

  // Count the mood scores
  const moodScores = {
    happy: 0,
    sad: 0,
    neutral: 0,
    nervous: 0,
    angry: 0,
  };

  for (let [key, value] of formData.entries()) {
    moodScores[value]++;
  }

  // Determine the dominant mood
  let dominantMood = "neutral";
  let maxScore = 0;
  for (let mood in moodScores) {
    if (moodScores[mood] > maxScore) {
      maxScore = moodScores[mood];
      dominantMood = mood;
    }
  }

  // Display the result and suggest an activity
  switch (dominantMood) {
    case "happy":
      resultDiv.innerHTML = "You are happy! Try some <a href='meditation.html'>meditation</a> to maintain your mood.";
      break;
    case "sad":
      resultDiv.innerHTML = "You seem sad. Listen to some <a href='sounds.html'>meditation sounds</a> to feel better.";
      break;
    case "neutral":
      resultDiv.innerHTML = "You are feeling neutral. Explore some <a href='yoga.html'>yoga poses</a> to relax.";
      break;
    case "nervous":
      resultDiv.innerHTML = "You seem nervous. Try some <a href='meditation.html'>meditation</a> to calm your mind.";
      break;
    case "angry":
      resultDiv.innerHTML = "You seem angry. Consider taking the <a href='deep-test.html'>Deep Test</a> to understand your emotions.";
      break;
    default:
      resultDiv.innerHTML = "Unable to determine your mood. Try again.";
  }
});