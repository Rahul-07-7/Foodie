import { useState } from "react";
import axios from "../axios";
import Loader from "./Loader";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/auth/login", form, {
        withCredentials: true,
      });
      setMessage(res.data.message);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", res.data.username);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {loading ? (
        <Loader />
      ) : (
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
          {/* ✅ Add Register Link */}
          <p className="register-link">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      )}
    </div>
  );
}

export default Login;
