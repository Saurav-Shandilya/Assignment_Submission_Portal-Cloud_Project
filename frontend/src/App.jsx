import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";



// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages (Common)
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

// Student Pages
import StudentDashboard from "./Pages/student/StudentDashboard";
import ViewAssignments from "./Pages/student/ViewAssignments";
import SubmitAssignment from "./Pages/student/SubmitAssignment";
import MySubmissions from "./pages/student/MySubmissions";


// Teacher Pages
import TeacherDashboard from "./Pages/teacher/TeacherDashboard";
import CreateAssignment from "./Pages/teacher/CreateAssignment";
import Submissions from "./Pages/teacher/Submissions";

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Student */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/assignments"
          element={
            <ProtectedRoute role="student">
              <ViewAssignments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/submit/:id"
          element={
            <ProtectedRoute role="student">
              <SubmitAssignment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/submissions"
          element={
            <ProtectedRoute role="student">
              <MySubmissions />
            </ProtectedRoute>
          }
        />


        {/* Teacher */}
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute role="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/create-assignment"
          element={
            <ProtectedRoute role="teacher">
              <CreateAssignment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/submissions"
          element={
            <ProtectedRoute role="teacher">
              <Submissions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/submissions/:id"
          element={
            <ProtectedRoute role="teacher">
              <Submissions />
            </ProtectedRoute>
          }
        />


        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
