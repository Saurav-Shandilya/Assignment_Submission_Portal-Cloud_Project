import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>📝 Signup Page</h2>
      <p>This is just a dummy signup page.</p>

      <Link to="/login">
        <button>Go to Login</button>
      </Link>
    </div>
  );
};

export default Signup;
