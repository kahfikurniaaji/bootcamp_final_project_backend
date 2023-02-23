const ClientError = require("../exceptions/client-error");

const errorResponse = async (error) => {
  if (error instanceof ClientError) {
    return {
      code: error.code,
      status: error.name,
      message: error.message,
    };
  } else if (error instanceof Error) {
    return {
      code: error.code,
      status: error.name,
    };
  }
};

module.exports = errorResponse;
