import { useState } from "react";
import api, { setAuthToken } from "../api";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👁️ icons

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
    <form
      onSubmit={submit}
      style={{ maxWidth: 400, margin: "3rem auto", display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <h2>Admin Login</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />

    <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
    <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        style={{ flex: 1, paddingRight: "2rem" }}
        onKeyDown={(e) => {
            if (e.key === "Enter") {
                submit(e)
            }
        }}
    />
    <span
        onClick={() => setShowPassword(!showPassword)}  
        style={{
        position: "absolute",
        right: "10px",
        cursor: "pointer",
        color: "#555",
        }}
    >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
    </div>
      <button type="submit">Login</button>
    </form>
  );
}
