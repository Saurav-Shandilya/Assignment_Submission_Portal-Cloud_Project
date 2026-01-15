import jwt from "jsonwebtoken";
import Teacher from "../models/Teacher.js";

const teacherAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "teacher") {
      return res.status(403).json({ message: "Access denied: Teachers only" });
    }

    const teacher = await Teacher.findById(decoded.id).select("-password");
    if (!teacher) return res.status(401).json({ message: "Teacher not found" });

    req.teacher = teacher;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalid" });
  }
};

export default teacherAuth;
