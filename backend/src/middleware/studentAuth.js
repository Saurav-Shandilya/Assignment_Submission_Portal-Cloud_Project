import jwt from "jsonwebtoken";
import Student from "../models/Student.js";

const studentAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "student") {
      return res.status(403).json({ message: "Access denied: Students only" });
    }

    const student = await Student.findById(decoded.id).select("-password");
    if (!student) return res.status(401).json({ message: "Student not found" });

    req.student = student;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalid" });
  }
};

export default studentAuth;
