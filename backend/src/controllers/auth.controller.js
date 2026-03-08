// import User from "../models/User.model.js";
// import Teacher from "../models/Teacher.model.js";

// import ApiError from "../utils/ApiError.js";
// import ApiResponse from "../utils/ApiResponse.js";
// import asyncHandler from "../utils/asyncHandler.js";

// import {
//   generateAccessToken,
//   generateRefreshToken,
// } from "../utils/generateToken.js";

// import { registerSchema, loginSchema } from "../validators/auth.validator.js";
// import jwt from "jsonwebtoken";

// const cookieOpts = {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//   maxAge: 7 * 24 * 60 * 60 * 1000,
// };

// /* ===============================
//    REGISTER
// ================================ */
// export const register = asyncHandler(async (req, res) => {
//   const { error } = registerSchema.validate(req.body);
//   if (error) throw new ApiError(400, error.details[0].message);

//   const exists = await User.findOne({ email: req.body.email });
//   if (exists) throw new ApiError(400, "Email already registered");

//   const user = await User.create(req.body);

//   const accessToken = generateAccessToken(user._id, user.role);
//   const refreshToken = generateRefreshToken(user._id);

//   user.refreshToken = refreshToken;
//   await user.save({ validateBeforeSave: false });

//   res
//     .status(201)
//     .cookie("refreshToken", refreshToken, {
//       ...cookieOpts,
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     })
//     .json(
//       new ApiResponse(
//         201,
//         {
//           user: {
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             role: user.role,
//             class: user.class || null,
//           },
//           accessToken,
//         },
//         "Registered successfully",
//       ),
//     );
// });

// /* ===============================
//    LOGIN
// ================================ */
// export const login = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password)
//     throw new ApiError(400, "Email and password are required");

//   // Step 1 — check teachers collection first
//   let account = await Teacher.findOne({ email }).select("+password");
//   let isTeacher = !!account;

//   // Step 2 — if not teacher, check users collection
//   if (!account) {
//     account = await User.findOne({ email }).select("+password");
//   }

//   // Step 3 — not found in either
//   if (!account) throw new ApiError(404, "No account found with this email");

//   // Step 4 — teacher active check
//   if (isTeacher && !account.isActive)
//     throw new ApiError(
//       403,
//       "Your account has been deactivated. Contact admin.",
//     );

//   // Step 5 — compare password
//   const isMatch = await account.comparePassword(password);
//   if (!isMatch) throw new ApiError(401, "Incorrect password");

//   // Step 6 — generate tokens
//   let accessToken, refreshToken;

//   if (isTeacher) {
//     // Teacher model has built-in methods
//     accessToken = account.generateAccessToken();
//     refreshToken = account.generateRefreshToken();
//   } else {
//     // Users use utility functions
//     accessToken = generateAccessToken(account._id, account.role);
//     refreshToken = generateRefreshToken(account._id);
//   }

//   // Step 7 — save refresh token
//   account.refreshToken = refreshToken;
//   await account.save({ validateBeforeSave: false });

//   // Step 8 — send response
//   res
//     .status(200)
//     .cookie("refreshToken", refreshToken, {
//       ...cookieOpts,
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     })
//     .json(
//       new ApiResponse(
//         200,
//         {
//           user: {
//             _id: account._id,
//             name: account.name,
//             email: account.email,
//             role: isTeacher ? "teacher" : account.role,
//             class: account.class || null,
//           },
//           accessToken,
//         },
//         "Login successful",
//       ),
//     );
// });

// /* ===============================
//    LOGOUT
// ================================ */
// export const logout = asyncHandler(async (req, res) => {
//   if (!req.user) {
//     return res
//       .clearCookie("refreshToken")
//       .clearCookie("accessToken")
//       .json(new ApiResponse(200, {}, "Logged out"));
//   }

//   // Clear refresh token from correct collection
//   if (req.user.role === "teacher") {
//     await Teacher.findByIdAndUpdate(req.user._id, { refreshToken: "" });
//   } else {
//     await User.findByIdAndUpdate(req.user._id, { refreshToken: "" });
//   }

//   res
//     .clearCookie("refreshToken")
//     .clearCookie("accessToken")
//     .json(new ApiResponse(200, {}, "Logged out"));
// });

// /* ===============================
//    REFRESH TOKEN
// ================================ */
// export const refreshAccessToken = asyncHandler(async (req, res) => {
//   const token = req.cookies?.refreshToken;
//   if (!token) throw new ApiError(401, "No refresh token");

//   let decoded;
//   try {
//     decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
//   } catch {
//     throw new ApiError(401, "Invalid or expired refresh token");
//   }

//   // decoded.userId (utility) OR decoded._id (Teacher method)
//   const id = decoded.userId || decoded._id;

//   // Check teachers first
//   let account = await Teacher.findById(id).select("+refreshToken");
//   let isTeacher = !!account;

//   if (!account) {
//     account = await User.findById(id).select("+refreshToken");
//   }

//   if (!account) throw new ApiError(401, "Account not found");

//   if (account.refreshToken !== token)
//     throw new ApiError(401, "Refresh token mismatch — please login again");

//   // Generate new access token
//   const accessToken = isTeacher
//     ? account.generateAccessToken()
//     : generateAccessToken(account._id, account.role);

//   res.json(new ApiResponse(200, { accessToken }, "Token refreshed"));
// });

// /* ===============================
//    GET CURRENT USER
// ================================ */
// export const getMe = asyncHandler(async (req, res) => {
//   // req.user is already set by protect middleware
//   const data = {
//     _id: req.user._id,
//     name: req.user.name,
//     email: req.user.email,
//     role: req.user.role,
//     class: req.user.class || null,
//   };
//   res.json(new ApiResponse(200, data, "User fetched"));
// });


import User from "../models/User.model.js";
import Teacher from "../models/Teacher.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";

import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import jwt from "jsonwebtoken";

const cookieOpts = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

/* ===============================
   REGISTER
================================ */
export const register = asyncHandler(async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) throw new ApiError(400, error.details[0].message);

  const exists = await User.findOne({ email: req.body.email });
  if (exists) throw new ApiError(400, "Email already registered");

  const user = await User.create(req.body);

  const accessToken = generateAccessToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  res
    .status(201)
    .cookie("refreshToken", refreshToken, {
      ...cookieOpts,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json(
      new ApiResponse(
        201,
        {
          user: {
            _id:        user._id,
            name:       user.name,
            email:      user.email,
            role:       user.role,
            class:      user.class || null,
            isEnrolled: user.isEnrolled,
            feeStatus:  user.feeStatus,
          },
          accessToken,
        },
        "Registered successfully",
      ),
    );
});

/* ===============================
   LOGIN
================================ */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new ApiError(400, "Email and password are required");

  // Step 1 — check teachers collection first
  let account = await Teacher.findOne({ email }).select("+password");
  let isTeacher = !!account;

  // Step 2 — if not teacher, check users collection
  if (!account) {
    account = await User.findOne({ email }).select("+password");
  }

  // Step 3 — not found in either
  if (!account) throw new ApiError(404, "No account found with this email");

  // Step 4 — teacher active check
  if (isTeacher && !account.isActive)
    throw new ApiError(403, "Your account has been deactivated. Contact admin.");

  // Step 5 — compare password
  const isMatch = await account.comparePassword(password);
  if (!isMatch) throw new ApiError(401, "Incorrect password");

  // Step 6 — generate tokens
  let accessToken, refreshToken;

  if (isTeacher) {
    accessToken  = account.generateAccessToken();
    refreshToken = account.generateRefreshToken();
  } else {
    accessToken  = generateAccessToken(account._id, account.role);
    refreshToken = generateRefreshToken(account._id);
  }

  // Step 7 — save refresh token
  account.refreshToken = refreshToken;
  await account.save({ validateBeforeSave: false });

  // Step 8 — send response
  res
    .status(200)
    .cookie("refreshToken", refreshToken, {
      ...cookieOpts,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json(
      new ApiResponse(
        200,
        {
          user: {
            _id:        account._id,
            name:       account.name,
            email:      account.email,
            role:       isTeacher ? "teacher" : account.role,
            class:      account.class || null,
            isEnrolled: account.isEnrolled || false,
            feeStatus:  account.feeStatus  || null,
          },
          accessToken,
        },
        "Login successful",
      ),
    );
});

/* ===============================
   LOGOUT
================================ */
export const logout = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res
      .clearCookie("refreshToken")
      .clearCookie("accessToken")
      .json(new ApiResponse(200, {}, "Logged out"));
  }

  if (req.user.role === "teacher") {
    await Teacher.findByIdAndUpdate(req.user._id, { refreshToken: "" });
  } else {
    await User.findByIdAndUpdate(req.user._id, { refreshToken: "" });
  }

  res
    .clearCookie("refreshToken")
    .clearCookie("accessToken")
    .json(new ApiResponse(200, {}, "Logged out"));
});

/* ===============================
   REFRESH TOKEN
================================ */
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) throw new ApiError(401, "No refresh token");

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const id = decoded.userId || decoded._id;

  let account = await Teacher.findById(id).select("+refreshToken");
  let isTeacher = !!account;

  if (!account) {
    account = await User.findById(id).select("+refreshToken");
  }

  if (!account) throw new ApiError(401, "Account not found");

  if (account.refreshToken !== token)
    throw new ApiError(401, "Refresh token mismatch — please login again");

  const accessToken = isTeacher
    ? account.generateAccessToken()
    : generateAccessToken(account._id, account.role);

  res.json(new ApiResponse(200, { accessToken }, "Token refreshed"));
});

/* ===============================
   GET CURRENT USER
================================ */
export const getMe = asyncHandler(async (req, res) => {

  // Re-fetch from DB to always get latest data (enrollment status etc.)
  let fresh;
  if (req.user.role === "teacher") {
    fresh = await Teacher.findById(req.user._id);
  } else {
    fresh = await User.findById(req.user._id);
  }

  if (!fresh) throw new ApiError(404, "User not found");

  const data = {
    _id:           fresh._id,
    name:          fresh.name,
    email:         fresh.email,
    role:          fresh.role,
    class:         fresh.class  || null,
    branch:        fresh.branch || null,
    phone:         fresh.phone  || null,
    avatar:        fresh.avatar || null,
    isEnrolled:    fresh.isEnrolled    || false,   // ✅ added
    feeStatus:     fresh.feeStatus     || null,    // ✅ added
    enrolledBatch: fresh.enrolledBatch || null,    // ✅ added
  };

  res.json(new ApiResponse(200, data, "User fetched"));
});