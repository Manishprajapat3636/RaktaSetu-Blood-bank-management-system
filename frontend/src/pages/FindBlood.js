// frontend/src/pages/FindBlood.js
import React, { useState } from "react";
import api from "../api";

const FindBlood = () => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.get("/donors/search", {
        params: { city, state, bloodGroup }
      });
      setDonors(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Find Donors by Location</h2>
        <form className="form-inline" onSubmit={search}>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            required
          >
            <option value="">Blood Group</option>
            <option>O+</option>
            <option>O-</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>
          <input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <button className="btn-primary" type="submit">
            Search
          </button>
        </form>
        {loading && <p>Searching donors...</p>}
        <div className="list">
          {donors.map((d) => (
            <div key={d._id} className="list-item">
              <h3>{d.name}</h3>
              <p>Blood Group: {d.bloodGroup}</p>
              <p>
                {d.city}, {d.state}
              </p>
              <p>📞 {d.phone}</p>
            </div>
          ))}
          {!loading && donors.length === 0 && <p>No donors found.</p>}
        </div>
      </div>
    </div>
  );
};

export default FindBlood;
