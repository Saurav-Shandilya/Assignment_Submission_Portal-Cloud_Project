import React, { useState } from "react";
import { FaCloud, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2 text-white text-xl font-bold cursor-pointer">
          <FaCloud className="text-sky-400 text-2xl" />
          CloudPortal
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-gray-300 font-medium">
          <li className="hover:text-sky-400 transition cursor-pointer">Home</li>
          <li className="hover:text-sky-400 transition cursor-pointer">Features</li>
          <li className="hover:text-sky-400 transition cursor-pointer">Roles</li>
          <li className="hover:text-sky-400 transition cursor-pointer">Other</li>
        </ul>

        {/* Sign In / Sign Up */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/signin"
            className="text-gray-300 hover:text-sky-400 font-medium transition"
          >
            Sign In
          </a>
          <a
            href="/signup"
            className="bg-sky-500 hover:bg-sky-400 text-slate-900 px-5 py-2 rounded-lg font-semibold transition"
          >
            Sign Up
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 text-xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-6 py-6 space-y-4 text-gray-300">
          <p className="hover:text-sky-400 transition cursor-pointer">Features</p>
          <p className="hover:text-sky-400 transition cursor-pointer">Workflow</p>
          <p className="hover:text-sky-400 transition cursor-pointer">Roles</p>
          <p className="hover:text-sky-400 transition cursor-pointer">Security</p>

          <div className="pt-4 flex flex-col gap-3">
            <a
              href="/signin"
              className="border border-slate-700 py-2 rounded-lg text-center hover:border-sky-400 transition"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="bg-sky-500 text-slate-900 py-2 rounded-lg text-center font-semibold transition"
            >
              Sign Up
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
