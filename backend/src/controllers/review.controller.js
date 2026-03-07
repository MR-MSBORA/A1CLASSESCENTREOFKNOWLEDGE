import asyncHandler from '../utils/asyncHandler.js';
import ApiError     from '../utils/ApiError.js';
import ApiResponse  from '../utils/ApiResponse.js';
import Review       from '../models/Review.model.js';

export const submitReview = asyncHandler(async (req, res) => {
  const { rating, review, branch } = req.body;
  const existing = await Review.findOne({ student: req.user._id });
  if (existing) throw new ApiError(400, 'You have already submitted a review');
  const r = await Review.create({
    student: req.user._id,
    name:    req.user.name,
    class:   req.user.class ? `Class ${req.user.class}` : 'Competitive',
    branch,
    rating,
    review,
  });
  res.status(201).json(new ApiResponse(201, r, 'Review submitted. Pending approval.'));
});

export const getApprovedReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
  res.json(new ApiResponse(200, reviews, 'Reviews fetched'));
});

export const getPendingReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ approved: false })
    .populate('student', 'name email')
    .sort({ createdAt: -1 });
  res.json(new ApiResponse(200, reviews, 'Pending reviews'));
});

export const approveReview = asyncHandler(async (req, res) => {
  const r = await Review.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
  if (!r) throw new ApiError(404, 'Review not found');
  res.json(new ApiResponse(200, r, 'Review approved'));
});

export const deleteReview = asyncHandler(async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json(new ApiResponse(200, {}, 'Review deleted'));
});