// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (err) {
//     next(err);
//   }
// };
// export default asyncHandler;

// const asyncHandler = (fn) => (req, res, next) => {
//   Promise.resolve(fn(req, res, next)).catch((err) => {
//     const statusCode = err.statusCode || 500;
//     const message    = err.message    || 'Internal Server Error';
//     console.error('❌ ERROR:', message);
//     res.status(statusCode).json({ success: false, message });
//   });
// };

// export default asyncHandler;


const asyncHandler = (fn) => {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      console.error("🔥 Async Error:", err);
      next(err);
    });
  };
};

export default asyncHandler;