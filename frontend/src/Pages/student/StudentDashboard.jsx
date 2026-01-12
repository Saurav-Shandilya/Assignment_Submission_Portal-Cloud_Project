import { FaBook, FaUpload, FaEye, FaUserGraduate } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export default function StudentDashboard() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#050816] via-[#0a0f2c] to-[#020617] text-white">

      {/* 🔮 Animated Background Blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-floatSlow top-10 left-10"></div>
        <div className="absolute w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px] animate-floatSlow delay-200 top-1/3 right-20"></div>
        <div className="absolute w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] animate-floatSlow delay-500 bottom-10 left-1/3"></div>
      </div>

      {/* 🧾 Background Watermark Text */}
      <div className="fixed inset-0 -z-20 flex items-center justify-center pointer-events-none">
        <h1 className="text-[160px] font-extrabold text-white/5 tracking-widest select-none">
          ASSIGNMENTS
        </h1>
      </div>

      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden md:flex w-72 bg-black/40 backdrop-blur-xl border-r border-white/10 flex-col px-6 py-8">
          <h2 className="text-2xl font-bold text-blue-500 mb-12 flex items-center gap-3">
            <FaUserGraduate className="text-3xl" />
            Student Panel
          </h2>

          <nav className="flex flex-col gap-3 text-sm">
            <SidebarItem icon={<MdDashboard />} label="Dashboard" active />
            <SidebarItem icon={<FaBook />} label="Assignments" />
            <SidebarItem icon={<FaUpload />} label="Submit Work" />
            <SidebarItem icon={<FaEye />} label="View Status" />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 md:px-12 py-10">

          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-4xl font-extrabold">
              Welcome, <span className="text-blue-500">Student</span> 👋
            </h1>

            <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-xl text-sm font-semibold">
              Logout
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <StatCard
              icon={<FaBook />}
              title="Total Assignments"
              value="12"
              color="blue"
            />
            <StatCard
              icon={<FaUpload />}
              title="Submitted"
              value="8"
              color="green"
            />
            <StatCard
              icon={<FaEye />}
              title="Pending"
              value="4"
              color="yellow"
            />
          </div>

          {/* Recent Assignments */}
          <div className="mt-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6">Recent Assignments</h2>

            <div className="space-y-4 text-sm">
              <ActivityRow
                title="Cloud Computing Assignment"
                status="Submitted"
                color="text-green-400"
              />
              <ActivityRow
                title="React Mini Project"
                status="Pending"
                color="text-yellow-400"
              />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

/* Sidebar Item */
function SidebarItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-4 px-5 py-3 rounded-xl cursor-pointer transition
      ${active ? "bg-blue-600/20 text-blue-400" : "hover:bg-white/5 text-white/70"}`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </div>
  );
}

/* Stats Card */
function StatCard({ icon, title, value, color }) {
  const colors = {
    blue: "from-blue-500/20 to-blue-700/20 text-blue-400",
    green: "from-green-500/20 to-green-700/20 text-green-400",
    yellow: "from-yellow-500/20 to-yellow-700/20 text-yellow-400",
  };

  return (
    <div
      className={`bg-gradient-to-br ${colors[color]} backdrop-blur-xl border border-white/10 rounded-3xl p-7 hover:scale-[1.03] transition`}
    >
      <div className="flex items-center gap-5">
        <div className="text-4xl">{icon}</div>
        <div>
          <p className="text-white/60 text-sm">{title}</p>
          <h3 className="text-3xl font-bold">{value}</h3>
        </div>
      </div>
    </div>
  );
}

/* Activity Row */
function ActivityRow({ title, status, color }) {
  return (
    <div className="flex items-center justify-between bg-black/30 px-6 py-4 rounded-xl border border-white/5">
      <span>{title}</span>
      <span className={`font-semibold ${color}`}>{status}</span>
    </div>
  );
}
