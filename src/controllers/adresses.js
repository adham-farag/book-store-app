import authMW from "../middlewares/auth.js";
import * as customerModels from "../models/customer.js";

export const addAddresse = async (req, res, next) => {
  try {
    const address = { ...req.body };
    const customerId = req.decodedToken._id;
    const addresult = await customerModels.addAddresses(customerId, address);
    if (addresult) {
      return res.status(200).json({
        status: "success",
        msg: "Address inserted",
      });
    } else {
      return res.status(200).json({
        status: "error",
        msg: "customer Id not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const removeAddress = async (req, res, next) => {
  try {
    const customerId = req.decodedToken._id;

    const removeResult = await customerModels.deleteAddress(customerId);

    if (removeResult.matchedCount === 0) {
      return res.status(404).json({
        status: "error",
        msg: "customer not found",
      });
    } else if (removeResult.modifiedCount === 0) {
      return res.status(400).json({
        status: "error",
        msg: "Address not exist or already deleted",
      });
    } else {
      return res.status(200).json({
        status: "success",
        msg: "Address deleted successfuly",
      });
    }
  } catch (error) {
    next(error);
  }
};
