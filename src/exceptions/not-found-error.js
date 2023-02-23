const ClientError = require("./client-error");

class NotFoundError extends ClientError {
  constructor(message) {
    super(message, 404);
    this.name = "Not Found";
  }
}

module.exports = NotFoundError;
