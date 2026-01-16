import React, { useEffect, useState } from "react";
import { getTeacherSubmissions, reviewSubmission } from "../../api/teacherApi";
import { useNavigate } from "react-router-dom";

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = async () => {
    try {
      setLoading(true);
      const res = await getTeacherSubmissions();
      setSubmissions(res.data);
    } catch (err) {
      console.log(err);
      alert("Error loading submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleReview = async (submissionId, marks, feedback) => {
    try {
      await reviewSubmission(submissionId, { marks, feedback });
      alert("✅ Reviewed Successfully!");
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Review failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        Loading submissions...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-4 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/teacher/dashboard")}
          className="mb-4 px-4 py-2 rounded-xl bg-[#141414] border border-white/10 hover:border-[#0E21A0] text-sm"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-2xl font-bold mb-6">📥 Submissions</h1>

        {submissions.length === 0 ? (
          <p className="text-white/60">No submissions yet.</p>
        ) : (
          <div className="space-y-5">
            {submissions.map((s) => (
              <ReviewCard key={s._id} s={s} onReview={handleReview} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ReviewCard = ({ s, onReview }) => {
  const [marks, setMarks] = useState(s.marks ?? "");
  const [feedback, setFeedback] = useState(s.feedback ?? "");

  return (
    <div className="bg-[#141414] border border-white/10 rounded-2xl p-5">
      <h2 className="font-semibold text-lg">
        Assignment: {s.assignmentId?.title}
      </h2>

      <p className="text-sm text-white/60 mt-1">
        Student: {s.studentId?.name} ({s.studentId?.rollNo})
      </p>

      {s.fileUrl && (
        <a
          href={s.fileUrl}
          target="_blank"
          rel="noreferrer"
          className="text-[#0E21A0] underline text-sm mt-2 inline-block"
        >
          View Submission Link
        </a>
      )}

      <p className="text-sm mt-3">
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

      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="text-sm text-white/70">Marks</label>
          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            className="w-full mt-1 px-4 py-2 rounded-xl bg-[#0d0d0d] border border-white/10 outline-none focus:border-[#0E21A0]"
            placeholder="0-100"
          />
        </div>

        <div>
          <label className="text-sm text-white/70">Feedback</label>
          <input
            type="text"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full mt-1 px-4 py-2 rounded-xl bg-[#0d0d0d] border border-white/10 outline-none focus:border-[#0E21A0]"
            placeholder="Write feedback..."
          />
        </div>
      </div>

      <button
        onClick={() => onReview(s._id, Number(marks), feedback)}
        className="mt-4 px-4 py-2 bg-[#0E21A0] rounded-xl font-semibold hover:opacity-90"
      >
        ✅ Save Review
      </button>
    </div>
  );
};

export default Submissions;
