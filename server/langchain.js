// server/langchain.js
require("dotenv").config();
const { ChatGroq } = require("@langchain/groq");
const { HumanMessage } = require("@langchain/core/messages");

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama3-8b-8192",
});

async function chatLLM(userMessage) {
  try {
    const res = await llm.call([new HumanMessage(userMessage)]);
    return res.content;
  } catch (err) {
    console.error("LLM Error:", err);
    return "Maaf, terjadi kesalahan saat menghubungi model AI.";
  }
}

module.exports = chatLLM;
