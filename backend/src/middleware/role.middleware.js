
import ApiError from '../utils/ApiError.js';

// General role check — pass allowed roles
export const authorize = (...roles) => (req, res, next) => {
  // superadmin can access everything
  if (req.user.role === 'superadmin') return next();

  if (!roles.includes(req.user.role))
    throw new ApiError(403, 'Access denied');
  next();
};

// Only superadmin
export const superAdminOnly = (req, res, next) => {
  if (req.user?.role !== 'superadmin')
    throw new ApiError(403, 'Super Admin only');
  next();
};