import React, { useEffect, useState } from "react";
import { getTeacherDashboard, getTeacherAssignments } from "../../api/teacherApi";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const [stats, setStats] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const statsRes = await getTeacherDashboard();
      const assRes = await getTeacherAssignments();
      setStats(statsRes.data);
      setAssignments(assRes.data);
    };
    loadData();
  }, []);

  if (!stats) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6">
      <h1 className="text-2xl font-bold mb-6">👨‍🏫 Teacher Dashboard</h1>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#141414] p-4 rounded-xl border border-white/10">
          <p className="text-white/60">Total Assignments</p>
          <h2 className="text-3xl font-bold">{stats.totalAssignments}</h2>
        </div>

        <div className="bg-[#141414] p-4 rounded-xl border border-white/10">
          <p className="text-white/60">Total Submissions</p>
          <h2 className="text-3xl font-bold">{stats.totalSubmissions}</h2>
        </div>
      </div>

      {/* Create Assignment */}
      <button
        onClick={() => navigate("/teacher/create-assignment")}
        className="mb-6 px-4 py-2 bg-[#0E21A0] rounded-xl font-semibold"
      >
        ➕ Create Assignment
      </button>

      {/* Assignment List */}
      <div className="bg-[#141414] p-5 rounded-xl border border-white/10">
        <h2 className="text-xl mb-4">📚 Your Assignments</h2>

        {assignments.length === 0 ? (
          <p className="text-white/60">No assignments yet</p>
        ) : (
          assignments.map((a) => (
            <div
              key={a._id}
              className="p-4 mb-3 bg-[#0d0d0d] rounded-lg border border-white/10 flex justify-between"
            >
              <div>
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-sm text-white/60">{a.description}</p>
              </div>

              <button
                onClick={() =>
                    navigate("/teacher/submissions")

                }
                className="text-sm px-3 py-1 bg-green-500/20 text-green-300 rounded-lg"
              >
                View Submissions
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
