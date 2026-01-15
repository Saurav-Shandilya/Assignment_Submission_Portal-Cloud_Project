import API from "../api";

export const getStudentDashboard = () => API.get("/student/dashboard");
export const getStudentAssignments = () => API.get("/student/assignments");

export const submitStudentAssignment = (data) =>
  API.post("/submission/submit", data);
