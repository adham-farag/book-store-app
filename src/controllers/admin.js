import * as adminModels from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ReturnDocument } from "mongodb";

export const add = async (req, res, next) => {
  try {
    const admin = { ...req.body };

    const queryresult = await adminModels.selectOne({
      email: admin.email,
    });

    if (!queryresult) {
      const salt = bcrypt.genSaltSync(10);
      const hashedpassword = bcrypt.hashSync(admin.password, salt);
      admin.password = hashedpassword;

      const insert = await adminModels.add(admin);

      return res.status(201).json({
        status: "success",
        msg: "admin inserted",
      });
    } else {
      return res.status(409).json({
        status: "error",
        msg: "admin is already exists",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const admin = { ...req.body };

    const queryresult = await adminModels.selectOne({
      email: admin.email,
    });

    if (!queryresult) {
      return res.status(404).json({
        status: "error",
        msg: "invalid email or password",
      });
    }

    const ismatch = bcrypt.compareSync(admin.password, queryresult.password);

    if (ismatch) {
      const token = jwt.sign(
        {
          name: queryresult.name,
          email: queryresult.email,
          id: queryresult._id,
        },
        process.env.KEY_TOKEN
      );

      res.header("x-auth", token);
      return res.status(200).json({
        status: "success",
        msg: "login successful ",
      });
    } else {
      return res.status(401).json({
        status: "error",
        msg: "invalid email or password",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const admin = { id, ...req.body };

    const updateAdmin = await adminModels.updateAdmin(admin);

    if (updateAdmin) {
      return res.status(201).json({
        status: "success",
        msg: "admin updated",
      });
    } else {
      return res.status(404).json({
        status: "error",
        msg: "Admin id not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteAdmin = async (req, res, next) => {
  try {
    const adminId = req.params.id;

    const deleteresult = await adminModels.deleteadmin(adminId);

    if (deleteresult) {
      return res.status(200).json({
        status: "success",
        msg: "admin is deleted",
      });
    } else {
      return res.status(404).json({
        status: "error",
        msg: "admin id not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const restore = async (req, res, next) => {
  try {
    const adminId = req.params.id;

    const restore = await adminModels.restoreAdmin(adminId);

    if (restore) {
      return res.status(200).json({
        status: "success",
        msg: "admin is restored",
      });
    } else {
      return res.status(404).json({
        status: "error",
        msg: "admin id not found",
      });
    }
  } catch (error) {
    next(error);
  }
};
