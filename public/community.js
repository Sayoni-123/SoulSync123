// Function to switch between groups
function switchGroup(groupId) {
  const groups = document.querySelectorAll(".chat-group");
  groups.forEach((group) => {
    group.classList.add("hidden");
    group.classList.remove("active");
  });

  const activeGroup = document.getElementById(groupId);
  activeGroup.classList.remove("hidden");
  activeGroup.classList.add("active");
}

// Function to send a message
function sendMessage(groupId) {
  const input = document.getElementById(`input-${groupId}`);
  const chatBox = document.getElementById(`chat-box-${groupId}`);
  const message = input.value.trim();

  if (message) {
    // Add user message to the chat
    const userMessage = document.createElement("div");
    userMessage.classList.add("chat-message", "user");
    userMessage.textContent = message;
    chatBox.appendChild(userMessage);

    // Clear the input field
    input.value = "";

    // Simulate a bot response
    setTimeout(() => {
      const botMessage = document.createElement("div");
      botMessage.classList.add("chat-message", "bot");
      botMessage.textContent = "Thank you for your message!";
      chatBox.appendChild(botMessage);

      // Scroll to the bottom of the chat
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
  }
}