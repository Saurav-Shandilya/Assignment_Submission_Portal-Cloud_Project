import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d]">
      
      <div className="w-full max-w-md bg-[#f2f2f2] rounded-2xl shadow-2xl p-8">
        
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-[#0E21A0] mb-1">
          Create Account 🚀
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Welcome! Please register
        </p>

        {/* Form */}
        <form className="space-y-4">
          
          {/* Name */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0E21A0]"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0E21A0]"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0E21A0]"
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
          <span className="text-[#0E21A0] font-semibold cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
