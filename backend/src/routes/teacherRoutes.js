import express from "express";
import teacherAuth from "../middleware/teacherAuth.js";
import {
  teacherDashboard,
  createAssignment,
  getMyAssignments,
  getAllSubmissions,
} from "../controllers/teacherController.js";

const router = express.Router();

// Dashboard
router.get("/dashboard", teacherAuth, teacherDashboard);

// Assignment
router.post("/assignments", teacherAuth, createAssignment);
router.get("/assignments", teacherAuth, getMyAssignments);

// ✅ All submissions (of that teacher)
router.get("/submissions", teacherAuth, getAllSubmissions);

export default router;
