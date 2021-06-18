const parseBibleTranslation = require("./parse-bible-translation");

module.exports = async (translationPath, translationId, DB) => {
  const translation = await parseBibleTranslation(translationPath);
  const toInsert = [];

  for (const [book_name, { chapters }] of Object.entries(translation.books)) {
    for (const [chapter_num, verses] of Object.entries(chapters)) {
      for (const [verse_num, text] of Object.entries(verses)) {
        toInsert.push({
          verse_txt: text,
          translation: translationId,
          chapter_num,
          verse_num,
          book_name,
        });
      }
    }
  }

  const chunkSize = 50;

  return DB.batchInsert("verses", toInsert, chunkSize);
};
