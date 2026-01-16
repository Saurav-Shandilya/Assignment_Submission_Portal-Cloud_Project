import React, { useState } from "react";
import { createAssignment } from "../../api/teacherApi";
import { useNavigate } from "react-router-dom";

const CreateAssignment = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAssignment({ title, description, deadline });
    navigate("/teacher/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
      >
        ⬅ Back
      </button>

      <h1 className="text-2xl font-bold mb-6">➕ Create Assignment</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md bg-[#141414] p-5 rounded-xl border border-white/10 space-y-4"
      >
        <input
          className="w-full p-2 rounded bg-[#0d0d0d] border border-white/10"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full p-2 rounded bg-[#0d0d0d] border border-white/10"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="date"
          className="w-full p-2 rounded bg-[#0d0d0d] border border-white/10"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <button className="w-full bg-[#0E21A0] py-2 rounded-xl font-semibold">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateAssignment;
