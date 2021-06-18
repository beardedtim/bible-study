const Router = require("@koa/router");
const DB = require("../connectors/db");

const router = new Router({
  prefix: "/books",
});

module.exports = router
  .get("/", async (ctx) => {
    const result = await DB.from("books").select(
      "book_name",
      "testament",
      "order"
    );

    const testaments = result.reduce(
      (books, { book_name, testament, order }) => {
        books[testament][order] = book_name;

        return books;
      },
      { old: [], new: [] }
    );

    ctx.body = {
      data: {
        list: testaments.old.concat(testaments.new),
        testaments,
      },
    };
  })
  .get("/:book_name/:chapter_num/:verse_num/:translation", async (ctx) => {
    const result = await DB.from("verses")
      .where({
        book_name: ctx.params.book_name,
        translation: ctx.params.translation,
        chapter_num: Number(ctx.params.chapter_num),
        verse_num: Number(ctx.params.verse_num),
      })
      .select("verse_txt")
      .first();

    ctx.body = {
      data: result.verse_txt,
    };
  })
  .get("/:book_name/:chapter_num/:verse_num", async (ctx) => {
    const result = await DB.from("verses")
      .select("*")
      .where({
        book_name: ctx.params.book_name,
        chapter_num: Number(ctx.params.chapter_num),
        verse_num: Number(ctx.params.verse_num),
      });

    ctx.body = {
      data: result.reduce((translations, { verse_txt, translation }) => {
        translations[translation] = verse_txt;

        return translations;
      }, {}),
    };
  })
  .get("/:book_name/:chapter_num", async (ctx) => {
    const result = await DB.from("verses")
      .select("*")
      .where({
        book_name: ctx.params.book_name,
        chapter_num: Number(ctx.params.chapter_num),
      });

    ctx.body = {
      data: result.reduce(
        (translations, { verse_num, verse_txt, translation }) => {
          if (!(translation in translations)) {
            translations[translation] = [];
          }

          translations[translation][verse_num - 1] = verse_txt;

          return translations;
        },
        {}
      ),
    };
  })
  .get("/:book_name", async (ctx) => {
    const result = await DB.from("verses").select("*").where({
      book_name: ctx.params.book_name,
    });

    ctx.body = {
      data: result.reduce(
        (translations, { chapter_num, verse_num, verse_txt, translation }) => {
          if (!(translation in translations)) {
            translations[translation] = {};
          }

          if (!(chapter_num in translations[translation])) {
            translations[translation][chapter_num] = [];
          }

          translations[translation][chapter_num][verse_num - 1] = verse_txt;

          return translations;
        },
        {}
      ),
    };
  });
