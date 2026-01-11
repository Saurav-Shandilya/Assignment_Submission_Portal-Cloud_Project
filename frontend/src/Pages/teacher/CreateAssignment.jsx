import React, { useState } from "react";

const CreateAssignment = () => {
  const [title, setTitle] = useState("");

  const handleCreate = () => {
    alert(`✅ Assignment Created: ${title || "Untitled"}`);
    setTitle("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>➕ Create Assignment</h2>

      <input
        type="text"
        placeholder="Enter assignment title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <br />

      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

export default CreateAssignment;
