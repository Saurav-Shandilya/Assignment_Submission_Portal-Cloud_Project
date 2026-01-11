import React from "react";
import { useParams } from "react-router-dom";

const SubmitAssignment = () => {
  const { id } = useParams();

  const handleSubmit = () => {
    alert(`✅ Assignment ID ${id} submitted successfully (dummy submit)!`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📤 Submit Assignment</h2>
      <p>Assignment ID: {id}</p>

      <input type="file" />
      <br />
      <br />

      <button onClick={handleSubmit}>Submit Assignment</button>
    </div>
  );
};

export default SubmitAssignment;
