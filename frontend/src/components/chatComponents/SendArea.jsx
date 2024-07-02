import React, { useContext } from "react";
import { IoIosSend } from "react-icons/io";
import Features from "./Features";
import { AccountContext } from "../../context/AccountDetails";
import axios from "axios";

const SendArea = ({ userId, text, setText }) => {
  const { Account } = useContext(AccountContext);
  // console.log(Account._id, text);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post(
        `http://localhost:3001/conversations/chat/${userId.id}`,
        {
          senderId: Account._id,
          message: text,
        }
      );
    } catch (err) {
      console.log("error while sending new convo", err);
    } finally {
      setText("");
    }
  };

  return (
    <>
      <form
        method="post"
        className="fixed bottom-0 w-full gap-1.5 bg-slate-100 flex items-center justify-between rounded-lg p-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Message..."
          className="pl-3 py-0.5 w-full ml-4 rounded-lg"
          value={text} // Bind the value to the state
          onChange={(e) => setText(e.target.value)} // Update the state on change
        />
        <div className="flex gap-1">
          <button type="submit">
            <IoIosSend style={{ fontSize: "25px", color: "black" }} />
          </button>
          <Features />
        </div>
      </form>
    </>
  );
};

export default SendArea;
