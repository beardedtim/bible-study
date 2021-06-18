const readline = require("readline");
const fs = require("fs");
const { Observable } = require("rxjs");

module.exports = (parser, filePath) =>
  new Observable((obs) => {
    const reader = readline.createInterface({
      input: fs.createReadStream(filePath),
    });

    reader
      .on("line", async (line) => {
        const result = await parser(line);
        obs.next(result);
      })
      .on("close", () => obs.complete());
  });
