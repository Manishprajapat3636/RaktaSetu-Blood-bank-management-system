// frontend/src/pages/FeedbackPage.js
import React, { useEffect, useState } from "react";
import api from "../api";

const randomFeedback = [
  {
    name: "Arjun M.",
    message: "RaktaSetu helped us find O- blood in under an hour. Truly life-saving!",
    rating: 5
  },
  {
    name: "Sneha P.",
    message: "Clean interface and easy donor registration process.",
    rating: 4
  },
  {
    name: "Dr. Verma",
    message: "Very useful for coordinating between blood banks and donors.",
    rating: 5
  }
];

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState([]);
  const [form, setForm] = useState({ name: "", message: "", rating: 5 });
  const [msg, setMsg] = useState("");

  const loadFeedback = async () => {
    const { data } = await api.get("/feedback");
    setFeedback(data);
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/feedback", form);
    setMsg("Thank you for your feedback!");
    setForm({ name: "", message: "", rating: 5 });
    loadFeedback();
  };

  return (
    <div className="page">
      <div className="card">
        <h2>User Feedback</h2>
        <p>Scroll to see what users say about RaktaSetu.</p>

        <div className="list feedback-list">
          {randomFeedback.map((f, i) => (
            <div key={`r-${i}`} className="list-item">
              <h3>{f.name}</h3>
              <p>{f.message}</p>
              <p>{"⭐".repeat(f.rating)}</p>
            </div>
          ))}
          {feedback.map((f) => (
            <div key={f._id} className="list-item">
              <h3>{f.name || "Anonymous"}</h3>
              <p>{f.message}</p>
              <p>{"⭐".repeat(f.rating || 5)}</p>
            </div>
          ))}
        </div>

        <h3>Give your Feedback</h3>
        {msg && <div className="alert success">{msg}</div>}
        <form className="form" onSubmit={submit}>
          <label>
            Name (optional)
            <input name="name" value={form.name} onChange={handleChange} />
          </label>
          <label>
            Message
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>
          </label>
          <label>
            Rating
            <select name="rating" value={form.rating} onChange={handleChange}>
              <option value={5}>5 - Excellent</option>
              <option value={4}>4 - Good</option>
              <option value={3}>3 - Average</option>
              <option value={2}>2 - Poor</option>
              <option value={1}>1 - Very Poor</option>
            </select>
          </label>
          <button className="btn-primary" type="submit">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;
