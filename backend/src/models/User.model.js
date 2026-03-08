// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// /* -----------------------------------------
//    USER SCHEMA
// ------------------------------------------ */
// const userSchema = new mongoose.Schema(
//   {
//     // Full name of user
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     // Unique email (used for login)
//     email: {
//       type: String,
//       required: true,
//       unique: true, // creates DB index
//       lowercase: true, // auto convert to lowercase
//       trim: true,
//     },

//     // Password (hidden by default)
//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//       select: false, // won't return unless explicitly selected
//     },

//     // Role-based access control
//     role: {
//       type: String,
//       enum: ["student", "teacher", "admin", "superadmin"],
//       default: "student",
//     },

//     // Class (only for students)
//     class: {
//       type: Number,
//       enum: [9, 10, 11, 12],
//     },

//     // Optional profile image
//     avatar: {
//       type: String,
//       default: "",
//     },

//     // Optional phone number
//     phone: {
//       type: String,
//     },

//     // Stored refresh token (hidden from queries)
//     refreshToken: {
//       type: String,
//       select: false,
//     },

//     // Soft delete / account status
//     isActive: {
//       type: Boolean,
//       default: true,
//     },

//     // Purchased notes reference
//     purchasedNotes: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Note",
//       },
//     ],
//   },
//   {
//     timestamps: true, // adds createdAt and updatedAt automatically
//   },
// );

// /* -----------------------------------------
//    HASH PASSWORD BEFORE SAVE
// ------------------------------------------ */
// // This runs automatically before saving a user
// userSchema.pre("save", async function () {
//   // Only hash if password is modified (important)
//   if (!this.isModified("password")) return;

//   // Hash password with salt rounds = 12
//   this.password = await bcrypt.hash(this.password, 12);
// });

// /* -----------------------------------------
//    COMPARE PASSWORD METHOD
// ------------------------------------------ */
// // Custom method to compare entered password with hashed password
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// /* -----------------------------------------
//    EXPORT MODEL
// ------------------------------------------ */
// export default mongoose.model("User", userSchema);

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin", "superadmin"],
      default: "student",
    },
    class: {
      type: Number,
      enum: [9, 10, 11, 12],
    },

    // Branch (Zirakpur / Baltana / Behlana)
    branch: {
      type: String,
      enum: ["Zirakpur", "Baltana", "Behlana", ""],
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    // ── Enrollment ──────────────────────────────
    isEnrolled: {
      type: Boolean,
      default: false,
    },
    enrolledDate: {
      type: Date,
      default: null,
    },
    enrolledBatch: {
      type: String,
      default: "", // e.g. "Class 11 - Science 2024-25"
    },
    feeStatus: {
      type: String,
      enum: ["paid", "unpaid", "partial"],
      default: "unpaid",
    },
    // ────────────────────────────────────────────

    purchasedNotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
