import express from "express";

import {
  getStats,
  getAllUsers,
  deleteUser,
  markAttendance,
  addMarks,
  createAnnouncement,
  deleteAnnouncement,
  createStaffAccount,
  removeStaff,
} from "../../controllers/admin.controller.js";

import { protect } from "../../middleware/auth.middleware.js";
import { authorize, superAdminOnly } from "../../middleware/role.middleware.js";

import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";

import Attendance from "../../models/Attendance.model.js";
import Marks from "../../models/Marks.model.js";
import Teacher from "../../models/Teacher.model.js";
import User from "../../models/User.model.js";

const router = express.Router();

/* =========================
   BASE ADMIN MIDDLEWARE
========================= */

router.use(protect, authorize("admin", "superadmin", "teacher"));

/* =========================
   DASHBOARD
========================= */

router.get("/stats", getStats);

router.get("/users", getAllUsers);

router.delete("/users/:id", deleteUser);

/* =========================
   ATTENDANCE
========================= */

router.post("/attendance", markAttendance);

router.get(
  "/attendance",
  asyncHandler(async (req, res) => {
    const { class: cls, date, subject, studentId } = req.query;

    const filter = {};

    if (cls) filter.class = Number(cls);
    if (date) filter.date = date;
    if (subject) filter.subject = subject;
    if (studentId) filter.student = studentId;

    const records = await Attendance.find(filter)
      .populate("student", "name email class branch")
      .sort({ date: -1 })
      .limit(200);

    res.json(new ApiResponse(200, records, "Attendance fetched"));
  }),
);

/* =========================
   MARKS
========================= */

router.post("/marks", addMarks);

router.get(
  "/marks",
  asyncHandler(async (req, res) => {
    const { class: cls, subject, exam, studentId } = req.query;

    const filter = {};

    if (subject) filter.subject = subject;
    if (exam) filter.exam = exam;
    if (studentId) filter.student = studentId;

    let records = await Marks.find(filter)
      .populate("student", "name email class branch")
      .sort({ createdAt: -1 });

    if (cls) {
      records = records.filter((r) => String(r.student?.class) === String(cls));
    }

    res.json(new ApiResponse(200, records, "Marks fetched"));
  }),
);

/* =========================
   RESET STAFF PASSWORD
========================= */

router.patch(
  "/staff/:id/reset-password",
  superAdminOnly,
  asyncHandler(async (req, res) => {
    const { newPassword } = req.body;

    console.log("Reset password called for:", req.params.id);

    if (!newPassword || newPassword.length < 6) {
      throw new ApiError(400, "Password must be at least 6 characters");
    }

    // Check teacher account
    let account = await Teacher.findById(req.params.id);

    if (account) {
      account.password = newPassword;
      await account.save();

      return res.json(
        new ApiResponse(200, {}, "Teacher password reset successfully"),
      );
    }

    // Check admin account
    account = await User.findById(req.params.id);

    if (account) {
      account.password = newPassword;
      await account.save();

      return res.json(
        new ApiResponse(200, {}, "Admin password reset successfully"),
      );
    }

    throw new ApiError(404, "Staff member not found");
  }),
);

// Enroll / unenroll student
router.patch(
  "/users/:id/enroll",
  asyncHandler(async (req, res) => {
    const { isEnrolled, feeStatus, enrolledBatch } = req.body;

    const update = { isEnrolled };
    if (isEnrolled) {
      update.enrolledDate = new Date();
      update.enrolledBatch = enrolledBatch || "";
      update.feeStatus = feeStatus || "paid";
    } else {
      update.enrolledDate = null;
      update.enrolledBatch = "";
      update.feeStatus = "unpaid";
    }

    const user = await User.findByIdAndUpdate(req.params.id, update, {
      new: true,
    }).select("-password -refreshToken");

    if (!user) throw new ApiError(404, "Student not found");

    res.json(
      new ApiResponse(
        200,
        user,
        isEnrolled ? "Student enrolled ✅" : "Enrollment removed",
      ),
    );
  }),
);

// Update fee status only
router.patch('/users/:id/fee-status', asyncHandler(async (req, res) => {
  const { feeStatus } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { feeStatus },
    { new: true }
  ).select('-password -refreshToken');

  if (!user) throw new ApiError(404, 'Student not found');
  res.json(new ApiResponse(200, user, 'Fee status updated'));
}));

/* =========================
   ANNOUNCEMENTS
========================= */

router.post("/announcements", createAnnouncement);

router.delete("/announcements/:id", deleteAnnouncement);

/* =========================
   SUPER ADMIN STAFF CONTROL
========================= */

router.post("/staff", superAdminOnly, createStaffAccount);

router.delete("/staff/:id", superAdminOnly, removeStaff);


export default router;
