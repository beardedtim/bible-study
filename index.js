const server = require("./server");

const main = async () => {
  server.listen(5000, () => {
    console.log("Listening");
  });
};

main();
