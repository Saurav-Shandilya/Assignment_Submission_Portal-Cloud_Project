import React, { useEffect, useState } from "react";
import { getTeacherSubmissions } from "../../api/teacherApi";

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getTeacherSubmissions();
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
        Loading submissions...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">📥 Submissions</h1>

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
                  Assignment: {s.assignmentId?.title}
                </h2>

                <p className="text-sm text-white/60 mt-1">
                  Student: {s.studentId?.name} ({s.studentId?.rollNo})
                </p>

                <p className="text-xs text-white/50">{s.studentId?.email}</p>

                {s.fileUrl && (
                  <a
                    href={s.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0E21A0] text-sm underline mt-2 inline-block"
                  >
                    View Submission Link
                  </a>
                )}

                <p className="text-xs text-white/50 mt-2">
                  Submitted on: {new Date(s.createdAt).toLocaleString()}
                </p>

                <p className="mt-2 text-sm">
                  Status:{" "}
                  <span
                    className={`px-2 py-1 rounded-lg text-xs ${
                      s.status === "reviewed"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {s.status}
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

export default Submissions;
