import mongoose from 'mongoose';
const attendanceSchema = new mongoose.Schema({
  student:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  date:     { type: Date, required: true, index: true },
  status:   { type: String, enum: ['present','absent','late'], required: true },
  subject:  { type: String },
  class:    { type: Number },
  markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
export default mongoose.model('Attendance', attendanceSchema);