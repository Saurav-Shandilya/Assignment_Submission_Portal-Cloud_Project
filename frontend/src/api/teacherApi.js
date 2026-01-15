import API from "../api";

// ✅ Teacher dashboard
export const getTeacherDashboard = () => API.get("/teacher/dashboard");

// ✅ Create assignment
export const createAssignment = (data) => API.post("/teacher/assignments", data);

// ✅ Get teacher assignments
export const getTeacherAssignments = () => API.get("/teacher/assignments");

// ✅ Get all submissions (teacher)
export const getTeacherSubmissions = () => API.get("/teacher/submissions");

// ✅ Review submission
export const reviewSubmission = (submissionId, data) =>
  API.put(`/teacher/review/${submissionId}`, data);
