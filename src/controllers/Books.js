import * as bookModels from "../models/Books.js";
import authMW from "../middlewares/auth.js";

export const register = async (req, res, next) => {
  try {
    const adminId = req.decodedToken.id;
    const book = { ...req.body, adminId };

    book.currentQuantity = book.quantity;

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

export const update = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const book = { ...req.body };
    const update = await bookModels.updateBook(bookId, book);
    if (update) {
      return res.status(200).json({
        status: "success",
        msg: "book is updated",
      });
    } else {
      return res.status(404).json({
        status: "error",
        msg: "bookId no found",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const deleteBook = await bookModels.deletebook(bookId);
    if (deleteBook) {
      return res.status(200).json({
        status: "success",
        msg: "Book is deleted",
      });
    } else {
      return res.status(404).json({
        status: "error",
        msg: " book not found ",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const restore = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const restoreBook = await bookModels.restoreBook(bookId);
    if (restoreBook) {
      return res.status(200).json({
        status: "success",
        msg: "book restored",
      });
    } else {
      return res.status(404).json({
        status: "error",
        msg: "book not found ",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const selectAll = async (req, res, next) => {
  try {
    const adminId = req.decodedToken.id;
    const books = await bookModels.select(
      { adminId, isDeleted: false },
      {
        currentQuantity: 0,
        image: 0,
        isDeleted: 0,
        createdAt: 0,
        updatedAt: 0,
        _id: 0,
        __v: 0,
      }
    );
    return res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};
