import mongoose from 'mongoose';
const announcementSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  content:     { type: String, required: true },
  targetRole:  { type: String, enum: ['all','student','teacher'], default: 'all' },
  targetClass: { type: Number },
  isImportant: { type: Boolean, default: false },
  expiresAt:   { type: Date },
  createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
export default mongoose.model('Announcement', announcementSchema);