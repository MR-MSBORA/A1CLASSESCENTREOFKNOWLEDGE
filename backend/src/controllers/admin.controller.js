// import User from "../models/User.model.js";
// import Note from "../models/Note.model.js";
// import Payment from "../models/Payment.model.js";
// import Attendance from "../models/Attendance.model.js";
// import Marks from "../models/Marks.model.js";
// import Announcement from "../models/Announcement.model.js";
// import ApiResponse from "../utils/ApiResponse.js";
// import asyncHandler from "../utils/asyncHandler.js";
// import ApiError from "../utils/ApiError.js";
// import Teacher from "../models/Teacher.model.js";


// export const getStats = asyncHandler(async (req, res) => {
//   const [totalStudents, totalNotes, payments] = await Promise.all([
//     User.countDocuments({ role: "student" }),
//     Note.countDocuments(),
//     Payment.find({ status: "success" }),
//   ]);
//   res.json(
//     new ApiResponse(200, {
//       totalStudents,
//       totalNotes,
//       totalRevenue: payments.reduce((s, p) => s + p.amount, 0),
//       totalPayments: payments.length,
//     }),
//   );
// });

// // export const getAllUsers = asyncHandler(async (req, res) => {
// //   const { role } = req.query;
// //   const users = await User.find(role ? { role } : {}).select('-password -refreshToken');
// //   res.json(new ApiResponse(200, { users }));
// // });

// export const getAllUsers = asyncHandler(async (req, res) => {
//   const { role } = req.query;
//   const filter = role ? { role } : {};
//   const users = await User.find(filter).select("-password -refreshToken");
//   res.json(new ApiResponse(200, users, "Users fetched"));
// });

// export const deleteUser = asyncHandler(async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json(new ApiResponse(200, {}, "User deleted"));
// });

// // export const markAttendance = asyncHandler(async (req, res) => {
// //   const records = await Attendance.insertMany(
// //     req.body.records.map((r) => ({ ...r, markedBy: req.user._id })),
// //   );
// //   res.status(201).json(new ApiResponse(201, records, "Attendance marked"));
// // });

// export const markAttendance = asyncHandler(async (req, res) => {
//   const { records } = req.body;

//   if (!records || !Array.isArray(records) || records.length === 0)
//     throw new ApiError(400, 'No attendance records provided');

//   const isTeacher    = req.user.role === 'teacher';
//   const teacherClasses = req.user.classes || [];
//   const teacherBranch  = req.user.branch;

//   const saved = [];
//   const skipped = [];

//   for (const record of records) {
//     const { student, date, status, subject, class: cls } = record;

//     // If teacher — validate they teach this class/branch
//     if (isTeacher) {
//       // Check class is assigned to this teacher
//       if (teacherClasses.length > 0 && !teacherClasses.includes(Number(cls))) {
//         skipped.push({ student, reason: `Not assigned to Class ${cls}` });
//         continue;
//       }
//       // Check branch matches
//       if (teacherBranch && teacherBranch !== 'All') {
//         const studentDoc = await User.findById(student);
//         if (studentDoc?.branch && studentDoc.branch !== teacherBranch) {
//           skipped.push({ student, reason: 'Different branch' });
//           continue;
//         }
//       }
//     }

//     // Save attendance
//     const existing = await Attendance.findOne({ student, date, subject });
//     if (existing) {
//       existing.status = status;
//       await existing.save();
//     } else {
//       await Attendance.create({ student, date, status, subject, class: cls });
//     }
//     saved.push(student);
//   }

//   res.json(new ApiResponse(200, {
//     saved:   saved.length,
//     skipped: skipped.length,
//     skippedDetails: skipped,
//   }, `Attendance saved for ${saved.length} students`));
// });

// export const addMarks = asyncHandler(async (req, res) => {
//   const marks = await Marks.create({ ...req.body, enteredBy: req.user._id });
//   res.status(201).json(new ApiResponse(201, marks, "Marks added"));
// });

// export const createAnnouncement = asyncHandler(async (req, res) => {
//   const ann = await Announcement.create({
//     ...req.body,
//     createdBy: req.user._id,
//   });
//   res.status(201).json(new ApiResponse(201, ann, "Announcement created"));
// });

// export const deleteAnnouncement = asyncHandler(async (req, res) => {
//   await Announcement.findByIdAndDelete(req.params.id);
//   res.json(new ApiResponse(200, {}, "Deleted"));
// });

// // Only superadmin can create admin or teacher accounts
// // export const createStaffAccount = asyncHandler(async (req, res) => {
// //   const {
// //     name,
// //     email,
// //     password,
// //     role,
// //     phone,
// //     qualification,
// //     experience,
// //     bio,
// //     subjects,
// //     classes,
// //     branch,
// //     gender,
// //     address,
// //   } = req.body;

// //   if (!name || !email || !password || !role)
// //     throw new ApiError(400, "Name, email, password and role are required");

// //   if (!["admin", "teacher"].includes(role))
// //     throw new ApiError(400, "Role must be admin or teacher");

// //   const exists = await User.findOne({ email });
// //   if (exists) throw new ApiError(400, "Email already registered");

// //   // Create user account
// //   const user = await User.create({ name, email, password, role });

// //   // If teacher — also create teacher profile
// //   if (role === "teacher") {
// //     await Teacher.create({
// //       user: user._id,
// //       name,
// //       email,
// //       phone: phone || "",
// //       qualification: qualification || "",
// //       experience: Number(experience) || 0,
// //       bio: bio || "",
// //       subjects: subjects ? subjects.split(",").map((s) => s.trim()) : [],
// //       classes: classes ? classes.split(",").map(Number) : [],
// //       branch: branch || "All",
// //       gender: gender || "",
// //       address: address || "",
// //     });
// //   }

// //   res.status(201).json(
// //     new ApiResponse(
// //       201,
// //       {
// //         _id: user._id,
// //         name: user.name,
// //         email: user.email,
// //         role: user.role,
// //       },
// //       `${role} account created successfully`,
// //     ),
// //   );
// // });'
// export const createStaffAccount = asyncHandler(async (req, res) => {
//   const {
//     name, email, password, role,
//     phone, qualification, experience,
//     bio, subjects, classes, branch,
//     gender, address,
//   } = req.body;

//   if (!name || !email || !password || !role)
//     throw new ApiError(400, 'Name, email, password and role are required');

//   if (!['admin', 'teacher'].includes(role))
//     throw new ApiError(400, 'Role must be admin or teacher');

//   // Check duplicates in BOTH collections
//   const existingUser    = await User.findOne({ email });
//   const existingTeacher = await Teacher.findOne({ email });

//   if (existingUser || existingTeacher)
//     throw new ApiError(400, 'Email already registered');

//   // TEACHER → only in teachers collection
//   if (role === 'teacher') {
//     const teacher = await Teacher.create({
//       name,
//       email,
//       password,
//       phone:         phone         || '',
//       qualification: qualification || '',
//       experience:    Number(experience) || 0,
//       bio:           bio           || '',
//       subjects:      subjects
//                        ? subjects.split(',').map(s => s.trim()).filter(Boolean)
//                        : [],
//       classes:       classes
//                        ? classes.split(',').map(Number).filter(Boolean)
//                        : [],
//       branch:        branch  || 'All',
//       gender:        gender  || '',
//       address:       address || '',
//     });

//     return res.status(201).json(new ApiResponse(201, {
//       _id:   teacher._id,
//       name:  teacher.name,
//       email: teacher.email,
//       role:  'teacher',
//     }, 'Teacher account created successfully'));
//   }

//   // ADMIN → only in users collection
//   const user = await User.create({ name, email, password, role });

//   res.status(201).json(new ApiResponse(201, {
//     _id:   user._id,
//     name:  user.name,
//     email: user.email,
//     role:  user.role,
//   }, 'Admin account created successfully'));
// });

// // Only superadmin can remove staff
// // export const removeStaff = asyncHandler(async (req, res) => {
// //   const user = await User.findById(req.params.id);
// //   if (!user) throw new ApiError(404, "User not found");
// //   if (user.role === "superadmin")
// //     throw new ApiError(403, "Cannot delete super admin");

// //   // If teacher — delete teacher profile too
// //   if (user.role === "teacher") {
// //     const profile = await Teacher.findOne({ user: user._id });
// //     if (profile) {
// //       // Delete photo from cloudinary if exists
// //       if (profile.photoPublicId) {
// //         await cloudinary.uploader.destroy(profile.photoPublicId);
// //       }
// //       await Teacher.findByIdAndDelete(profile._id);
// //     }
// //   }

// //   await User.findByIdAndDelete(req.params.id);
// //   res.json(new ApiResponse(200, {}, "Staff removed successfully"));
// // });
// export const removeStaff = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   // Check users collection first (admins)
//   const user = await User.findById(id);
//   if (user) {
//     if (user.role === 'superadmin')
//       throw new ApiError(403, 'Cannot delete super admin');
//     await User.findByIdAndDelete(id);
//     return res.json(new ApiResponse(200, {}, 'Admin removed successfully'));
//   }

//   // Check teachers collection
//   const teacher = await Teacher.findById(id);
//   if (teacher) {
//     if (teacher.photoPublicId) {
//       try {
//         await cloudinary.uploader.destroy(teacher.photoPublicId);
//       } catch (e) {
//         console.warn('Cloudinary delete failed:', e.message);
//       }
//     }
//     await Teacher.findByIdAndDelete(id);
//     return res.json(new ApiResponse(200, {}, 'Teacher removed successfully'));
//   }

//   throw new ApiError(404, 'Staff member not found');
// });


import User from "../models/User.model.js";
import Teacher from "../models/Teacher.model.js";
import Note from "../models/Note.model.js";
import Payment from "../models/Payment.model.js";
import Attendance from "../models/Attendance.model.js";
import Marks from "../models/Marks.model.js";
import Announcement from "../models/Announcement.model.js";

import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

import { v2 as cloudinary } from "cloudinary";


// ==============================
// ADMIN DASHBOARD STATS
// ==============================
export const getStats = asyncHandler(async (req, res) => {

  const [totalStudents, totalNotes, payments] = await Promise.all([
    User.countDocuments({ role: "student" }),
    Note.countDocuments(),
    Payment.find({ status: "success" })
  ]);

  const totalRevenue = payments.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0
  );

  res.json(
    new ApiResponse(
      200,
      {
        totalStudents,
        totalNotes,
        totalRevenue,
        totalPayments: payments.length
      },
      "Admin stats fetched"
    )
  );
});


// ==============================
// GET USERS
// ==============================
export const getAllUsers = asyncHandler(async (req, res) => {

  const { role } = req.query;
  const filter = role ? { role } : {};

  const users = await User.find(filter)
    .select("-password -refreshToken");

  res.json(
    new ApiResponse(200, users, "Users fetched successfully")
  );
});


// ==============================
// DELETE USER
// ==============================
export const deleteUser = asyncHandler(async (req, res) => {

  const user = await User.findByIdAndDelete(req.params.id);

  if (!user)
    throw new ApiError(404, "User not found");

  res.json(
    new ApiResponse(200, {}, "User deleted successfully")
  );
});


// ==============================
// MARK ATTENDANCE
// ==============================
export const markAttendance = asyncHandler(async (req, res) => {

  const { records } = req.body;

  if (!records || !Array.isArray(records) || records.length === 0)
    throw new ApiError(400, "No attendance records provided");

  const isTeacher = req.user.role === "teacher";
  const teacherClasses = req.user.classes || [];
  const teacherBranch = req.user.branch;

  const saved = [];
  const skipped = [];

  for (const record of records) {

    const { student, date, status, subject, class: cls } = record;

    if (!student || !date || !status)
      continue;

    // Teacher restrictions
    if (isTeacher) {

      if (
        teacherClasses.length &&
        !teacherClasses.includes(Number(cls))
      ) {
        skipped.push({
          student,
          reason: `Not assigned to class ${cls}`
        });
        continue;
      }

      if (teacherBranch && teacherBranch !== "All") {

        const studentDoc = await User.findById(student);

        if (
          studentDoc &&
          studentDoc.branch !== teacherBranch
        ) {
          skipped.push({
            student,
            reason: "Different branch"
          });
          continue;
        }
      }
    }

    const existing = await Attendance.findOne({
      student,
      date,
      subject
    });

    if (existing) {
      existing.status = status;
      await existing.save();
    } else {
      await Attendance.create({
        student,
        date,
        status,
        subject,
        class: cls
      });
    }

    saved.push(student);
  }

  res.json(
    new ApiResponse(
      200,
      {
        saved: saved.length,
        skipped: skipped.length,
        skippedDetails: skipped
      },
      `Attendance saved for ${saved.length} students`
    )
  );
});


// ==============================
// ADD MARKS
// ==============================
export const addMarks = asyncHandler(async (req, res) => {

  const marks = await Marks.create({
    ...req.body,
    enteredBy: req.user._id
  });

  res.status(201).json(
    new ApiResponse(201, marks, "Marks added successfully")
  );
});


// ==============================
// CREATE ANNOUNCEMENT
// ==============================
export const createAnnouncement = asyncHandler(async (req, res) => {

  const announcement = await Announcement.create({
    ...req.body,
    createdBy: req.user._id
  });

  res.status(201).json(
    new ApiResponse(
      201,
      announcement,
      "Announcement created successfully"
    )
  );
});


// ==============================
// DELETE ANNOUNCEMENT
// ==============================
export const deleteAnnouncement = asyncHandler(async (req, res) => {

  const announcement =
    await Announcement.findByIdAndDelete(req.params.id);

  if (!announcement)
    throw new ApiError(404, "Announcement not found");

  res.json(
    new ApiResponse(200, {}, "Announcement deleted")
  );
});


// ==============================
// CREATE STAFF (SUPER ADMIN)
// ==============================
export const createStaffAccount = asyncHandler(async (req, res) => {

  const {
    name,
    email,
    password,
    role,
    phone,
    qualification,
    experience,
    bio,
    subjects,
    classes,
    branch,
    gender,
    address
  } = req.body;

  if (!name || !email || !password || !role)
    throw new ApiError(
      400,
      "Name, email, password and role are required"
    );

  if (!["admin", "teacher"].includes(role))
    throw new ApiError(
      400,
      "Role must be admin or teacher"
    );

  const existingUser = await User.findOne({ email });
  const existingTeacher = await Teacher.findOne({ email });

  if (existingUser || existingTeacher)
    throw new ApiError(400, "Email already registered");


  // =========================
  // CREATE TEACHER
  // =========================
  if (role === "teacher") {

    const teacher = await Teacher.create({
      name,
      email,
      password,
      phone: phone || "",
      qualification: qualification || "",
      experience: Number(experience) || 0,
      bio: bio || "",
      subjects: subjects
        ? subjects.split(",").map(s => s.trim())
        : [],
      classes: classes
        ? classes.split(",").map(Number)
        : [],
      branch: branch || "All",
      gender: gender || "",
      address: address || ""
    });

    return res.status(201).json(
      new ApiResponse(
        201,
        {
          _id: teacher._id,
          name: teacher.name,
          email: teacher.email,
          role: "teacher"
        },
        "Teacher account created successfully"
      )
    );
  }


  // =========================
  // CREATE ADMIN
  // =========================
  const user = await User.create({
    name,
    email,
    password,
    role
  });

  res.status(201).json(
    new ApiResponse(
      201,
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      "Admin account created successfully"
    )
  );
});


// ==============================
// REMOVE STAFF (SUPER ADMIN)
// ==============================
export const removeStaff = asyncHandler(async (req, res) => {

  const { id } = req.params;

  // check admin first
  const user = await User.findById(id);

  if (user) {

    if (user.role === "superadmin")
      throw new ApiError(
        403,
        "Cannot delete super admin"
      );

    await User.findByIdAndDelete(id);

    return res.json(
      new ApiResponse(
        200,
        {},
        "Admin removed successfully"
      )
    );
  }

  // check teacher collection
  const teacher = await Teacher.findById(id);

  if (teacher) {

    if (teacher.photoPublicId) {
      try {
        await cloudinary.uploader.destroy(
          teacher.photoPublicId
        );
      } catch (err) {
        console.warn(
          "Cloudinary delete failed:",
          err.message
        );
      }
    }

    await Teacher.findByIdAndDelete(id);

    return res.json(
      new ApiResponse(
        200,
        {},
        "Teacher removed successfully"
      )
    );
  }

  throw new ApiError(404, "Staff member not found");
});