class ErrorHandler extends Error {
  constructor(status, message, stack = '') {
    super(message);
    this.status = status;
    this.stack = stack;
  }
}

module.exports = ErrorHandler;