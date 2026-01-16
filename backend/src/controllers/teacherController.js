import Assignment from "../models/Assignment.js";
import Submission from "../models/Submission.js";

// ✅ Teacher Dashboard
export const teacherDashboard = async (req, res) => {
  try {
    const teacherId = req.teacher._id;

    const totalAssignments = await Assignment.countDocuments({ teacherId });

    // only teacher submissions
    const teacherAssignments = await Assignment.find({ teacherId }).select("_id");
    const assignmentIds = teacherAssignments.map((a) => a._id);

    const totalSubmissions = await Submission.countDocuments({
      assignmentId: { $in: assignmentIds },
    });

    res.json({
      message: "Teacher dashboard data",
      totalAssignments,
      totalSubmissions,
    });
  } catch (error) {
    console.log("teacherDashboard error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Create Assignment
export const createAssignment = async (req, res) => {
  try {
    const teacherId = req.teacher._id;
    const { title, description, deadline } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });

    const assignment = await Assignment.create({
      title,
      description,
      deadline,
      teacherId,
    });

    res.status(201).json({
      message: "Assignment created successfully",
      assignment,
    });
  } catch (error) {
    console.log("createAssignment error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get My Assignments
export const getMyAssignments = async (req, res) => {
  try {
    const teacherId = req.teacher._id;

    const assignments = await Assignment.find({ teacherId }).sort({
      createdAt: -1,
    });

    res.json(assignments);
  } catch (error) {
    console.log("getMyAssignments error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get ALL submissions for assignments created by teacher
export const getAllSubmissions = async (req, res) => {
  try {
    const teacherId = req.teacher._id;

    const assignments = await Assignment.find({ teacherId }).select("_id");
    const assignmentIds = assignments.map((a) => a._id);

    const submissions = await Submission.find({
      assignmentId: { $in: assignmentIds },
    })
      .populate("assignmentId", "title deadline")
      .populate("studentId", "name rollNo email")
      .sort({ createdAt: -1 });

    res.json(submissions);
  } catch (error) {
    console.log("getAllSubmissions error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Review submission (Marks + Feedback)
export const reviewSubmission = async (req, res) => {
  try {
    const { id } = req.params; // submission id
    const { marks, feedback } = req.body;

    const submission = await Submission.findById(id);
    if (!submission) return res.status(404).json({ message: "Submission not found" });

    submission.marks = marks ?? submission.marks;
    submission.feedback = feedback ?? submission.feedback;
    submission.status = "reviewed";

    await submission.save();

    res.json({ message: "Submission reviewed", submission });
  } catch (error) {
    console.log("reviewSubmission error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ DELETE assignment (also delete related submissions)
export const deleteAssignment = async (req, res) => {
  try {
    const teacherId = req.teacher._id;
    const { id } = req.params;

    // ✅ ensure teacher owns assignment
    const assignment = await Assignment.findOne({ _id: id, teacherId });
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // ✅ delete all submissions linked with assignment
    await Submission.deleteMany({ assignmentId: id });

    // ✅ delete assignment
    await Assignment.deleteOne({ _id: id });

    res.json({ message: "Assignment deleted successfully" });
  } catch (error) {
    console.log("deleteAssignment error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
