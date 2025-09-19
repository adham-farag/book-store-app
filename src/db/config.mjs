import mongoose from "mongoose";

const openconnection = async (databaseName, collectionName, schema) => {
  const databaseUrlconnection = process.env.DATA_BASE_URL;

  const connectionUrl = `${databaseUrlconnection}${databaseName}`;

  mongoose
    .connect(connectionUrl)
    .then((connection) => {
      console.log("connected");
    })
    .catch((error) => {
      console.log(error);
    });
  const collection = mongoose.model(collectionName, schema);

  return collection;
};

export default openconnection;
