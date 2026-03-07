import mongoose from 'mongoose';
const noteSchema = new mongoose.Schema({
  title:         { type: String, required: true, trim: true },
  description:   { type: String },
  subject:       { type: String, required: true, index: true },
  class:         { type: Number, required: true, index: true },
  price:         { type: Number, default: 0 },
  isFree:        { type: Boolean, default: false },
  fileUrl:       { type: String, required: true },
  previewUrl:    { type: String },
  cloudinaryId:  { type: String },
  downloadCount: { type: Number, default: 0 },
  uploadedBy:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isActive:      { type: Boolean, default: true },
}, { timestamps: true });
export default mongoose.model('Note', noteSchema);