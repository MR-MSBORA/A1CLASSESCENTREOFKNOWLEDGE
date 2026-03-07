import asyncHandler from '../utils/asyncHandler.js';
import ApiError     from '../utils/ApiError.js';
import ApiResponse  from '../utils/ApiResponse.js';
import Teacher      from '../models/Teacher.model.js';
import User         from '../models/User.model.js';
import { cloudinary } from '../config/cloudinary.js';

// GET all teachers (public)
export const getAllTeachers = asyncHandler(async (req, res) => {
  const { branch, subject } = req.query;
  const filter = { isActive: true };
  if (branch)  filter.branch  = branch;
  if (subject) filter.subjects = { $in: [subject] };

  const teachers = await Teacher.find(filter)
    .populate('user', 'email role')
    .sort({ createdAt: -1 });

  res.json(new ApiResponse(200, teachers, 'Teachers fetched'));
});

// GET single teacher
export const getTeacherById = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id)
    .populate('user', 'email role');
  if (!teacher) throw new ApiError(404, 'Teacher not found');
  res.json(new ApiResponse(200, teacher, 'Teacher fetched'));
});

// CREATE teacher profile (called after creating user account)
export const createTeacherProfile = asyncHandler(async (req, res) => {
  const {
    userId, name, email, phone, gender, dateOfBirth,
    address, qualification, experience, bio,
    subjects, classes, branch, joiningDate,
  } = req.body;

  // Check user exists and is teacher
  const user = await User.findById(userId);
  if (!user)               throw new ApiError(404, 'User not found');
  if (user.role !== 'teacher') throw new ApiError(400, 'User must have teacher role');

  // Check profile doesn't already exist
  const existing = await Teacher.findOne({ user: userId });
  if (existing) throw new ApiError(400, 'Teacher profile already exists');

  const teacher = await Teacher.create({
    user:          userId,
    name,
    email,
    phone,
    gender,
    dateOfBirth,
    address,
    qualification,
    experience:    Number(experience) || 0,
    bio,
    subjects:      Array.isArray(subjects)
                     ? subjects
                     : subjects?.split(',').map(s => s.trim()) || [],
    classes:       Array.isArray(classes)
                     ? classes.map(Number)
                     : classes?.split(',').map(Number) || [],
    branch:        branch || 'All',
    joiningDate:   joiningDate || Date.now(),
    photo:         req.file?.path         || '',
    photoPublicId: req.file?.filename     || '',
  });

  res.status(201).json(new ApiResponse(201, teacher, 'Teacher profile created'));
});

// UPDATE teacher profile
export const updateTeacherProfile = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) throw new ApiError(404, 'Teacher not found');

  const {
    name, phone, gender, dateOfBirth, address,
    qualification, experience, bio,
    subjects, classes, branch, isActive,
  } = req.body;

  // Handle photo update
  if (req.file) {
    // Delete old photo from cloudinary
    if (teacher.photoPublicId) {
      await cloudinary.uploader.destroy(teacher.photoPublicId);
    }
    teacher.photo         = req.file.path;
    teacher.photoPublicId = req.file.filename;
  }

  if (name)          teacher.name          = name;
  if (phone)         teacher.phone         = phone;
  if (gender)        teacher.gender        = gender;
  if (dateOfBirth)   teacher.dateOfBirth   = dateOfBirth;
  if (address)       teacher.address       = address;
  if (qualification) teacher.qualification = qualification;
  if (experience)    teacher.experience    = Number(experience);
  if (bio)           teacher.bio           = bio;
  if (branch)        teacher.branch        = branch;
  if (isActive !== undefined) teacher.isActive = isActive;

  if (subjects) {
    teacher.subjects = Array.isArray(subjects)
      ? subjects
      : subjects.split(',').map(s => s.trim());
  }
  if (classes) {
    teacher.classes = Array.isArray(classes)
      ? classes.map(Number)
      : classes.split(',').map(Number);
  }

  await teacher.save();
  res.json(new ApiResponse(200, teacher, 'Teacher updated'));
});

// DELETE teacher profile + user account
export const deleteTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) throw new ApiError(404, 'Teacher not found');

  // Delete photo from cloudinary
  if (teacher.photoPublicId) {
    await cloudinary.uploader.destroy(teacher.photoPublicId);
  }

  // Delete user account too
  await User.findByIdAndDelete(teacher.user);

  // Delete teacher profile
  await Teacher.findByIdAndDelete(req.params.id);

  res.json(new ApiResponse(200, {}, 'Teacher and account deleted'));
});

// GET teacher profile by logged in teacher
export const getMyProfile = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findOne({ user: req.user._id });
  if (!teacher) throw new ApiError(404, 'Profile not found');
  res.json(new ApiResponse(200, teacher, 'Profile fetched'));
});




export const resetTeacherPassword = asyncHandler(async (req, res) => {

  const { password } = req.body;

  if (!password || password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters");
  }

  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    throw new ApiError(404, "Teacher not found");
  }

  teacher.password = password;

  await teacher.save();

  return res.status(200).json(
    new ApiResponse(200, {}, "Password reset successfully")
  );

});