import { Messages } from "./Messages";
import "./chatbot.css";

export const Chatbot = () => {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Customer Support Chatbot</h2>
      <Messages Text={"Hello, how can I help you?"} isUser={true} />
      <Messages Text={"I need help with my order."} isUser={false} />
    </>
  );
};
//chore: update dependencies