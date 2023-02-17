const responseJSON = (data) => {
  if (data instanceof Error) {
    return {
      status: "fail",
      message: data.message,
    };
  } else {
    res.status(data.statusCode).json({
      status: "success",
      message: data.message,
    });
  }
};
