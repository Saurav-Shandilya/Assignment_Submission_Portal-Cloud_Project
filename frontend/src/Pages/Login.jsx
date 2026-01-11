import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // TEST login as Student
  const loginStudent = () => {
    localStorage.setItem("token", "dummy-token");
    localStorage.setItem("role", "student");
    navigate("/student/dashboard");
  };

  // TEST login as Teacher
  const loginTeacher = () => {
    localStorage.setItem("token", "dummy-token");
    localStorage.setItem("role", "teacher");
    navigate("/teacher/dashboard");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔐 Login Page</h2>
      <p>Testing login buttons (no backend required)</p>

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={loginStudent}>Login as Student</button>
        <button onClick={loginTeacher}>Login as Teacher</button>
      </div>
    </div>
  );
};

export default Login;
