import express from "express";
import studentAuth from "../middleware/studentAuth.js";
import { submitAssignment } from "../controllers/submissionController.js";

const router = express.Router();

router.post("/submit", studentAuth, submitAssignment);

export default router;
