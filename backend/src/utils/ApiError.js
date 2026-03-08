// class ApiError extends Error {
//   constructor(statusCode, message, errors = [], stack = '') {
//     super(message);
//     this.statusCode = statusCode;
//     this.message = message;
//     this.success = false;
//     this.errors = errors;

//     if (stack) {
//       this.stack = stack;
//     } else {
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }
// }

// export default ApiError;


class ApiError extends Error {
  constructor(statusCode, message, errors = [], originalError = null) {
    // Pass message to parent Error
    super(message);

    this.statusCode = statusCode;
    this.message = message || 'Something went wrong';
    this.success = false;
    this.errors = errors;

    // If you pass an original error (like from try/catch), include its stack and message
    if (originalError) {
      this.stack = originalError.stack || this.stack;
      this.originalMessage = originalError.message || null;
    } else {
      Error.captureStackTrace(this, this.constructor);
      this.originalMessage = null;
    }
  }
}

export default ApiError;