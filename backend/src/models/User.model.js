// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//       select: false,
//     },
//     role: {
//       type: String,
//       enum: ["student", "teacher", "admin", "superadmin"],
//       default: "student",
//     },
//     class: {
//       type: Number,
//       enum: [9, 10, 11, 12],
//     },

//     // Branch (Zirakpur / Baltana / Behlana)
//     branch: {
//       type: String,
//       enum: ["Zirakpur", "Baltana", "Behlana", ""],
//       default: "",
//     },

//     avatar: {
//       type: String,
//       default: "",
//     },
//     phone: {
//       type: String,
//       default: "",
//     },
//     refreshToken: {
//       type: String,
//       select: false,
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },

//     // ── Enrollment ──────────────────────────────
//     isEnrolled: {
//       type: Boolean,
//       default: false,
//     },
//     enrolledDate: {
//       type: Date,
//       default: null,
//     },
//     enrolledBatch: {
//       type: String,
//       default: "", // e.g. "Class 11 - Science 2024-25"
//     },
//     feeStatus: {
//       type: String,
//       enum: ["paid", "unpaid", "partial"],
//       default: "unpaid",
//     },
//     // ────────────────────────────────────────────

//     purchasedNotes: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Note",
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   },
// );

// // Hash password before save
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   try {
//     this.password = await bcrypt.hash(this.password, 12);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// // Compare password
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// export default mongoose.model("User", userSchema);






import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role:     { type: String, enum: ["student","teacher","admin","superadmin"], default: "student" },
    class:    { type: Number, enum: [9,10,11,12] },
    branch:   { type: String, enum: ["Zirakpur","Baltana","Behlana",""], default: "" },
    avatar:   { type: String, default: "" },
    phone:    { type: String, default: "" },
    refreshToken:  { type: String, select: false },
    isActive:      { type: Boolean, default: true },
    isEnrolled:    { type: Boolean, default: false },
    enrolledDate:  { type: Date,    default: null },
    enrolledBatch: { type: String,  default: "" },
    feeStatus:     { type: String,  enum: ["paid","unpaid","partial"], default: "unpaid" },
    purchasedNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
  },
  { timestamps: true }
);

// ✅ promise-based pre-save — fixes "next is not a function" on Render
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 12)
    .then((hashed) => { this.password = hashed; next(); })
    .catch((err) => next(err));
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model("User", userSchema);