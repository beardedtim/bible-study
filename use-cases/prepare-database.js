const uploadGenres = require("./upload-genres");
const uploadData = require("./upload-translations-and-books");

module.exports = async (DB, rootDir) => {
  await uploadGenres(DB);
  await uploadData(DB, rootDir);
};
