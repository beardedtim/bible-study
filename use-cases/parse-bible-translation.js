const { reduce } = require("rxjs/operators");
const parseJSONFile = require("./parse-json-file");

module.exports = (filePath) => {
  const jsonLine$ = parseJSONFile(filePath);

  return jsonLine$
    .pipe(
      reduce(
        (bible, line) => {
          if (!(line.book_name in bible.books)) {
            bible.books[line.book_name] = {
              chapters: {},
            };
          }

          if (!(line.chapter in bible.books[line.book_name].chapters)) {
            bible.books[line.book_name].chapters[line.chapter] = {};
          }

          bible.books[line.book_name].chapters[line.chapter][line.verse] =
            line.text;

          return bible;
        },
        {
          books: {},
        }
      )
    )
    .toPromise();
};
