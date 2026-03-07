import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  score:     { type: String, required: true },
  subject:   { type: String, required: true },
  branch:    { type: String, enum: ['Zirakpur','Baltana','Behlana'], required: true },
  year:      { type: String, required: true },
  photoUrl:  { type: String },
  postedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Result', resultSchema);