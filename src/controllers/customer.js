import * as customerModels from "../models/customer.js";
import bcrypt from "bcrypt";
import getName from "../helpers/get-file-name.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const customer = { ...req.body, pageId: getName() };
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
      return res.sendStatus(401);
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

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("refreshToken");
    return res.status(200).json({
      status: "success",
      msg: "log out successful",
    });
  } catch (error) {
    next(error);
  }
};
export const remove = async (req, res, next) => {
  try {
    const customerId = req.decodedToken._id;
    const removeresult = await customerModels.deleteCutomer(customerId);
    if (removeresult) {
      return res.status(200).json({
        status: "success",
        msg: "customer deleted successful",
      });
    } else {
      return res.status(404).json({
        status: "error",
        msg: "customerId not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const restore = async (req, res, next) => {
  try {
    const customerId = req.decodedToken._id;
    const restoreresult = await customerModels.restorecustomer(customerId);
    if (restoreresult) {
      return res.status(200).json({
        status: "success",
        msg: "customer restored successfuly",
      });
    } else {
      return res.status(404).json({
        status: "error",
        msg: "customerId not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const pageId = req.params.pageId;

    const profiles = await customerModels.selectProfile(pageId);

    if (profiles) {
      return res.status(200).json(profiles);
    } else {
      return res.status(404).json({
        status: "error",
        msg: "pageId not found",
      });
    }
  } catch (error) {
    next(error);
  }
};
export const update = async (req, res, next) => {
  try {
    const id = req.decodedToken._id;
    const customer = { ...req.body, id };

    const updatecustomer = await customerModels.updatecustomer(customer);
    if (updatecustomer) {
      return res.status(200).json({
        status: "success",
        msg: "customer updated",
      });
    } else {
      return res.status(404).json({
        status: "error",
        msg: "customer id not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId, numberofitems } = req.body;
    const customerId = req.decodedToken._id;
    const insertResult = await customerModels.addtocart(
      customerId,
      productId,
      numberofitems
    );
    console.log("customerId::", customerId);
    console.log("productId::", productId);
    console.log("numberofitems::", numberofitems);
    if (insertResult) {
      return res.status(200).json({
        status: "success",
        msg: "inserted to cart",
      });
    } else {
      return res.status(404).json({
        status: "error",
        msg: "customerId not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const selectCart = async (req, res, next) => {
  try {
    const customerId = req.decodedToken._id;
    const carts = await customerModels.selectcart(customerId);
    if (carts && carts.length > 0) {
      return res.status(200).json({
        status: "success",
        data: carts,
      });
    } else {
      return res.status(404).json({
        status: "error",
        msg: "customerId not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateCart = async (req, res, next) => {
  try {
    const customerId = req.decodedToken._id;
    const productId = req.params.productId;
    const { numberofitems } = req.body;

    const update = await customerModels.updateShoppingCart(
      customerId,
      productId,
      numberofitems
    );

    if (update.modifiedCount === 1) {
      return res.status(200).json({
        status: "success",
        msg: "cart updated successfuly",
      });
    } else {
      return res.status(200).json({
        status: "eror",
        msg: "customer id not found",
      });
    }
  } catch (error) {
    next(error);
  }
};
