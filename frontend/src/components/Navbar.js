// frontend/src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="nav-logo">Rakta<span>Setu</span></div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/search-blood-bank">Search Blood Bank</Link>
        <Link to="/find-blood">Find Blood</Link>
        <Link to="/feedback">Feedback</Link>
        {user && <Link to="/donor-register">Become Donor</Link>}
        {user && user.role === "admin" && <Link to="/admin">Admin</Link>}
      </div>
      <div className="nav-auth">
        {user ? (
          <>
            <span className="nav-user">Hi, {user.name}</span>
            <button onClick={onLogout} className="btn-outline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-outline">
              Login
            </Link>
            <Link to="/register" className="btn-primary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
