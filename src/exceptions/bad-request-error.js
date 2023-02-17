const ClientError = require("./client-error");

class BadRequestError extends ClientError {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = "BadRequestError";
  }
}

module.exports = BadRequestError;
