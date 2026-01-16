import React, { useEffect, useState } from "react";
import API from "../../api";

const MySubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/student/submissions");
        setSubmissions(res.data);
      } catch (err) {
        console.log(err);
        alert("Error loading submissions");
      } finally {
        setLoading(false);
      }
    };

    load();
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
      <div className="max-w-5xl mx-auto">

        {/* Back to Dashboard */}
        <a
          href="/student/dashboard"
          className="inline-block mb-4 text-sm text-white hover:underline"
        >
          ← Back to Dashboard
        </a>

        <h1 className="text-2xl font-bold mb-6">📌 My Submissions</h1>

        {submissions.length === 0 ? (
          <p className="text-white/60">No submissions yet.</p>
        ) : (
          <div className="space-y-4">
            {submissions.map((s) => (
              <div
                key={s._id}
                className="bg-[#141414] border border-white/10 rounded-2xl p-5"
              >
                <h2 className="font-semibold text-lg">
                  {s.assignmentId?.title}
                </h2>

                <p className="text-sm mt-2">
                  Status:{" "}
                  <span
                    className={`text-xs px-2 py-1 rounded-lg ${
                      s.status === "reviewed"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {s.status}
                  </span>
                </p>

                <p className="mt-3 text-white/70 text-sm">
                  Marks:{" "}
                  <span className="text-white font-semibold">
                    {s.marks ?? "Not graded yet"}
                  </span>
                </p>

                <p className="mt-1 text-white/70 text-sm">
                  Feedback:{" "}
                  <span className="text-white font-semibold">
                    {s.feedback || "No feedback yet"}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MySubmissions;
