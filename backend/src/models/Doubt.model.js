import mongoose from 'mongoose';
const replySchema = new mongoose.Schema({
  author:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content:   { type: String },
  createdAt: { type: Date, default: Date.now },
});
const doubtSchema = new mongoose.Schema({
  student:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject:       { type: String, required: true },
  class:         { type: Number, required: true },
  question:      { type: String, required: true },
  attachmentUrl: { type: String },
  status:        { type: String, enum: ['open','in-review','resolved'], default: 'open' },
  replies:       [replySchema],
  upvotes:       { type: Number, default: 0 },
  resolvedBy:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
export default mongoose.model('Doubt', doubtSchema);