const { map } = require("rxjs/operators");
const parseRoughTranlsation = require("./parse-rough-translation");
const fs = require("fs/promises");
const {
  resultset: { keys },
} = require("../artifacts/rough-translations/json/key_english.json");

module.exports = (filePath, outputPath, translation) => {
  const meta = keys.reduce((a, { b, n, g }) => {
    a[b] = {
      name: n,
      genre: g,
    };

    return a;
  }, {});

  const line$ = parseRoughTranlsation(filePath).pipe(
    map(({ field }) => field),
    map(([_, book, chapter, verse, text]) => ({
      book_name: meta[book].name,
      chapter: chapter,
      verse: verse,
      text: text,
      translation,
      genre: meta[book].genre,
    }))
  );

  line$.subscribe(
    (line) => {
      fs.appendFile(outputPath, JSON.stringify(line) + "\n");
    },
    () => {},
    () => console.log("Done!")
  );
};
