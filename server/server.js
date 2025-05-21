const express = require("express");
const cors = require("cors");
const chatLLM = require("./langchain");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  try {
    // Extract the last user message content
    const lastUserMessage = messages
      .slice()
      .reverse()
      .find((msg) => msg.role === "user")?.content;

    if (!lastUserMessage) {
      return res.status(400).json({ error: "No user message found." });
    }

    const reply = await chatLLM(lastUserMessage);
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan!" });
  }
});

const PORT = 8080;
app.listen(PORT, () =>
  console.log(`✅ Backend berjalan di http://localhost:${PORT}`)
);
