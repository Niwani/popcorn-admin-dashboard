import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Dashboard() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/emails"); 
        setEmails(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch emails:", err);
        alert("❌ Failed to fetch emails");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/")
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Collected Emails</h1>
      <button 
        onClick={handleLogout}
        style={{
          padding: "8px 16px",
          backgroundColor: "crimson",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((e) => (
            <tr key={e._id}>
              <td>{e.address}</td> {/* ✅ use 'address' */}
              <td>{new Date(e.date).toLocaleString()}</td> {/* ✅ use 'date' */}
            </tr>
          ))}
          {emails.length === 0 && (
            <tr>
              <td colSpan="2">No signups yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
