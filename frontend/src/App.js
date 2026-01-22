// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DonorRegister from "./pages/DonorRegister";
import SearchBloodBank from "./pages/SearchBloodBank";
import FindBlood from "./pages/FindBlood";
import FeedbackPage from "./pages/FeedbackPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("rakta_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogin = (data) => {
    localStorage.setItem("rakta_token", data.token);
    localStorage.setItem("rakta_user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const handleLogout = () => {
    localStorage.removeItem("rakta_token");
    localStorage.removeItem("rakta_user");
    setUser(null);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onLogin={handleLogin} />} />
            <Route
              path="/donor-register"
              element={
                <ProtectedRoute user={user}>
                  <DonorRegister />
                </ProtectedRoute>
              }
            />
            <Route path="/search-blood-bank" element={<SearchBloodBank />} />
            <Route path="/find-blood" element={<FindBlood />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute user={user} adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <ChatBot />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
