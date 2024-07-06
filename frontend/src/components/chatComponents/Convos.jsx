import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../context/AccountDetails";
import RenderArea from "./RenderArea";
import { useSocketContext } from "../../context/SocketContext";

const Convos = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { Account } = useContext(AccountContext);
  const { socket } = useSocketContext();

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `http://localhost:3001/conversations/chat/${userId.id}`,
          {
            params: {
              senderId: Account._id,
            },
          }
        );
        setMessages(response.data);
      } catch (err) {
        console.log("error while fetching convo", err);
      }

      setLoading(false);
    };

    fetchMessages();

    const handleNewMessage = (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket?.on("newMessage", handleNewMessage);

    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [Account._id, socket, userId.id]);

  return (
    <div>
      {loading ? <p>Loading...</p> : <RenderArea messages={messages} />}
    </div>
  );
};

export default Convos;
