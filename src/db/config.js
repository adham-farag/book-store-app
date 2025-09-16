const openconnection = async (databaseName, collectionName) => {
  const mongoclient = require("mongodb").MongoClient;

  const databaseUrlconnection = "mongodb://127.0.0.1:27017";

  const connection = await mongoclient.connect(databaseUrlconnection);

  const database = connection.db(databaseName);

  const collection = database.collection(collectionName);

  return collection;
};

module.exports = {
  openconnection,
};
