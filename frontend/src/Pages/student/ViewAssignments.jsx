import React from "react";
import { Link } from "react-router-dom";

const ViewAssignments = () => {
  // Dummy assignment list
  const assignments = [
    { id: 1, title: "DSA Assignment 1" },
    { id: 2, title: "DBMS Assignment 2" },
    { id: 3, title: "MERN Mini Project" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>📚 View Assignments</h2>

      <ul>
        {assignments.map((a) => (
          <li key={a.id} style={{ marginBottom: "10px" }}>
            {a.title}{" "}
            <Link to={`/student/submit/${a.id}`}>
              <button>Submit</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAssignments;
