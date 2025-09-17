import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          token ? <Dashboard /> : <Navigate to="/login" replace />
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}