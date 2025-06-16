import { useState } from "react";
import axios from "../axios";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form,
        { withCredentials: true }
      );
      setMessage(res.data.message);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", res.data.username);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back 🍽️</h2>
        <input
          type="text"
          placeholder="Username"
          className="login-input"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        {message && (
          <p
            className={`login-message ${
              message.toLowerCase().includes("success") ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
