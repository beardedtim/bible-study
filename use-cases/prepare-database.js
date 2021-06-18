const uploadGenres = require("./upload-genres");
const uploadData = require("./upload-translations-and-books");
const assignGenre = require("./assign-genres");
module.exports = async (DB, rootDir) => {
  // remove any old data
  await DB.migrate.rollback(true);
  // set up tables
  await DB.migrate.latest();
  // upload data
  await uploadGenres(DB);
  await uploadData(DB, rootDir);
  // assign relationships
  await assignGenre(DB, rootDir);
  console.log("Database prepared");
};
