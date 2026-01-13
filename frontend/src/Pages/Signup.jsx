import { FaUser, FaEnvelope, FaLock, FaIdCard } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d]">
      
      <div className="w-full max-w-md bg-[#f2f2f2] rounded-2xl shadow-2xl p-8">
        
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-[#0E21A0] mb-1">
          Student Sign Up 🎓
        </h1>
        <p className="text-center text-gray-600 mb-2">
          Only GLA University students can register
        </p>

        {/* Important Notice */}
        <div className="bg-blue-100 text-blue-800 text-sm p-3 rounded-lg mb-6 border border-blue-300">
          ⚠️ Enter your valid <b>University Roll Number</b>.
        </div>

        {/* Form */}
        <form className="space-y-4">

          {/* Full Name */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0E21A0]"
              required
            />
          </div>

          {/* University Roll Number */}
          <div className="relative">
            <FaIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="University Roll Number"
              className="w-full pl-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0E21A0]"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              placeholder="Student Email (University Email Preferred)"
              className="w-full pl-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0E21A0]"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0E21A0]"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#0E21A0] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#0E21A0] font-semibold cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
