import Assignment from "../models/Assignment.js";
import Submission from "../models/Submission.js";

export const studentDashboard = async (req, res) => {
  try {
    const studentId = req.student._id;

    const totalAssignments = await Assignment.countDocuments();
    const submittedAssignments = await Submission.countDocuments({ studentId });
    const pendingAssignments = totalAssignments - submittedAssignments;

    res.json({
      totalAssignments,
      submittedAssignments,
      pendingAssignments,
    });
  } catch (error) {
    console.log("studentDashboard error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getStudentAssignments = async (req, res) => {
  try {
    const studentId = req.student._id;

    const assignments = await Assignment.find().sort({ createdAt: -1 });
    const submissions = await Submission.find({ studentId });

    const submittedMap = {};
    submissions.forEach((s) => {
      submittedMap[s.assignmentId.toString()] = s;
    });

    const result = assignments.map((a) => ({
      _id: a._id,
      title: a.title,
      description: a.description,
      deadline: a.deadline,
      createdAt: a.createdAt,
      isSubmitted: !!submittedMap[a._id.toString()],
      submission: submittedMap[a._id.toString()] || null,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.log("getStudentAssignments error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Student can view marks + feedback
export const getMySubmissions = async (req, res) => {
  try {
    const studentId = req.student._id;

    const submissions = await Submission.find({ studentId })
      .populate("assignmentId", "title deadline")
      .sort({ createdAt: -1 });

    res.json(submissions);
  } catch (error) {
    console.log("getMySubmissions error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
