// frontend/src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="home">
    <section className="hero">
      <div className="hero-text">
        <h1>RaktaSetu</h1>
        <h2>Bridging Donors and Patients with a Single Click</h2>
        <p>
          Register as a donor, find life-saving blood in your city, and connect with nearby blood banks.
        </p>
        <div className="hero-actions">
          <Link to="/find-blood" className="btn-primary">
            Find Blood
          </Link>
          <Link to="/donor-register" className="btn-outline">
            Become a Donor
          </Link>
        </div>
      </div>
      <div className="hero-card">
        <h3>Why RaktaSetu?</h3>
        <ul>
          <li>🔎 Smart search by location & blood group</li>
          <li>🏥 Integrated blood bank directory</li>
          <li>🧑‍⚕️ Verified donor registrations</li>
          <li>🤖 Built-in AI help assistant</li>
        </ul>
      </div>
    </section>
  </div>
);

export default Home;
