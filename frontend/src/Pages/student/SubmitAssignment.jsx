import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { submitStudentAssignment } from "../../api/studentApi";

const SubmitAssignment = () => {
  const { id } = useParams(); // assignmentId
  const navigate = useNavigate();

  const [answerLink, setAnswerLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await submitStudentAssignment({
        assignmentId: id,
        answerLink,
      });

      alert("✅ Assignment submitted successfully!");
      navigate("/student/assignments");
    } catch (err) {
      alert(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-4 py-6">
      <div className="max-w-xl mx-auto">

        {/* 🔙 Professional Back Button */}
        <button
          onClick={() => navigate("/student/dashboard")}
          className="
            group
            flex items-center gap-2
            mb-6
            px-4 py-2
            rounded-xl
            bg-[#111827]
            border border-white/10
            text-sm font-medium text-white/80
            hover:bg-[#0E21A0]
            hover:text-white
            transition-all duration-200
            shadow-md
          "
        >
          <span className="transition-transform group-hover:-translate-x-1">
            ←
          </span>
          Back to Dashboard
        </button>

        <h1 className="text-2xl font-bold mb-6">📤 Submit Assignment</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4"
        >
          <div>
            <label className="text-sm text-white/70">
              Answer Link (Drive / GitHub)
            </label>
            <input
              type="text"
              value={answerLink}
              onChange={(e) => setAnswerLink(e.target.value)}
              placeholder="https://drive.google.com/..."
              className="
                w-full mt-1 px-4 py-2
                rounded-xl
                bg-[#0d0d0d]
                border border-white/10
                outline-none
                focus:border-[#0E21A0]
              "
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-2
              rounded-xl
              bg-[#0E21A0]
              hover:opacity-90
              transition
              font-semibold
              disabled:opacity-50
            "
          >
            {loading ? "Submitting..." : "Submit Assignment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitAssignment;