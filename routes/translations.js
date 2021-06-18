const Router = require("@koa/router");
const DB = require("../connectors/db");

const router = new Router({
  prefix: "/translations",
});

module.exports = router.get("/", async (ctx) => {
  const result = await DB.from("verses").distinct("translation");

  ctx.body = {
    data: result.map(({ translation }) => translation),
  };
});
