const { reduce } = require("rxjs/operators");
const parseFile = require("./parse-file");

module.exports = (filePath) =>
  parseFile((line) => line, filePath)
    .pipe(reduce((a, c) => a.concat(c), []))
    .toPromise();
