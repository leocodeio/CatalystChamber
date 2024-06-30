import React, { useState } from "react";
import Menu from "../components/textComponents/Menu";
import Profile from "../components/textComponents/Profile";
import Acc from "../components/textComponents/Acc";
import { IoMdHome } from "react-icons/io";
import { useSocketContext } from "../context/SocketContext";
// import Chat from "./Chat";

const Text = () => {
  const [isAccOpen, setIsAccOpen] = useState("no");
  const [isProfileOpen, setIsProfileOpen] = useState("no");
  const {onlineUsers}=useSocketContext();
  console.log(onlineUsers);
  const handleClick = () => {
    setIsAccOpen("no");
    setIsProfileOpen("no");
  };

  return (
    <>
      {isAccOpen === "yes" ? (
        <>
          <button
            className="fixed right-4 top-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClick}
          >
            <IoMdHome className="text-3xl text-black" />
          </button>
          <Acc />
        </>
      ) : isProfileOpen === "yes" ? (
        <>
          <button
            className="fixed right-4 top-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClick}
          >
            <IoMdHome className="text-3xl text-black" />
          </button>
          <Profile />
        </>
      ) : (
        <>
          <Menu
            setIsAccOpen={setIsAccOpen}
            setIsProfileOpen={setIsProfileOpen}
          />
          {/* <Chat /> */}
        </>
      )}
    </>
  );
};

export default Text;
