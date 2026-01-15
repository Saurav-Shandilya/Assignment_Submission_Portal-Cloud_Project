import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudentAssignments } from "../../api/studentApi";

const ViewAssignments = () => {
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const res = await getStudentAssignments();
      setAssignments(res.data);
    } catch (err) {
      console.log(err);
      alert("Error loading assignments. Please login again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        Loading assignments...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-4 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">📚 Assignments</h1>

          <button
            onClick={() => navigate("/student/dashboard")}
            className="px-4 py-2 rounded-xl border border-white/10 hover:border-white/30 transition text-sm"
          >
            Back to Dashboard
          </button>
        </div>

        {assignments.length === 0 ? (
          <p className="text-white/60">No assignments available.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {assignments.map((a) => (
              <div
                key={a._id}
                className="bg-[#141414] border border-white/10 rounded-2xl p-5"
              >
                {/* Title + Status */}
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">{a.title}</h2>
                    <p className="text-sm text-white/60 mt-1">
                      {a.description || "No description"}
                    </p>
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

                {/* Deadline */}
                {a.deadline && (
                  <p className="text-xs text-white/50 mt-3">
                    Deadline: {new Date(a.deadline).toLocaleDateString()}
                  </p>
                )}

                {/* Action */}
                <div className="mt-4">
                  {!a.isSubmitted ? (
                    <button
                      onClick={() => navigate(`/student/submit/${a._id}`)}
                      className="px-4 py-2 rounded-xl bg-[#0E21A0] hover:opacity-90 transition text-sm font-semibold"
                    >
                      Submit Assignment
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-4 py-2 rounded-xl bg-green-500/20 text-green-300 text-sm font-semibold cursor-not-allowed"
                    >
                      Already Submitted
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAssignments;
