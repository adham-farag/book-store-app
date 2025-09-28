import openconnection from "../db/config.mjs";
import bookschema from "../db/schema/book.js";

const databaseName = "book-store";
const collectionName = "books";

export const add = async (book) => {
  const collection = await openconnection(
    databaseName,
    collectionName,
    bookschema
  );

  const insertresult = await collection.create(book);

  return insertresult;
};

export const selectOne = async (conditiom) => {
  const collection = await openconnection(
    databaseName,
    collectionName,
    bookschema
  );

  const selectresult = await collection.find(conditiom);

  return selectresult;
};

export const updateBook = async (bookId, book) => {
  const collection = await openconnection(
    databaseName,
    collectionName,
    bookschema
  );
  const updateresult = await collection.findByIdAndUpdate(
    bookId,
    {
      $set: book,
    },
    { new: true }
  );
  return updateresult;
};

export const deletebook = async (bookId) => {
  const collection = await openconnection(
    databaseName,
    collectionName,
    bookschema
  );
  const deleteresult = await collection.findByIdAndUpdate(
    bookId,
    {
      $set: { isDeleted: true },
    },
    { new: true }
  );
  return deleteresult;
};

export const restoreBook = async (bookId) => {
  const collection = await openconnection(
    databaseName,
    collectionName,
    bookschema
  );
  const restoreresult = await collection.findByIdAndUpdate(
    bookId,
    {
      $set: { isDeleted: false },
    },
    { new: true }
  );
  return restoreresult;
};

export const select = async (adminId, condition, fields) => {
  const collection = await openconnection(
    databaseName,
    collectionName,
    bookschema
  );
  const books = await collection.find(adminId, condition, fields);
  return books;
};
