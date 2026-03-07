import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
const paymentSchema = new mongoose.Schema({
  student:            { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  note:               { type: mongoose.Schema.Types.ObjectId, ref: 'Note', required: true },
  razorpayOrderId:    { type: String, required: true },
  razorpayPaymentId:  { type: String },
  amount:             { type: Number, required: true },
  status:             { type: String, enum: ['pending','success','failed'], default: 'pending' },
  downloadToken:      { type: String, default: () => uuidv4() },
  tokenExpiry:        { type: Date,   default: () => new Date(Date.now() + 24*60*60*1000) },
  downloadCount:      { type: Number, default: 0 },
  maxDownloads:       { type: Number, default: 3 },
}, { timestamps: true });
export default mongoose.model('Payment', paymentSchema);