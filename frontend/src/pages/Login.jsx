import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../axios";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch {
      setMessage("❌ Invalid credentials");
    }
  };

  return (
    <div className="auth-card">
      <h2>Welcome Back 👋</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})} />
        <input type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})} />
        <button>Login</button>
      </form>

      <p className="message">{message}</p>

      <div className="switch-text">
        Don't have an account? 👉 <Link to="/signup">Create one</Link>
      </div>
    </div>
  );
};

export default Login;
