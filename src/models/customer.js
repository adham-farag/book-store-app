import customerSchema from "../db/schema/customer.js";
import openconnection from "../db/config.mjs";
import mongoose from "mongoose";

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

export const deleteCutomer = async (customerId) => {
  const collection = await openconnection(
    databaseName,
    collectionName,
    customerSchema
  );
  const deleteresult = await collection.findByIdAndUpdate(customerId, {
    $set: { isDeleted: true },
  });
  return deleteresult;
};

export const restorecustomer = async (customerId) => {
  const collection = await openconnection(
    databaseName,
    collectionName,
    customerSchema
  );
  const restore = await collection.findByIdAndUpdate(customerId, {
    $set: { isDeleted: false },
  });
  return restore;
};

export const selectProfile = async (pageId) => {
  const collection = await openconnection(
    databaseName,
    collectionName,
    customerSchema
  );

  const profile = await collection.aggregate([
    {
      $match: {
        pageId,
      },
    },
    {
      $project: {
        name: 1,
        email: 1,
        createdAt: 1,
        _id: 0,
      },
    },
    {
      $limit: 1,
    },
  ]);

  return profile[0];
};

export const updatecustomer = async (customer) => {
  const collection = await openconnection(
    databaseName,
    collectionName,
    customerSchema
  );
  const updateResult = await collection.findByIdAndUpdate(
    customer.id,
    {
      $set: { ...customer },
    },
    { new: true }
  );
  return updateResult;
};

export const addtocart = async (customerId, productId, numberofitems) => {
  const collection = await openconnection(
    databaseName,
    collectionName,
    customerSchema
  );

  const pId = new mongoose.Types.ObjectId(productId);

  const insert = await collection.findByIdAndUpdate(
    customerId,
    {
      $push: { cart: { productId: pId, numberofitems } },
    },
    { new: true }
  );
  return insert;
};

export const selectcart = async (customerId) => {
  const collection = await openconnection(
    databaseName,
    collectionName,
    customerSchema
  );
  const selectresult = await collection.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(customerId) } },
    { $unwind: { path: "$cart" } },
    {
      $addFields: {
        productId: "$cart.productId",
        numberofitems: "$cart.numberofitems",
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "productId",
        foreignField: "_id",
        as: "book",
      },
    },
    {
      $unwind: { path: "$book" },
    },
    {
      $addFields: {
        title: "$book.title",
        price: "$book.price",
        description: "$book.description",
        authors: "$book.authors",
        imageUrl: "$book.imageUrl",
      },
    },
    {
      $project: {
        title: 1,
        price: 1,
        description: 1,
        authors: 1,
        imageUrl: 1,
        _id: 0,
      },
    },
  ]);
  return selectresult;
};
export const updateShoppingCart = async (
  customerId,
  productId,
  numberofitems
) => {
  const collection = await openconnection(
    databaseName,
    collectionName,
    customerSchema
  );

  const updateresult = await collection.updateOne(
    {
      _id: new mongoose.Types.ObjectId(customerId),
      "cart.productId": new mongoose.Types.ObjectId(productId),
    },
    {
      $set: { "cart.$.numberofitems": numberofitems },
    }
  );
  return updateresult;
};
