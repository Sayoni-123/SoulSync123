const express = require("express");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public")); // Serve static files from the "public" folder

const apiKey = "AIzaSyByLqAw_NMtjkoeVtMmI5MAuQTy1zoRyOA";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: "You are Soothy, a friendly therapist who chats in a very friendly way and helps any person. Respond in a maximum of 2 lines.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// API endpoint to handle user input and return AI response
app.post("/api/soothy", async (req, res) => {
  const userInput = req.body.input;

  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: userInput }],
        },
      ],
    });

    const result = await chatSession.sendMessage(userInput);

    const responseText =
      result.response &&
      result.response.candidates &&
      result.response.candidates[0] &&
      result.response.candidates[0].content.parts[0].text;

    res.json({ response: responseText || "Sorry, I couldn't generate a response." });
  } catch (error) {
    console.error("Error occurred:", error.message);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
});

// Function to send user message to the API
async function sendMessageToAPI(userMessage) {
  const response = await fetch("/api/soothy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input: userMessage }),
  });

  return response.json();
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});