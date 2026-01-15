import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const CreateAssignment = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add API call to create assignment
    console.log({ title, description, deadline });
    alert("Assignment Created Successfully!");
    setTitle("");
    setDescription("");
    setDeadline("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-gray-200">
      {/* Navbar / Header */}
      <div className="flex justify-between items-center px-8 py-4 bg-slate-900 shadow-md">
        <h1 className="text-xl font-bold text-white">
          Assignment<span className="text-sky-500">Portal</span>
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/teacher/dashboard")}
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-white"
          >
            Dashboard
          </button>
          <button className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-md text-white">
            Logout
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-1 justify-center items-start py-12 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 p-8 rounded-2xl shadow-lg w-full max-w-lg flex flex-col gap-6"
        >
          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sky-400 hover:text-sky-300 font-semibold mb-2"
          >
            <FaArrowLeft /> Back
          </button>

          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-sky-500">+</span> Create Assignment
          </h2>

          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none h-32"
            required
          />

          {/* Deadline */}
          <label className="flex flex-col text-gray-400">
            Timeline / Expiry Date
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="mt-2 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;
