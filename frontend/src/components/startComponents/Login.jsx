import React, { useContext, useState } from "react";
import axios from "axios";
import { AccountContext } from "../../context/AccountDetails";
import { useSocketContext } from "../../context/SocketContext";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAccount, setIsLogged } = useContext(AccountContext);
  const { setOnlineUsers } = useSocketContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        setIsLogged("yes");
        setAccount(response.data.user);
        setOnlineUsers((prevUsers) => [...prevUsers, response.data.user._id]);
      } else {
        alert("Incorrect credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Incorrect credentials");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-5 border border-black rounded-lg"
      >
        <section className="flex flex-col mb-5">
          <label htmlFor="email" className="text-black mb-2">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="Your email"
            required
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
        </section>

        <section className="flex flex-col mb-5">
          <label htmlFor="password" className="text-black mb-2">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="Password"
            required
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
        </section>

        <button
          type="submit"
          className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-150"
        >
          Login
        </button>
      </form>
      <button
        onClick={() => props.onFormSwitch("no")}
        className="mt-5 text-blue-500 hover:underline"
      >
        Don't have an account? Create here
      </button>
    </>
  );
};

export default Login;
