// frontend/src/pages/SearchBloodBank.js
import React, { useState, useEffect } from "react";
import api from "../api";

const SearchBloodBank = () => {
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [results, setResults] = useState([]);

  const search = async () => {
    const { data } = await api.get("/bloodbanks", { params: { q, city } });
    setResults(data);
  };

  useEffect(() => {
    search();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    search();
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Search Blood Banks</h2>
        <form className="form-inline" onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="btn-primary" type="submit">
            Search
          </button>
        </form>
        <div className="list">
          {results.map((b) => (
            <div key={b._id} className="list-item">
              <h3>{b.name}</h3>
              <p>
                {b.city}, {b.state}
              </p>
              <p>{b.address}</p>
              <p>📞 {b.contactNumber}</p>
              {b.email && <p>✉ {b.email}</p>}
            </div>
          ))}
          {results.length === 0 && <p>No blood banks found.</p>}
        </div>
      </div>
    </div>
  );
};

export default SearchBloodBank;
