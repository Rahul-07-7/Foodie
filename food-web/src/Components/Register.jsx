import React, { useState } from "react";
import axios from "../axios";
import Loader from "./Loader";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true); //
    try {
      const res = await axios.post("/auth/register", form, {
        withCredentials: true,
      });
      setMessage(res.data.message);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      {loading ? (
        <Loader />
      ) : (
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
      )}
    </div>
  );
}

export default Register;
