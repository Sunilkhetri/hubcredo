import { useState } from "react";
import api from "../axios";
import "../styles/signup.css";
import { Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", form);
      setMessage("🎉 Account created! You can now login.");
    } catch {
      setMessage("❌ Signup failed");
    }
  };

  return (
    <div className="auth-card">
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Username" onChange={(e)=>setForm({...form,username:e.target.value})}  />
        <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}  />
        <input type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})} />

        <button>Create Account</button>
      </form>

      <p className="message">{message}</p>

      <div className="switch-text">
        Already have an account? 👉 <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Signup;
