import React from "react";
import { FaCloudUploadAlt, FaUserGraduate, FaChalkboardTeacher, FaLock, FaGithub, FaArrowRight, FaServer, FaShieldAlt } from "react-icons/fa";

export default function Landing() {
  return (
    <div className="font-sans bg-slate-950 text-gray-200 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15),transparent_60%)]" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <p className="uppercase tracking-widest text-sky-400 font-semibold mb-4">Cloud Academic Platform</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Student Assignment Submission Portal
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10">
            A modern cloud-based system to submit, manage, and evaluate student assignments with security and scalability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-sky-500 hover:bg-sky-400 text-slate-900 px-8 py-3 rounded-lg font-semibold">
              Student Login
            </button>
            <button className="border border-slate-700 hover:border-sky-400 px-8 py-3 rounded-lg font-semibold text-gray-200 hover:text-sky-400">
              Teacher Login
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center px-8">
          <Stat value="100%" label="Cloud Based" />
          <Stat value="Secure" label="Role Authentication" />
          <Stat value="24/7" label="Access Anywhere" />
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-950">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">Why Choose This Portal?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-8">
          <Feature icon={<FaCloudUploadAlt size={34} />} title="Cloud Submissions" desc="Upload assignments securely with cloud storage support." />
          <Feature icon={<FaShieldAlt size={34} />} title="High Security" desc="Protected data with authentication and access control." />
          <Feature icon={<FaServer size={34} />} title="Scalable System" desc="Designed to scale for institutions and large user bases." />
        </div>
      </section>

      {/* Workflow */}
      <section className="py-24 bg-gradient-to-r from-slate-900 to-slate-800">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">How It Works</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-8">
          <Step number="01" title="Login" desc="Secure authentication for students and teachers." />
          <Step number="02" title="Submit / Review" desc="Students submit work, teachers review it online." />
          <Step number="03" title="Grade & Feedback" desc="Fast evaluation with digital feedback." />
        </div>
      </section>

      {/* Roles */}
      <section className="py-24 bg-slate-950">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">Built for Everyone</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto px-8">
          <RoleCard icon={<FaUserGraduate size={36} />} title="Students" points={["Submit assignments online", "Track submission status", "Access feedback anytime"]} />
          <RoleCard icon={<FaChalkboardTeacher size={36} />} title="Teachers" points={["Create & manage assignments", "Evaluate submissions", "Provide grades & remarks"]} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-900 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Ready to Experience Smart Submissions?</h2>
        <p className="mb-10 text-lg font-medium">A professional cloud solution for modern education.</p>
        <button className="bg-slate-900 text-white px-10 py-4 rounded-lg font-semibold inline-flex items-center gap-3 hover:bg-slate-800">
          Launch Portal <FaArrowRight />
        </button>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-center border-t border-slate-800">
        <p className="text-gray-400 mb-4">© 2026 Student Submission Portal</p>
        <div className="flex justify-center gap-6 text-gray-400">
          <FaGithub className="hover:text-sky-400 cursor-pointer" size={22} />
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-sky-400 hover:-translate-y-1 transition-all duration-300 text-center">
      <div className="text-sky-400 mb-5 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}

function Step({ number, title, desc }) {
  return (
    <div className="text-center">
      <div className="text-sky-400 text-4xl font-bold mb-4">{number}</div>
      <h4 className="text-xl font-semibold text-white mb-3">{title}</h4>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}

function RoleCard({ icon, title, points }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-10 rounded-2xl hover:border-sky-400 transition">
      <div className="text-sky-400 mb-6">{icon}</div>
      <h3 className="text-2xl font-semibold text-white mb-5">{title}</h3>
      <ul className="space-y-3 text-gray-400">
        {points.map((p, i) => (
          <li key={i}>• {p}</li>
        ))}
      </ul>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="bg-slate-950 border border-slate-800 p-10 rounded-xl">
      <h3 className="text-3xl font-bold text-sky-400 mb-2">{value}</h3>
      <p className="text-gray-400">{label}</p>
    </div>
  );
}
