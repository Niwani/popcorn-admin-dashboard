import { useState } from "react";
import api, { setAuthToken } from "../api";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./Login.css"

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });
      const { token } = res.data;
      localStorage.setItem("token", token);
      setAuthToken(token);
      nav("/dashboard");
    } catch (err) {
      if (err.response) {
        alert(`❌ ${err.response.data.error || "Login failed"} (status ${err.response.status})`);
      } else {
        alert(`❌ Network error: ${err.message}`);
      }
      console.error("Login error:", err);
    }
  };

  return (
    <form onSubmit={submit} className="login-form">
      <h2 className="login-title">Admin Login</h2>

      {/* Username */}
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="login-input"
      />

      {/* Password */}
      <div className="password-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="password-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              document.querySelector("form").requestSubmit();
            }
          }}
        />

        <span
          onClick={() => setShowPassword(!showPassword)}
          className="toggle-password"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {/* Submit */}
      <button type="submit" className="login-button">
        Login
      </button>
    </form>
  );
}
