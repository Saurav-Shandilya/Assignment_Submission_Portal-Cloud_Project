import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, role, logout } = useAuth();

  const goToDashboard = () => {
    if (role === "teacher") navigate("/teacher/dashboard");
    else navigate("/student/dashboard");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-[#0d0d0d] text-white border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-lg font-bold tracking-wide">
          Assignment<span className="text-[#0E21A0]">Portal</span>
        </Link>

        {/* Right buttons */}
        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl border border-white/10 hover:border-white/30 transition text-sm"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 rounded-xl bg-[#0E21A0] hover:opacity-90 transition text-sm font-semibold"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={goToDashboard}
                className="px-4 py-2 rounded-xl border border-white/10 hover:border-white/30 transition text-sm"
              >
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-red-500/80 hover:bg-red-500 transition text-sm font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
