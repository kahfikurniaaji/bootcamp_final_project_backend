class ClientError {
  constructor(message, code = 400) {
    this.name = "Client Error";
    this.code = code;
    this.message = message;
  }
}

module.exports = ClientError;
