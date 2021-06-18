const json = require("../artifacts/rough-translations/json/key_genre_english.json");
module.exports = (DB) => {
  const insert = json.map(({ g, n }) => ({
    id: g,
    name: n,
  }));

  return DB.into("genres").insert(insert);
};
