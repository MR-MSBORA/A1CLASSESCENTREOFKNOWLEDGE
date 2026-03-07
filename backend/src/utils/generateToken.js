// import jwt from 'jsonwebtoken';

// export const generateAccessToken = (user) =>
//   jwt.sign(
//     { _id: user._id, role: user.role, email: user.email },
//     process.env.JWT_ACCESS_SECRET,
//     { expiresIn: process.env.JWT_ACCESS_EXPIRE }
//   );

// export const generateRefreshToken = (user) =>
//   jwt.sign(
//     { _id: user._id },
//     process.env.JWT_REFRESH_SECRET,
//     { expiresIn: process.env.JWT_REFRESH_EXPIRE }
//   );





import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_ACCESS_SECRET,      // ← must match .env
    { expiresIn: process.env.JWT_ACCESS_EXPIRE || '1d' }
  );
};

export const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET,     // ← must match .env
    { expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d' }
  );
};