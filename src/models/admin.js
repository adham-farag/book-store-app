import openconnection from "../db/config.mjs";
import adminSchema from "../db/schema/admin.js";

const databaseName = "book-store";
const collectionName = "Admin";

export const add = async (admin) => {
  const collection = await openconnection(
    databaseName,
    collectionName,
    adminSchema
  );
  const insertresult = await collection.create(admin);

  return insertresult;
};

export const selectOne = async (condition) => {
  const collection = await openconnection(
    databaseName,
    collectionName,
    adminSchema
  );

  const selectresult = await collection.findOne(condition);

  return selectresult;
};
