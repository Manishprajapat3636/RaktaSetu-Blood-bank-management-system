// frontend/src/components/ChatBot.js
import React, { useState } from "react";

const cannedReplies = (text) => {
  const msg = text.toLowerCase();
  if (msg.includes("register") || msg.includes("signup")) {
    return "To register, click on Sign Up in the top-right, then login and go to 'Become Donor'.";
  }
  if (msg.includes("blood bank")) {
    return "Use 'Search Blood Bank' in the menu and filter by city or name.";
  }
  if (msg.includes("find blood") || msg.includes("need blood")) {
    return "Go to 'Find Blood' and search by city and blood group. You’ll see available donors.";
  }
  if (msg.includes("admin")) {
    return "Admin can log in with an admin account and then open the Admin dashboard from the menu.";
  }
  return "I’m RaktaBot 🤖. I can help with registration, finding blood, and using RaktaSetu. Try asking: 'How to find blood?'";
};

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    { from: "bot", text: "Hi, I’m RaktaBot. How can I help you today?" }
  ]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const userMsg = message.trim();
    const botMsg = cannedReplies(userMsg);
    setChat([...chat, { from: "user", text: userMsg }, { from: "bot", text: botMsg }]);
    setMessage("");
  };

  return (
    <div className={`chatbot ${open ? "open" : ""}`}>
      {open && (
        <div className="chat-window">
          <div className="chat-header">RaktaBot Help</div>
          <div className="chat-body">
            {chat.map((c, idx) => (
              <div key={idx} className={`chat-message ${c.from}`}>
                {c.text}
              </div>
            ))}
          </div>
          <form className="chat-input" onSubmit={sendMessage}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask something..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
      <button className="chat-toggle" onClick={() => setOpen(!open)}>
        💬
      </button>
    </div>
  );
};

export default ChatBot;
