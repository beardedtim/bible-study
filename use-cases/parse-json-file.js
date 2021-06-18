const parseFile = require("./parse-file");

module.exports = (filePath) => parseFile((line) => JSON.parse(line), filePath);
