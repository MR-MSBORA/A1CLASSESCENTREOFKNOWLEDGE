import ApiError from "../utils/ApiError.js";

// const errorHandler = (err, req, res, next) => {

//   console.log("\n❌ ERROR CAUGHT BY EXPRESS");
//   console.log("Message:", err.message);
//   console.log("Status:", err.statusCode);
//   console.log("Stack:\n", err.stack);
//   console.log("================================\n");

//   const statusCode = err.statusCode || 500;

//   res.status(statusCode).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//   });

// };

const errorHandler = (err, req, res, next) => {

  console.log("\n❌ ERROR CAUGHT BY EXPRESS");
  console.log("Message:", err.message);
  console.log("Status:", err.statusCode || 500);

  if (err.stack) {
    console.log("Stack Trace:\n", err.stack);
  }

  console.log("================================\n");

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;