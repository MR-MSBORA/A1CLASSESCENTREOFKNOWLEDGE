// import express from 'express';
// import { register, login, logout, refreshAccessToken, getMe } from '../../controllers/auth.controller.js';
// import { forgotPassword, verifyOtp, resetPassword } from '../../controllers/password.controller.js';
// import { protect } from '../../middleware/auth.middleware.js';
// const router = express.Router();

// // Existing routes
// router.post('/register', register);
// router.post('/login', login);
// router.post('/logout', protect, logout);
// router.post('/refresh', refreshAccessToken);
// router.get('/me', protect, getMe);

// // Forgot password — 3 step flow
// router.post('/forgot-password', forgotPassword);  // Step 1: send OTP
// router.post('/verify-otp', verifyOtp);            // Step 2: verify OTP
// router.post('/reset-password', resetPassword);    // Step 3: set new password

// export default router;



import express from 'express';
import {
  register,
  login,
  logout,
  refreshAccessToken,
  getMe
} from '../../controllers/auth.controller.js';

import {
  forgotPassword,
  verifyOtp,
  resetPassword
} from '../../controllers/password.controller.js';

import { protect } from '../../middleware/auth.middleware.js';

const router = express.Router();

// Existing routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);
router.post('/refresh', refreshAccessToken);
router.get('/me', protect, getMe);

// Forgot password — 3 step flow
router.post('/forgot-password', forgotPassword);  // ✅ FIXED
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

export default router;