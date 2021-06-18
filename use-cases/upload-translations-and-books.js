const uploadBookList = require("./upload-book-list");
const uploadTranslation = require("./upload-translation");

const bookList = async (DB, rootDir) => {
  const rootPath = rootDir + "/artifacts";
  const testaments = ["new", "old"];
  for (const testament of testaments) {
    await uploadBookList(
      `${rootPath}/${testament}-testament-book-list.txt`,
      testament,
      DB
    );
    console.log("Uploaded book list", testament);
  }
};

const translations = async (DB, rootDir) => {
  const rootPath = rootDir + "/translations";
  const translations = ["asv", "kjv", "bbe", "web", "ylt"];

  for (const translation of translations) {
    await uploadTranslation(`${rootPath}/${translation}.json`, translation, DB);
  }
  console.log("Done");
};

module.exports = async (DB, rootdir) => {
  await bookList(DB, rootdir);
  await translations(DB, rootdir);
};
