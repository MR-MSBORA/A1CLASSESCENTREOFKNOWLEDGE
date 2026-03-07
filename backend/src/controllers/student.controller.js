import Attendance   from '../models/Attendance.model.js';
import Marks        from '../models/Marks.model.js';
import Assignment   from '../models/Assignment.model.js';
import Announcement from '../models/Announcement.model.js';
import ApiResponse  from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getMyAttendance = asyncHandler(async (req, res) => {
  const records = await Attendance.find({ student: req.user._id }).sort('-date');
  const total   = records.length;
  const present = records.filter(r => r.status === 'present').length;
  res.json(new ApiResponse(200, {
    records,
    percentage: total ? ((present / total) * 100).toFixed(1) : 0,
  }));
});

export const getMyMarks = asyncHandler(async (req, res) => {
  const marks = await Marks.find({ student: req.user._id }).sort('-createdAt');
  res.json(new ApiResponse(200, marks));
});

export const getAssignments = asyncHandler(async (req, res) => {
  const assignments = await Assignment.find({ class: req.user.class }).sort('-dueDate');
  res.json(new ApiResponse(200, assignments));
});

export const submitAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findByIdAndUpdate(
    req.params.id,
    { $push: { submissions: { student: req.user._id, fileUrl: req.file?.path || req.body.fileUrl } } },
    { new: true }
  );
  res.json(new ApiResponse(200, assignment, 'Assignment submitted'));
});

export const getAnnouncements = asyncHandler(async (req, res) => {
  const now = new Date();
  const announcements = await Announcement.find({
    targetRole: { $in: ['all', req.user.role] },
    $or: [{ expiresAt: { $gt: now } }, { expiresAt: null }],
  }).sort('-createdAt').limit(20);
  res.json(new ApiResponse(200, announcements));
});