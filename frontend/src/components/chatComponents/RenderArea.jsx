import React, { useEffect } from "react";

const RenderArea = ({ messages }) => {
  useEffect(() => {
    const container = document.getElementById("messageContainer");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div id="messageContainer" style={{ overflowY: "scroll", height: "300px" }}>
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))
      ) : (
        <p>No messages yet</p>
      )}
    </div>
  );
};

export default RenderArea;
