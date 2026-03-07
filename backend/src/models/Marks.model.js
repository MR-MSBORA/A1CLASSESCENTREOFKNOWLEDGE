import mongoose from 'mongoose';
const marksSchema = new mongoose.Schema({
  student:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exam:           { type: String, required: true },
  subject:        { type: String, required: true },
  marksObtained:  { type: Number, required: true },
  maxMarks:       { type: Number, default: 100 },
  grade:          { type: String },
  enteredBy:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
export default mongoose.model('Marks', marksSchema);