import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  caption:    { type: String, required: true },
  branch:     { type: String, enum: ['Zirakpur','Baltana','Behlana','All'], default: 'All' },
  fileUrl:    { type: String, required: true },
  publicId:   { type: String },
  type:       { type: String, enum: ['image','video'], default: 'image' },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Gallery', gallerySchema);