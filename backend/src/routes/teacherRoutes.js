import express from "express";
import teacherAuth from "../middleware/teacherAuth.js";

import {
  teacherDashboard,
  createAssignment,
  getMyAssignments,
  getAllSubmissions,
  reviewSubmission,
  deleteAssignment,
} from "../controllers/teacherController.js";

const router = express.Router();

// ✅ Dashboard
router.get("/dashboard", teacherAuth, teacherDashboard);

// ✅ Assignments
router.post("/assignments", teacherAuth, createAssignment);
router.get("/assignments", teacherAuth, getMyAssignments);
router.delete("/assignments/:id", teacherAuth, deleteAssignment);

// ✅ Submissions
router.get("/submissions", teacherAuth, getAllSubmissions);
router.put("/review/:id", teacherAuth, reviewSubmission);

export default router;
