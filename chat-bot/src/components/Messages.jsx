import "./Message.css";

export const Messages = ({Text, isUser}) => {
  return (
    <>
      <div className={`message ${isUser ? 'user' : 'bot'}`}>
        <p>{Text}</p>
      </div>
    </>
  );
};
