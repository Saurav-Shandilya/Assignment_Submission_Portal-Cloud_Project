import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getStudentDashboard,
  getStudentAssignments,
} from "../../api/studentApi";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const statsRes = await getStudentDashboard();
      const assRes = await getStudentAssignments();

      setStats(statsRes.data);
      setAssignments(assRes.data.slice(0, 4)); // latest 4
    } catch (err) {
      console.log(err);
      alert("Session expired, login again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // ✅ calculate marks gained from latest assignments data
  const totalMarksGained = useMemo(() => {
    let total = 0;
    assignments.forEach((a) => {
      if (a.submission?.marks !== null && a.submission?.marks !== undefined) {
        total += Number(a.submission.marks);
      }
    });
    return total;
  }, [assignments]);

  // ✅ chart data
  const progressData = useMemo(() => {
    if (!stats) return [];
    return [
      {
        name: "This Week",
        submitted: stats.submittedAssignments,
        pending: stats.pendingAssignments,
      },
      {
        name: "This Month",
        submitted: stats.submittedAssignments + 1,
        pending: stats.pendingAssignments,
      },
      {
        name: "All Time",
        submitted: stats.submittedAssignments + 2,
        pending: stats.pendingAssignments + 1,
      },
    ];
  }, [stats]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white px-6 py-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold">🎓 Student Dashboard</h1>
            <p className="text-sm text-white/60">
              Track assignments, deadline & marks
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/student/submissions")}
              className="px-4 py-2 rounded-lg border border-white/10 hover:border-white/30 transition text-sm"
            >
              My Submissions
            </button>

            <button
              onClick={() => navigate("/student/assignments")}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm"
            >
              View All Assignments
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
          <StatBox title="Total Assignments" value={stats.totalAssignments} />
          <StatBox title="Submitted" value={stats.submittedAssignments} />
          <StatBox title="Pending" value={stats.pendingAssignments} />
          <StatBox title="Marks Gained" value={totalMarksGained} />
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Assignments */}
          <div className="lg:col-span-2 bg-[#161b22] border border-white/10 rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">📘 Latest Assignments</h2>
              <span className="text-xs text-yellow-400">Showing latest 4</span>
            </div>

            {assignments.length === 0 ? (
              <p className="text-white/60">No assignments found.</p>
            ) : (
              assignments.map((a) => {
                const deadlineInfo = getDeadlineInfo(a.deadline);

                // ✅ status:
                // pending / submitted / reviewed
                let statusText = "Pending";
                let statusClass = "bg-yellow-500/15 text-yellow-400";

                if (a.isSubmitted) {
                  statusText = "Submitted";
                  statusClass = "bg-green-500/15 text-green-400";
                }

                if (a.submission?.status === "reviewed") {
                  statusText = "Reviewed";
                  statusClass = "bg-blue-500/15 text-blue-300";
                }

                const isDeadlineOver =
                  a.deadline && new Date() > new Date(a.deadline);

                return (
                  <div
                    key={a._id}
                    className="bg-[#0d1117] border border-white/10 rounded-lg p-4 mb-4"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-medium">{a.title}</h3>

                        <p className="text-sm text-white/60 mt-1">
                          {a.description || "No description"}
                        </p>

                        {/* Deadline Counter */}
                        <div className="mt-2 text-xs">
                          {a.deadline ? (
                            <span
                              className={`px-2 py-1 rounded-lg ${
                                deadlineInfo.isOver
                                  ? "bg-red-500/20 text-red-300"
                                  : "bg-white/10 text-white/70"
                              }`}
                            >
                              ⏳ {deadlineInfo.text}
                            </span>
                          ) : (
                            <span className="px-2 py-1 rounded-lg bg-white/10 text-white/70">
                              Deadline: Not set
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Status */}
                      <span className={`text-xs px-3 py-1 rounded-full ${statusClass}`}>
                        {statusText}
                      </span>
                    </div>

                    {/* ✅ Marks show if reviewed */}
                    {a.submission?.status === "reviewed" && (
                      <div className="mt-4 text-sm text-white/70">
                        <p>
                          Marks:{" "}
                          <span className="text-white font-semibold">
                            {a.submission.marks ?? "N/A"}
                          </span>
                        </p>
                        <p className="mt-1">
                          Feedback:{" "}
                          <span className="text-white font-semibold">
                            {a.submission.feedback || "No feedback"}
                          </span>
                        </p>
                      </div>
                    )}

                    {/* Action */}
                    <div className="mt-4">
                      {a.isSubmitted ? (
                        <p className="text-sm text-green-400">
                          ✔ You already submitted this assignment
                        </p>
                      ) : isDeadlineOver ? (
                        <button
                          disabled
                          className="text-sm px-4 py-2 rounded-lg bg-red-500/20 text-red-300 cursor-not-allowed"
                        >
                          Deadline Over ❌
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate(`/student/submit/${a._id}`)}
                          className="text-sm px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
                        >
                          Submit Assignment
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Progress + Graph */}
          <div className="bg-[#161b22] border border-white/10 rounded-xl p-5">
            <h2 className="text-lg font-medium mb-4">📊 Progress</h2>

            <ProgressBar
              label="Submitted"
              value={stats.submittedAssignments}
              total={stats.totalAssignments}
              color="bg-green-500"
            />

            <ProgressBar
              label="Pending"
              value={stats.pendingAssignments}
              total={stats.totalAssignments}
              color="bg-yellow-500"
            />

            <div className="mt-6 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="submitted"
                    stroke="#22c55e"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="pending"
                    stroke="#eab308"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#161b22] border border-white/10 rounded-xl p-5">
          <h2 className="text-lg font-medium mb-3">🕒 Recent Activity</h2>

          {assignments.filter((a) => a.isSubmitted).length === 0 ? (
            <p className="text-white/60">No recent submissions yet.</p>
          ) : (
            assignments
              .filter((a) => a.isSubmitted)
              .map((a) => (
                <p key={a._id} className="text-sm text-white/70">
                  ✔ Submitted <b>{a.title}</b>
                </p>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

/* ✅ Deadline Counter Helper */
function getDeadlineInfo(deadline) {
  if (!deadline) return { text: "Deadline not set", isOver: false };

  const d = new Date(deadline).getTime();
  const now = new Date().getTime();
  const diff = d - now;

  if (diff <= 0) return { text: "Deadline Over", isOver: true };

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) return { text: `${days} day(s) left`, isOver: false };

  return { text: `${hours} hour(s) left`, isOver: false };
}

/* Reusable Components */
const StatBox = ({ title, value }) => (
  <div className="bg-[#161b22] border border-white/10 rounded-xl p-5">
    <p className="text-sm text-white/60">{title}</p>
    <h2 className="text-3xl font-semibold mt-1">{value}</h2>
  </div>
);

const ProgressBar = ({ label, value, total, color }) => {
  const percent = total ? (value / total) * 100 : 0;

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 w-full bg-white/10 rounded-full">
        <div
          className={`${color} h-2 rounded-full`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default StudentDashboard;
