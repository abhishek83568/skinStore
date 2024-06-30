// src/components/LoginPage.js
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../App.css";
import { AuthContext } from "../context/AuthContext";


const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const loggedUser = JSON.parse(localStorage.getItem("userCred"));

    if (
      credentials.email === loggedUser.email &&
      credentials.password === loggedUser.password
    ) {
      login();
      navigate("/");
    } else {
      alert("Wrong credentials");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="login-container">
        <input
          type="email"
          placeholder="Enter email"
          name="email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, [e.target.name]: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, [e.target.name]: e.target.value })
          }
          required
        />
        <button type="submit">Login</button>
        <h4>
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Register here</span>
        </h4>
      </form>
    </div>
  );
};

export default LoginPage;
