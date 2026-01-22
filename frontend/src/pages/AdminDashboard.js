// frontend/src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import api from "../api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [form, setForm] = useState({
    name: "",
    city: "",
    state: "",
    address: "",
    contactNumber: "",
    email: ""
  });
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const loadStats = async () => {
    try {
      const { data } = await api.get("/admin/stats");
      setStats(data);
    } catch (e) {
      setErr("Failed to load stats");
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addBloodBank = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");
    try {
      await api.post("/bloodbanks", form);
      setMsg("Blood bank added successfully.");
      setForm({
        name: "",
        city: "",
        state: "",
        address: "",
        contactNumber: "",
        email: ""
      });
    } catch (error) {
      setErr(error.response?.data?.message || "Failed to add blood bank");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Admin Dashboard</h2>
        {err && <div className="alert error">{err}</div>}
        {stats ? (
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Users</h3>
              <p>{stats.userCount}</p>
            </div>
            <div className="stat-card">
              <h3>Donors</h3>
              <p>{stats.donorCount}</p>
            </div>
            <div className="stat-card">
              <h3>Blood Banks</h3>
              <p>{stats.bankCount}</p>
            </div>
            <div className="stat-card">
              <h3>Feedback</h3>
              <p>{stats.feedbackCount}</p>
            </div>
          </div>
        ) : (
          <p>Loading stats...</p>
        )}

        <h3>Add Blood Bank</h3>
        {msg && <div className="alert success">{msg}</div>}
        <form className="form" onSubmit={addBloodBank}>
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            City
            <input name="city" value={form.city} onChange={handleChange} required />
          </label>
          <label>
            State
            <input name="state" value={form.state} onChange={handleChange} required />
          </label>
          <label>
            Address
            <input name="address" value={form.address} onChange={handleChange} required />
          </label>
          <label>
            Contact Number
            <input
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email (optional)
            <input name="email" value={form.email} onChange={handleChange} />
          </label>
          <button className="btn-primary" type="submit">
            Add Blood Bank
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
