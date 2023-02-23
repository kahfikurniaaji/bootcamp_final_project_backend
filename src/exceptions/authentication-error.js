const ClientError = require("./client-error");

class AuthenticationError extends ClientError {
  constructor(message) {
    super(message, 401);
    this.name = "Unauthorized";
  }
}

module.exports = AuthenticationError;
