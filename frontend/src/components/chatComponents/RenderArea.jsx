import React, { useEffect } from "react";

const RenderArea = ({ messages }) => {
  useEffect(() => {
    const container = document.getElementById("messageContainer");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);


  return (
    <div id="messageContainer" style={{ overflowY: "scroll", height: "490px" }}>
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div key={index} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
            <p><strong>Sender ID:</strong> {message.senderId}</p>
            <p><strong>Message:</strong> {message.message}</p>
            <p><strong>Timestamp:</strong> {new Date(message.timestamp).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No messages yet</p>
      )}
    </div>
  );
};

export default RenderArea;
