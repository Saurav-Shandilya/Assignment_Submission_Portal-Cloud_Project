import Submission from "../models/Submission.js";
import Assignment from "../models/Assignment.js";

export const submitAssignment = async (req, res) => {
  try {
    const studentId = req.student._id;
    const { assignmentId, answerLink } = req.body;

    if (!assignmentId || !answerLink) {
      return res.status(400).json({ message: "assignmentId and answerLink required" });
    }

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    // prevent duplicate
    const already = await Submission.findOne({ assignmentId, studentId });
    if (already) {
      return res.status(400).json({ message: "Already submitted" });
    }

    const submission = await Submission.create({
      assignmentId,
      studentId,
      fileUrl: answerLink,
      status: "submitted",
    });

    res.status(201).json({
      message: "Submitted successfully",
      submission,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
};
