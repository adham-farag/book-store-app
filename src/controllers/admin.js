const adminmodel = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (request, response) => {
  const admin = { ...request.body };

  const checkDuplication = await adminmodel.selectone({
    email: admin.email,
  });

  if (checkDuplication === null) {
    const salt = bcrypt.genSaltSync(10);

    const hashedpassword = bcrypt.hashSync(admin.password, salt);

    admin.password = hashedpassword;

    const queryResult = adminmodel.add(admin);
    return response.status(200).json({
      status: "ok",
      msg: "admin is inserted",
    });
  } else {
    return response.status(409).json({
      status: "error",
      msg: `email${admin.email} is in database`,
    });
  }
};

const login = async (request, response) => {
  const admin = { ...request.body };

  const storedAdmin = await adminmodel.selectone({
    email: admin.email,
  });
  if (storedAdmin === null) {
    return response.status(404).json({
      status: "error",
      msg: `email:${admin.email} not found `,
    });
  } else {
    const isvalid = bcrypt.compareSync(admin.password, storedAdmin.password);
    if (isvalid) {
      const token = jwt.sign(
        {
          name: storedAdmin.name,
          email: storedAdmin.email,
        },
        "key@1234#"
      );

      response.header("x-auth-token", token);

      return response.status(200).json({
        status: "OK",
        msg: "login",
      });
    }
  }
  return response.status(401).json({
    status: "error",
    msg: "invalid password",
  });
};

module.exports = {
  register,
  login,
};
