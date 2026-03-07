// import mongoose from 'mongoose';
// import bcrypt   from 'bcryptjs';
// import jwt      from 'jsonwebtoken';

// const teacherSchema = new mongoose.Schema({

//   // Login Credentials
//   email:    { type: String, required: true, unique: true, lowercase: true },
//   password: { type: String, required: true },

//   // Personal Info
//   name:          { type: String, required: true },
//   phone:         { type: String, default: '' },
//   photo:         { type: String, default: '' },
//   photoPublicId: { type: String, default: '' },
//   gender:        { type: String, enum: ['Male','Female','Other',''] },
//   dateOfBirth:   { type: Date },
//   address:       { type: String, default: '' },

//   // Professional Info
//   qualification: { type: String, default: '' },
//   experience:    { type: Number, default: 0 },
//   bio:           { type: String, default: '' },
//   subjects:      [{ type: String }],
//   classes:       [{ type: Number }],
//   branch: {
//     type:    String,
//     enum:    ['Zirakpur','Baltana','Behlana','All'],
//     default: 'All',
//   },

//   // Role — always teacher
//   role: { type: String, default: 'teacher' },

//   // Status
//   isActive:    { type: Boolean, default: true },
//   joiningDate: { type: Date,    default: Date.now },

//   // Token
//   refreshToken: { type: String },

// }, { timestamps: true });

// // Hash password before save
// teacherSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Compare password
// teacherSchema.methods.comparePassword = async function(password) {
//   return bcrypt.compare(password, this.password);
// };

// // Generate access token
// teacherSchema.methods.generateAccessToken = function() {
//   return jwt.sign(
//     { _id: this._id, email: this.email, role: 'teacher' },
//     process.env.JWT_ACCESS_SECRET,      // ← must match .env
//     { expiresIn: '1d' }
//   );
// };

// // Generate refresh token
// teacherSchema.methods.generateRefreshToken = function() {
//   return jwt.sign(
//     { _id: this._id },
//     process.env.REFRESH_TOKEN_SECRET,
//     { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' }
//   );
// };

// export default mongoose.model('Teacher', teacherSchema);



import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const teacherSchema = new mongoose.Schema(
{
  // Login Credentials
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  // Personal Info
  name: {
    type: String,
    required: true,
    trim: true
  },

  phone: {
    type: String,
    default: ""
  },

  photo: {
    type: String,
    default: ""
  },

  photoPublicId: {
    type: String,
    default: ""
  },

  gender: {
    type: String,
    enum: ["Male", "Female", "Other", ""],
    default: ""
  },

  dateOfBirth: {
    type: Date
  },

  address: {
    type: String,
    default: ""
  },

  // Professional Info
  qualification: {
    type: String,
    default: ""
  },

  experience: {
    type: Number,
    default: 0
  },

  bio: {
    type: String,
    default: ""
  },

  subjects: [
    {
      type: String
    }
  ],

  classes: [
    {
      type:  String
    }
  ],

  branch: {
    type: String,
    enum: ["Zirakpur", "Baltana", "Behlana", "All"],
    default: "All"
  },

  // Role
  role: {
    type: String,
    default: "teacher"
  },

  // Status
  isActive: {
    type: Boolean,
    default: true
  },

  joiningDate: {
    type: Date,
    default: Date.now
  },

  // Token
  refreshToken: {
    type: String,
    default: ""
  }

},
{
  timestamps: true
}
);


// 🔐 Hash password before saving
// teacherSchema.pre("save", async function (next) {

//   if (!this.isModified("password")) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }

// });
teacherSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});



// 🔑 Compare password during login
teacherSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


// 🎫 Generate access token
teacherSchema.methods.generateAccessToken = function () {

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "1d" }
  );

};


// 🔄 Generate refresh token
teacherSchema.methods.generateRefreshToken = function () {

  return jwt.sign(
    {
      _id: this._id
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

};


const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;