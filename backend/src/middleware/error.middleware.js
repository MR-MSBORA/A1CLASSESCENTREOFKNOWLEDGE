// import ApiError from '../utils/ApiError.js';

// const errorHandler = (err, req, res, next) => {
//   console.error('ERROR:', err.message);

//   const statusCode = err.statusCode || 500;
//   const message    = err.message    || 'Internal Server Error';

//   res.status(statusCode).json({
//     success:    false,
//     message,
//     statusCode,
//   });
// };

// export default errorHandler;



import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {

  console.log("\n❌ ERROR CAUGHT BY EXPRESS");
  console.log("Message:", err.message);
  console.log("Status:", err.statusCode);
  console.log("Stack:\n", err.stack);
  console.log("================================\n");

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });

};

export default errorHandler;