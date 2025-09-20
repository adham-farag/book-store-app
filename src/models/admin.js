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

export const updateAdmin = async (admin) => {
  const collection = await openconnection(
    databaseName,
    collectionName,
    adminSchema
  );

  const updateresult = await collection.findByIdAndUpdate(
    admin.id,
    {
      $set: { ...admin },
    },
    {
      new: true,
    }
  );
  return updateresult;
};

export const deleteadmin = async (adminId) => {
  const collection = await openconnection(
    databaseName,
    collectionName,
    adminSchema
  );

  const deleteresult = await collection.findByIdAndUpdate(
    adminId,
    {
      $set: { isDeleted: true },
    },
    { new: true }
  );
  return deleteresult;
};

export const restoreAdmin = async (adminId) => {
  const collection = await openconnection(
    databaseName,
    collectionName,
    adminSchema
  );

  const restoreresult = await collection.findByIdAndUpdate(
    adminId,
    {
      $set: { isDeleted: false },
    },
    { new: true }
  );
  return restoreresult;
};
