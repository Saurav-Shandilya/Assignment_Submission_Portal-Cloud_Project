import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudentDashboard, getStudentAssignments } from "../../api/studentApi";

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

      // ✅ show only latest 4 assignments in dashboard
      setAssignments(assRes.data.slice(0, 4));
    } catch (error) {
      console.log(error);
      alert("Dashboard error / login again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-4 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">🎓 Student Dashboard</h1>

          <button
            onClick={() => navigate("/student/assignments")}
            className="px-4 py-2 rounded-xl bg-[#0E21A0] hover:opacity-90 transition text-sm font-semibold"
          >
            View All Assignments
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#141414] border border-white/10 p-4 rounded-2xl">
            <p className="text-white/70 text-sm">Total Assignments</p>
            <h2 className="text-3xl font-bold">{stats?.totalAssignments}</h2>
          </div>

          <div className="bg-[#141414] border border-white/10 p-4 rounded-2xl">
            <p className="text-white/70 text-sm">Submitted</p>
            <h2 className="text-3xl font-bold">{stats?.submittedAssignments}</h2>
          </div>

          <div className="bg-[#141414] border border-white/10 p-4 rounded-2xl">
            <p className="text-white/70 text-sm">Pending</p>
            <h2 className="text-3xl font-bold">{stats?.pendingAssignments}</h2>
          </div>
        </div>

        {/* Assignments List */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">📚 Latest Assignments</h2>
            <span className="text-sm text-white/60">Showing latest 4</span>
          </div>

          {assignments.length === 0 ? (
            <p className="text-white/60">No assignments found.</p>
          ) : (
            <div className="space-y-4">
              {assignments.map((a) => (
                <div
                  key={a._id}
                  className="p-4 rounded-xl border border-white/10 bg-[#0d0d0d]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{a.title}</h3>
                      <p className="text-sm text-white/60 mt-1">
                        {a.description}
                      </p>

                      {a.deadline && (
                        <p className="text-xs text-white/50 mt-2">
                          Deadline:{" "}
                          {new Date(a.deadline).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        a.isSubmitted
                          ? "bg-green-500/20 text-green-300"
                          : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >
                      {a.isSubmitted ? "Submitted ✅" : "Pending ⏳"}
                    </span>
                  </div>

                  {/* Action Button */}
                  <div className="mt-4">
                    {!a.isSubmitted ? (
                      <button
                        onClick={() => navigate(`/student/submit/${a._id}`)}
                        className="px-4 py-2 rounded-xl bg-[#0E21A0] hover:opacity-90 transition text-sm font-semibold"
                      >
                        Submit Assignment
                      </button>
                    ) : (
                      <p className="text-sm text-green-300">
                        ✅ You already submitted this assignment
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
