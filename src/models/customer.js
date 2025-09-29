import customerSchema from "../db/schema/customer.js";
import openconnection from "../db/config.mjs";

const databaseName = "book-store";
const collectionName = "customers";

export const add = async (customer) => {
  const collection = await openconnection(
    databaseName,
    collectionName,
    customerSchema
  );
  const addcustomer = await collection.create(customer);
  return addcustomer;
};

export const selectOne = async (condition) => {
  const collection = await openconnection(
    databaseName,
    collectionName,
    customerSchema
  );
  const selectone = await collection.findOne(condition);
  return selectone;
};
