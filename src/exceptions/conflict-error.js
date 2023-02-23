const ClientError = require("./client-error");

class ConflictError extends ClientError {
  constructor(message) {
    super(message, 409);
    this.name = "Conflict";
  }
}

module.exports = ConflictError;
