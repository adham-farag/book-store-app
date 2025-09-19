const appError = (err, req, res, next) => {
  return res.status(500).json({
    status: "error",
    msg: `Internal server error ${err.message} `,
  });
};

export default appError;
