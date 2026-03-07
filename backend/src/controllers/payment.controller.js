import Razorpay from 'razorpay';
import crypto from 'crypto';
import Payment from '../models/Payment.model.js';
import Note from '../models/Note.model.js';
import User from '../models/User.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.body.noteId);
  if (!note) throw new ApiError(404, 'Note not found');
  if (note.isFree) throw new ApiError(400, 'This note is free');
  const order = await razorpay.orders.create({
    amount:   note.price * 100,
    currency: 'INR',
    receipt:  `receipt_${Date.now()}`,
  });
  await Payment.create({
    student:         req.user._id,
    note:            note._id,
    razorpayOrderId: order.id,
    amount:          note.price,
  });
  res.json(new ApiResponse(200, {
    orderId:  order.id,
    amount:   order.amount,
    currency: order.currency,
    key:      process.env.RAZORPAY_KEY_ID,
  }));
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');
  if (expected !== razorpay_signature)
    throw new ApiError(400, 'Payment verification failed');
  const payment = await Payment.findOneAndUpdate(
    { razorpayOrderId: razorpay_order_id },
    { razorpayPaymentId: razorpay_payment_id, status: 'success' },
    { new: true }
  );
  await User.findByIdAndUpdate(req.user._id, {
    $addToSet: { purchasedNotes: payment.note }
  });
  res.json(new ApiResponse(200, { downloadToken: payment.downloadToken }, 'Payment verified'));
});

export const getMyPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find({ student: req.user._id, status: 'success' })
    .populate('note', 'title subject class');
  res.json(new ApiResponse(200, payments));
});

export const getAllPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find({ status: 'success' })
    .populate('student', 'name email')
    .populate('note', 'title')
    .sort('-createdAt');
  res.json(new ApiResponse(200, payments));
});