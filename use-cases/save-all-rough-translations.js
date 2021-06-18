const saveRough = require("./save-rough-translation");

module.exports = async (rootDir) => {
  const inputRoot = rootDir + "/artifacts/rough-translations/json";
  const outputRoot = rootDir + "/translations";
  const translations = ["web", "ylt", "bbe"];

  for (const translation of translations) {
    await saveRough(
      `${inputRoot}/t_${translation}.json`,
      `${outputRoot}/${translation}.json`,
      translation
    );
  }
};
