import React from "react";

const Submissions = () => {
  // Dummy submission list
  const submissions = [
    { id: 101, student: "Saurav", assignment: "DSA Assignment 1" },
    { id: 102, student: "Rahul", assignment: "DBMS Assignment 2" },
    { id: 103, student: "Priya", assignment: "MERN Mini Project" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>📥 Submissions List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Submission ID</th>
            <th>Student</th>
            <th>Assignment</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.student}</td>
              <td>{s.assignment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Submissions;
