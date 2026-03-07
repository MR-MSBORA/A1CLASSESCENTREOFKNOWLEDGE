import mongoose from 'mongoose';
const submissionSchema = new mongoose.Schema({
  student:     { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileUrl:     { type: String },
  submittedAt: { type: Date, default: Date.now },
  marks:       { type: Number },
  feedback:    { type: String },
});
const assignmentSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  subject:     { type: String },
  class:       { type: Number },
  description: { type: String },
  fileUrl:     { type: String },
  dueDate:     { type: Date },
  maxMarks:    { type: Number, default: 100 },
  submissions: [submissionSchema],
  uploadedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
export default mongoose.model('Assignment', assignmentSchema);