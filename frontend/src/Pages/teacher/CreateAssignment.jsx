import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAssignment } from "../../api/teacherApi";

const CreateAssignment = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(""); // datetime-local
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // ✅ backend expects deadline as Date
      await createAssignment({
        title,
        description,
        deadline: deadline ? new Date(deadline).toISOString() : null,
      });

      alert("✅ Assignment Created Successfully!");
      navigate("/teacher/dashboard");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Assignment creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white px-6 py-8">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">➕ Create Assignment</h1>

          <button
            onClick={() => navigate("/teacher/dashboard")}
            className="px-4 py-2 rounded-lg border border-white/10 hover:border-white/30 transition text-sm"
          >
            Back
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleCreate}
          className="bg-[#161b22] border border-white/10 rounded-xl p-6 space-y-5"
        >
          {/* Title */}
          <div>
            <label className="text-sm text-white/70">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Eg: DSA Assignment 1"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-[#0d1117] border border-white/10 outline-none focus:border-[#0E21A0]"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-white/70">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write assignment details..."
              rows={4}
              className="w-full mt-1 px-4 py-2 rounded-lg bg-[#0d1117] border border-white/10 outline-none focus:border-[#0E21A0]"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="text-sm text-white/70">Deadline (Optional)</label>
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-lg bg-[#0d1117] border border-white/10 outline-none focus:border-[#0E21A0]"
            />
            <p className="text-xs text-white/40 mt-1">
              Students cannot submit after deadline.
            </p>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-[#0E21A0] hover:opacity-90 transition font-semibold disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Assignment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;
