const DB = require("./connectors/db");
const rootDir = __dirname;
const prepareDatabase = require("./use-cases/prepare-database");

prepareDatabase(DB, rootDir);
