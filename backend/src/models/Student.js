import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    rollNo: { type: String, required: true, unique: true, trim: true },

    email: { type: String, required: true, unique: true, lowercase: true },

    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
