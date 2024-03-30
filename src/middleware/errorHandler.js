class ErrorHandler extends Error {
  constructor(statusCode, message, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.stack = stack;
  }
}

module.exports = ErrorHandler;