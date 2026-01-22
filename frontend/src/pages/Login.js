// frontend/src/pages/Login.js
import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/login", form);
      onLogin(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="card">
        <h2>Login</h2>
        {error && <div className="alert error">{error}</div>}
        <form onSubmit={handleSubmit} className="form">
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
          <button className="btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
