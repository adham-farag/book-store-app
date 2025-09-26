const normalize = (req, res, next) => {
  try {
    if (typeof req.body.authors === "string") {
      req.body.authors = JSON.parse(req.body.authors);
    }
  } catch {
    req.body.authors = [req.body.authors];
  }
  next();
};

export default normalize;
