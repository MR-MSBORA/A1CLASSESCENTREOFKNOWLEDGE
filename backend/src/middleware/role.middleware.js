
// import ApiError from '../utils/ApiError.js';

// // General role check — pass allowed roles
// export const authorize = (...roles) => (req, res, next) => {
//   // superadmin can access everything
//   if (req.user.role === 'superadmin') return next();

//   if (!roles.includes(req.user.role))
//     throw new ApiError(403, 'Access denied');
//   next();
// };

// // Only superadmin
// export const superAdminOnly = (req, res, next) => {
//   if (req.user?.role !== 'superadmin')
//     throw new ApiError(403, 'Super Admin only');
//   next();
// };

// middleware/role.middleware.js
import ApiError from "../utils/ApiError.js";
import User from "../models/User.model.js";

/**
 * General role-based authorization
 * @param  {...string} roles - allowed roles (admin, teacher, etc.)
 */
export const authorize = (...roles) => (req, res, next) => {
  try {
    // superadmin can access everything
    if (req.user.role === "superadmin") return next();

    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "Access denied");
    }

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Superadmin-only access
 */
export const superAdminOnly = (req, res, next) => {
  try {
    if (req.user?.role !== "superadmin") {
      throw new ApiError(403, "Super Admin only");
    }
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Teacher-student access filter
 * This adds `req.filter` to be used in controllers
 * Admin sees all students, teacher sees only their class students
 */
export const teacherStudentAccess = async (req, res, next) => {
  try {
    // admin can access everything
    if (req.user.role === "admin" || req.user.role === "superadmin") {
      req.filter = {}; // no restrictions
      return next();
    }

    // teacher can only access their class students
    if (req.user.role === "teacher") {
      // Make sure teacher has classAssigned in DB
      if (!req.user.classAssigned) {
        throw new ApiError(403, "Teacher has no assigned class");
      }

      req.filter = { role: "student", class: req.user.classAssigned };
      return next();
    }

    // other roles cannot access
    throw new ApiError(403, "Access denied");
  } catch (error) {
    next(error);
  }
};