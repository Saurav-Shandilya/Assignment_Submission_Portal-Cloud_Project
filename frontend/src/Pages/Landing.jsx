import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>📌 Assignment Submission Portal</h1>
      <p>Welcome! Please login or signup.</p>

      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
