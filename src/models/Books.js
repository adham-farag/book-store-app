const { request } = require("express");
const { ObjectId } = require("mongodb");

const databaseconfig = require("../db/config");
const databaseName = "bookstore";
const collectionName = "books";

const add = async (book) => {
  const bookscollection = await databaseconfig.openconnection(
    databaseName,
    collectionName
  );

  const insertresult = await bookscollection.insertOne(book);

  return insertresult;
};

const selectone = async (condation) => {
  const bookscollection = await databaseconfig.openconnection(
    databaseName,
    collectionName
  );

  const book = await bookscollection.findOne(condation);

  return book;
};

const selectAll = async () => {
  const bookscollection = await databaseconfig.openconnection(
    databaseName,
    collectionName
  );
  const books = bookscollection.find().toArray();
  return books;
};

const update = async (book) => {
  const bookscollection = await databaseconfig.openconnection(
    databaseName,
    collectionName
  );
  const queryResult = await bookscollection.findOneAndReplace(
    { _id: new ObjectId(book.id) },
    {
      name: book.name,
      description: book.description,
      authors: book.authors,
    }
  );

  return queryResult;
};

const deleteBook = async (bookId) => {
  const bookscollection = await databaseconfig.openconnection(
    databaseName,
    collectionName
  );
  const book = await bookscollection.findOneAndDelete({
    _id: new ObjectId(bookId),
  });

  return book;
};

module.exports = {
  add,
  selectone,
  selectAll,
  update,
  deleteBook,
};
