import API from "../api";

export const getTeacherDashboard = () => API.get("/teacher/dashboard");
export const createAssignment = (data) => API.post("/teacher/assignments", data);
export const getTeacherAssignments = () => API.get("/teacher/assignments");
export const deleteTeacherAssignment = (id) =>
  API.delete(`/teacher/assignments/${id}`);

export const getTeacherSubmissions = () => API.get("/teacher/submissions");
export const reviewSubmission = (id, data) =>
  API.put(`/teacher/review/${id}`, data);
