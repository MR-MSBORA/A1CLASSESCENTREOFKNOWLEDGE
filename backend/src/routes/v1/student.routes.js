import express from 'express';
import { authorize } from '../../middleware/role.middleware.js';
import { getMyAttendance, getMyMarks, getAssignments, submitAssignment, getAnnouncements } from '../../controllers/student.controller.js';
import { protect }   from '../../middleware/auth.middleware.js';
import { uploadPDF } from '../../middleware/upload.middleware.js';
import User from '../../models/User.model.js';
import Assignment from '../../models/Assignment.model.js';

const router = express.Router();
router.get('/attendance',                 protect, getMyAttendance);
router.get('/marks',                      protect, getMyMarks);
router.get('/assignments',                protect, getAssignments);
router.post('/assignments/:id/submit',    protect, uploadPDF.single('file'), submitAssignment);
router.get('/announcements',              protect, getAnnouncements);
router.get('/assignments/all', protect, authorize('admin','teacher','superadmin'), async (req, res) => {
  const assignments = await Assignment.find()
    .populate('uploadedBy', 'name')
    .sort({ createdAt: -1 });
  res.json({ success: true, data: assignments });
});

router.post('/assignments', protect, authorize('admin','teacher','superadmin'), async (req, res) => {
  const { title, subject, class: cls, description, dueDate, maxMarks } = req.body;
  const assignment = await Assignment.create({
    title, subject,
    class:       cls,
    description,
    dueDate,
    maxMarks:    maxMarks || 100,
    uploadedBy:  req.user._id,
    fileUrl:     req.file?.path || '',
  });
  res.status(201).json({ success: true, data: assignment, message: 'Assignment created' });
});

router.delete('/assignments/:id', protect, authorize('admin','teacher','superadmin'), async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.json({ success: true, data: {}, message: 'Deleted' });
});


router.patch('/profile', protect, async (req, res) => {
  const { name, phone } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, phone },
    { new: true }
  ).select('-password -refreshToken');
  res.json({ success: true, data: user, message: 'Profile updated' });
});

export default router;




