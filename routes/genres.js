const Router = require("@koa/router");
const { default: build } = require("next/dist/build");
const DB = require("../connectors/db");

const router = new Router({
  prefix: "/genres",
});

module.exports = router
  .get("/", async (ctx) => {
    const result = await DB.from("genres").select("*");

    ctx.body = {
      data: result.map(({ name }) => name),
    };
  })
  .get("/:name", async (ctx) => {
    const genre = await DB.from("genres")
      .select("id")
      .where({
        name: ctx.params.name,
      })
      .first();

    const bookList = await DB.from("verses")
      .select("book_name")
      .distinct("book_name")
      .where({
        genre: genre.id,
      });

    const booksInOrder = await DB.from("books")
      .whereIn(
        "book_name",
        bookList.map(({ book_name }) => book_name)
      )
      .orderBy("order", "asc");

    ctx.body = {
      data: booksInOrder.map(({ book_name }) => book_name),
    };
  });
