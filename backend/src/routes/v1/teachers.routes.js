import express      from 'express';
import Teacher      from '../../models/Teacher.model.js';
import User         from '../../models/User.model.js';
import Payment      from '../../models/Payment.model.js';
import ApiResponse  from '../../utils/ApiResponse.js';
import ApiError     from '../../utils/ApiError.js';
import asyncHandler from '../../utils/asyncHandler.js';
import { protect }  from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';



const router = express.Router();

// Public — get all active teachers
router.get('/', asyncHandler(async (req, res) => {
  const teachers = await Teacher.find({ isActive: true })
    .select('-password -refreshToken')
    .sort({ createdAt: -1 });
  res.json(new ApiResponse(200, teachers, 'Teachers fetched'));
}));

// Admin — get teacher with full stats
router.get('/stats', protect, authorize('admin'), asyncHandler(async (req, res) => {
  const teachers = await Teacher.find()
    .select('-password -refreshToken')
    .sort({ createdAt: -1 });

  // For each teacher get student count and payment count
  const teachersWithStats = await Promise.all(teachers.map(async (t) => {
    // Students in teacher's classes and branch
    const studentFilter = {};
    if (t.classes?.length > 0) {
      studentFilter.class = { $in: t.classes };
    }
    if (t.branch && t.branch !== 'All') {
      studentFilter.branch = t.branch;
    }
    studentFilter.role = 'student';

    const studentCount = await User.countDocuments(studentFilter);

    // Students who paid fees
    const students = await User.find(studentFilter).select('_id');
    const studentIds = students.map(s => s._id);
    const paidCount = await Payment.countDocuments({
      user:   { $in: studentIds },
      status: 'paid',
    });

    return {
      ...t.toObject(),
      stats: {
        studentCount,
        paidCount,
        unpaidCount: studentCount - paidCount,
      },
    };
  }));

  res.json(new ApiResponse(200, teachersWithStats, 'Teacher stats fetched'));
}));

// Public — get single teacher
router.get('/:id', asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id)
    .select('-password -refreshToken');
  if (!teacher) return res.status(404).json({ message: 'Not found' });
  res.json(new ApiResponse(200, teacher, 'Teacher fetched'));
}));

export default router;