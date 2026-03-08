import crypto from "crypto";
import User from "../models/User.model.js";
import Teacher from "../models/Teacher.model.js";
import Otp from "../models/Otp.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendOtpEmail } from "../utils/email.util.js";

/* ===============================
   STEP 1 — Send OTP to email
   POST /api/v1/auth/forgot-password
   Body: { email }
================================ */
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new ApiError(400, "Email is required");

  // Check both collections
  const userExists =
    (await User.findOne({ email })) ||
    (await Teacher.findOne({ email }));

  if (!userExists) throw new ApiError(404, "No account found with this email");

  // Generate 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();

  // Delete any existing OTP for this email
  await Otp.deleteMany({ email });

  // Save new OTP (expires in 10 min — handled by model)
  await Otp.create({ email, otp });

  // Send email
  await sendOtpEmail(email, otp);

  res.json(new ApiResponse(200, {}, "OTP sent to your email"));
});


/* ===============================
   STEP 2 — Verify OTP
   POST /api/v1/auth/verify-otp
   Body: { email, otp }
================================ */
export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) throw new ApiError(400, "Email and OTP are required");

  const record = await Otp.findOne({ email });

  if (!record) throw new ApiError(400, "OTP expired or not found. Request a new one.");
  if (record.otp !== otp) throw new ApiError(400, "Incorrect OTP");

  res.json(new ApiResponse(200, {}, "OTP verified successfully"));
});


/* ===============================
   STEP 3 — Reset Password
   POST /api/v1/auth/reset-password
   Body: { email, otp, newPassword, confirmPassword }
================================ */
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword, confirmPassword } = req.body;

  if (!email || !otp || !newPassword || !confirmPassword)
    throw new ApiError(400, "All fields are required");

  if (newPassword !== confirmPassword)
    throw new ApiError(400, "Passwords do not match");

  if (newPassword.length < 6)
    throw new ApiError(400, "Password must be at least 6 characters");

  // Re-verify OTP before allowing reset
  const record = await Otp.findOne({ email });
  if (!record) throw new ApiError(400, "OTP expired. Please start again.");
  if (record.otp !== otp) throw new ApiError(400, "Invalid OTP");

  // Find account in User or Teacher collection
  let account = await User.findOne({ email }).select("+password");
  if (!account) {
    account = await Teacher.findOne({ email }).select("+password");
  }
  if (!account) throw new ApiError(404, "Account not found");

  // Update password — pre-save hook will hash it
  account.password = newPassword;
  await account.save({ validateBeforeSave: false });

  // Delete OTP after successful reset
  await Otp.deleteMany({ email });

  res.json(new ApiResponse(200, {}, "Password reset successfully. You can now login."));
});