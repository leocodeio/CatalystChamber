import axios from "axios";
import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

const RenderArea = ({ messages, currentUserId }) => {
  const [profilePics, setProfilePics] = useState({});

  useEffect(() => {
    const container = document.getElementById("messageContainer");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const fetchProfilePics = async () => {
      const newProfilePics = {};
      for (const message of messages) {
        if (!profilePics[message.senderId]) {
          try {
            const response = await axios.post(
              "http://localhost:3001/users/search-user",
              {
                id: message.senderId,
              }
            );
            if (response.status === 200) {
              newProfilePics[message.senderId] = response.data.profilePic;
            } else {
              newProfilePics[message.senderId] = null;
            }
          } catch (error) {
            console.error("Error:", error);
            newProfilePics[message.senderId] = null;
          }
        }
      }
      setProfilePics((prev) => ({ ...prev, ...newProfilePics }));
    };

    fetchProfilePics();
    // eslint-disable-next-line
  }, [messages]);

  return (
    <div
      id="messageContainer"
      className="overflow-y-scroll h-[600px] p-4 rounded-lg"
    >
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-4 rounded-lg ${
              message.senderId === currentUserId
                ? "bg-blue-100 flex flex-col items-end"
                : "bg-white flex flex-col items-start"
            }`}
          >
            <div className={`${
              message.senderId === currentUserId
                ? "flex flex-row-reverse gap-5"
                : "flex gap-5"
            }`}>
              <p className="text-sm text-gray-500 mb-2">
                <img
                  src={`data:image/jpeg;base64,${
                    profilePics[message.senderId]
                  }`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </p>
              <p className="text-base text-gray-700 mb-2"><b>{message.message}</b></p>
            </div>
            <p className="text-xs text-gray-400">
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
