// frontend/src/pages/Register.js
import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Register = ({ onLogin }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/register", form);
      onLogin(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="card">
        <h2>Create Account</h2>
        {error && <div className="alert error">{error}</div>}
        <form onSubmit={handleSubmit} className="form">
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
