import { useState } from "react";
import axios from "../axios";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);

    if (!form.username || !form.password) {
      setMessage("Please enter both username and password.");
      return setLoading(false);
    }

    try {
      const res = await axios.post("/auth/login", form);

      await new Promise((resolve) => setTimeout(resolve, 500));

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("isLoggedIn", "true");

      navigate("/");
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
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={form.password}
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

          <p className="register-link">
            Don&apos;t have an account? <a href="/register">Register</a>
          </p>
        </div>
      )}
    </div>
  );
}

export default Login;
