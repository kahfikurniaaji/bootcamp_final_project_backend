const ClientError = require("./client-error");

class AuthorizationsError extends ClientError {
  constructor(message) {
    super(message, 403);
    this.name = "AuthorizationsError";
  }
}

module.exports = AuthorizationsError;
