import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTeacherDashboard,
  getTeacherAssignments,
  deleteTeacherAssignment,
} from "../../api/teacherApi";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);

      const statsRes = await getTeacherDashboard();
      const assRes = await getTeacherAssignments();

      setStats(statsRes.data);
      setAssignments(assRes.data);
    } catch (err) {
      console.log(err);
      alert("Session expired, login again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const chartData = useMemo(() => {
    if (!stats) return [];
    return [
      {
        name: "This Week",
        assignments: stats.totalAssignments,
        submissions: stats.totalSubmissions,
      },
      {
        name: "This Month",
        assignments: stats.totalAssignments + 2,
        submissions: stats.totalSubmissions + 3,
      },
      {
        name: "All Time",
        assignments: stats.totalAssignments + 5,
        submissions: stats.totalSubmissions + 8,
      },
    ];
  }, [stats]);

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this assignment?");
    if (!ok) return;

    try {
      await deleteTeacherAssignment(id);
      alert("✅ Assignment deleted");
      loadData();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

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
            <h1 className="text-2xl font-semibold">👨‍🏫 Teacher Dashboard</h1>
            <p className="text-sm text-white/60">
              Manage assignments, review submissions & grade students
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/teacher/submissions")}
              className="px-4 py-2 rounded-lg border border-white/10 hover:border-white/30 transition text-sm"
            >
              View Submissions
            </button>

            <button
              onClick={() => navigate("/teacher/create-assignment")}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm"
            >
              ➕ Create Assignment
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <StatBox title="Total Assignments" value={stats.totalAssignments} />
          <StatBox title="Total Submissions" value={stats.totalSubmissions} />
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Assignments List */}
          <div className="lg:col-span-2 bg-[#161b22] border border-white/10 rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">📚 Your Assignments</h2>
              <span className="text-xs text-white/60">
                Total: {assignments.length}
              </span>
            </div>

            {assignments.length === 0 ? (
              <p className="text-white/60">No assignments yet</p>
            ) : (
              assignments.map((a) => {
                const deadlineOver =
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

                        <p className="text-xs text-white/50 mt-2">
                          Deadline:{" "}
                          {a.deadline
                            ? new Date(a.deadline).toLocaleDateString()
                            : "Not set"}
                        </p>
                      </div>

                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          deadlineOver
                            ? "bg-red-500/15 text-red-400"
                            : "bg-green-500/15 text-green-400"
                        }`}
                      >
                        {deadlineOver ? "Deadline Over" : "Active"}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => navigate("/teacher/submissions")}
                        className="text-sm px-4 py-2 rounded-lg bg-green-500/20 text-green-300 hover:bg-green-500/30"
                      >
                        View Submissions
                      </button>

                      <button
                        onClick={() => handleDelete(a._id)}
                        className="text-sm px-4 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Progress Chart */}
          <div className="bg-[#161b22] border border-white/10 rounded-xl p-5">
            <h2 className="text-lg font-medium mb-4">📊 Progress</h2>

            {/* Chart */}
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="assignments"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="submissions"
                    stroke="#22c55e"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <p className="text-xs text-white/50 mt-4">
              Chart is sample-based for UI preview.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Reusable Components */
const StatBox = ({ title, value }) => (
  <div className="bg-[#161b22] border border-white/10 rounded-xl p-5">
    <p className="text-sm text-white/60">{title}</p>
    <h2 className="text-3xl font-semibold mt-1">{value}</h2>
  </div>
);

export default TeacherDashboard;
