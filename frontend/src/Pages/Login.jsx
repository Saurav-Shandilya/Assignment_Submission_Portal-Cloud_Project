import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState("student");
  const [rollNo, setRollNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Reset fields when role changes
  const switchRole = (selectedRole) => {
    setRole(selectedRole);
    setRollNo("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let response;

      if (role === "student") {
        response = await API.post("/student/login", {
          rollNo,
          password,
        });
      } else {
        response = await API.post("/teacher/login", {
          email,
          password,
        });
      }

      // ✅ Save auth globally
      login({
        user: response.data.user,
        token: response.data.token,
        role,
      });

      // ✅ Redirect by role
      navigate(
        role === "student"
          ? "/student/dashboard"
          : "/teacher/dashboard"
      );

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center px-4 relative">

      {/* 🔙 TOP LEFT BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        disabled={loading}
        className="absolute top-6 left-6 text-white/70 hover:text-white transition text-sm disabled:opacity-40"
      >
        ← Back
      </button>

      <div className="w-full max-w-md bg-[#141414] border border-white/10 rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold text-center mb-4">
          Login <span className="text-[#0E21A0]">Portal</span>
        </h2>

        {/* 🔹 Role Toggle */}
        <div className="flex bg-[#0d0d0d] rounded-xl p-1 border border-white/10">
          <button
            type="button"
            onClick={() => switchRole("student")}
            className={`w-1/2 py-2 rounded-lg text-sm font-semibold transition ${
              role === "student"
                ? "bg-[#0E21A0]"
                : "text-white/70 hover:text-white"
            }`}
          >
            Student
          </button>

          <button
            type="button"
            onClick={() => switchRole("teacher")}
            className={`w-1/2 py-2 rounded-lg text-sm font-semibold transition ${
              role === "teacher"
                ? "bg-[#0E21A0]"
                : "text-white/70 hover:text-white"
            }`}
          >
            Teacher
          </button>
        </div>

        {/* 🔹 Error */}
        {error && (
          <div className="mt-4 p-2 rounded-lg bg-red-500/20 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* 🔹 Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 mt-5">

          {role === "student" ? (
            <div>
              <label className="text-sm text-white/70">Roll Number</label>
              <input
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="Enter roll number"
                className="w-full mt-1 px-4 py-2 rounded-xl bg-[#0d0d0d] border border-white/10 focus:border-[#0E21A0] outline-none"
                required
              />
            </div>
          ) : (
            <div>
              <label className="text-sm text-white/70">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full mt-1 px-4 py-2 rounded-xl bg-[#0d0d0d] border border-white/10 focus:border-[#0E21A0] outline-none"
                required
              />
            </div>
          )}

          <div>
            <label className="text-sm text-white/70">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full mt-1 px-4 py-2 rounded-xl bg-[#0d0d0d] border border-white/10 focus:border-[#0E21A0] outline-none"
              required
            />
          </div>

          {/* 🔹 Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-xl bg-[#0E21A0] hover:opacity-90 transition font-semibold disabled:opacity-50"
          >
            {loading ? "Logging in..." : `Login as ${role}`}
          </button>
        </form>

        {/* 🔹 Bottom Navigation */}
        <div className="flex justify-between mt-4 text-sm">
          <button
            onClick={() => navigate("/")}
            className="text-white/60 hover:text-white"
          >
            Back to Home
          </button>

          <Link
            to="/signup"
            className="text-[#0E21A0] hover:underline"
          >
            Signup
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
