import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../../context/AccountDetails";
import axios from "axios";
import { useSocketContext } from "../../context/SocketContext";

const Connects = (props) => {
  const searchedUsers = props.searchedUsers;
  const navigate = useNavigate();
  const { Account } = useContext(AccountContext);
  const { onlineUsers } = useSocketContext();

  const handleClick = async (userId) => {
    // console.log(`Clicked user with ID: ${userId}`);
    try {
      await axios.post("http://localhost:3001/conversations/conversation/add", {
        senderId: Account._id,
        recieverId: userId,
      });
    } catch (err) {
      console.log("error while making new convo", err);
    }
    navigate(`/chat/${userId}`);
  };

  return (
    <div className="p-2 m-4 border-solid border-black border-2 rounded-lg">
      {searchedUsers.map((user) => (
        <div
          key={user._id}
          onClick={() => handleClick(user._id)}
          style={{ cursor: "pointer" }}
          className={
            onlineUsers.includes(user._id) ? "bg-green-500" : "bg-gray-500"
          }
        >
          <p>{user.name}</p>
          <p>{user.tag}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Connects;
