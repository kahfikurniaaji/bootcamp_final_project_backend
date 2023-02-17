const ClientError = require("../../exceptions/client-error");

const errorResponse = (data) => {
  if (data instanceof ClientError) {
    return {
      status: "fail",
      message: data.message,
    };
  }
  return {
    status: "fail",
    message: "Internal Server Error",
  };
};

module.exports = { errorResponse };
