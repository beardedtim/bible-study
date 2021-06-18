module.exports = async (DB, rootDir) => {
  const {
    resultset: { keys },
  } = require(`${rootDir}/artifacts/rough-translations/json/key_english.json`);

  const insert = keys.map(({ n: name, g: genre }) => ({
    name,
    genre,
  }));

  for (const toInsert of insert) {
    await DB.from("verses")
      .where({
        book_name: toInsert.name,
      })
      .update({
        genre: toInsert.genre,
      });
  }
  console.log("Mapped genres");
};
