const successResponse = (data, message) => {
    return {
      status: "success",
      message: message,
      data: data
    };
  };
  
  module.exports = { successResponse };
  