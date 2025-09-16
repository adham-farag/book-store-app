const { ObjectId } = require("mongodb");
const bookmodel = require("../models/Books");
const Joi = require("joi");
const { response } = require("express");

const addBook = async (request, response) => {
  const book = { ...request.body };

  const isDuplicated = await bookmodel.selectone({
    name: book.name,
  });

  if (isDuplicated === null) {
    const insertresult = await bookmodel.add(book);

    response.status(201).json({
      status: "ok",
      msg: "book is inserted",
      insertresult,
    });
  } else {
    return response.status(409).json({
      status: "error",
      msg: `book name:${book.name} is Duplicated`,
    });
  }
};

const selectBook = async (request, response) => {
  const books = await bookmodel.selectAll();
  response.status(200).send(books);
};
const updateBook = async (request, response) => {
  const id = request.params.id;
  const book = { ...request.body };
  book.id = id;

  const isDuplicated = await bookmodel.selectone({
    name: book.name,
    _id: { $ne: new ObjectId(book.id) },
  });

  if (isDuplicated === null) {
    const queryResult = await bookmodel.update(book);

    if (queryResult === null) {
      return response.status(404).json({
        status: "error",
        msg: `BookID ${book.id} not found`,
      });
    }

    return response.status(200).json({
      status: "ok",
      msg: `book with${book.id}is updated`,
    });
  } else {
    return response.status(409).json({
      status: "error",
      msg: `book name:${book.name} is Duplicated`,
    });
  }
};

const deletebook = async (request, response) => {
  const bookId = request.params.id;
  const book = await bookmodel.deleteBook(bookId);

  if (book === null) {
    return response.status(404).json({
      status: "error",
      msg: `bookID ${bookId} not found`,
    });
  }
  return response.status(200).json({
    status: "ok",
    msg: `bookID is ${bookId} is deleted`,
  });
};

module.exports = {
  selectBook,
  addBook,
  updateBook,
  deletebook,
};
