import React, { useEffect } from "react";
import 'tailwindcss/tailwind.css';

const RenderArea = ({ messages, currentUserId }) => {
  useEffect(() => {
    const container = document.getElementById("messageContainer");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div id="messageContainer" className="overflow-y-scroll h-[600px] p-4 rounded-lg">
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-4 rounded-lg ${message.senderId === currentUserId ? 'bg-blue-100 flex flex-col items-end' : 'bg-white flex flex-col items-start'}`}
          >
            <p className="text-sm text-gray-500 mb-2">
              {/* <strong>Sender ID:</strong>  */}
              {message.senderId}
            </p>
            <p className="text-base text-gray-700 mb-2">
              {/* <strong>Message:</strong>  */}
              {message.message}
            </p>
            <p className="text-xs text-gray-400">
              {/* <strong>Timestamp:</strong>  */}
              {new Date(message.timestamp).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No messages yet</p>
      )}
    </div>
  );
};

export default RenderArea;
