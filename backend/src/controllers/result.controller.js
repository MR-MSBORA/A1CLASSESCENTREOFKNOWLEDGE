import asyncHandler from '../utils/asyncHandler.js';
import ApiError     from '../utils/ApiError.js';
import ApiResponse  from '../utils/ApiResponse.js';
import Result       from '../models/Result.model.js';

export const getResults = asyncHandler(async (req, res) => {
  const results = await Result.find().sort({ createdAt: -1 });
  res.json(new ApiResponse(200, results, 'Results fetched'));
});

export const addResult = asyncHandler(async (req, res) => {
  const { name, score, subject, branch, year } = req.body;
  if (!name || !score || !subject || !branch || !year)
    throw new ApiError(400, 'All fields required');
  const result = await Result.create({
    name, score, subject, branch, year,
    photoUrl: req.file?.path || '',
    postedBy: req.user._id,
  });
  res.status(201).json(new ApiResponse(201, result, 'Result posted'));
});

export const deleteResult = asyncHandler(async (req, res) => {
  await Result.findByIdAndDelete(req.params.id);
  res.json(new ApiResponse(200, {}, 'Result deleted'));
});