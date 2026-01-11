import React from "react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>🎓 Student Dashboard</h2>

      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/student/assignments">
          <button>View Assignments</button>
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
