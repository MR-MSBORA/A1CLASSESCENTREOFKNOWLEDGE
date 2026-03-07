import Note from '../models/Note.model.js';
import Payment from '../models/Payment.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getAllNotes = asyncHandler(async (req, res) => {
  const { class: cls, subject } = req.query;
  const filter = { isActive: true };
  if (cls) filter.class = Number(cls);
  if (subject) filter.subject = subject;
  const notes = await Note.find(filter).select('-cloudinaryId');
  res.json(new ApiResponse(200, { notes }));
});

export const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id).select('-cloudinaryId');
  if (!note) throw new ApiError(404, 'Note not found');
  res.json(new ApiResponse(200, note));
});

export const uploadNote = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'PDF file required');
  const note = await Note.create({
    ...req.body,
    fileUrl:      req.file.path,
    cloudinaryId: req.file.filename,
    uploadedBy:   req.user._id,
  });
  res.status(201).json(new ApiResponse(201, note, 'Note uploaded'));
});

export const deleteNote = asyncHandler(async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json(new ApiResponse(200, {}, 'Note deleted'));
});

export const downloadNote = asyncHandler(async (req, res) => {
  const payment = await Payment.findOne({
    downloadToken: req.params.token,
    student: req.user._id,
    status: 'success',
  });
  if (!payment)                              throw new ApiError(404, 'Invalid download token');
  if (payment.tokenExpiry < new Date())      throw new ApiError(410, 'Token expired');
  if (payment.downloadCount >= payment.maxDownloads) throw new ApiError(403, 'Download limit reached');
  payment.downloadCount += 1;
  await payment.save();
  const note = await Note.findByIdAndUpdate(
    payment.note,
    { $inc: { downloadCount: 1 } },
    { new: true }
  );
  res.json(new ApiResponse(200, { fileUrl: note.fileUrl }));
});