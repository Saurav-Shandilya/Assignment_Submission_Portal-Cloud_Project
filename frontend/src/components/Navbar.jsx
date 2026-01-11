import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div
      style={{
        padding: "10px 20px",
        borderBottom: "1px solid gray",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <h3>📌 Portal</h3>
      </Link>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Navbar;
