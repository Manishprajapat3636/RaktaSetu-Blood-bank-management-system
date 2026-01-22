// frontend/src/pages/DonorRegister.js
import React, { useState } from "react";
import api from "../api";

const DonorRegister = () => {
  const [form, setForm] = useState({
    name: "",
    bloodGroup: "",
    phone: "",
    city: "",
    state: "",
    lastDonationDate: ""
  });
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");
    try {
      await api.post("/donors", form);
      setMsg("You are registered as a donor. Thank you for saving lives!");
    } catch (error) {
      setErr(error.response?.data?.message || "Failed to register donor");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Donor Registration</h2>
        {msg && <div className="alert success">{msg}</div>}
        {err && <div className="alert error">{err}</div>}
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Blood Group
            <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} required>
              <option value="">Select</option>
              <option>O+</option>
              <option>O-</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>
          </label>
          <label>
            Phone
            <input name="phone" value={form.phone} onChange={handleChange} required />
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
            Last Donation Date (optional)
            <input
              type="date"
              name="lastDonationDate"
              value={form.lastDonationDate}
              onChange={handleChange}
            />
          </label>
          <button className="btn-primary" type="submit">
            Register as Donor
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonorRegister;
