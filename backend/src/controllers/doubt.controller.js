import Doubt from '../models/Doubt.model.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const submitDoubt = asyncHandler(async (req, res) => {
  const doubt = await Doubt.create({ ...req.body, student: req.user._id });
  res.status(201).json(new ApiResponse(201, doubt, 'Doubt submitted'));
});

export const getMyDoubts = asyncHandler(async (req, res) => {
  const doubts = await Doubt.find({ student: req.user._id }).sort('-createdAt');
  res.json(new ApiResponse(200, doubts));
});

export const getAllDoubts = asyncHandler(async (req, res) => {
  const { class: cls, subject, status } = req.query;
  const filter = {};
  if (cls)     filter.class   = cls;
  if (subject) filter.subject = subject;
  if (status)  filter.status  = status;
  const doubts = await Doubt.find(filter)
    .populate('student', 'name')
    .sort('-createdAt');
  res.json(new ApiResponse(200, doubts));
});

export const replyToDoubt = asyncHandler(async (req, res) => {
  const doubt = await Doubt.findByIdAndUpdate(
    req.params.id,
    { $push: { replies: { author: req.user._id, content: req.body.content } } },
    { new: true }
  ).populate('replies.author', 'name role');
  res.json(new ApiResponse(200, doubt, 'Reply added'));
});

export const resolveDoubt = asyncHandler(async (req, res) => {
  const doubt = await Doubt.findByIdAndUpdate(
    req.params.id,
    { status: 'resolved', resolvedBy: req.user._id },
    { new: true }
  );
  res.json(new ApiResponse(200, doubt, 'Resolved'));
});