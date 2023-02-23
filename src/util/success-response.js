const successResponse = ({code = 200, status = "OK", message = "success", data}) => {
  return {
    code: code,
    status: status,
    message: message,
    data: data,
  };
};

module.exports = successResponse;
