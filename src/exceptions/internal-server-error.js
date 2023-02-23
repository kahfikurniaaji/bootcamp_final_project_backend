class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "Internal Server Error";
    this.code = 500;
  }
}
