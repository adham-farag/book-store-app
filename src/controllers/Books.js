import * as bookModels from "../models/Books.js";

export const add = async (req, res, next) => {
  try {
    const book = { ...req.body };

    const insert = await bookModels.add(book);

    return res.status(201).json({
      status: "success",
      msg: "book is inserted",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        status: "error",
        msg: "book is already exists",
      });
    }

    next(error);
  }
};
