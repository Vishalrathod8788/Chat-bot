import { Chatbot } from "./components/Chatbot";

function app() {
  return (
    <div className="App">
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        Customer Support Chatbot
      </h2>

      <Chatbot />
    </div>
  );
}

export default app;
