const databaseconfig = require("../db/config");
const databaseName = "bookstore";
const collectionName = "admin";

const add = async (admin) => {
  const admincollection = await databaseconfig.openconnection(
    databaseName,
    collectionName
  );
  const queryResult = await admincollection.insertOne(admin);

  return queryResult;
};

const selectone = async (condation) => {
  const admincollection = await databaseconfig.openconnection(
    databaseName,
    collectionName
  );
  const admin = await admincollection.findOne(condation);

  return admin;
};

module.exports = {
  add,
  selectone,
};
