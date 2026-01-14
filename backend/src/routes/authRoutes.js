import express from "express";
import {
  studentRegister,
  studentLogin,
  teacherRegister,
  teacherLogin,
} from "../controllers/authController.js";

const router = express.Router();

// Student
router.post("/student/register", studentRegister);
router.post("/student/login", studentLogin);

// Teacher
router.post("/teacher/register", teacherRegister);
router.post("/teacher/login", teacherLogin);

export default router;
