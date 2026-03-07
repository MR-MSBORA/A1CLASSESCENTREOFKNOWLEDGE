// // // import express from "express";

// // // import {
// // //   getStats,
// // //   getAllUsers,
// // //   deleteUser,
// // //   markAttendance,
// // //   addMarks,
// // //   createAnnouncement,
// // //   deleteAnnouncement,
// // //   createStaffAccount,
// // //   removeStaff,
// // // } from "../../controllers/admin.controller.js";

// // // import { protect } from "../../middleware/auth.middleware.js";
// // // import { authorize, superAdminOnly } from "../../middleware/role.middleware.js";

// // // import asyncHandler from "../../utils/asyncHandler.js";
// // // import ApiResponse from "../../utils/ApiResponse.js";
// // // import ApiError from "../../utils/ApiError.js";

// // // import Attendance from "../../models/Attendance.model.js";
// // // import Marks from "../../models/Marks.model.js";
// // // import Teacher from "../../models/Teacher.model.js";
// // // import User from "../../models/User.model.js";

// // // import bcrypt from "bcryptjs";

// // // const router = express.Router();


// // // /* =========================
// // //    BASE ADMIN MIDDLEWARE
// // // ========================= */

// // // router.use(protect, authorize("admin", "superadmin"));


// // // /* =========================
// // //    DASHBOARD
// // // ========================= */

// // // router.get("/stats", getStats);

// // // router.get("/users", getAllUsers);

// // // router.delete("/users/:id", deleteUser);


// // // /* =========================
// // //    ATTENDANCE
// // // ========================= */

// // // router.post("/attendance", markAttendance);


// // // // Get attendance with filters
// // // router.get(
// // //   "/attendance",
// // //   asyncHandler(async (req, res) => {

// // //     const { class: cls, date, subject, studentId } = req.query;

// // //     const filter = {};

// // //     if (cls) filter.class = Number(cls);
// // //     if (date) filter.date = date;
// // //     if (subject) filter.subject = subject;
// // //     if (studentId) filter.student = studentId;

// // //     const records = await Attendance.find(filter)
// // //       .populate("student", "name email class branch")
// // //       .sort({ date: -1 })
// // //       .limit(200);

// // //     res.json(new ApiResponse(200, records, "Attendance fetched"));

// // //   })
// // // );


// // // /* =========================
// // //    MARKS
// // // ========================= */

// // // router.post("/marks", addMarks);


// // // // Get marks with filters
// // // router.get(
// // //   "/marks",
// // //   asyncHandler(async (req, res) => {

// // //     const { class: cls, subject, exam, studentId } = req.query;

// // //     const filter = {};

// // //     if (subject) filter.subject = subject;
// // //     if (exam) filter.exam = exam;
// // //     if (studentId) filter.student = studentId;

// // //     let records = await Marks.find(filter)
// // //       .populate("student", "name email class branch")
// // //       .sort({ createdAt: -1 });

// // //     if (cls) {
// // //       records = records.filter(
// // //         (r) => String(r.student?.class) === String(cls)
// // //       );
// // //     }

// // //     res.json(new ApiResponse(200, records, "Marks fetched"));

// // //   })
// // // );


// // // /* =========================
// // //    RESET STAFF PASSWORD
// // // ========================= */

// // // router.patch(
// // //   "/staff/:id/reset-password",
// // //   superAdminOnly,
// // //   asyncHandler(async (req, res) => {

// // //     const { newPassword } = req.body;

// // //     console.log("Reset password called for:", req.params.id);
// // //     console.log("Password received:", !!newPassword);

// // //     if (!newPassword || newPassword.length < 6) {
// // //       throw new ApiError(400, "Password must be at least 6 characters");
// // //     }

// // //     const hashedPassword = await bcrypt.hash(newPassword, 10);

// // //     // Check teachers collection
// // //     let account = await Teacher.findById(req.params.id);

// // //     if (account) {

// // //       account.password = hashedPassword;
// // //       await account.save();

// // //       return res.json(
// // //         new ApiResponse(200, {}, "Teacher password reset successfully")
// // //       );
// // //     }

// // //     // Check users collection (admins)

// // //     account = await User.findById(req.params.id);

// // //     if (account) {

// // //       account.password = hashedPassword;
// // //       await account.save();

// // //       return res.json(
// // //         new ApiResponse(200, {}, "Admin password reset successfully")
// // //       );
// // //     }

// // //     throw new ApiError(404, "Staff member not found");

// // //   })
// // // );


// // // /* =========================
// // //    ANNOUNCEMENTS
// // // ========================= */

// // // router.post("/announcements", createAnnouncement);

// // // router.delete("/announcements/:id", deleteAnnouncement);


// // // /* =========================
// // //    SUPER ADMIN STAFF CONTROL
// // // ========================= */

// // // router.post("/staff", superAdminOnly, createStaffAccount);

// // // router.delete("/staff/:id", superAdminOnly, removeStaff);


// // // export default router;


// // import express from "express";

// // import {
// //   getStats,
// //   getAllUsers,
// //   deleteUser,
// //   markAttendance,
// //   addMarks,
// //   createAnnouncement,
// //   deleteAnnouncement,
// //   createStaffAccount,
// //   removeStaff,
// // } from "../../controllers/admin.controller.js";

// // import { protect } from "../../middleware/auth.middleware.js";
// // import { authorize, superAdminOnly } from "../../middleware/role.middleware.js";

// // import asyncHandler from "../../utils/asyncHandler.js";
// // import ApiResponse from "../../utils/ApiResponse.js";
// // import ApiError from "../../utils/ApiError.js";

// // import Attendance from "../../models/Attendance.model.js";
// // import Marks from "../../models/Marks.model.js";
// // import Teacher from "../../models/Teacher.model.js";
// // import User from "../../models/User.model.js";

// // import bcrypt from "bcryptjs";

// // const router = express.Router();

// // /* =========================
// //    BASE ADMIN MIDDLEWARE
// // ========================= */

// // router.use(protect, authorize("admin", "superadmin"));

// // /* =========================
// //    DASHBOARD
// // ========================= */

// // router.get("/stats", getStats);

// // router.get("/users", getAllUsers);

// // router.delete("/users/:id", deleteUser);

// // /* =========================
// //    ATTENDANCE
// // ========================= */

// // router.post("/attendance", markAttendance);

// // // Get attendance with filters
// // router.get(
// //   "/attendance",
// //   asyncHandler(async (req, res, next) => {
// //     const { class: cls, date, subject, studentId } = req.query;

// //     const filter = {};

// //     if (cls) filter.class = Number(cls);
// //     if (date) filter.date = date;
// //     if (subject) filter.subject = subject;
// //     if (studentId) filter.student = studentId;

// //     const records = await Attendance.find(filter)
// //       .populate("student", "name email class branch")
// //       .sort({ date: -1 })
// //       .limit(200);

// //     res.json(new ApiResponse(200, records, "Attendance fetched"));
// //   })
// // );

// // /* =========================
// //    MARKS
// // ========================= */

// // router.post("/marks", addMarks);

// // // Get marks with filters
// // router.get(
// //   "/marks",
// //   asyncHandler(async (req, res, next) => {
// //     const { class: cls, subject, exam, studentId } = req.query;

// //     const filter = {};

// //     if (subject) filter.subject = subject;
// //     if (exam) filter.exam = exam;
// //     if (studentId) filter.student = studentId;

// //     let records = await Marks.find(filter)
// //       .populate("student", "name email class branch")
// //       .sort({ createdAt: -1 });

// //     if (cls) {
// //       records = records.filter(
// //         (r) => String(r.student?.class) === String(cls)
// //       );
// //     }

// //     res.json(new ApiResponse(200, records, "Marks fetched"));
// //   })
// // );

// // /* =========================
// //    RESET STAFF PASSWORD
// // ========================= */

// // // router.patch(
// // //   "/staff/:id/reset-password",
// // //   superAdminOnly,
// // //   asyncHandler(async (req, res, next) => {
// // //     const { newPassword } = req.body;

// // //     console.log("Reset password called for:", req.params.id);
// // //     console.log("Password received:", !!newPassword);

// // //     if (!newPassword || newPassword.length < 6) {
// // //       throw new ApiError(400, "Password must be at least 6 characters");
// // //     }

// // //     const hashedPassword = await bcrypt.hash(newPassword, 10);

// // //     // Check teachers collection
// // //     let account = await Teacher.findById(req.params.id);

// // //     if (account) {
// // //       account.password = hashedPassword;
// // //       await account.save();

// // //       return res.json(
// // //         new ApiResponse(200, {}, "Teacher password reset successfully")
// // //       );
// // //     }

// // //     // Check admins in users collection
// // //     account = await User.findById(req.params.id);

// // //     if (account) {
// // //       account.password = hashedPassword;
// // //       await account.save();

// // //       return res.json(
// // //         new ApiResponse(200, {}, "Admin password reset successfully")
// // //       );
// // //     }

// // //     throw new ApiError(404, "Staff member not found");
// // //   })
// // // );

// // router.patch('/staff/:id/reset-password', async (req, res) => {
// //   try {
// //     if (req.user?.role !== 'superadmin') {
// //       return res.status(403).json({ success: false, message: 'Super Admin only' });
// //     }

// //     const { newPassword } = req.body;

// //     if (!newPassword || newPassword.length < 6) {
// //       return res.status(400).json({ success: false, message: 'Min 6 characters' });
// //     }

// //     // Check teachers first
// //     const Teacher = (await import('../../models/Teacher.model.js')).default;
// //     const User    = (await import('../../models/User.model.js')).default;

// //     let account = await Teacher.findById(req.params.id);
// //     if (account) {
// //       account.password = newPassword;
// //       await account.save({ validateBeforeSave: false });
// //       return res.status(200).json({ success: true, message: 'Password reset ✅' });
// //     }

// //     account = await User.findById(req.params.id);
// //     if (account) {
// //       account.password = newPassword;
// //       await account.save({ validateBeforeSave: false });
// //       return res.status(200).json({ success: true, message: 'Password reset ✅' });
// //     }

// //     return res.status(404).json({ success: false, message: 'Staff not found' });

// //   } catch (err) {
// //     console.error('RESET ERROR:', err.message);
// //     return res.status(500).json({ success: false, message: err.message });
// //   }
// // });



// // /* =========================
// //    ANNOUNCEMENTS
// // ========================= */

// // router.post("/announcements", createAnnouncement);

// // router.delete("/announcements/:id", deleteAnnouncement);

// // /* =========================
// //    SUPER ADMIN STAFF CONTROL
// // ========================= */

// // router.post("/staff", superAdminOnly, createStaffAccount);

// // router.delete("/staff/:id", superAdminOnly, removeStaff);

// // export default router;



// import express from "express";

// import {
//   getStats,
//   getAllUsers,
//   deleteUser,
//   markAttendance,
//   addMarks,
//   createAnnouncement,
//   deleteAnnouncement,
//   createStaffAccount,
//   removeStaff,
// } from "../../controllers/admin.controller.js";

// import { protect } from "../../middleware/auth.middleware.js";
// import { authorize, superAdminOnly } from "../../middleware/role.middleware.js";

// import asyncHandler from "../../utils/asyncHandler.js";
// import ApiResponse from "../../utils/ApiResponse.js";
// import ApiError from "../../utils/ApiError.js";

// import Attendance from "../../models/Attendance.model.js";
// import Marks from "../../models/Marks.model.js";
// import Teacher from "../../models/Teacher.model.js";
// import User from "../../models/User.model.js";

// const router = express.Router();


// /* =========================
//    BASE ADMIN MIDDLEWARE
// ========================= */

// router.use(protect, authorize("admin", "superadmin","teacher"));


// /* =========================
//    DASHBOARD
// ========================= */

// router.get("/stats", getStats);

// router.get("/users", getAllUsers);

// router.delete("/users/:id", deleteUser);


// /* =========================
//    ATTENDANCE
// ========================= */

// router.post("/attendance", markAttendance);

// router.get(
//   "/attendance",
//   asyncHandler(async (req, res) => {

//     const { class: cls, date, subject, studentId } = req.query;

//     const filter = {};

//     if (cls) filter.class = Number(cls);
//     if (date) filter.date = date;
//     if (subject) filter.subject = subject;
//     if (studentId) filter.student = studentId;

//     const records = await Attendance.find(filter)
//       .populate("student", "name email class branch")
//       .sort({ date: -1 })
//       .limit(200);

//     res.json(new ApiResponse(200, records, "Attendance fetched"));

//   })
// );


// /* =========================
//    MARKS
// ========================= */

// router.post("/marks", addMarks);

// router.get(
//   "/marks",
//   asyncHandler(async (req, res) => {

//     const { class: cls, subject, exam, studentId } = req.query;

//     const filter = {};

//     if (subject) filter.subject = subject;
//     if (exam) filter.exam = exam;
//     if (studentId) filter.student = studentId;

//     let records = await Marks.find(filter)
//       .populate("student", "name email class branch")
//       .sort({ createdAt: -1 });

//     if (cls) {
//       records = records.filter(
//         (r) => String(r.student?.class) === String(cls)
//       );
//     }

//     res.json(new ApiResponse(200, records, "Marks fetched"));

//   })
// );


// /* =========================
//    RESET STAFF PASSWORD
// ========================= */

// router.patch(
//   "/staff/:id/reset-password",
//   superAdminOnly,
//   asyncHandler(async (req, res) => {

//     const { newPassword } = req.body;

//     console.log("Reset password called for:", req.params.id);

//     if (!newPassword || newPassword.length < 6) {
//       throw new ApiError(400, "Password must be at least 6 characters");
//     }

//     // Check teacher account
//     let account = await Teacher.findById(req.params.id);

//     if (account) {
//       account.password = newPassword;
//       await account.save();

//       return res.json(
//         new ApiResponse(200, {}, "Teacher password reset successfully")
//       );
//     }

//     // Check admin account
//     account = await User.findById(req.params.id);

//     if (account) {
//       account.password = newPassword;
//       await account.save();

//       return res.json(
//         new ApiResponse(200, {}, "Admin password reset successfully")
//       );
//     }

//     throw new ApiError(404, "Staff member not found");

//   })
// );


// /* =========================
//    ANNOUNCEMENTS
// ========================= */

// router.post("/announcements", createAnnouncement);

// router.delete("/announcements/:id", deleteAnnouncement);


// /* =========================
//    SUPER ADMIN STAFF CONTROL
// ========================= */

// router.post("/staff", superAdminOnly, createStaffAccount);

// router.delete("/staff/:id", superAdminOnly, removeStaff);


// export default router;


import express from "express";

import {
  getStats,
  deleteUser,
  markAttendance,
  addMarks,
  createAnnouncement,
  deleteAnnouncement,
  createStaffAccount,
  removeStaff,
} from "../../controllers/admin.controller.js";

import { protect } from "../../middleware/auth.middleware.js";
import {
  authorize,
  superAdminOnly,
  teacherStudentAccess,
} from "../../middleware/role.middleware.js";

import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import Attendance from "../../models/Attendance.model.js";
import Marks from "../../models/Marks.model.js";
import User from "../../models/User.model.js";

const router = express.Router();

/* =========================
   BASE ACCESS
========================= */

router.use(protect, authorize("admin", "superadmin", "teacher"));

/* =========================
   DASHBOARD
========================= */

router.get("/stats", getStats);

/* =========================
   USERS (Teacher Restricted)
========================= */

router.get(
  "/users",
  teacherStudentAccess,
  asyncHandler(async (req, res) => {
    const users = await User.find(req.filter);
    res.json(new ApiResponse(200, users, "Users fetched"));
  })
);

router.delete(
  "/users/:id",
  authorize("admin", "superadmin"),
  deleteUser
);

/* =========================
   ATTENDANCE
========================= */

router.post("/attendance", markAttendance);

router.get(
  "/attendance",
  asyncHandler(async (req, res) => {
    const records = await Attendance.find()
      .populate("student")
      .sort({ date: -1 });

    res.json(new ApiResponse(200, records, "Attendance fetched"));
  })
);

/* =========================
   MARKS
========================= */

router.post("/marks", addMarks);

router.get(
  "/marks",
  asyncHandler(async (req, res) => {
    const records = await Marks.find()
      .populate("student")
      .sort({ createdAt: -1 });

    res.json(new ApiResponse(200, records, "Marks fetched"));
  })
);

/* =========================
   ANNOUNCEMENTS
========================= */

router.post("/announcements", createAnnouncement);
router.delete("/announcements/:id", deleteAnnouncement);

/* =========================
   SUPER ADMIN ONLY
========================= */

router.post("/staff", superAdminOnly, createStaffAccount);
router.delete("/staff/:id", superAdminOnly, removeStaff);

export default router;