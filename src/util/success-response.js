const successResponse = ({ message = "success", data }) => {
  return {
    message: message,
    data: data,
  };
};

module.exports = successResponse;
