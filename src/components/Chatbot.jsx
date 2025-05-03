import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Messages, TypingIndicator, EmptyState } from "./Messages";
import "./chatbot.css";

export const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const chatBoxRef = useRef(null);

  // Scroll to the bottom of the chat whenever messages change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Check for system preferred color scheme
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDark);
  }, []);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const currentTime = new Date();
    const newUserMessage = {
      Text: input,
      isUser: true,
      timestamp: currentTime,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setLoading(true);

    try {
      // Simulate network delay for more natural feel
      await new Promise((resolve) =>
        setTimeout(resolve, 600 + Math.random() * 1200)
      );

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful customer support assistant for our company.",
            },
            { role: "user", content: input },
          ],
          max_tokens: 50,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );

      const botMessage = response.data.choices[0].message.content;
      setMessages((prev) => [
        ...prev,
        {
          Text: botMessage,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          Text: "Sorry, I'm having trouble connecting right now. Please try again later.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`chat-container ${darkMode ? "dark" : ""}`}>
      <div className="chat-header">
        <h2>Customer Support</h2>
        <div className="toggle-theme">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      <div className="chat-box" ref={chatBoxRef}>
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          messages.map((msg, index) => (
            <Messages
              key={index}
              Text={msg.Text}
              isUser={msg.isUser}
              timestamp={msg.timestamp}
            />
          ))
        )}
        {loading && <TypingIndicator />}
      </div>

      <div className="input-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message here..."
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || input.trim() === ""}
          className={loading ? "loading-button" : ""}
        >
          {!loading && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};
