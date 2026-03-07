import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  student:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:     { type: String, required: true },
  class:    { type: String },
  branch:   { type: String, enum: ['Zirakpur','Baltana','Behlana'] },
  rating:   { type: Number, min: 1, max: 5, default: 5 },
  review:   { type: String, required: true },
  approved: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);