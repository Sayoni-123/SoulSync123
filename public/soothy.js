const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Function to add a message to the chat
function addMessage(message, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

// Function to handle user input
async function handleUserInput() {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  // Add user message to the chat
  addMessage(userMessage, "user");
  userInput.value = ""; // Clear input field

  try {
    // Send user input to the server
    const response = await fetch("/api/soothy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: userMessage }),
    });

    const data = await response.json();

    // Add AI response to the chat
    if (data.response) {
      addMessage(data.response, "bot");
    } else {
      addMessage("Sorry, I couldn't generate a response.", "bot");
    }
  } catch (error) {
    console.error("Error:", error);
    addMessage("An error occurred. Please try again later.", "bot");
  }
}

// Event listener for the send button
sendBtn.addEventListener("click", handleUserInput);

// Event listener for pressing Enter in the input field
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleUserInput();
  }
});