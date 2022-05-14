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
      })
      .where((builder) => {
        if (ctx.query.verse_start) {
          builder.where("verse_num", ">=", ctx.query.verse_start);
        }

        if (ctx.query.verse_end) {
          builder.where("verse_num", "<=", ctx.query.verse_end);
        }

        return builder;
      });

    const groupedByTranslation = result.reduce(
      (translations, { verse_num, verse_txt, translation }) => {
        if (!(translation in translations)) {
          translations[translation] = [];
        }

        translations[translation].push({
          verse_num,
          verse_txt,
        });

        return translations;
      },
      {}
    );

    const sortedAndJustText = Object.entries(groupedByTranslation).reduce(
      (state, [translation, verses]) => {
        state[translation] = verses
          .sort((a, b) => a.verse_num - b.verse_num)
          .map(({ verse_txt }) => verse_txt);

        return state;
      },
      {}
    );

    ctx.body = {
      data: sortedAndJustText,
    };
  })
  .get("/:book_name", async (ctx) => {
    const result = await DB.from("verses")
      .select("*")
      .where({
        book_name: ctx.params.book_name,
      })
      .where((builder) => {
        if (ctx.query.chap_start) {
          builder.where("chapter_num", ">=", ctx.query.chap_start);
        }

        if (ctx.query.chap_end) {
          builder.where("chapter_num", "<=", ctx.query.chap_end);
        }

        return builder;
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
