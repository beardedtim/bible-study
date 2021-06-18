const parseBookList = require("./parse-book-list");

module.exports = async (bookListPath, testament, DB) => {
  const bookList = await parseBookList(bookListPath);
  const toInsert = bookList.map((book, order) => ({
    book_name: book,
    testament,
    order,
  }));

  return DB.into("books").insert(toInsert).returning("*");
};
