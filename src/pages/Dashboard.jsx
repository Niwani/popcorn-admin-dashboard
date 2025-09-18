import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./Dashboard.css"

export default function Dashboard() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("")
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
    navigate("/login")
  }

  if (loading) return <div>Loading...</div>;

  const filteredEmails = emails.filter((e) => e.address.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Collected Emails</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div>
        <input 
          type="text" 
          placeholder="Search emails..." 
          value={search} onChange={(e) => setSearch(e.target.value)} 
          className="search-input" 
        />
      </div>

      <table className="email-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmails.map((e) => (
            <tr key={e._id}>
              <td>{e.address}</td>
              <td>{new Date(e.date).toLocaleString()}</td>
            </tr>
          ))}
          {filteredEmails.length === 0 && (
            <tr>
              <td colSpan="2">No matching results</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
