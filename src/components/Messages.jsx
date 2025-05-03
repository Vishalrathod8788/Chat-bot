import "./Message.css";

export const Messages = ({ Text, isUser, timestamp }) => {
  // Format timestamp or use current time if not provided
  const formattedTime = timestamp 
    ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`message-row ${isUser ? "user-row" : "bot-row"}`}>
      <div className="avatar">
        {isUser ? "👤" : "🤖"}
      </div>
      <div className={`message ${isUser ? "user" : "bot"}`}>
        <p>{Text}</p>
        <div className="timestamp">{formattedTime}</div>
      </div>
    </div>
  );
};

export const TypingIndicator = () => {
  return (
    <div className="message-row bot-row">
      <div className="avatar">🤖</div>
      <div className="typing">
        <span className="typing-dot"></span>
        <span className="typing-dot"></span>
        <span className="typing-dot"></span>
      </div>
    </div>
  );
};

export const EmptyState = () => {
  return (
    <div className="empty-state">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 15h8M9.5 9h.01M14.5 9h.01"></path>
      </svg>
      <p>No messages yet. Start a conversation!</p>
    </div>
  );
};