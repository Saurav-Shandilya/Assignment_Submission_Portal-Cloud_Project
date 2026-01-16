import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    fileUrl: { type: String, default: "" },

    status: {
      type: String,
      enum: ["submitted", "reviewed"],
      default: "submitted",
    },

    marks: { type: Number, default: null },
    feedback: { type: String, default: "" },
  },
  { timestamps: true }
);

// ✅ prevent duplicate submission
submissionSchema.index({ assignmentId: 1, studentId: 1 }, { unique: true });

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;
