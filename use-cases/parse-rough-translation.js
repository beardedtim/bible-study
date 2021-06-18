const { from } = require("rxjs");

module.exports = (filePath) => {
  const json = require(filePath);

  const {
    resultset: { row },
  } = json;

  return from(row);
};
