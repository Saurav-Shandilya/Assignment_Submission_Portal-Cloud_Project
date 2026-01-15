import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center px-4">
      <div className="max-w-3xl w-full text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold">
          Assignment{" "}
          <span className="text-[#0E21A0]">Submission Portal</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-white/60 text-base md:text-lg">
          A simple platform for students to submit assignments and teachers to
          review & grade them.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="px-6 py-3 rounded-2xl bg-[#0E21A0] hover:opacity-90 transition font-semibold"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-6 py-3 rounded-2xl border border-white/10 hover:border-white/30 transition font-semibold"
          >
            Signup
          </Link>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-5">
            <h3 className="font-semibold">✅ Student Submission</h3>
            <p className="text-sm text-white/60 mt-2">
              Students can upload links and track submission status.
            </p>
          </div>

          <div className="bg-[#141414] border border-white/10 rounded-2xl p-5">
            <h3 className="font-semibold">🧑‍🏫 Teacher Review</h3>
            <p className="text-sm text-white/60 mt-2">
              Teachers can view submissions, provide feedback & marks.
            </p>
          </div>

          <div className="bg-[#141414] border border-white/10 rounded-2xl p-5">
            <h3 className="font-semibold">⚡ Fast & Minimal</h3>
            <p className="text-sm text-white/60 mt-2">
              Beginner-friendly MERN project with clean UI and role-based access.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-12 text-xs text-white/40">
          © {new Date().getFullYear()} Assignment Portal • Built with MERN
        </p>
      </div>
    </div>
  );
};

export default Landing;
