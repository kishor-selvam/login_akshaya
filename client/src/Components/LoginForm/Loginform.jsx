import React, { useState } from "react";
import "./Loginform.css";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../../config";
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom

function Loginform({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate(); // Initialize useHistory

  const handleLoginBackend = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    try {
      const response = await axios.post(`http://localhost:5000/login`, { username, password }); // Make a POST request to backend
      
      if (response.data.success) {
        // If login successful, set isLoggedIn state to true and redirect to dashboard
        setIsLoggedIn(true);
        history.push('/dashboard');
      } else {
        setError(response.data.message); // Set error message if login failed
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred while logging in'); // Set error message if request fails
    }
  };

  return (
    <div className="wrapper">
      <form>
        <h1>IRT ANALYSIS</h1>
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
            type="password" // Change input type to password
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
