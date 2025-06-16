import React, { useState } from "react";
import axios from "../axios";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "https://foodie-kb4r.onrender.com/api/auth/register",
        form
      );
      setMessage(res.data.message);

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Create Your Foodie Account 🍕</h2>
        <input
          type="text"
          placeholder="Username"
          className="register-input"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="register-input"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="register-input"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="register-button" onClick={handleRegister}>
          Register
        </button>
        {message && <p className="register-message">{message}</p>}
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
