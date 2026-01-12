import { useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    studentId: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", data);
  };

  return (
    /* FULL SCREEN DARK WRAPPER */
    <div className="min-h-screen w-full bg-[#0d0d0d] flex items-center justify-center px-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-[#121212] text-[#f2f2f2] border border-white/10 rounded-2xl p-8 shadow-2xl">

        {/* TITLE */}
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Assignment Submission Portal
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Student Login
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* STUDENT ID */}
          <div>
            <label className="text-sm text-white/60">
              Student ID / Roll Number
            </label>
            <div className="mt-2 flex items-center gap-3 bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 focus-within:border-[#0E21A0] transition">
              <FiUser className="text-white/40" />
              <input
                type="text"
                name="studentId"
                value={data.studentId}
                onChange={handleChange}
                required
                placeholder="CS2021-045"
                className="w-full bg-transparent outline-none text-sm text-white placeholder:text-white/30"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-white/60">
              Password
            </label>
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
            <span>Role: Student</span>
            <a href="/forgot-password" className="text-[#0E21A0] hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-[#0E21A0] py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-6 text-center text-xs text-white/40">
          <p>Submit assignments before deadline</p>
          <p className="mt-1">
            © {new Date().getFullYear()} Student Portal
          </p>
        </div>

      </div>
    </div>
  );
}      
