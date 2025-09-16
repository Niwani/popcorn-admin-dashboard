import { useState } from "react";
import api, { setAuthToken } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
``
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });
      const { token } = res.data;
      localStorage.setItem("token", token);
      setAuthToken(token);
      nav("/dashboard");
    } catch (err) {
      alert("❌ Invalid login");
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
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
