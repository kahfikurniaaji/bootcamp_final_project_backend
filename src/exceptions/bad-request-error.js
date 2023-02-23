const ClientError = require("./client-error");

class BadRequestError extends ClientError {
  constructor(message) {
    super(message);
    this.name = "Bad Request";
  }
}

module.exports = BadRequestError;
