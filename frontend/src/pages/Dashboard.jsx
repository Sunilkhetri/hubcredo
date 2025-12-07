import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/dashboard").then(res => setMessage(res.data.message));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-wrapper">

      <aside className="sidebar">
        <h3>Dashboard</h3>
        <ul>
          <li>🏠 Home</li>
          <li>👤 Profile</li>
          <li>⚙ Settings</li>
        </ul>

        <button onClick={logout}>Logout</button>
      </aside>

      <main className="content">
        <header className="header">
          Welcome 👋
        </header>

        <div className="page-content">
          <h2>{message}</h2>
        </div>
      </main>

    </div>
  );
};

export default Dashboard;
