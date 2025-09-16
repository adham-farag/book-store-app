const { request, response } = require("express");
const jwt = require("jsonwebtoken");
module.exports = (request, response, next) => {
  if (request.headers.authorization) {
    const token = request.headers.authorization.split(" ")[1];

    jwt.verify(token, "key@1234#", (error, decodedToken) => {
      if (error) {
        return response.status(401).json({
          status: "error",
          msg: `authorization error :: ${error}`,
        });
      } else {
        console.log(decodedToken);

        request.decodedToken = decodedToken;

        next();
      }
    });
  } else {
    return response.status(403).json({
      status: "error",
      msg: "no token provided",
    });
  }
};
