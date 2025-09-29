import * as customerModels from "../models/customer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const customer = { ...req.body };
    const selectOne = await customerModels.selectOne({
      email: customer.email,
    });
    if (!selectOne) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(customer.password, salt);
      customer.password = hashedPassword;
      const insertresult = await customerModels.add(customer);
      return res.status(201).json({
        status: "success",
        msg: "cutomer inserted",
      });
    } else {
      return res.status(409).json({
        status: "error",
        msg: "customer is already exists",
      });
    }
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const customer = { ...req.body };
    const selectresult = await customerModels.selectOne({
      email: customer.email,
    });
    if (!selectresult) {
      return res.status(404).json({
        stats: "error",
        msg: "invalid email or password",
      });
    }
    const isMatch = await bcrypt.compare(
      customer.password,
      selectresult.password
    );

    if (isMatch) {
      const accessToken = jwt.sign(
        {
          name: selectresult.name,
          email: selectresult.email,
          _id: selectresult._id,
        },
        process.env.ACCESS_KEY_TOKEN,
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        {
          name: selectresult.name,
          email: selectresult.email,
          _id: selectresult._id,
        },
        process.env.REFRESH_KEY_TOKEN,
        { expiresIn: "7d" }
      );
      res.header("x-auth-Token", accessToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
      return res.status(200).json({
        status: "success",
        msg: "login successful",
        accessToken,
      });
    } else {
      return res.status(401).json({
        status: "error",
        msg: "invalid email or password ",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.sendstatus(401);
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_KEY_TOKEN,
      (err, decodeToken) => {
        if (err) {
          return res.sendStatus(403);
        }
        const accessToken = jwt.sign(
          {
            name: decodeToken.name,
            email: decodeToken.email,
            _id: decodeToken._id,
          },
          process.env.ACCESS_KEY_TOKEN,
          { expiresIn: "15m" }
        );
        return res.json({ accessToken });
      }
    );
  } catch (error) {
    next(error);
  }
};
