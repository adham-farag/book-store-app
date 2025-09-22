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
