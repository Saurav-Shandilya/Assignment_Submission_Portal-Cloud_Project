import express from "express";
import studentAuth from "../middleware/studentAuth.js";
import { studentDashboard, getStudentAssignments } from "../controllers/studentController.js";

const router = express.Router();

router.get("/dashboard", studentAuth, studentDashboard);
router.get("/assignments", studentAuth, getStudentAssignments);

export default router;
