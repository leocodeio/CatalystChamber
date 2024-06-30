import React, { createContext, useState, useEffect, useContext } from "react";
import { AccountContext } from "./AccountDetails";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const { Account } = useContext(AccountContext);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (Account) {
      const newSocket = io("http://localhost:3001", {
        query: { userId: Account._id },
      });

      setSocket(newSocket);

      newSocket.on("connect_error", (err) => {
        console.error("Connection Error:", err.message);
      });

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [Account]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers,setOnlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
