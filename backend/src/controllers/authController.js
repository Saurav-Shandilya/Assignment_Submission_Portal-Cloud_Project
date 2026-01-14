import bcrypt from "bcryptjs";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
import generateToken from "../utils/generateToken.js";

// ================= STUDENT =================

// Register Student
export const studentRegister = async (req, res) => {
  try {
    const { name, rollNo, email, password } = req.body;

    if (!name || !rollNo || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existRoll = await Student.findOne({ rollNo });
    if (existRoll) return res.status(400).json({ message: "RollNo already exists" });

    const existEmail = await Student.findOne({ email });
    if (existEmail) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name,
      rollNo,
      email,
      password: hashed,
    });

    res.status(201).json({
      message: "Student registered successfully",
      token: generateToken(student._id, "student"),
      user: {
        id: student._id,
        name: student.name,
        rollNo: student.rollNo,
        email: student.email,
        role: "student",
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login Student
export const studentLogin = async (req, res) => {
  try {
    const { rollNo, password } = req.body;

    if (!rollNo || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const student = await Student.findOne({ rollNo });
    if (!student) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({
      message: "Student login successful",
      token: generateToken(student._id, "student"),
      user: {
        id: student._id,
        name: student.name,
        rollNo: student.rollNo,
        email: student.email,
        role: "student",
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= TEACHER =================

// Register Teacher
export const teacherRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existEmail = await Teacher.findOne({ email });
    if (existEmail) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const teacher = await Teacher.create({
      name,
      email,
      password: hashed,
    });

    res.status(201).json({
      message: "Teacher registered successfully",
      token: generateToken(teacher._id, "teacher"),
      user: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        role: "teacher",
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login Teacher
export const teacherLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const teacher = await Teacher.findOne({ email });
    if (!teacher) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({
      message: "Teacher login successful",
      token: generateToken(teacher._id, "teacher"),
      user: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        role: "teacher",
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
