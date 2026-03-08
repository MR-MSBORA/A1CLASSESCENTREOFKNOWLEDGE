import jwt         from 'jsonwebtoken';
import User        from '../models/User.model.js';
import Teacher     from '../models/Teacher.model.js';
import ApiError    from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token = null;

  // Check Authorization header first
  if (req.headers?.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Fallback to cookie
  if (!token && req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) throw new ApiError(401, 'Unauthorized — no token');

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch {
    throw new ApiError(401, 'Invalid or expired token');
  }

  // Check teacher collection
  if (decoded.role === 'teacher') {
    const teacher = await Teacher
      .findById(decoded._id)
      .select('-password -refreshToken');
    if (!teacher)          throw new ApiError(401, 'Teacher not found');
    if (!teacher.isActive) throw new ApiError(403, 'Account deactivated');
    req.user = teacher;
    return next();
  }

  // Check users collection
  // decoded.userId from generateToken.js utility
  const id   = decoded.userId || decoded._id;
  const user = await User
    .findById(id)
    .select('-password -refreshToken');

  if (!user) throw new ApiError(401, 'User not found');
  req.user = user;
  next();
});