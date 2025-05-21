import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [messages, setMessages] = useState([
    {role:"system", content: 'Halo, ada yang bisa saya bantu ?'}
  ])

  const [input, setInput] = useState(''); 
  const [isLoading, setLoading] = useState(false); 
  const buttomRef = useRef(null); 

  const scrollToBottom = () => {
    buttomRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    console.log(input.trim());

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    console.log(updatedMessages)

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/api/chat", {
        messages: updatedMessages
      });

      const botReply = {
        role: "bot",
        content: response.data.reply || "❌ Bot tidak merespon."
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "❌ Gagal mengambil respons dari server."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col h-screen bg-zinc-50 text-zinc-800 font-sans">
      {/* Header */}
      <header className="bg-indigo-700 text-white p-4 shadow-xl sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11a1 1 0 112 0v4a1 1 0 11-2 0V7zm0 8a1 1 0 112 0 1 1 0 01-2 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-xl font-extrabold leading-tight">
              Chat AI with GroqAPI
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-600 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Online
            </span>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 overflow-hidden flex flex-col gap-4">
        <div className="flex-1 overflow-y-auto mb-4 rounded-2xl bg-white/70 border border-white/50 backdrop-blur-xl p-4 shadow-xl">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-4 last:mb-1 flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role !== "user" && (
                <div className="mr-2 mt-1">
                  <div className="w-8 h-8 rounded-full bg-indigo-700/10 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-indigo-700"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10s10-4.477 10-10C20 4.477 15.523 0 10 0zm0 18a8 8 0 100-16 8 8 0 000 16z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}

              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 ${
                  msg.role === "user"
                    ? "bg-indigo-700 text-white rounded-2xl rounded-br-none shadow"
                    : "bg-zinc-100 text-zinc-800 rounded-2xl rounded-bl-none shadow"
                }`}
              >
                {msg.content}
              </div>

              {msg.role === "user" && (
                <div className="ml-2 mt-1">
                  <div className="w-8 h-8 rounded-full bg-violet-400/10 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-violet-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="mr-2 mt-1">
                <div className="w-8 h-8 rounded-full bg-indigo-700/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-indigo-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10s10-4.477 10-10C20 4.477 15.523 0 10 0zm0 18a8 8 0 100-16 8 8 0 000 16z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="bg-zinc-100 text-zinc-800 rounded-2xl rounded-bl-none shadow flex items-center justify-center h-8 w-16">
                <div className="flex items-center gap-1">
                  <span className="block w-2 h-2 bg-indigo-700 rounded-full opacity-60 animate-bounce [animation-delay:0s]"></span>
                  <span className="block w-2 h-2 bg-indigo-700 rounded-full opacity-60 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="block w-2 h-2 bg-indigo-700 rounded-full opacity-60 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={buttomRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white/70 border border-white/50 backdrop-blur-xl rounded-xl shadow-lg p-3 flex items-center gap-2 sticky bottom-4">
          <input
            className="flex-1 bg-white/80 border-none rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:bg-white placeholder-zinc-400 transition-all duration-300"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="bg-indigo-700 hover:bg-indigo-800 text-white font-medium px-5 py-3 rounded-lg transition-all duration-300 flex items-center justify-center shadow"
            onClick={sendMessage}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
