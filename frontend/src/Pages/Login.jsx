import { useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student");

  const [data, setData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", { role, ...data });
  };

  return (
    <div className="min-h-screen w-full bg-[#0d0d0d] flex items-center justify-center px-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-[#121212] text-white border border-white/10 rounded-2xl p-8 shadow-2xl">

        {/* TITLE */}
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Assignment Submission Portal
          </h1>
          <p className="text-sm text-white/50 mt-1 capitalize">
            {role} Login
          </p>
        </div>

        {/* ROLE TOGGLE */}
        <div className="mt-6 flex bg-[#0d0d0d] border border-white/10 rounded-lg overflow-hidden">
          <button
            onClick={() => setRole("student")}
            className={`w-1/2 py-2 flex items-center justify-center gap-2 text-sm transition
              ${role === "student" ? "bg-[#0E21A0]" : "text-white/50 hover:bg-white/5"}
            `}
          >
            <FaUserGraduate />
            Student
          </button>

          <button
            onClick={() => setRole("teacher")}
            className={`w-1/2 py-2 flex items-center justify-center gap-2 text-sm transition
              ${role === "teacher" ? "bg-[#0E21A0]" : "text-white/50 hover:bg-white/5"}
            `}
          >
            <FaChalkboardTeacher />
            Teacher
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* ID / EMAIL */}
          <div>
            <label className="text-sm text-white/60">
              {role === "student" ? "Student ID / Roll Number" : "Teacher Email"}
            </label>

            <div className="mt-2 flex items-center gap-3 bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 focus-within:border-[#0E21A0] transition">
              <FiUser className="text-white/40" />
              <input
                type={role === "student" ? "text" : "email"}
                name="identifier"
                value={data.identifier}
                onChange={handleChange}
                required
                placeholder={
                  role === "student"
                    ? "CS2021-045"
                    : "teacher@college.edu"
                }
                className="w-full bg-transparent outline-none text-sm text-white placeholder:text-white/30"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-white/60">Password</label>

            <div className="mt-2 flex items-center gap-3 bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 focus-within:border-[#0E21A0] transition">
              <FiLock className="text-white/40" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                required
                placeholder="Enter password"
                className="w-full bg-transparent outline-none text-sm text-white placeholder:text-white/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-white/40 hover:text-[#0E21A0]"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>

          {/* OPTIONS */}
          <div className="flex justify-between text-xs text-white/50">
            <span className="capitalize">Role: {role}</span>
            <a href="/forgot-password" className="text-[#0E21A0] hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-[#0E21A0] py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Login as {role === "student" ? "Student" : "Teacher"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-6 text-center text-xs text-white/40">
          <p>
            {role === "student"
              ? "Submit assignments before deadline"
              : "Manage & review student assignments"}
          </p>
          <p className="mt-1">
            © {new Date().getFullYear()} Student Portal
          </p>
        </div>

      </div>
    </div>
  );
}