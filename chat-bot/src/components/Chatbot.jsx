import { Messages } from "./Messages";
import { useState } from "react";
import "./chatbot.css";

export const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    const newMessage = {
      Text: input,
      isUser: true,
    };

    setMessage((prevMessages) => [...prevMessages, newMessage]);
    setInput("");
    // Simulate bot response
    
  };
  return (
    <div className="chat-container">
      <div className="chat-box">
        {message.map((mes, index) => {
          <Messages key={index} Text={mes.Text} isUser={mes.isUser} />;
        })}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};
