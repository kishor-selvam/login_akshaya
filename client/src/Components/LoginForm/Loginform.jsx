import React, { useState } from "react";
import "./Loginform.css";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../../config";

function Loginform({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginBackend = async (e) => {
    e.preventDefault(); 

    try {
      const res = await axios.post(API_URL + "auth/login", {
        username,
        password,
      });

      if (res.data.success) {
        setIsLoggedIn(true);
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      setError("An error occurred while logging in."); 
    }
  };

  const handleLogin = () => {
    if (username === "akshaya" && password === "123456") {
      // Set isLoggedIn to true upon successful login
      setIsLoggedIn(true);
    } else {
      alert("Invalid username or password");
    }
  };
  return (
    <div className="wrapper">
      <form action="">
        <h1>IRT ANALYSYS</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: "red" }}>{error}</p>}{" "}
          <FaLock className="icon" />
        </div>

        <button onClick={(e) => handleLoginBackend(e)}>Login</button>
      </form>
    </div>
  );
}

export default Loginform;
