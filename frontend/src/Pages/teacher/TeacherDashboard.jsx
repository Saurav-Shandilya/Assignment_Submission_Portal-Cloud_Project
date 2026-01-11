import React from "react";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>👨‍🏫 Teacher Dashboard</h2>

      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/teacher/create-assignment">
          <button>Create Assignment</button>
        </Link>

        <Link to="/teacher/submissions">
          <button>View Submissions</button>
        </Link>
      </div>
    </div>
  );
};

export default TeacherDashboard;
